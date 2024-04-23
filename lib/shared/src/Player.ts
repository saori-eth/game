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
        this.position = position
    }

    public setRotation(rotation: PlayerRotation): void {
        this.rotation = rotation
    }

    public serialize(): {
        id: string
        position: PlayerPosition
        rotation: PlayerRotation
    } {
        if (!this.position || !this.rotation)
            throw new Error('Player not fully initialized')
        return {
            id: this.id,
            position: this.position,
            rotation: this.rotation,
        }
    }
}
