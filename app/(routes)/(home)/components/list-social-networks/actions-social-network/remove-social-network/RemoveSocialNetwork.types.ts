import { Link } from "@prisma/client"
import React from "react"

export type RemoveSocialNetworkProps = {
    link: Link,
    onReload: React.Dispatch<React.SetStateAction<boolean>>
}