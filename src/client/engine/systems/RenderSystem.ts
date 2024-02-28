import { EngineService } from '..'
import { WebGLRenderer } from 'three'

export class RenderSystem {
    private engine: EngineService
    public renderer: WebGLRenderer
    constructor(engine: EngineService) {
        this.engine = engine
        this.renderer = new WebGLRenderer({ canvas: engine.canvas })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.engine.cameraSystem.camera.aspect =
                window.innerWidth / window.innerHeight
            this.engine.cameraSystem.camera.updateProjectionMatrix()
        })
    }
    update(delta: number) {
        this.renderer.render(this.engine.scene, this.engine.cameraSystem.camera)
    }
}
