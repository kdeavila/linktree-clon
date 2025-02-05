"use client"
import { TreePalm } from "lucide-react";
import { HandlerSteps, LinkProfile, ProfileInfo } from "./components";
import { useUser } from "@clerk/nextjs";
import { Link, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { LoaderProfile } from "@/components/shared";
import { StepConfigUserProvider, UserProvider } from "@/contexts";
import { ProfilePreview } from "./components/profile-preview";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ListSocialNetworks } from "./components/list-social-networks";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    const [reload, setReload] = useState(false);
    const [infoUser, setInfoUser] = useState<(User & { Links: Link[] }) | null>(null);

    useEffect(() => {
        const checkFirstLogin = async () => {
            const response = await fetch("/api/info-user");
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
            <StepConfigUserProvider>
                <HandlerSteps onReload={() => setReload(true)} />
            </StepConfigUserProvider>
        );
    }

    return (
        <UserProvider>
            <article className="grid grid-cols-1 md:grid-cols-[60%_auto] gap-4">
                <div className="w-full flex flex-col p-4">
                    <div className="flex items-center mb-2">
                        <SidebarTrigger />
                    </div>

                    <LinkProfile />

                    <ProfileInfo onReload={setReload} />

                    {infoUser.Links.length > 0 ? (
                        <ListSocialNetworks links={infoUser.Links} onReload={setReload} />
                    ) : (
                        <div className="flex flex-col items-center mt-20">
                            <div className="py-10 text-center flex flex-col items-center text-neutral-400 font-semibold">
                                <TreePalm className="size-20" strokeWidth={1} />
                                <p>Show the world who you are</p>
                                <p>Add a link to get started.</p>
                            </div>
                        </div>
                    )}
                </div>

                <ProfilePreview />
            </article>
            {children}
        </UserProvider >
    );
}