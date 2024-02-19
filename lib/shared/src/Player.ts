import type { Vector3 } from 'three'

export class Player {
    public id: string
    public position: null | Vector3

    constructor(id: string) {
        this.id = id
        this.position = null
    }

    public setPosition(position: Vector3): void {
        this.position = position
    }
}
