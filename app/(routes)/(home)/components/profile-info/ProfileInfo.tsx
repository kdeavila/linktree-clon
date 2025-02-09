import { ProfileImage } from "./profile-image";
import { ProfileInfoProps } from "./ProfileInfo.types"
import { BlockInfo } from "./block-info";
import { EditBackground } from "./edit-background";
import { AddLinkForm } from "../add-link-form/AddLinkForm";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useUserInfo } from "@/hooks/use-user";

export const ProfileInfo = (props: ProfileInfoProps) => {
    const { onReload } = props;
    const { user } = useUserInfo();

    if (!user) return null

    const url = `${window.location.origin}/${user.username}`;

    return (
        <div className="mt-6">
            <div className="flex justify-between">
                <div className="flex flex-row gap-4">
                    <ProfileImage />
                    <BlockInfo />
                </div>

                <div className="flex items-center">
                    <EditBackground onReload={onReload} />
                </div>
            </div>


            <div className="flex flex-col gap-2 mt-6 md:flex-row">
                <AddLinkForm onReload={onReload} />

                <Button variant="outline" className="order-1 md:order-2">
                    <a href={url} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                        <Eye strokeWidth="2" className="size-4" />
                        <span className="text-sm font-semibold">See your profile</span>
                    </a>
                </Button>
            </div>
        </div>
    )
}