import { PlayerPosition } from 'shared/dist/Player'
export const getSpawnPoint = (gridSize: {
    x: number
    z: number
}): PlayerPosition => {
    let x = Math.floor(Math.random() * (gridSize.x * 2)) - gridSize.x
    let z = Math.floor(Math.random() * (gridSize.z * 2)) - gridSize.z
    return [x, 0, z]
}
