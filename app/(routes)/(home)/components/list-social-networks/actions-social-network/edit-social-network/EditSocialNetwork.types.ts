import { Link } from "@prisma/client"

export type EditSocialNetworkProps = {
    link: Link,
    onReload: React.Dispatch<React.SetStateAction<boolean>>
}