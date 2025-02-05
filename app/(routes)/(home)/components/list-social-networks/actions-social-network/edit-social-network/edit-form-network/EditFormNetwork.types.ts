import { Link } from "@prisma/client"

export type EditFormNetworkProps = {
    link: Link
    onReload: React.Dispatch<React.SetStateAction<boolean>>
    closeDialog: () => void
}