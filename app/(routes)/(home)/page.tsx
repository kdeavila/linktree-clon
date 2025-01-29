"use client"
import { TreePalm } from "lucide-react";
import { LinkProfile } from "./components";
import { useUser } from "@clerk/nextjs";
import { Link, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { LoaderProfile } from "@/components/shared";
import { Button } from "@/components/ui/button";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    const [reload, setReload] = useState(false);
    const [infoUser, setInfoUser] = useState<(User & { links: Link[] }) | null>(null);

    useEffect(() => {
        const checkFirstLogin = async () => {
            const response = await fetch("/api/info_user");
            const data = await response.json();
            setInfoUser(data);
            setIsFirstVisit(data.firstLogin);
        }

        checkFirstLogin();

        if (reload) {
            checkFirstLogin();
            setReload(false);
        }
    }, [user?.id, reload, user]);


    if (!user || !infoUser) {
        return <LoaderProfile />
    }

    if (isFirstVisit) {
        return (
            <article className="flex flex-col items-center justify-center py-64 text-center p-6">
                <h1 className="text-2xl font-bold">Welcome to Linktree Clone! 🎉</h1>
                <p className="my-4 max-w-xl text-balance">
                    We are excited to have you here. Customize your profile and share your links with the world.
                </p>
            </article >
        );
    }

    return (
        <section>
            <article className="grid grid-cols-1 md:grid-cols-[60%_auto] gap-4 px-4">
                <div>
                    <LinkProfile />

                    <div>
                        <p>Profile info... </p>
                    </div>

                    <div className="flex flex-col items-center mt-20">
                        <div className="py-10 text-center flex flex-col items-center text-neutral-400 font-semibold">
                            <TreePalm className="size-20" strokeWidth={1} />
                            <p>Show the world who you are</p>
                            <p>Add a link to get started.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p>Profile preview... </p>
                </div>
            </article>
            {children}
        </section >
    );
}