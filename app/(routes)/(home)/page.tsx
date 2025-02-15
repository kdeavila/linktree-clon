"use client"
import { HandlerSteps, LinkProfile, ProfileInfo } from "./components";
import { useUser } from "@clerk/nextjs";
import { Link, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { StepConfigUserProvider, UserProvider } from "@/contexts";
import { ProfilePreview } from "./components/profile-preview";
import { ListSocialNetworks } from "./components/list-social-networks";
import { SkeletonProfile } from "./components/skeleton-profile";

export default function HomePage() {
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
        return <SkeletonProfile />
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
            <article className="grid grid-cols-1 md:grid-cols-[60%_auto] xl:grid-cols-[70%_auto]">
                <div className="w-full flex flex-col p-6">
                    <LinkProfile />
                    <ProfileInfo onReload={setReload} />

                    <ListSocialNetworks links={infoUser.Links} onReload={setReload} />
                </div>

                <ProfilePreview />
            </article>
        </UserProvider >
    );
}