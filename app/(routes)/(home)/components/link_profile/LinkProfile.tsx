"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export const LinkProfile = () => {
    const [isCopied, setIsCopied] = useState(false);
    const copyToClipboard = () => {
        const url = `${window.location.origin}/linktree`;
        navigator.clipboard.writeText(url);

        setIsCopied(true);
    }
    return (
        <div className="bg-neutral-200 rounded-3xl">
            <div className="flex flex-col items-center text-center justify-center p-4 gap-2 md:flex-row md:justify-between md:text-left">
                <span className="text-sm">
                    <span>🔥 Your LinkTree Clone is live: </span>
                    {window.location.origin}/
                </span >

                <Button variant="outline" className="rounded-full bg-neutral-100 font-semibold text-xs md:text-base" onClick={copyToClipboard}>{isCopied ? "Copied! 🎉" : "Copy LinkTree URL"}</Button>
            </div>
        </div>
    )
}  