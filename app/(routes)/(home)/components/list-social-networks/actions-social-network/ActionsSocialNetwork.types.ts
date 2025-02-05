import { Link } from "@prisma/client"

export type ActionsSocialNetworkProps = {
    link: Link,
    onReload: React.Dispatch<React.SetStateAction<boolean>>
}