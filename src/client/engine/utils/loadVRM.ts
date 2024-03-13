import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import type { VRM } from '@pixiv/three-vrm'
import { Scene } from 'three'

export const loadVRM = (url: string): Promise<VRM> => {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader()
        loader.register((parser) => new VRMLoaderPlugin(parser))

        loader.load(
            url,
            (gltf) => {
                VRMUtils.removeUnnecessaryJoints(gltf.scene)
                VRMUtils.removeUnnecessaryVertices(gltf.scene)
                const vrm = gltf.userData.vrm // this is a VRM type
                // if 0.0, rotate
                VRMUtils.rotateVRM0(vrm)
                vrm.scene.traverse((obj: any) => {
                    obj.frustumCulled = false
                })
                resolve(vrm) // Resolve the promise with the VRM object
            },
            (progress) => {
                console.log('Loading VRM...')
            },
            (error) => {
                console.error('Failed to load VRM:', error)
                reject(error) // Reject the promise if there's an error
            }
        )
    })
}
