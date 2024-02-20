import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { MultiplayerSystem, VRMSystem } from './systems'
import type { PlayerEntity } from './entities'

interface EngineProps {
    canvas: HTMLCanvasElement
    socket: any
}

export class EngineService {
    public scene: THREE.Scene
    public camera: THREE.PerspectiveCamera
    public renderer: THREE.WebGLRenderer
    public clock: THREE.Clock = new THREE.Clock()
    public socket: any
    public multiplayerSystem: MultiplayerSystem
    public vrmSystem: VRMSystem
    public players: PlayerEntity[] = []

    constructor(props: EngineProps) {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.renderer = new THREE.WebGLRenderer({
            canvas: props.canvas,
            antialias: true,
        })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.socket = props.socket
        this.multiplayerSystem = new MultiplayerSystem(this)
        this.vrmSystem = new VRMSystem(this)
        this.eventListeners()
        this.init()
        this.animate()
    }

    public init(): void {
        this.vrmSystem.load('/avatar/avatar.vrm', '/avatar/idle.fbx')
        new OrbitControls(this.camera, this.renderer.domElement)
        this.camera.position.z = 0.5
        this.camera.position.y = 1.35
        this.camera.far = 2000
        this.camera.updateProjectionMatrix()

        // Load HDR environment
        new RGBELoader()
            .setPath('/skybox/')
            .load('night_sky.hdr', (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping
                texture.colorSpace = THREE.SRGBColorSpace

                this.scene.background = texture
                this.scene.environment = texture
            })

        // grid
        const grid = new THREE.GridHelper(20, 20)
        this.scene.add(grid)
    }

    animate(): void {
        requestAnimationFrame(this.animate.bind(this))
        const delta = this.clock.getDelta()
        this.vrmSystem.update(delta)
        this.renderer.render(this.scene, this.camera)
    }

    public destroy(): void {
        this.socket.disconnect()
    }

    private eventListeners(): void {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }
}
