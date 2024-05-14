import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    client: {
        NEXT_PUBLIC_MODE: z.enum(['dev', 'prod']),
        NEXT_PUBLIC_SERVER_IP: z.string(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_MODE: process.env.NEXT_PUBLIC_MODE,
        NEXT_PUBLIC_SERVER_IP: process.env.NEXT_PUBLIC_SERVER_IP,
    },
})
