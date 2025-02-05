import { Link } from "@prisma/client"
import React from "react"

export type ListSocialNetworksProps = {
    links: Link[]
    onReload: React.Dispatch<React.SetStateAction<boolean>>
}