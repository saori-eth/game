import express from 'express'
const app = express()
import { createServer } from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import { ServerService } from './server'

console.log('Setting up server...')

app.use(cors())
const server = createServer(app)
const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
})

const serverService = new ServerService(io)

app.get('/rooms', (req: any, res: any) => {
    let roomsArray: any[] = []
    serverService.rooms.forEach((game, roomId) => {
        roomsArray.push({ roomId, playerCount: game.getPlayerCount() })
    })
    res.send(roomsArray)
})

server.listen(4000)
