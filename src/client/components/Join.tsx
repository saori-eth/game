'use client'
import { env } from '@/env.mjs'
const { NEXT_PUBLIC_MODE, NEXT_PUBLIC_SERVER_IP } = env
console.log(`MODE: ${NEXT_PUBLIC_MODE}`)
const SERVER_BASE_URL =
    NEXT_PUBLIC_MODE === 'dev'
        ? 'http://localhost'
        : `http://${NEXT_PUBLIC_SERVER_IP}`

export const Join = ({ setRoom }: any) => {
    const handleClick = async () => {
        const response = await fetch(SERVER_BASE_URL + ':4000/rooms')
        const data = await response.json()
        if (data.length === 0) {
            setRoom(crypto.randomUUID())
        } else {
            // are there any rooms with less than 2 people?
            const availableRooms = data.filter(
                (room: any) => room.playerCount < 2
            )
            if (availableRooms.length === 0) {
                setRoom(crypto.randomUUID())
            } else {
                // join the first available room
                setRoom(availableRooms[0].roomId)
            }
        }
    }
    return (
        <>
            <button
                onClick={handleClick}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                Join
            </button>
        </>
    )
}
