import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  MapPin, 
  Calendar,
  AlertTriangle
} from "lucide-react";

export function ReportPage() {
  const { toast } = useToast();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    date: "",
    location: "",
    hasEvidence: false,
    needsHelp: false,
  });

  const violenceTypes = [
    "Violência Física",
    "Violência Psicológica",
    "Violência Sexual",
    "Violência Patrimonial",
    "Violência Moral",
    "Perseguição/Stalking",
    "Outro"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.type || !formData.description) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o tipo de violência e a descrição.",
        variant: "destructive",
      });
      return;
    }

    // Simular envio da denúncia
    toast({
      title: "Denúncia registrada",
      description: "Sua denúncia foi registrada com segurança. Protocolo: #" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    });

    // Limpar formulário
    setFormData({
      type: "",
      description: "",
      date: "",
      location: "",
      hasEvidence: false,
      needsHelp: false,
    });
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Fazer Denúncia
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base px-2">
            Suas informações são protegidas e tratadas com total confidencialidade
          </p>
        </div>

        {/* Security Notice */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              Sua Segurança é Prioridade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Seus dados são criptografados e protegidos</li>
              <li>• Você pode fazer denúncias anônimas</li>
              <li>• Informações são compartilhadas apenas com autoridades competentes</li>
              <li>• Você receberá acompanhamento do seu caso quando solicitado</li>
            </ul>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Anonimato */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isAnonymous ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                Privacidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="anonymous" 
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                />
                <Label htmlFor="anonymous">
                  Fazer denúncia anônima (recomendado para maior segurança)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Tipo de Violência */}
          <Card>
            <CardHeader>
              <CardTitle>Tipo de Violência *</CardTitle>
              <CardDescription>
                Selecione o tipo que melhor descreve a situação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de violência" />
                </SelectTrigger>
                <SelectContent>
                  {violenceTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Descrição */}
          <Card>
            <CardHeader>
              <CardTitle>Descrição do Ocorrido *</CardTitle>
              <CardDescription>
                Descreva o que aconteceu. Inclua detalhes que considerar importantes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Descreva a situação de violência..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>

          {/* Data e Local */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Data do Ocorrido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Local (Opcional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Cidade, bairro ou endereço"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </CardContent>
            </Card>
          </div>

          {/* Informações Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="evidence" 
                  checked={formData.hasEvidence}
                  onCheckedChange={(checked) => setFormData({...formData, hasEvidence: checked as boolean})}
                />
                <Label htmlFor="evidence">
                  Possuo evidências (fotos, mensagens, documentos)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="help" 
                  checked={formData.needsHelp}
                  onCheckedChange={(checked) => setFormData({...formData, needsHelp: checked as boolean})}
                />
                <Label htmlFor="help">
                  Gostaria de receber apoio psicológico ou jurídico
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Alerta de Emergência */}
          <Card className="border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
                Situação de Emergência?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Se você está em perigo imediato, não hesite em ligar para a polícia.
              </p>
              <Button variant="emergency" type="button" className="w-full">
                Ligar para 190 Agora
              </Button>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" className="flex-1" size="lg">
              Registrar Denúncia
            </Button>
            <Button type="button" variant="outline" size="lg">
              Salvar Rascunho
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}