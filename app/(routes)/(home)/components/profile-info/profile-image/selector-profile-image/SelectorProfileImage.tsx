import { useState } from "react";
import { SelectorProfileImageProps } from "./SelectorProfileImage.types"
import { TabSelector } from "./tab-selector";
import { TabUploadImage } from "./tab-upload-image";
import { TabDeleteImage } from "./tab-delete-image";

export const SelectorProfileImage = (props: SelectorProfileImageProps) => {
    const { setShowDialog } = props;
    const [showTab, setShowTab] = useState<"upload" | "delete" | null>(null);

    return <div className="pt-4">
        {!showTab && <TabSelector setShowTab={setShowTab} />}

        {showTab === "upload" && <TabUploadImage setShowDialog={setShowDialog} setShowTab={setShowTab} />}

        {showTab === "delete" && < TabDeleteImage setShowDialog={setShowDialog} setShowTab={setShowTab} />}
    </div>
}