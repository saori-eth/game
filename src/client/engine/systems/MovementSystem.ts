import { EngineService } from '..'

export class MovementSystem {
    private engine: EngineService
    private players: EngineService['players']
    private speed: number
    constructor(engine: EngineService) {
        this.engine = engine
        this.players = engine.players
        this.speed = 5
    }

    update(delta: number) {
        const player = this.players.find(
            (player) => player.id === this.engine.multiplayerSystem.id
        )
        if (!player) return
        this.movePlayer(player, delta)
    }

    movePlayer(player: any, delta: number) {
        const rotationY = player.mesh.rotation.y
        const inputs = this.engine.controlSystem.controls

        //! WARNING i dont understand this code
        if (inputs.w) {
            player.position.x -= Math.sin(rotationY) * this.speed * delta
            player.position.z -= Math.cos(rotationY) * this.speed * delta
        }
        if (inputs.s) {
            player.position.x += Math.sin(rotationY) * this.speed * delta
            player.position.z += Math.cos(rotationY) * this.speed * delta
        }
        if (inputs.a) {
            player.position.x +=
                Math.sin(rotationY - Math.PI / 2) * this.speed * delta
            player.position.z +=
                Math.cos(rotationY - Math.PI / 2) * this.speed * delta
        }
        if (inputs.d) {
            player.position.x +=
                Math.sin(rotationY + Math.PI / 2) * this.speed * delta
            player.position.z +=
                Math.cos(rotationY + Math.PI / 2) * this.speed * delta
        }

        // Update mesh position once at the end
        player.mesh.position.x = player.position.x
        player.mesh.position.z = player.position.z

        if (this.engine.controlSystem.controls.movementX) {
            player.mesh.rotation.y -=
                this.engine.controlSystem.controls.movementX * 0.005
        }
    }
}
