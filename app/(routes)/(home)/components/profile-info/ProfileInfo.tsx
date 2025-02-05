import { ProfileImage } from "./profile-image";
import { ProfileInfoProps } from "./ProfileInfo.types"
import { BlockInfo } from "./block-info";
import { EditBackground } from "./edit-background";
import { AddLinkForm } from "../add-link-form/AddLinkForm";

export const ProfileInfo = (props: ProfileInfoProps) => {
    const { onReload } = props;

    return (
        <div className="mt-6">
            <div className="flex justify-between gap-2">
                <div className="flex flex-row gap-4">
                    <ProfileImage />
                    <BlockInfo />
                </div>

                <div className="flex items-center">
                    <EditBackground onReload={onReload} />
                </div>
            </div>

            <AddLinkForm onReload={onReload} />
        </div>
    )
}