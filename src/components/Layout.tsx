
import { ReactNode } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { MoveRight, Home, Database, FileCode, Shield, ExternalLink } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-500" />
              <span className="font-bold text-lg">Solana Security Arena</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/">
                    <Home />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/nft-metadata">
                    <FileCode />
                    <span>NFT Metadata (SSRF)</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/transactions">
                    <Database />
                    <span>Transactions (IDOR)</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="https://github.com/your-username/solana-vuln-arena" target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    <span>GitHub</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarRail />
        <SidebarInset className="overflow-auto">
          <header className="bg-card border-b border-border h-12 flex items-center pl-4 sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 font-medium">Solana Security Lab</div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
