import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks/use-user";
import { useState } from "react";

export const ButtonCopyProfile = () => {
    const [isCopied, setIsCopied] = useState(false);
    const { user } = useUserInfo();

    if (!user) return null

    const copyProfile = () => {
        const url = `${window.location.origin}/${user.username}`;

        navigator.clipboard.writeText(url);

        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 6000);
    }

    return (
        <div className="mt-4 border border-neutral-200 rounded-md p-2 flex flex-row justify-between items-center cursor-pointer" onClick={copyProfile}>
            <span className="text-sm">
                {window.location.origin}/{user?.username}
            </span>

            <Button>
                {isCopied ? "Copied! 🔥" : "Copy Link"}
            </Button>
        </div>
    )
}