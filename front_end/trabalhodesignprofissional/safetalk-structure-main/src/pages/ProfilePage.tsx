import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Shield, 
  Bell, 
  Lock,
  Phone,
  Mail,
  MapPin,
  Eye,
  EyeOff,
  LogOut
} from "lucide-react";

export function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [notifications, setNotifications] = useState({
    emergencyAlerts: true,
    reportUpdates: true,
    supportMessages: false,
  });
  const [profileData, setProfileData] = useState({
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 99999-9999",
    city: "São Paulo, SP",
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com segurança.",
    });
  };

  const handleDeleteAccount = () => {
    // Em um app real, isso abriria um modal de confirmação
    if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
      toast({
        title: "Conta excluída",
        description: "Sua conta foi removida com segurança.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Meu Perfil
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base px-2">
            Gerencie suas informações e configurações de privacidade
          </p>
        </div>

        {/* Personal Information */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle>Informações Pessoais</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancelar" : "Editar"}
              </Button>
            </div>
            <CardDescription>
              Suas informações são criptografadas e protegidas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Mostrar informações</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                >
                  {showPersonalInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {showPersonalInfo && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Cidade
                  </Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                {isEditing && (
                  <Button onClick={handleSaveProfile} className="w-full">
                    Salvar Alterações
                  </Button>
                )}
              </div>
            )}

            {!showPersonalInfo && (
              <div className="text-center py-8 text-muted-foreground">
                <Lock className="h-8 w-8 mx-auto mb-2" />
                <p>Informações ocultas por segurança</p>
                <p className="text-xs">Clique no ícone do olho para visualizar</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Configurações de Privacidade
            </CardTitle>
            <CardDescription>
              Controle como suas informações são utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="anonymous-reports">Denúncias Anônimas por Padrão</Label>
                  <p className="text-sm text-muted-foreground">
                    Seus relatos serão anônimos automaticamente
                  </p>
                </div>
                <Switch id="anonymous-reports" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-sharing">Compartilhar Dados para Estatísticas</Label>
                  <p className="text-sm text-muted-foreground">
                    Dados anonimizados para pesquisas de prevenção
                  </p>
                </div>
                <Switch id="data-sharing" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="location-tracking">Permitir Localização em Emergências</Label>
                  <p className="text-sm text-muted-foreground">
                    Facilita o envio de ajuda quando necessário
                  </p>
                </div>
                <Switch id="location-tracking" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>
              Escolha quais alertas você deseja receber
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emergency-alerts">Alertas de Emergência</Label>
                <p className="text-sm text-muted-foreground">
                  Notificações sobre situações de risco na sua região
                </p>
              </div>
              <Switch 
                id="emergency-alerts" 
                checked={notifications.emergencyAlerts}
                onCheckedChange={(checked) => setNotifications({...notifications, emergencyAlerts: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="report-updates">Atualizações de Denúncias</Label>
                <p className="text-sm text-muted-foreground">
                  Status dos seus relatos e processos
                </p>
              </div>
              <Switch 
                id="report-updates" 
                checked={notifications.reportUpdates}
                onCheckedChange={(checked) => setNotifications({...notifications, reportUpdates: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="support-messages">Mensagens de Apoio</Label>
                <p className="text-sm text-muted-foreground">
                  Conteúdo motivacional e dicas de segurança
                </p>
              </div>
              <Switch 
                id="support-messages" 
                checked={notifications.supportMessages}
                onCheckedChange={(checked) => setNotifications({...notifications, supportMessages: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
            <CardDescription>
              Ações irreversíveis - tenha cuidado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1">
                <LogOut className="h-4 w-4 mr-2" />
                Sair da Conta
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount} className="flex-1">
                Excluir Conta
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Ao excluir sua conta, todos os dados serão removidos permanentemente, 
              mas suas denúncias permanecerão nas autoridades para investigação.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}