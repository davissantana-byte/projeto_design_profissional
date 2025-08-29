import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { EmergencyButton } from "./EmergencyButton";

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Navigation currentPage={currentPage} onNavigate={onNavigate} />
        
        <main className="flex-1 lg:ml-0" role="main">
          <div className="pb-16 lg:pb-0 min-h-screen">
            {children}
          </div>
        </main>
      </div>
      
      <EmergencyButton variant="fixed" />
    </div>
  );
}