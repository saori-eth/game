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
            if (!player.position || !player.mesh) return

            // Calculate the rotated camera offset
            //! WARNING i dont understand this code
            const rotatedOffsetX =
                CAMERA_OFFSET.z * Math.sin(player.mesh.rotation.y)
            const rotatedOffsetZ =
                CAMERA_OFFSET.z * Math.cos(player.mesh.rotation.y)

            // Update camera position with rotated offset
            this.camera.position.set(
                player.position.x + rotatedOffsetX,
                player.position.y + CAMERA_OFFSET.y, // Keep Y offset as is
                player.position.z + rotatedOffsetZ
            )

            // Ensure the camera looks at the player
            this.camera.lookAt(
                new Vector3(
                    player.position.x,
                    player.position.y,
                    player.position.z
                )
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
