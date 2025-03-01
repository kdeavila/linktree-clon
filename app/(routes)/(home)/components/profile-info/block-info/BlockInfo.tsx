import { useUserInfo } from "@/hooks/use-user"
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormInfo } from "./form-info";

export const BlockInfo = () => {
    const { user} = useUserInfo();
        
    const [openDialog, setOpenDialog] = useState(false);

    if (!user) return null

    return (
        <div className="flex items-center">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger className="text-left" >
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold">{user.name}</span>
                        <span className="text-sm text-neutral-600">Edit profile</span>
                    </div>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="mb-4">Display name, username, and bio</DialogTitle>
                        <DialogDescription asChild>
                            <FormInfo setOpenDialog={setOpenDialog} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}