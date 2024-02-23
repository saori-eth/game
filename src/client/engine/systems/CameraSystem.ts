import { EngineService } from '@/engine'
import { PerspectiveCamera } from 'three'

const MOUSE_SENSITIVITY = 0.005
const ZOOM_SENSITIVITY = 0.01
const MAX_ZOOM = 10
const MIN_ZOOM = 0.01

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
            (p) => p.id === this.engine.multiplayerSystem.id
        )
        if (!player || !player.mesh || !player.position) return

        const playerPos = player.position

        const { movementX, movementY, deltaY } =
            this.engine.controlSystem.controls
        const angleX = movementX * MOUSE_SENSITIVITY,
            angleY = -movementY * MOUSE_SENSITIVITY

        this.cameraAzimuthalAngle += angleX
        this.cameraPolarAngle = Math.max(
            0.1,
            Math.min(Math.PI / 2, this.cameraPolarAngle + angleY)
        )

        const x =
            playerPos.x +
            this.cameraDistance *
                Math.sin(this.cameraPolarAngle) *
                Math.cos(this.cameraAzimuthalAngle)
        const y =
            playerPos.y + this.cameraDistance * Math.cos(this.cameraPolarAngle)
        const z =
            playerPos.z +
            this.cameraDistance *
                Math.sin(this.cameraPolarAngle) *
                Math.sin(this.cameraAzimuthalAngle)

        this.camera.position.set(x, y, z)
        this.camera.lookAt(playerPos.x, playerPos.y, playerPos.z)

        this.cameraDistance += deltaY * ZOOM_SENSITIVITY
        this.cameraDistance = Math.max(
            MIN_ZOOM,
            Math.min(MAX_ZOOM, this.cameraDistance)
        )

        this.engine.controlSystem.resetControls()
    }
}
