import type { Vector3 } from 'three'

const Y_OFFSET = 0.5

export class Player {
    public id: string
    public position: null | Vector3

    constructor(id: string) {
        this.id = id
        this.position = null
    }

    public setPosition(position: Vector3): void {
        position.y = position.y + Y_OFFSET
        this.position = position
    }
}
