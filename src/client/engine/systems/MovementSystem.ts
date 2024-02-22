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
        this.players.forEach((player) => {
            player.inputs && this.movePlayer(player, delta)
        })
    }

    movePlayer(player: any, delta: number) {
        const rotationY = player.mesh.rotation.y

        //! WARNING i dont understand this code
        if (player.inputs.w) {
            player.position.x -= Math.sin(rotationY) * this.speed * delta
            player.position.z -= Math.cos(rotationY) * this.speed * delta
        }
        if (player.inputs.s) {
            player.position.x += Math.sin(rotationY) * this.speed * delta
            player.position.z += Math.cos(rotationY) * this.speed * delta
        }
        if (player.inputs.a) {
            player.position.x +=
                Math.sin(rotationY - Math.PI / 2) * this.speed * delta
            player.position.z +=
                Math.cos(rotationY - Math.PI / 2) * this.speed * delta
        }
        if (player.inputs.d) {
            player.position.x +=
                Math.sin(rotationY + Math.PI / 2) * this.speed * delta
            player.position.z +=
                Math.cos(rotationY + Math.PI / 2) * this.speed * delta
        }

        // Update mesh position once at the end
        player.mesh.position.x = player.position.x
        player.mesh.position.z = player.position.z

        if (player.inputs.movementX !== 0) {
            player.mesh.rotation.y -= player.inputs.movementX * 0.005
            player.inputs.movementX = 0
        }
    }
}
