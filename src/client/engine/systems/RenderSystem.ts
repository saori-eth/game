import { EngineService } from '..'
import { WebGLRenderer } from 'three'

export class RenderSystem {
    private engine: EngineService
    public renderer: WebGLRenderer
    constructor(engine: EngineService) {
        this.engine = engine
        this.renderer = new WebGLRenderer({
            canvas: engine.canvas,
            antialias: true,
        })
        this.renderer.setSize(window.innerWidth, window.innerHeight, false)
        window.addEventListener('resize', () => {
            this.engine.cameraSystem.camera.aspect =
                window.innerWidth / window.innerHeight
            this.engine.cameraSystem.camera.updateProjectionMatrix()
        })
    }
    update(delta: number) {
        this.renderer.render(this.engine.scene, this.engine.cameraSystem.camera)
    }
}
