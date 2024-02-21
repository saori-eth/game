import { Player } from 'shared'
import type { ControlInterface } from '../systems/ControlSystem'
import * as THREE from 'three'

export class PlayerEntity extends Player {
    mesh: null | THREE.Mesh
    inputs: null | ControlInterface

    constructor(id: string) {
        super(id)
        this.mesh = null
        this.inputs = null
    }

    setInputs(inputs: ControlInterface) {
        this.inputs = inputs
    }

    buildMesh(scene: THREE.Scene) {
        if (this.position) {
            console.log('Building mesh for player', this.id)
            console.log('location', this.position)
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
