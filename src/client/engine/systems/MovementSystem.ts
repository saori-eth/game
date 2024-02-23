import { EngineService } from '..'

export class MovementSystem {
    private engine: EngineService
    private speed: number
    constructor(engine: EngineService) {
        this.engine = engine
        this.speed = 5
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

        if (inputs.w) {
            dx -= Math.sin(rotationY) * this.speed * delta
            dz -= Math.cos(rotationY) * this.speed * delta
        }
        if (inputs.s) {
            dx += Math.sin(rotationY) * this.speed * delta
            dz += Math.cos(rotationY) * this.speed * delta
        }
        if (inputs.a) {
            dx += Math.sin(rotationY - Math.PI / 2) * this.speed * delta
            dz += Math.cos(rotationY - Math.PI / 2) * this.speed * delta
        }
        if (inputs.d) {
            dx += Math.sin(rotationY + Math.PI / 2) * this.speed * delta
            dz += Math.cos(rotationY + Math.PI / 2) * this.speed * delta
        }

        player.position.x += dx
        player.position.z += dz
        player.mesh.position.set(
            player.position.x,
            player.mesh.position.y,
            player.position.z
        )

        if (inputs.movementX) {
            player.mesh.rotation.y -= inputs.movementX * 0.005
        }
    }
}
