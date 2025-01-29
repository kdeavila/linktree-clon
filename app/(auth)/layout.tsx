import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth page",
    description: "Auth page description",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 h-screen w-screen lg:grid-cols-2">
            <div className="flex items-center justify-center">
                {children}
            </div>

            <div className="h-full w-full hidden lg:block bg-neutral-800 bg-[url('/auth-bg.svg')] bg-center bg-no-repeat bg-cover" />
        </div>
    )
}