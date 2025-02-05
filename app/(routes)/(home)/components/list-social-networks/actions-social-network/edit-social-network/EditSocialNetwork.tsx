import { Edit } from "lucide-react"
import { EditSocialNetworkProps } from "./EditSocialNetwork.types"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react";
import { EditFormNetwork } from "./edit-form-network"

export const EditSocialNetwork = (props: EditSocialNetworkProps) => {
    const { link, onReload } = props;
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-100">
                <div className="flex flex-row items-center gap-2">
                    <Edit className="size-4" />
                    Edit
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Social Network</DialogTitle>
                </DialogHeader>

                <EditFormNetwork link={link} onReload={onReload} closeDialog={() => setOpenDialog(false)} />
            </DialogContent>
        </Dialog>
    )
}
