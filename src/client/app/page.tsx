'use client'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Join } from '@/components/Join'
import { Game } from '@/components/Game'

export default function Home() {
    const [room, setRoom] = useState<string>('')

    return (
        <>
            {!room && <Join setRoom={setRoom} />}
            {room && <Game room={room} />}
        </>
    )
}
