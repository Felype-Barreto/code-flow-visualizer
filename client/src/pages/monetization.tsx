import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout';
import { Crown, Coins, Zap, Check, TrendingUp, Gift, PlayCircle, Lock, Code2, Search, Activity, Target, Award, Sparkles, BarChart3, Database, PauseCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AdVideoPlayer } from '../components/ad-video-player';
import { AdStatsWidget } from '../components/ad-stats-widget';
import { initAdSense } from '@/lib/adsense';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'subscription' | 'coins' | 'premium';
  items: string[];
  popular?: boolean;
  icon: any;
  coins?: number;
  duration?: string;
}

const PACKAGES: Package[] = [
  {
    id: 'pro_monthly',
    name: 'Pro Mensal',
    description: 'Acesso completo ao Code Flow',
    price: 1990,
    currency: 'BRL',
    type: 'subscription',
    duration: '1 mês',
    icon: Crown,
    popular: true,
    items: [
      'Uso ilimitado de todas features',
      'Acesso a todos os desafios Expert',
      'Sem anúncios',
      '2x XP em todas atividades',
      'Avatar e badges exclusivos',
      'Suporte prioritário',
    ],
  },
  {
    id: 'pro_yearly',
    name: 'Pro Anual',
    description: 'Economize 40% no plano anual',
    price: 14390,
    currency: 'BRL',
    type: 'subscription',
    duration: '1 ano',
    icon: Crown,
    items: [
      'Todos os benefícios Pro',
      'Economize R$ 9,50/mês',
      'Avatar exclusivo Anual',
      'Badge de fundador',
      'Acesso antecipado a features',
    ],
  },
  {
    id: 'coins_100',
    name: '100 FlowCoins',
    description: 'Pacote básico de moedas',
    price: 490,
    currency: 'BRL',
    type: 'coins',
    coins: 100,
    icon: Coins,
    items: [
      '100 FlowCoins',
      'Compre hints e soluções',
      'Desbloqueia avatares',
      'Sem expiração',
    ],
  },
  {
    id: 'coins_500',
    name: '500 FlowCoins',
    description: '+50 coins bônus',
    price: 1990,
    currency: 'BRL',
    type: 'coins',
    coins: 550,
    icon: Coins,
    popular: true,
    items: [
      '550 FlowCoins (bônus +10%)',
      'Melhor custo-benefício',
      'Todos os benefícios do pacote básico',
    ],
  },
  {
    id: 'coins_1000',
    name: '1000 FlowCoins',
    description: '+200 coins bônus',
    price: 3490,
    currency: 'BRL',
    type: 'coins',
    coins: 1200,
    icon: Coins,
    items: [
      '1200 FlowCoins (bônus +20%)',
      'Máximo valor agregado',
      'Badge de supporter',
    ],
  },
  {
    id: 'premium_lifetime',
    name: 'Pro Vitalício',
    description: 'Acesso permanente ao Code Flow',
    price: 49900,
    currency: 'BRL',
    type: 'premium',
    icon: Zap,
    items: [
      'Acesso Pro para sempre',
      'Todas as features futuras incluídas',
      'Badge exclusivo de fundador',
      'Nome nos créditos',
      'Acesso VIP ao Discord',
      'Sem renovações ou cobranças',
    ],
  },
];

export default function MonetizationPage() {
  const { user, refreshUser } = useUser();
  const { t } = useLanguage();
  const [loading, setLoading] = useState<string | null>(null);
  const [showAdModal, setShowAdModal] = useState(false);

  const handlePurchase = async (packageId: string) => {
    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Faça login para realizar compras',
        variant: 'destructive',
      });
      return;
    }

    setLoading(packageId);

    try {
      const response = await fetch('/api/monetization/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ packageId }),
      });

      if (!response.ok) throw new Error('Falha ao criar pagamento');

      const { checkoutUrl } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível processar a compra',
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    // Initialize AdSense on component mount
    initAdSense();
  }, []);

  const handleWatchAd = async () => {
    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Faça login para assistir anúncios',
        variant: 'destructive',
      });
      return;
    }

    setShowAdModal(true);
  };

  const handleAdComplete = async () => {
    try {
      const response = await fetch('/api/monetization/watch-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (response.status === 429) {
          toast({
            title: 'Aguarde um pouco',
            description: `Você pode assistir outro anúncio em ${Math.ceil(errorData.remainingSeconds / 60)} minutos`,
            variant: 'destructive',
          });
        } else {
          throw new Error(errorData.error || 'Falha ao recompensar anúncio');
        }
        return;
      }

      const { usageAdded } = await response.json();

      toast({
        title: '🎉 Anúncio assistido!',
        description: `+${usageAdded} usos desbloqueados!`,
      });

      await refreshUser();
    } catch (error) {
      console.error('Ad reward error:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível processar a recompensa',
        variant: 'destructive',
      });
    } finally {
      setShowAdModal(false);
    }
  };

  const handleAdClose = () => {
    setShowAdModal(false);
    toast({
      title: 'Anúncio cancelado',
      description: 'Assista até o final para ganhar recompensas',
    });
  };

  const formatPrice = (cents: number) => {
    return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Desbloqueie Todo o Potencial
          </h1>
          <p className="text-xl text-gray-300">
            Escolha o plano perfeito para acelerar seu aprendizado
          </p>
        </div>

        {/* Ad Stats Widget (only for free users) */}
        {!user?.isPro && (
          <AdStatsWidget 
            onWatchAd={handleWatchAd}
            isWatching={showAdModal}
          />
        )}

        {/* Packages Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <Card
                key={pkg.id}
                className={`p-6 bg-slate-800/80 backdrop-blur border-2 transition-all hover:scale-105 relative ${
                  pkg.popular ? 'border-yellow-500 shadow-xl shadow-yellow-500/20' : 'border-slate-700'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-1 rounded-full text-xs font-bold">
                    MAIS POPULAR
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-10 h-10 ${pkg.popular ? 'text-yellow-400' : 'text-purple-400'}`} />
                  {pkg.type === 'subscription' && (
                    <span className="text-xs bg-purple-600 px-2 py-1 rounded">
                      {pkg.duration}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-400 mb-4 text-sm">{pkg.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{formatPrice(pkg.price)}</span>
                  {pkg.type === 'subscription' && (
                    <span className="text-gray-400 text-sm">/{pkg.duration}</span>
                  )}
                  {pkg.coins && (
                    <span className="ml-2 text-yellow-400 text-sm">
                      {pkg.coins} coins
                    </span>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {pkg.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={loading === pkg.id || (user?.isPro && pkg.type === 'subscription')}
                  className={`w-full ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {loading === pkg.id ? (
                    'Processando...'
                  ) : user?.isPro && pkg.type === 'subscription' ? (
                    'Já é Pro'
                  ) : (
                    'Comprar Agora'
                  )}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Ad Video Player */}
        {showAdModal && (
          <AdVideoPlayer 
            onAdComplete={handleAdComplete}
            onClose={handleAdClose}
          />
        )}

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto mt-16 mb-12">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            O Que Você Ganha com Pro
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Acesso completo a ferramentas profissionais, desafios avançados e recursos exclusivos que vão acelerar sua jornada de aprendizado
          </p>

          {/* Advanced Tools Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-purple-400" />
              Ferramentas Avançadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Code Profiler</h4>
                <p className="text-sm text-gray-400">
                  Análise de performance em tempo real. Meça tempo de execução, identifique gargalos e otimize seu código com precisão profissional.
                </p>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <PauseCircle className="w-12 h-12 text-red-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Advanced Debugger</h4>
                <p className="text-sm text-gray-400">
                  Breakpoints condicionais, step-through debugging, e inspeção de variáveis em tempo de execução. Debug como um profissional.
                </p>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <Sparkles className="w-12 h-12 text-yellow-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">AI Code Inspector</h4>
                <p className="text-sm text-gray-400">
                  Análise inteligente de código com IA. Identifica padrões, sugere melhorias e explica complexidades automaticamente.
                </p>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <Search className="w-12 h-12 text-green-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Variable Inspector</h4>
                <p className="text-sm text-gray-400">
                  Explore objetos complexos, arrays aninhados e estruturas de dados com visualização interativa e busca avançada.
                </p>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <Activity className="w-12 h-12 text-cyan-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Execution Visualizer</h4>
                <p className="text-sm text-gray-400">
                  Visualização em tempo real da execução do código. Veja o fluxo de dados, call stack e transformações passo a passo.
                </p>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <Database className="w-12 h-12 text-indigo-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Memory Inspector</h4>
                <p className="text-sm text-gray-400">
                  Rastreamento de memória, análise de heap e detecção de memory leaks. Entenda como seu código usa recursos.
                </p>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <Code2 className="w-12 h-12 text-purple-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">VIP Playground</h4>
                <p className="text-sm text-gray-400">
                  Ambiente de testes avançado com scratchpad, snippets salvos e execução isolada para experimentos sem limites.
                </p>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <Target className="w-12 h-12 text-orange-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Learning Paths</h4>
                <p className="text-sm text-gray-400">
                  Trilhas guiadas de Frontend, Backend e Algoritmos. Progresso estruturado do básico ao avançado com projetos práticos.
                </p>
              </Card>
            </div>
          </div>

          {/* Learning & Content Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              Conteúdo & Aprendizado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Zap className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">50+ Desafios Expert</h4>
                    <p className="text-sm text-gray-400">Algoritmos avançados</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Data Structures complexas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Design Patterns avançados
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Performance & Otimização
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Async & Concorrência
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-yellow-500/20 p-3 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">2x XP Multiplier</h4>
                    <p className="text-sm text-gray-400">Evolua mais rápido</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Dobro de XP em desafios
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Suba de nível 2x mais rápido
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Desbloqueia conquistas mais cedo
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Ranking boost automático
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-pink-500/20 p-3 rounded-lg">
                    <Target className="w-8 h-8 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Daily Challenges</h4>
                    <p className="text-sm text-gray-400">Novos desafios diários</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Desafio novo todo dia
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Bônus de XP por streaks
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Recompensas exclusivas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Prática consistente
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Community & Rewards Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Gift className="w-6 h-6 text-pink-400" />
              Exclusividades & Comunidade
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <Crown className="w-12 h-12 text-yellow-400 mb-4" />
                <h4 className="text-xl font-bold mb-3">Avatares & Badges Exclusivos</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Destaque-se na comunidade com avatares animados, badges especiais e customizações que só membros Pro têm acesso.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    20+ avatares exclusivos
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Badge Pro verificado
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Molduras de perfil animadas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Títulos personalizados
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <Sparkles className="w-12 h-12 text-cyan-400 mb-4" />
                <h4 className="text-xl font-bold mb-3">Experiência Premium</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Navegação sem interrupções, suporte prioritário e acesso antecipado a novos recursos antes de todos.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Zero anúncios na plataforma
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Suporte prioritário 24/7
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Acesso antecipado a features
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Servidor Discord exclusivo
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <Activity className="w-12 h-12 text-green-400 mb-4" />
                <h4 className="text-xl font-bold mb-3">Uso Ilimitado</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Sem restrições de uso. Execute quantos códigos quiser, acesse todos os recursos sem limites.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Execuções ilimitadas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Todas as ferramentas liberadas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Sem cooldown ou esperas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Aprenda no seu ritmo
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
                <Lock className="w-12 h-12 text-purple-400 mb-4" />
                <h4 className="text-xl font-bold mb-3">Conteúdo Bloqueado Liberado</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Acesso instantâneo a todo conteúdo que estava bloqueado. Nada fica de fora.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Todos os desafios Expert
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Soluções completas com explicações
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Projetos guiados avançados
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Material de estudo completo
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Why Pro Section */}
          <Card className="p-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur border-purple-500/30 text-center">
            <h3 className="text-3xl font-bold mb-4">Por Que Escolher Pro?</h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
              Membros Pro aprendem <span className="text-yellow-400 font-bold">2x mais rápido</span>, têm acesso a <span className="text-purple-400 font-bold">ferramentas profissionais</span> usadas por desenvolvedores de grandes empresas, e fazem parte de uma <span className="text-pink-400 font-bold">comunidade exclusiva</span> de aprendizes avançados.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-left">
              <div className="flex items-start gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg mt-1">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-bold">Economia de Tempo</p>
                  <p className="text-sm text-gray-400">Ferramentas que aceleram seu aprendizado</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg mt-1">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-bold">Habilidades Profissionais</p>
                  <p className="text-sm text-gray-400">Aprenda com as mesmas ferramentas da indústria</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg mt-1">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-bold">Investimento no Futuro</p>
                  <p className="text-sm text-gray-400">Acelere sua carreira em tecnologia</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Simple Benefits Grid - Keeping the original for continuity */}
        <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
            <TrendingUp className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Aprenda Mais Rápido</h3>
            <p className="text-gray-400">
              Acesse conteúdo premium e acelere seu aprendizado com 2x XP
            </p>
          </Card>

          <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
            <Gift className="w-12 h-12 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Recompensas Exclusivas</h3>
            <p className="text-gray-400">
              Desbloqueie avatares, badges e itens especiais para membros Pro
            </p>
          </Card>

          <Card className="p-6 bg-slate-800/50 backdrop-blur border-purple-500/30">
            <Lock className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Conteúdo Exclusivo</h3>
            <p className="text-gray-400">
              Acesso a desafios Expert e recursos avançados disponíveis apenas para Pro
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
