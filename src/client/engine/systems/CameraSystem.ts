import { EngineService } from '..'
import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

export class CameraSystem {
    private engine: EngineService
    private scene: THREE.Scene
    public camera: PerspectiveCamera
    public controls: OrbitControls
    constructor(engine: EngineService) {
        this.engine = engine
        this.scene = engine.scene
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.camera.position.set(0, 2, 10)
        this.camera.lookAt(0, 0, 0)
        this.controls = new OrbitControls(this.camera, this.engine.canvas)
        this.resizeListener()
    }
    update(delta: number) {
        this.controls.update()
    }
    resizeListener() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.engine.renderSystem.renderer.setSize(
                window.innerWidth,
                window.innerHeight
            )
        })
    }
}
