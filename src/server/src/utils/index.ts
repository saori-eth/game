import { PlayerPosition, PlayerRotation } from 'shared/dist/Player'

interface SpawnPoint {
    position: PlayerPosition
    rotation: PlayerRotation
}
export const getSpawnPoint = (gridSize: {
    x: number
    z: number
}): SpawnPoint => {
    let x = Math.floor(Math.random() * (gridSize.x * 2)) - gridSize.x
    let z = Math.floor(Math.random() * (gridSize.z * 2)) - gridSize.z
    return {
        position: [x, 0, z],
        rotation: [0, 0, 0, 'XYZ'],
    }
}
