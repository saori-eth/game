import type { ControlInterface } from '../systems/ControlSystem'
import * as THREE from 'three'

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

    setRotation(rot: THREE.Euler) {
        this.rotation = rot
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

    dispose() {
        if (this.mesh) {
            this.mesh.geometry.dispose()
            this.mesh.parent?.remove(this.mesh)
            this.mesh = null
            this.position = null
        }
    }
}
