import { Button } from "@/components/ui/button";
import { TabDeleteImageProps } from "./TabDeleteImage.types"
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useUserInfo } from "@/hooks/use-user";

export const TabDeleteImage = (props: TabDeleteImageProps) => {
    const { setShowDialog, setShowTab } = props;
    const { reloadUser } = useUserInfo();

    const onDeleteImage = async () => {
        
        await axios.patch("/api/update-user",
            { avatarUrl: "https://yu88eqe5p0.ufs.sh/f/Dk6Z3495qeoEFGWzdThdfcCSj8pVvGOEsAbzui56mWXk29r4" }
        );

        setShowDialog(false);
        toast({
            title: '✅ Profile image deleted successfully',
        })

        reloadUser()
    }

    return (
        <div>
            <div className="mb-6">
                <p className="text-sm text-neutral-600 mb-2">Are you sure you want to delete your profile image?</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowTab(null)}>
                    <ArrowLeft />
                    Cancel
                </Button>

                <Button
                    className="w-full"
                    onClick={onDeleteImage}
                >
                    Delete image
                </Button>
            </div>
        </div>
    )
}