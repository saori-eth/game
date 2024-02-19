
import { MultiplayerSystem } from './systems'
import type { Player } from 'shared'

interface EngineProps {
    canvas: HTMLCanvasElement
    socket: any
}

export class EngineService {
    public socket: any
    public serverState: any
    public multiplayerSystem: MultiplayerSystem
    public players: Player[] = []

    constructor(props: EngineProps) {
        this.socket = props.socket
        this.multiplayerSystem = new MultiplayerSystem(this)
        this.init()
    }

    public init(): void {
      // todo
    }

    public destroy(): void {
        this.socket.disconnect()
    }
}
