import { Game } from './Game'
import { Player, EVENTS } from 'shared'

export class ServerService {
    io: any
    rooms: Map<any, any> = new Map()
    tickRate: number = 5
    updateInterval: NodeJS.Timeout | undefined = undefined
    clientMessages: any[] = []

    constructor(io: any) {
        this.io = io
        io.on('connection', (socket: any) => {
            this.onConnection(socket)
        })

        this.startGameLoop()
    }

    startGameLoop() {
        this.updateInterval = setInterval(() => {
            this.rooms.forEach((game, roomId) => {
                const gameState = game.getState()
                this.io.to(roomId).emit('game_state', gameState)
            })
        }, 1000 / this.tickRate)
    }

    onConnection(socket: any) {
        const { id } = socket

        // Send connection established event to client
        socket.emit(EVENTS.CONNECTION_ESTABLISHED, {
            id: id,
            tickRate: this.tickRate,
        })

        // Handle room creation or joining
        socket.on('join_room', (roomId: any) => {
            socket.join(roomId)
            let game =
                this.rooms.get(roomId) ||
                this.rooms.set(roomId, new Game()).get(roomId)
            game.addPlayer(new Player(id))
            game.getSpawn(id)
            this.io.to(roomId).emit('room_details', { roomId, gameState: game })
            console.log(`Player ${id} joined room ${roomId}`)
        })

        socket.on('disconnect', () => {
            this.rooms.forEach((game, roomId) => {
                const playerIndex = game.players.findIndex(
                    (player) => player.id === id
                )
                if (playerIndex !== -1) game.players.splice(playerIndex, 1)
                if (game.getPlayerCount() === 0) this.rooms.delete(roomId)
            })
            console.log(`Player ${id} disconnected`)
        })

        socket.on(
            EVENTS.PLAYER_UPDATE,
            (data: EVENTS.PlayerUpdateEventPayload) => {
                const { id, position, rotation } = data
                this.rooms.forEach((game, roomId) => {
                    game.updatePlayer(id, position, rotation)
                })
            }
        )
    }
}
