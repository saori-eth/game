import { Player } from 'shared' // ? wtf
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
        player.setPosition(getSpawnPoint(this.gridSize))
    }

    getState() {
        return {
            players: this.players,
        }
    }
}
