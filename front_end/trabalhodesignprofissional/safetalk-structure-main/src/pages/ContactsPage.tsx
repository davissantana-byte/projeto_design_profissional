import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  MessageCircle, 
  Globe, 
  Clock,
  Shield,
  Heart,
  Scale,
  Users
} from "lucide-react";

export function ContactsPage() {
  const emergencyContacts = [
    {
      name: "Polícia Militar",
      number: "190",
      description: "Emergências policiais em geral",
      available: "24 horas",
      icon: Shield,
      variant: "emergency" as const,
    },
    {
      name: "Central de Atendimento à Mulher",
      number: "180",
      description: "Orientação e denúncias de violência contra a mulher",
      available: "24 horas",
      icon: Heart,
      variant: "default" as const,
    },
    {
      name: "Disque Direitos Humanos",
      number: "100",
      description: "Denúncias de violações de direitos humanos",
      available: "24 horas",
      icon: Scale,
      variant: "secondary" as const,
    },
  ];

  const supportServices = [
    {
      name: "Casa da Mulher Brasileira",
      description: "Atendimento humanizado e acolhimento",
      contact: "Centro de Referência",
      type: "Presencial",
      icon: Users,
    },
    {
      name: "Defensoria Pública",
      description: "Assistência jurídica gratuita",
      contact: "Procure a unidade mais próxima",
      type: "Presencial/Online",
      icon: Scale,
    },
    {
      name: "CAPS - Centro de Atenção Psicossocial",
      description: "Apoio psicológico especializado",
      contact: "SUS - Sistema Único de Saúde",
      type: "Presencial",
      icon: Heart,
    },
    {
      name: "ONG Instituto Maria da Penha",
      description: "Informações e orientações",
      contact: "Site: institutomariadalenha.org.br",
      type: "Online",
      icon: Globe,
    },
  ];

  const handleCall = (number: string, name: string) => {
    // Em um app real, isso iniciaria uma chamada
    alert(`Discando para ${name} (${number})...\nEm um app real, isso abriria o discador.`);
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Phone className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Contatos de Emergência
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base px-2">
            Números importantes para situações de emergência e apoio
          </p>
        </div>

        {/* Emergency Numbers */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Emergência
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-2">
                    <contact.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <CardDescription className="text-sm">{contact.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="text-2xl font-bold text-primary">
                    {contact.number}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {contact.available}
                  </div>
                  <Button 
                    variant={contact.variant}
                    className="w-full"
                    onClick={() => handleCall(contact.number, contact.name)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Services */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Rede de Apoio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription className="mt-1">{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Contato: </span>
                      {service.contact}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Tipo: </span>
                      {service.type}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Dicas de Segurança
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Como buscar ajuda com segurança</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Em casa:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Use modo privado/anônimo no navegador</li>
                    <li>• Tenha sempre um plano de fuga</li>
                    <li>• Mantenha documentos em local seguro</li>
                    <li>• Confie em pessoas próximas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Ao sair:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Informe alguém de confiança sobre seus planos</li>
                    <li>• Tenha sempre dinheiro e celular carregado</li>
                    <li>• Conheça os locais de apoio na sua região</li>
                    <li>• Memorize números de emergência</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}