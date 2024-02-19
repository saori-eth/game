export class Player {
    public id: string
    public position: null | any

    constructor(id: string) {
        this.id = id
        this.position = null
    }

    public setPosition(position: any): void {
        // todo
    }

    public dispose(): void {
    }
}
