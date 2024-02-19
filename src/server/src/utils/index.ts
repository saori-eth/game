export const normalizeSpawnPoint = (x: number, z: number) => {
    let normalizedX = x >= 0 ? x - 0.5 : x + 0.5
    let normalizedY = z >= 0 ? z - 0.5 : z + 0.5
    return [normalizedX, normalizedY]
}

export const getSpawnPoint = (gridSize: { x: number; z: number }) => {
    let x = Math.floor(Math.random() * (gridSize.x * 2)) - gridSize.x
    let z = Math.floor(Math.random() * (gridSize.z * 2)) - gridSize.z
    return normalizeSpawnPoint(x, z)
}
