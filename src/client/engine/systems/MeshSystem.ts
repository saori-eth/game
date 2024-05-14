import type { EngineService } from '..'
import { PlayerEntity } from '../entities/PlayerEntity'

export class MeshSystem {
    private engine: EngineService
    private localId: string | undefined = undefined
    private delta: number | null = null

    constructor(engine: EngineService) {
        this.engine = engine
    }

    update() {
        if (!this.localId) {
            console.log('setting local id')
            this.localId = this.engine.multiplayerSystem.id || undefined
        }
        const delta = this.engine.multiplayerSystem.serverDelta
        this.engine.players.forEach((player: PlayerEntity) => {
            if (player.id === this.localId) {
                player.update()
            } else {
                player.update(delta)
            }
        })
    }
}
