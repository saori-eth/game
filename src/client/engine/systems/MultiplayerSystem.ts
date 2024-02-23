import { EVENTS } from 'shared'
import { PlayerEntity } from '../entities'
import type { EngineService } from '..'

export class MultiplayerSystem {
    engine: EngineService
    state: any
    id: string | undefined
    tickRate: number | undefined
    constructor(engine: EngineService) {
        this.engine = engine
        this.init()
    }

    init() {
        this.engine.socket.on(EVENTS.CONNECTION_ESTABLISHED, (data: any) => {
            console.log('connection_established', data)
            this.id = data.id
            this.tickRate = data.tickRate
        })
        this.engine.socket.on('game_state', (state: any) => {
            if (!state.players) return console.log('no players in state')
            // observes state changes and updates players
            this.managePlayers(state)
        })
    }

    managePlayers(state: any) {
        // case: initializing new game
        if (!this.state && state.players.length > 0) {
            console.log('initializing state')
            this.handleInitialize(state.players)
            this.state = state
            return
        }

        const playerDifference =
            state.players.length - this.state.players.length

        // case: adding player
        if (playerDifference > 0) {
            console.log('adding players')
            this.handleNewPlayer(state.players)
            // case: removing player
        } else if (playerDifference < 0) {
            console.log('removing players')
            this.handleMissingPlayer(state.players)
        }
        this.state = state
    }

    handleInitialize(players: any) {
        players.forEach((player: any) => {
            console.log('Position from server', player.position)
            const playerEntity = new PlayerEntity(player.id)
            playerEntity.setPosition(player.position)
            playerEntity.buildMesh(this.engine.scene)
            this.engine.players.push(playerEntity)
        })
    }

    handleNewPlayer(players: any) {
        const missingPlayers = players.filter(
            (player: any) =>
                !this.state.players.find((p: any) => p.id === player.id)
        )
        missingPlayers.forEach((player: any) => {
            const playerEntity = new PlayerEntity(player.id)
            playerEntity.setPosition(player.position)
            playerEntity.buildMesh(this.engine.scene)
            this.engine.players.push(playerEntity)
        })
    }

    handleMissingPlayer(players: any) {
        const missingPlayers = players.filter(
            (player: any) => !players.find((p: any) => p.id === player.id)
        )

        console.log('removing players', missingPlayers)

        missingPlayers.forEach((player: any) => {
            const playerEntity = this.engine.players.find(
                (p: any) => p.id === player.id
            )
            if (!playerEntity)
                return console.log('tried to remove non-existent player')
            playerEntity.dispose()
            this.engine.players = this.engine.players.filter(
                (p: any) => p.id !== player.id
            )
        })
    }
}
