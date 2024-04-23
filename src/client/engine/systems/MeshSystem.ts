import type { EngineService } from '..'
import { PlayerEntity } from '../entities/PlayerEntity'

export class MeshSystem {
    private engine: EngineService
    constructor(engine: EngineService) {
        this.engine = engine
    }

    update() {
        this.engine.players.forEach((player: PlayerEntity) => {
            player.update()
        })
    }
}
