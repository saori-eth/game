import { EngineService } from '..'
import { PlayerEntity } from '../entities'

export interface ControlInterface {
    w: boolean
    a: boolean
    s: boolean
    d: boolean
    movementX: number
    movementY: number
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
            movementX: 0,
            movementY: 0,
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
        this.engine.canvas.addEventListener('click', () => {
            this.engine.canvas.requestPointerLock()
        })
        this.engine.canvas.addEventListener('mousemove', (e) => {
            if (!this.isCanvasInPoinerLock()) return
            this.onMouseMove(e)
        })
    }
    isCanvasInPoinerLock() {
        return document.pointerLockElement === this.engine.canvas
    }
    onMouseMove(event: MouseEvent) {
        this.controls.movementX = event.movementX
        this.controls.movementY = event.movementY
    }
    update() {
        const player = this.engine.players.find(
            (player) => player.id === this.engine.multiplayerSystem.id
        )
        if (!player) return console.log('no player found')
        player.setInputs(this.controls)
    }
}
