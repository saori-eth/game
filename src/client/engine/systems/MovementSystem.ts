import type { EngineService } from '..'

export class MovementSystem {
    private engine: EngineService
    private speed: number
    private sprintMultiplier: number
    constructor(engine: EngineService) {
        this.engine = engine
        this.speed = 5
        this.sprintMultiplier = 1.5
    }

    update(delta: number) {
        const player = this.engine.getLocalPlayer()
        if (!player) return
        this.movePlayer(player, delta)
    }

    movePlayer(player: any, delta: number) {
        const rotationY = player.mesh.rotation.y
        const inputs = this.engine.controlSystem.controls
        let dx = 0,
            dz = 0
        let currentSpeed = this.speed
        if (inputs.shift) {
            currentSpeed *= this.sprintMultiplier
        }

        if (inputs.w) {
            dx -= Math.sin(rotationY) * currentSpeed * delta
            dz -= Math.cos(rotationY) * currentSpeed * delta
        }
        if (inputs.s) {
            dx += Math.sin(rotationY) * currentSpeed * delta
            dz += Math.cos(rotationY) * currentSpeed * delta
        }
        if (inputs.a) {
            dx += Math.sin(rotationY - Math.PI / 2) * currentSpeed * delta
            dz += Math.cos(rotationY - Math.PI / 2) * currentSpeed * delta
        }
        if (inputs.d) {
            dx += Math.sin(rotationY + Math.PI / 2) * currentSpeed * delta
            dz += Math.cos(rotationY + Math.PI / 2) * currentSpeed * delta
        }

        player.position.x += dx
        player.position.z += dz

        if (inputs.movementX) {
            player.rotation.y -= inputs.movementX * 0.005
        }
    }
}
