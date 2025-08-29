import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface EmergencyButtonProps {
  variant?: "fixed" | "inline";
  size?: "sm" | "default" | "lg";
}

export function EmergencyButton({ variant = "inline", size = "default" }: EmergencyButtonProps) {
  const handleEmergencyCall = () => {
    // Em um app real, isso abriria o discador ou faria uma chamada
    alert("Discando 190...\nEm caso de emergência real, ligue para a polícia.");
  };

  if (variant === "fixed") {
    return (
      <Button
        variant="emergency"
        size="icon"
        className="fixed bottom-20 right-4 lg:bottom-6 h-14 w-14 rounded-full shadow-lg z-30 safe-area-bottom"
        onClick={handleEmergencyCall}
        aria-label="Ligar para emergência 190"
      >
        <Phone className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Button
      variant="emergency"
      size={size}
      onClick={handleEmergencyCall}
      className="shadow-md"
    >
      <Phone className="h-5 w-5 mr-2" />
      Emergência 190
    </Button>
  );
}