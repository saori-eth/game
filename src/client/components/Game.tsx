import { env } from '@/env.mjs'
const { NEXT_PUBLIC_MODE, NEXT_PUBLIC_SERVER_IP } = env
import { EngineService } from '../engine'
import { useEffect, useRef } from 'react'
import io from 'socket.io-client'

const SERVER_BASE_URL =
    NEXT_PUBLIC_MODE === 'dev'
        ? 'http://localhost'
        : `http://${NEXT_PUBLIC_SERVER_IP}`

export const Game = ({ room }: any) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasRef.current) {
            const sock = io(SERVER_BASE_URL + ':4000')
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
