import { useUserInfo } from "@/hooks/use-user";
import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, ImagePlus, LogOut } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { EditBackgroundProps } from "./EditBackground.types";
import { toast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";

export const EditBackground = (props: EditBackgroundProps) => {
    const { onReload } = props;
    const [showDialog, setShowDialog] = useState(false);
    const [photoUrl, setPhotoUrl] = useState("");
    const { reloadUser } = useUserInfo();

    const onChangeBackground = async () => {
        await axios.patch("/api/update-user", {
            backgroundImage: photoUrl
        });
        toast({
            title: '✅ Profile background updated successfully',
        })
        reloadUser();
        setShowDialog(false);
        onReload(true);
        setPhotoUrl("");
    }

    return (
        <Dialog open={showDialog} onOpenChange={(isOpen) => {
            setShowDialog(isOpen);
            if (!isOpen) setPhotoUrl("")
        }}>
            <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-md border border-neutral-300">
                    <Ellipsis />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer">
                        <DialogTrigger>
                            <div className="flex items-center gap-2">
                                <ImagePlus strokeWidth="1.5" size={18} />
                                <span className="text-sm">Change background</span>
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer">
                        <SignOutButton redirectUrl="/sign-in">
                            <div className="flex items-center gap-2">
                                <LogOut strokeWidth="1.5" size={18} />
                                Sign out
                            </div>
                        </SignOutButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change background</DialogTitle>
                    <div className="py-4">
                        {photoUrl ? (
                            <div className="w-full">
                                <p className="text-sm text-neutral-600 mb-2">
                                    You are about to change your profile background
                                </p>
                                <Image
                                    src={photoUrl}
                                    alt="Profile background"
                                    width={300}
                                    height={300}
                                    className="w-full max-w-56 aspect-auto object-cover rounded-md"
                                />
                            </div>
                        ) : (
                            <UploadButton
                                className="flex flex-col items-center justify-center gap-1 custom-class rounded-md border text-neutral-950 hover:bg-neutral-100 transition-colors border-neutral-200 h-full w-full"
                                endpoint="profileImage"
                                onClientUploadComplete={(res) => {
                                    setPhotoUrl(res?.[0].url);
                                }}
                                onUploadError={(error: Error) => {
                                    console.error('Upload failed:', error)
                                }}
                            />
                        )}
                    </div>

                    <Button
                        className="w-full"
                        onClick={onChangeBackground}
                        disabled={!photoUrl} >
                        Change background
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog >

    )
}