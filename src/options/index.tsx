import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { SettingsProvider } from "@/contexts/settings-context";
import { AppSidebar } from "@/options/app-sidebar";
import type { RouteKey } from "@/options/route";
import { DEFAULT_ROUTE, ROUTES_MAP } from "@/options/route";
import "@/style.css";
import { useEffect, useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<RouteKey>(DEFAULT_ROUTE);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || DEFAULT_ROUTE;
      setCurrentPage(
        ROUTES_MAP.hasOwnProperty(hash) ? (hash as RouteKey) : DEFAULT_ROUTE,
      );
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  const CurrentComponent = ROUTES_MAP[currentPage];
  return (
    <SettingsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="p-4">
            <CurrentComponent />
          </main>
          <Toaster richColors />
        </SidebarInset>
      </SidebarProvider>
    </SettingsProvider>
  );
}
