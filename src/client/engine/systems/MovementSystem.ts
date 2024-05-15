import type { EngineService } from '..'

export class MovementSystem {
    private engine: EngineService
    private speed: number
    private sprintMultiplier: number
    private onGround: boolean
    private gravity: number
    private jumpSpeed: number
    private dy: number
    constructor(engine: EngineService) {
        this.engine = engine
        this.speed = 5
        this.sprintMultiplier = 1.5
        this.onGround = true
        this.gravity = -9.81
        this.jumpSpeed = 5
        this.dy = 0
    }

    update(delta: number) {
        const player = this.engine.getLocalPlayer()
        if (!player) return
        this.movePlayer(player, delta)
        this.applyGravity(player, delta)
    }

    applyGravity(player: any, delta: number) {
        if (!this.onGround) {
            this.dy += this.gravity * delta // Apply gravity to vertical velocity
        }

        // Check if the player is back on the ground
        if (player.position.y <= 0) {
            player.position.y = 0
            this.onGround = true
            this.dy = 0 // Reset vertical velocity
        }
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

        if (inputs.space && this.onGround) {
            this.dy = this.jumpSpeed // Set upward velocity
            this.onGround = false // Character is now in the air
        }

        player.position.x += dx
        player.position.z += dz
        player.position.y += this.dy * delta // Apply vertical velocity

        if (inputs.movementX) {
            player.rotation.y -= inputs.movementX * 0.005
        }
    }
}
