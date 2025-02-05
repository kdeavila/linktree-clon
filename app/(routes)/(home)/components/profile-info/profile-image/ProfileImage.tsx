import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { useUserInfo } from "@/hooks/use-user";
import { Pencil } from "lucide-react";
import { SelectorProfileImage } from "./selector-profile-image";


export const ProfileImage = () => {
    const [showDialog, setShowDialog] = useState(false);
    const { user } = useUserInfo();

    if (!user) return null;

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger className="shrink-0">
                <div className="relative">
                    <Image src={user.avatarUrl || '/default-avatar.webp'} alt="Avatar" width={80} height={80} className="size-16 rounded-full aspect-square object-cover" />

                    <div className="bg-neutral-100 rounded-full flex items-center justify-center size-7 absolute right-[-5px] bottom-[-10px] border border-neutral-200">
                        <Pencil className="size-4 text-neutral-400" />
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modify profile image</DialogTitle>
                    <DialogDescription asChild>
                        <SelectorProfileImage setShowDialog={setShowDialog} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}