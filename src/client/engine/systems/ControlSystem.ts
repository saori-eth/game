import { EngineService } from '..'
import { PlayerEntity } from '../entities'

export interface ControlInterface {
    w: boolean
    a: boolean
    s: boolean
    d: boolean
}

export class ControlSystem {
    private engine: EngineService
    private controls: ControlInterface
    constructor(engine: EngineService) {
        this.engine = engine
        this.controls = {
            w: false,
            a: false,
            s: false,
            d: false,
        }
        this.initListeners()
    }
    initListeners() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'w':
                    this.controls.w = true
                    break
                case 'a':
                    this.controls.a = true
                    break
                case 's':
                    this.controls.s = true
                    break
                case 'd':
                    this.controls.d = true
                    break
            }
        })
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'w':
                    this.controls.w = false
                    break
                case 'a':
                    this.controls.a = false
                    break
                case 's':
                    this.controls.s = false
                    break
                case 'd':
                    this.controls.d = false
                    break
            }
        })
    }
    update() {
        const player = this.engine.players.find(
            (player) => player.id === this.engine.multiplayerSystem.id
        )
        if (!player) return console.log('no player found')
        player.setInputs(this.controls)
    }
}
