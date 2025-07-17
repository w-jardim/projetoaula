export const environment = {
  production: false,
  supabase: {
    url: 'https://seu-projeto.supabase.co',
    anonKey: 'sua-chave-publica-aqui'
  },
  app: {
    name: 'ServControl - Agentes de Segurança',
    version: '1.0.0',
    theme: 'security',
    description: 'Sistema de controle de escalas para agentes de segurança pública'
  },
  features: {
    enableOffline: true,
    enablePush: true,
    enableAnalytics: false,
    enableGeolocation: true,
    enableEmergencyMode: true
  }
};
