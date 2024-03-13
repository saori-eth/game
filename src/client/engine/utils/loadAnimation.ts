import { AnimationAction, AnimationMixer } from 'three'
import { MIXAMO } from '.'
import type { VRM } from '@pixiv/three-vrm'

export interface Animations {
    name: string
    action: AnimationAction
}

export const loadAnimations = async (
    avatar: VRM,
    mixer: AnimationMixer,
    urls: string[],
    callback?: () => void
): Promise<Animations[]> => {
    const animations: Animations[] = []

    for (const url of urls) {
        const name = url.split('/').pop()?.split('.')[0] as string
        const clip = await MIXAMO.loadAnim(url, avatar)
        const action = mixer.clipAction(clip as THREE.AnimationClip)
        animations.push({ name, action })
    }

    if (callback) callback()
    return animations
}
