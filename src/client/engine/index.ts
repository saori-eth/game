import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
    MultiplayerSystem,
    VRMSystem,
    ControlSystem,
    MovementSystem,
    CameraSystem,
    RenderSystem,
} from './systems'
import type { PlayerEntity } from './entities'

interface EngineProps {
    canvas: HTMLCanvasElement
    socket: any
}

export class EngineService {
    public scene: THREE.Scene
    public canvas: HTMLCanvasElement
    public clock: THREE.Clock = new THREE.Clock()
    public socket: any
    public multiplayerSystem: MultiplayerSystem
    // public vrmSystem: VRMSystem
    public renderSystem: RenderSystem
    public cameraSystem: CameraSystem
    public controlSystem: ControlSystem
    public movementSystem: MovementSystem
    public players: PlayerEntity[] = []

    constructor(props: EngineProps) {
        this.scene = new THREE.Scene()
        this.canvas = props.canvas
        this.socket = props.socket
        this.cameraSystem = new CameraSystem(this)
        this.renderSystem = new RenderSystem(this)
        this.multiplayerSystem = new MultiplayerSystem(this)
        this.controlSystem = new ControlSystem(this)
        this.movementSystem = new MovementSystem(this)
        // this.vrmSystem = new VRMSystem(this)
        this.init()
        this.animate()
    }

    public init(): void {
        // this.vrmSystem.load('/avatar/avatar.vrm', '/avatar/idle.fbx')

        // Load HDR environment
        new RGBELoader()
            .setPath('/skybox/')
            .load('night_sky.hdr', (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping
                texture.colorSpace = THREE.LinearSRGBColorSpace

                this.scene.background = texture
                this.scene.environment = texture
            })

        // x = red, y = green, z = blue
        const axesHelper = new THREE.AxesHelper(5)
        axesHelper.position.y = 0.005
        this.scene.add(axesHelper)
        // Grid
        const grid = new THREE.GridHelper(20, 20)
        this.scene.add(grid)
    }

    animate(): void {
        requestAnimationFrame(this.animate.bind(this))
        const delta = this.clock.getDelta()
        // this.vrmSystem.update(delta)
        this.controlSystem.update()
        this.movementSystem.update(delta)
        this.cameraSystem.update(delta)
        this.renderSystem.update(delta)
    }

    public destroy(): void {
        this.socket.disconnect()
    }
}
