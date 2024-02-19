import { EVENTS, Player } from 'shared'

export class MultiplayerSystem {
    engine: any
    id: string | undefined
    tickRate: number | undefined
    state: any
    constructor(engine: any) {
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
            this.managePlayers(state)
        })
    }

    managePlayers(state: any) {
        // case: initializing new game
        if (!this.state && state.players.length > 0) {
            console.log('initializing state')
            // for each player in the state, generate a player entity
            state.players.forEach((player: any) => {
                console.log('Position from server', player.position)
                const playerEntity = new Player(player.id)
                playerEntity.setPosition(player.position)
                this.engine.players.push(playerEntity)
            })
            this.state = state
            return
        }

        if (!this.state) return console.log('no state to compare to yet')

        const playerDifference =
            state.players.length - this.state.players.length
        console.log('playerDifference', playerDifference)

        // case: adding player
        if (playerDifference > 0) {
            const missingPlayers = state.players.filter(
                (player: any) =>
                    !this.state.players.find((p: any) => p.id === player.id)
            )
            missingPlayers.forEach((player: any) => {
                const playerEntity = new Player(player.id)
                playerEntity.setPosition(player.position)
                this.engine.players.push(playerEntity)
            })

            // case: removing player
        } else if (playerDifference < 0) {
            const missingPlayers = this.state.players.filter(
                (player: any) =>
                    !state.players.find((p: any) => p.id === player.id)
            )

            console.log('removing players', missingPlayers)

            missingPlayers.forEach((player: any) => {
                const playerEntity = this.engine.players.find(
                    (p: any) => p.id === player.id
                )
                playerEntity.dispose()
                this.engine.players = this.engine.players.filter(
                    (p: any) => p.id !== player.id
                )
            })
        }
        this.state = state
    }
}
