'use client'

const ENDPOINT = 'http://localhost:4000/rooms'

export const Join = ({ setRoom }: any) => {
    const handleClick = async () => {
        const response = await fetch(ENDPOINT)
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
            <button onClick={handleClick}>Join</button>
        </>
    )
}
