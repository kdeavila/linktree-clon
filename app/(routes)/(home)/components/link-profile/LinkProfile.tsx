"use client"

import { PixelCanvas } from "@/components/shared/pixel-canvas";
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
        const url = `${window.location.origin}/${user.username}`;
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
        setTimeout(() => setIsCopied(false), 1000);
    };

    return (
        <div className="relative flex flex-col p-4 rounded-md border border-neutral-300 sm:flex-row sm:justify-between sm:items-center hover:border-neutral-400 transition-colors">
            <div className="w-max relative z-10 flex flex-col text-left mb-2 md:mb-0 lg:flex-row lg:items-center lg:gap-1">
                <span className="font-semibold">Your LinkTree is live:</span>
                <p className="text-sm">{window.location.origin}/{user.username}</p>
            </div>

            <Button className="relative w-full z-10 sm:w-auto" onClick={copyToClipboard}>{isCopied ? "Copied! 🎉" : "Copy LinkTree URL"}</Button>

            <div className="absolute inset-0 z-0" >
                <PixelCanvas />
            </div>
        </div>
    );
};
