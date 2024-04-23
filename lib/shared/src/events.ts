import { PlayerPosition, PlayerRotation } from './Player'
export const CONNECTION_ESTABLISHED = 'connection_established'
export interface ConnectionEstablishedEventPayload {
    id: string
    tickRate: number
}

export const PLAYER_UPDATE = 'player_update'
export interface PlayerUpdateEventPayload {
    id: string
    position: PlayerPosition
    rotation: PlayerRotation
}
