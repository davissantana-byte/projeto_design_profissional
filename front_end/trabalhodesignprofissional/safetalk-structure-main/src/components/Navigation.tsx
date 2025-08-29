import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Phone, 
  AlertCircle, 
  User, 
  Shield,
  Menu,
  X
} from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Início", icon: Home },
    { id: "report", label: "Denunciar", icon: AlertCircle },
    { id: "contacts", label: "Emergência", icon: Phone },
    { id: "profile", label: "Perfil", icon: User },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-card border-b border-border sticky top-0 z-50 safe-area-top">
        <div className="flex items-center justify-between p-3 min-h-[56px]">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">Flo</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-border bg-card">
            <nav className="p-3 space-y-1" role="navigation" aria-label="Menu principal">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start h-12 text-base"
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  aria-current={currentPage === item.id ? "page" : undefined}
                >
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border min-h-screen">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Flo</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1" role="navigation" aria-label="Menu principal">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "secondary" : "ghost"}
              className="w-full justify-start h-11"
              onClick={() => onNavigate(item.id)}
              aria-current={currentPage === item.id ? "page" : undefined}
            >
              <item.icon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
              {item.label}
            </Button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-border">
          <Button variant="emergency" className="w-full" size="lg">
            <Phone className="h-5 w-5 mr-2" />
            Emergência 190
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 safe-area-bottom" 
        role="navigation" 
        aria-label="Navegação inferior"
      >
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "secondary" : "ghost"}
              className="flex-col h-full rounded-none border-0 text-xs gap-1 px-1"
              onClick={() => onNavigate(item.id)}
              aria-current={currentPage === item.id ? "page" : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="truncate text-[10px] leading-tight">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </>
  );
}