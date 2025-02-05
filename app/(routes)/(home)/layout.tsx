import { AdminSidebar } from "@/components/shared"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full h-fulll min-h-screen">
        {children}
      </main>
    </SidebarProvider>
  )
}
