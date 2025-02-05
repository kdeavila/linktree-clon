import { Link, User } from "@prisma/client"
import { ReactNode } from "react"

export type UserContextType = {
    user: User | null,
    links: Link[] | null,
    isLoading: boolean,
    reloadUser: () => void
}

export type UserProviderProps = {
    children: ReactNode
}