import { Vector3 } from 'three'
export const getSpawnPoint = (gridSize: { x: number; z: number }): Vector3 => {
    let x = Math.floor(Math.random() * (gridSize.x * 2)) - gridSize.x
    let z = Math.floor(Math.random() * (gridSize.z * 2)) - gridSize.z
    return new Vector3(x, 0, z)
}
