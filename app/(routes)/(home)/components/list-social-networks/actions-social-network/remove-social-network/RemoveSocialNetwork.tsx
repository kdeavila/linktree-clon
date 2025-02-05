import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { RemoveSocialNetworkProps } from "./RemoveSocialNetwork.types";
import { useUserInfo } from "@/hooks/use-user";
import { toast } from "@/hooks/use-toast";

export const RemoveSocialNetwork = (props: RemoveSocialNetworkProps) => {
    const { link, onReload } = props;
    const { reloadUser } = useUserInfo();

    const [showDialog, setShowDialog] = useState(false);

    const onDelete = async () => {
        await axios.delete(`/api/social-network/${link.id}`);
        onReload(true);
        setShowDialog(false);
        reloadUser();

        toast({
            title: "✅ Social network removed successfully",
        })
    }

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-100">
                <div className="flex flex-row items-center gap-2">
                    <Trash2 className="size-4" />
                    Remove
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remove Social Network</DialogTitle>
                    <DialogDescription >
                        Are you sure you want to remove this social network?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <div className="w-full flex flex-col gap-2">
                        <Button className="w-full" variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>

                        <Button className="w-full" onClick={onDelete}>Remove</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}