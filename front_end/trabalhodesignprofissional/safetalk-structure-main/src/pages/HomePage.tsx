import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmergencyButton } from "@/components/EmergencyButton";
import { 
  AlertCircle, 
  Phone, 
  Shield, 
  Heart,
  Users,
  MapPin
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const quickActions = [
    {
      title: "Fazer Denúncia",
      description: "Relate um caso de violência de forma segura",
      icon: AlertCircle,
      action: () => onNavigate("report"),
      variant: "default" as const,
    },
    {
      title: "Contatos de Emergência",
      description: "Acesse números importantes rapidamente",
      icon: Phone,
      action: () => onNavigate("contacts"),
      variant: "secondary" as const,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Segurança",
      description: "Suas informações são protegidas e confidenciais"
    },
    {
      icon: Heart,
      title: "Apoio",
      description: "Conectamos você com redes de suporte especializadas"
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Juntas somos mais fortes contra a violência"
    },
    {
      icon: MapPin,
      title: "Localização",
      description: "Encontre centros de apoio próximos a você"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background p-4 sm:p-6 lg:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="bg-primary/10 p-3 sm:p-4 rounded-full">
              <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            Você não está sozinha
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Uma plataforma segura para denunciar violência e encontrar apoio. 
            Sua segurança e privacidade são nossa prioridade.
          </p>
          
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 max-w-2xl mx-auto px-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow touch-manipulation" onClick={action.action}>
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <div className="flex justify-center mb-2">
                    <action.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">{action.title}</CardTitle>
                  <CardDescription className="text-sm">{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant={action.variant} className="w-full h-11" onClick={action.action}>
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-4 sm:p-6 lg:p-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-foreground mb-8 sm:mb-12 px-4">
            Como podemos ajudar
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-base sm:text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-xs sm:text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="bg-muted/30 p-4 sm:p-6 lg:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            Em caso de emergência
          </h2>
          <p className="text-muted-foreground mb-4 sm:mb-6 px-4 text-sm sm:text-base">
            Se você está em perigo imediato, não hesite em buscar ajuda
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <EmergencyButton size="lg" />
            <Button variant="outline" size="lg" onClick={() => onNavigate("contacts")} className="h-11">
              <Phone className="h-5 w-5 mr-2" />
              Outros Contatos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}