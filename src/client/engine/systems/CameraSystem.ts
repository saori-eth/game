import { EngineService } from '@/engine'
import { PerspectiveCamera } from 'three'

export class CameraSystem {
    private engine: EngineService
    public camera: PerspectiveCamera
    private cameraDistance: number = 5
    private cameraPolarAngle: number = Math.PI / 3
    private cameraAzimuthalAngle: number = Math.PI / 2

    constructor(engine: EngineService) {
        this.engine = engine
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
    }

    public update(): void {
        const player = this.engine.players.find(
            (player) => player.id === this.engine.multiplayerSystem.id
        )
        if (!player || !player.mesh || !player.position) return
        const controls = this.engine.controlSystem.controls
        // Convert movementX and movementY to angle changes
        const angleX = controls.movementX * 0.005 // Sensitivity adjustment
        // Reverse the effect of movementY by subtracting it
        const angleY = -controls.movementY * 0.005 // Sensitivity adjustment

        // Update azimuthal and polar angles
        this.cameraAzimuthalAngle += angleX
        this.cameraPolarAngle = Math.max(
            0.1,
            Math.min(Math.PI / 2, this.cameraPolarAngle + angleY)
        ) // Clamp the polar angle

        // Calculate new camera position relative to the player's position
        const x =
            player.position.x +
            this.cameraDistance *
                Math.sin(this.cameraPolarAngle) *
                Math.cos(this.cameraAzimuthalAngle)
        const y =
            player.position.y +
            this.cameraDistance * Math.cos(this.cameraPolarAngle)
        const z =
            player.position.z +
            this.cameraDistance *
                Math.sin(this.cameraPolarAngle) *
                Math.sin(this.cameraAzimuthalAngle)

        this.camera.position.set(x, y, z)
        this.camera.lookAt(
            player.position.x,
            player.position.y,
            player.position.z
        )

        // Update camera distance based on input
        this.cameraDistance -= -controls.deltaY * 0.01 // Sensitivity adjustment
        this.cameraDistance = Math.max(2, Math.min(20, this.cameraDistance)) // Clamp the distance

        this.engine.controlSystem.resetControls()
    }
}
