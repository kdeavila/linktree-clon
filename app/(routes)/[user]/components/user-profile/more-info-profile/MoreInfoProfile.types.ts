import { Link, User } from "@prisma/client"

export type MoreInfoProfileProps = {
    user: User & { Links: Link[] }
}