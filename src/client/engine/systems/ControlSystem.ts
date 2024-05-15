import { EngineService } from '..'
import { PlayerEntity } from '../entities'

export interface ControlInterface {
    w: boolean
    a: boolean
    s: boolean
    d: boolean
    shift: boolean
    space: boolean
    movementX: number
    movementY: number
    deltaY: number
}

export class ControlSystem {
    private engine: EngineService
    public controls: ControlInterface
    constructor(engine: EngineService) {
        this.engine = engine
        this.controls = {
            w: false,
            a: false,
            s: false,
            d: false,
            shift: false,
            space: false,
            movementX: 0,
            movementY: 0,
            deltaY: 0,
        }
        this.initListeners()
    }
    initListeners() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'w' || e.key === 'W') {
                this.controls.w = true
            }
            if (e.key === 'a' || e.key === 'A') {
                this.controls.a = true
            }
            if (e.key === 's' || e.key === 'S') {
                this.controls.s = true
            }
            if (e.key === 'd' || e.key === 'D') {
                this.controls.d = true
            }
            if (e.key === 'Shift') {
                this.controls.shift = true
            }
            if (e.key === ' ') {
                this.controls.space = true
            }
        })
        window.addEventListener('keyup', (e) => {
            if (e.key === 'w' || e.key === 'W') {
                this.controls.w = false
            }
            if (e.key === 'a' || e.key === 'A') {
                this.controls.a = false
            }
            if (e.key === 's' || e.key === 'S') {
                this.controls.s = false
            }
            if (e.key === 'd' || e.key === 'D') {
                this.controls.d = false
            }
            if (e.key === 'Shift') {
                this.controls.shift = false
            }
            if (e.key === ' ') {
                this.controls.space = false
            }
        })
        this.engine.canvas.addEventListener('click', () => {
            this.engine.canvas.requestPointerLock()
        })
        this.engine.canvas.addEventListener('mousemove', (e) => {
            if (!this.isCanvasInPoinerLock()) return
            this.onMouseMove(e)
        })
        this.engine.canvas.addEventListener('wheel', (e) => {
            if (!this.isCanvasInPoinerLock()) return
            this.onWheel(e)
        })
    }
    isCanvasInPoinerLock() {
        return document.pointerLockElement === this.engine.canvas
    }
    onWheel(event: WheelEvent) {
        this.controls.deltaY = event.deltaY
    }
    onMouseMove(event: MouseEvent) {
        this.controls.movementX = event.movementX
        this.controls.movementY = event.movementY
    }
    resetControls() {
        this.controls.movementX = 0
        this.controls.movementY = 0
        this.controls.deltaY = 0
    }
    update() {
        const player = this.engine.getLocalPlayer()
        if (!player) return
    }
}
