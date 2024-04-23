import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import Stats from 'stats.js'
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
    public stats: Stats = new Stats()
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
    public tickManager: number = 0

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
        this.initStats()
        this.animate()
    }

    public initStats(): void {
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom)
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
        const grid = new THREE.GridHelper(40, 20, 0x444444, 0x444444)
        this.scene.add(grid)
    }

    animate(): void {
        this.stats.begin()
        requestAnimationFrame(this.animate.bind(this))
        const delta = this.clock.getDelta()
        // this.vrmSystem.update(delta)
        this.controlSystem.update()
        this.movementSystem.update(delta)
        this.cameraSystem.update()
        this.renderSystem.update(delta)

        this.tickManager += delta
        // update multiplayer system every 0.1 seconds
        if (this.tickManager >= 0.1) {
            this.multiplayerSystem.update()
            this.tickManager -= 0.1
        }

        this.stats.end()
    }

    getLocalPlayer(): PlayerEntity | undefined {
        return this.players.find((p) => p.id === this.multiplayerSystem.id)
    }

    public destroy(): void {
        this.socket.disconnect()
    }
}
