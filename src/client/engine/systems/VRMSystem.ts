import { VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'
import { MIXAMO } from '../utils'

export class VRMSystem {
    driver: any
    avatar: VRM | null = null
    mixer: THREE.AnimationMixer | null = null

    constructor(driver: any) {
        this.driver = driver
    }

    load(url: string, animationUrl?: string) {
        const loader = new GLTFLoader()
        loader.register((parser) => new VRMLoaderPlugin(parser))

        loader.load(
            url,
            (gltf) => {
                VRMUtils.removeUnnecessaryJoints(gltf.scene)
                VRMUtils.removeUnnecessaryVertices(gltf.scene)
                const vrm = gltf.userData.vrm // this is a VRM type
                vrm.lookAt.target = this.driver.lookAtTarget
                vrm.scene.traverse((obj: any) => {
                    obj.frustumCulled = false
                    obj.visible = false
                })
                this.driver.scene.add(vrm.scene)
                this.avatar = vrm
                if (animationUrl) {
                    this.loadAnimation(animationUrl, () => {
                        vrm.scene.traverse((obj: any) => {
                            obj.visible = true
                        })
                    })
                }
            },
            (progress) => {
                console.log('Loading VRM...')
            },
            (error) => console.error('Failed to load VRM:', error)
        )
    }

    loadAnimation(animationUrl: string, callback?: () => void) {
        if (!this.avatar) return console.error('Avatar not loaded')
        if (!this.mixer) {
            this.mixer = new THREE.AnimationMixer(this.avatar.scene)
        }
        MIXAMO.loadAnim(animationUrl, this.avatar).then((clip) => {
            if (!this.mixer) return console.error('Failed to load animation')
            const action = this.mixer.clipAction(clip as THREE.AnimationClip)
            if (callback) callback()
            action.play()
        })
    }

    update(delta: number) {
        if (!this.avatar || !this.mixer) return
        this.mixer.update(delta)
        this.avatar.update(delta)
    }
}
