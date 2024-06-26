import { Player, PlayerPosition, PlayerRotation } from 'shared' // ? wtf
import { getSpawnPoint } from '../utils'

export class Game {
    players: Player[]
    gridSize: { x: number; z: number }
    constructor() {
        this.players = []
        this.gridSize = { x: 3, z: 3 }
    }
    addPlayer(player: any) {
        this.players.push(player)
    }
    getPlayerCount() {
        return this.players.length
    }
    getSpawn(playerId: string) {
        const player = this.players.find((player) => player.id === playerId)
        const { position, rotation } = getSpawnPoint(this.gridSize)
        player.setPosition(position)
        player.setRotation(rotation)
    }

    updatePlayer(
        id: string,
        position: PlayerPosition,
        rotation: PlayerRotation
    ) {
        const player = this.players.find((player) => player.id === id)
        if (!player) return console.log(`Player ${id} not found in room`)
        player.setPosition(position)
        player.setRotation(rotation)
    }

    getState() {
        const players = this.players.map((player) => player.serialize())
        return { players }
    }
}
