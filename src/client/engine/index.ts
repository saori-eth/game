import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { MultiplayerSystem } from './systems'
import type { Player } from 'shared'

interface EngineProps {
    canvas: HTMLCanvasElement
    socket: any
}

export class EngineService {
    public scene: THREE.Scene
    public camera: THREE.PerspectiveCamera
    public controls: OrbitControls
    public renderer: THREE.WebGLRenderer
    public clock: THREE.Clock
    public deltaTime: number
    public socket: any
    public serverState: any
    public multiplayerSystem: MultiplayerSystem
    public players: Player[] = []

    constructor(props: EngineProps) {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.controls = new OrbitControls(this.camera, props.canvas)
        this.renderer = new THREE.WebGLRenderer({ canvas: props.canvas })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.clock = new THREE.Clock()
        this.deltaTime = 0
        this.socket = props.socket
        this.multiplayerSystem = new MultiplayerSystem(this)
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })
        this.init()
    }

    public init(): void {
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const cube = new THREE.Mesh(geometry, material)
        this.scene.add(cube)
        this.camera.position.z = 5

        const animate = () => {
            requestAnimationFrame(animate)
            this.deltaTime = this.clock.getDelta()
            this.renderer.render(this.scene, this.camera)
        }

        animate()
    }

    public destroy(): void {
        this.socket.disconnect()
    }
}
