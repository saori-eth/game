import { EngineService } from '..'

export class MovementSystem {
    private engine: EngineService
    private players: EngineService['players']
    private speed: number
    constructor(engine: EngineService) {
        this.engine = engine
        this.players = engine.players
        this.speed = 1
    }

    update(delta: number) {
        this.players.forEach((player) => {
            player.inputs && this.movePlayer(player, delta)
        })
    }

    movePlayer(player: any, delta: number) {
        if (player.inputs.w) {
            player.position.z -= this.speed * delta
            player.mesh.position.z = player.position.z
        }
        if (player.inputs.s) {
            player.position.z += this.speed * delta
            player.mesh.position.z = player.position.z
        }
        if (player.inputs.a) {
            player.position.x -= this.speed * delta
            player.mesh.position.x = player.position.x
        }
        if (player.inputs.d) {
            player.position.x += this.speed * delta
            player.mesh.position.x = player.position.x
        }
        if (player.inputs.movementX !== 0) {
            player.mesh.rotation.y -= player.inputs.movementX * 0.01
            player.inputs.movementX = 0
        }
    }
}
