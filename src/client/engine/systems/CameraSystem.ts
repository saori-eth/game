import { EngineService } from '..'
import { PerspectiveCamera, Vector3 } from 'three'

const CAMERA_OFFSET = new Vector3(0, 2, 10)

export class CameraSystem {
    private engine: EngineService
    private players: EngineService['players']
    private scene: THREE.Scene
    public camera: PerspectiveCamera
    constructor(engine: EngineService) {
        this.engine = engine
        this.players = engine.players
        this.scene = engine.scene
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.resizeListener()
    }
    update(delta: number) {
        this.players.forEach((player) => {
            if (!player.position) return

            this.camera.position.set(
                player.position.x + CAMERA_OFFSET.x,
                player.position.y + CAMERA_OFFSET.y,
                player.position.z + CAMERA_OFFSET.z
            )

            this.camera.lookAt(
                player.position.x,
                player.position.y,
                player.position.z
            )
        })
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
