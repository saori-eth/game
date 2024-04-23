import type { Vector3 } from 'three'

const Y_OFFSET = 0.5
export type PlayerPosition = [number, number, number]
export type PlayerRotation = [number, number, number, 'XYZ']
export class Player {
    public id: string
    public position: null | PlayerPosition
    public rotation: null | PlayerRotation

    constructor(id: string) {
        this.id = id
        this.position = null
    }

    public setPosition(position: PlayerPosition): void {
        position[1] += Y_OFFSET
        this.position = position
    }

    public setRotation(rotation: PlayerRotation): void {
        this.rotation = rotation
    }
}
