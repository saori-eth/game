import { PlayerPosition, PlayerRotation } from 'shared'
import * as THREE from 'three'

const HEIGHT_OFFSET = 0.5

export class PlayerEntity {
    id: string
    position: null | THREE.Vector3
    rotation: null | THREE.Euler
    mesh: null | THREE.Mesh

    constructor(id: string) {
        this.id = id
        this.position = null
        this.rotation = null
        this.mesh = null
    }

    setPosition(pos: THREE.Vector3) {
        this.position = pos
    }

    setPositionFromArray(pos: PlayerPosition) {
        this.position = new THREE.Vector3(pos[0], pos[1], pos[2])
    }

    setRotation(rot: THREE.Euler) {
        this.rotation = rot
    }

    setRotationFromArray(rot: PlayerRotation) {
        this.rotation = new THREE.Euler(rot[0], rot[1], rot[2])
    }

    updatePlayer(pos: PlayerPosition, rot: PlayerRotation) {
        this.setPositionFromArray(pos)
        this.setRotationFromArray(rot)
    }

    buildMesh(scene: THREE.Scene) {
        if (this.position) {
            const geometry = new THREE.BoxGeometry(1, 1, 1)
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
            this.mesh = new THREE.Mesh(geometry, material)
            this.mesh.position.set(
                this.position.x,
                this.position.y,
                this.position.z
            )
            scene.add(this.mesh)
        }
    }

    private eulerToQuaternion(euler: THREE.Euler): THREE.Quaternion {
        const quaternion = new THREE.Quaternion()
        quaternion.setFromEuler(euler)
        return quaternion
    }

    dispose() {
        if (this.mesh) {
            this.mesh.geometry.dispose()
            this.mesh.parent?.remove(this.mesh)
            this.mesh = null
            this.position = null
        }
    }

    update(delta?: number) {
        if (this.mesh && this.position && this.rotation) {
            if (delta) {
                const lerpFactor = 0.1 // This controls the rate of interpolation

                // Position Interpolation
                const targetPosition = new THREE.Vector3(
                    this.position.x,
                    this.position.y + HEIGHT_OFFSET,
                    this.position.z
                )
                this.mesh.position.lerp(targetPosition, lerpFactor)

                // Rotation Interpolation
                const targetQuaternion = this.eulerToQuaternion(this.rotation)
                this.mesh.quaternion.slerp(targetQuaternion, lerpFactor)
            } else {
                this.mesh.position.set(
                    this.position.x,
                    this.position.y + HEIGHT_OFFSET,
                    this.position.z
                )
                this.mesh.rotation.set(
                    this.rotation.x,
                    this.rotation.y,
                    this.rotation.z
                )
            }
        }
    }
}
