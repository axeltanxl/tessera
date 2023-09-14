'use client'

import { SessionProvider } from "next-auth/react"

const Provider = async ({children}) => {
    return (
        <SessionProvider >
            {children}
        </SessionProvider>
    )
}
export default Provider;