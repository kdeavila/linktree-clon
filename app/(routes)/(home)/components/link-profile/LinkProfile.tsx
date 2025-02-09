"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useUserInfo } from "@/hooks/use-user";
import confetti from "canvas-confetti";
import { useState } from "react";

export const LinkProfile = () => {
    const [isCopied, setIsCopied] = useState(false);
    const { user } = useUserInfo();

    if (!user) return null;

    const copyToClipboard = () => {
        const url = `${window.location.origin}/linktree`;
        navigator.clipboard.writeText(url);
        setIsCopied(true);

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.3 }
        });


        toast({
            title: "✅ Link copied to clipboard!",
        })
        setTimeout(() => setIsCopied(false), 4000);
    };

    return (
        <div className="flex flex-col p-4 rounded-md border border-neutral-300 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex flex-col text-left mb-2 md:mb-0 lg:flex-row lg:items-center lg:gap-1">
                <span className="font-semibold">Your LinkTree is live:</span>
                <p className="text-sm">{window.location.origin}/{user.username}</p>
            </div>

            <Button className="w-full sm:w-auto" onClick={copyToClipboard}>{isCopied ? "Copied! 🎉" : "Copy LinkTree URL"}</Button>
        </div>
    );
};
