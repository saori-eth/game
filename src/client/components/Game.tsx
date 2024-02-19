import { EngineService } from './engine'
import { useEffect, useRef } from 'react'
import io from 'socket.io-client'

export const Game = ({ room }: any) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasRef.current) {
            const sock = io('http://localhost:4000')
            sock.emit('join_room', room)
            const engine = new EngineService({
                canvas: canvasRef.current,
                socket: sock,
            })

            return () => {
                engine.destroy()
            }
        }
    }, [])

    return <canvas ref={canvasRef} />
}
