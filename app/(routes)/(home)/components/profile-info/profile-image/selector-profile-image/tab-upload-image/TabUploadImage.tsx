import { useState } from "react";
import { TabUploadImageProps } from "./TabUploadImage.types"
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useUserInfo } from "@/hooks/use-user";
import { ArrowLeft } from "lucide-react";

export const TabUploadImage = (props: TabUploadImageProps) => {
    const { setShowDialog, setShowTab } = props;
    const [photo, setPhoto] = useState('')
    const { reloadUser } = useUserInfo();

    const onUploadPhoto = async () => {
        await axios.patch("/api/update-user", { avatarUrl: photo });

        setShowDialog(false);
        toast({
            title: '✅ Photo uploaded successfully',
        })

        reloadUser();
    }

    return (
        <div>
            <div className="mb-6">
                <p className="text-sm text-neutral-600 mb-2">Upload your profile image</p>
                <UploadButton
                    className="custom-class rounded-md border text-neutral-950 hover:bg-neutral-100 transition-colors border-neutral-200 h-full w-full"
                    endpoint="profileImage"
                    onClientUploadComplete={(res) => {
                        setPhoto(res?.[0].url);
                    }}
                    onUploadError={(error: Error) => console.error('Upload failed:', error)}
                />
            </div>

            <div className="grid grid-cols-1 gap-2">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowTab(null)}>
                    <ArrowLeft />
                    Back
                </Button>

                <Button
                    className="w-full"
                    onClick={onUploadPhoto}
                    disabled={!photo}
                >
                    Upload photo
                </Button>
            </div>
        </div>
    )
}