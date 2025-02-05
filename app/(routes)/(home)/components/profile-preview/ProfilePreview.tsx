import { Lock } from "lucide-react"
import { ButtonsHeader } from "./button-header"
import { ButtonCopyProfile } from "./button-copy-profile"
import { PhonePreview } from "./phone-preview"

export const ProfilePreview = () => {

    return (
        <div className="border-l border-neutral-200 p-4">
            <ButtonsHeader />

            <ButtonCopyProfile />

            <PhonePreview />

            <div className="flex items-center justift-center mt-20 gap-2">
                <span className="text-sm semibold">Hide kdeavila</span>
                <Lock className="size-4" />
            </div>
        </div>
    )
}