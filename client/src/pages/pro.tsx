import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { useLocation } from "wouter";
import {
  Zap,
  Cpu,
  BarChart3,
  Lightbulb,
  Layers,
  Check,
  Crown,
  Sparkles,
  GitBranch,
  Database,
} from "lucide-react";

const ProDebuggerLazy = lazy(() =>
  import("@/components/visualizer/pro-debugger").then((m) => ({ default: m.ProDebugger }))
);

export default function ProPage() {
  const { user, token } = useUser();
  const [, setLocation] = useLocation();
  const [secondsLeft, setSecondsLeft] = useState(3600);
  const [confirming, setConfirming] = useState(false);
  const [proToken, setProToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const sid = urlParams.get("session_id");
    if (sid) {
      setConfirming(true);
      fetch("/api/pro/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sid }),
      })
        .then(async (r) => {
          if (!r.ok) throw new Error((await r.json())?.error || "Falha ao confirmar pagamento");
          return r.json();
        })
        .then((data) => {
          setProToken(data?.proToken || null);
          setError(null);
        })
        .catch((e) => setError(e?.message || "Erro ao confirmar"))
        .finally(() => setConfirming(false));
    }
  }, [urlParams]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const handleUpgrade = async () => {
    try {
      const res = await fetch("/api/pro/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "monthly", currency: "BRL", email: user?.email }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
      }
      alert("Erro ao iniciar checkout");
    } catch (err) {
      alert("Erro na requisição");
    }
  };

  const handlePortal = async () => {
    if (!user?.email) {
      alert("Email não encontrado");
      return;
    }
    try {
      const res = await fetch("/api/pro/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
      }
      alert("Erro ao abrir portal de cobrança");
    } catch (err) {
      alert("Erro na requisição");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-12">
        {/* Header */}
        <div className="max-w-5xl mx-auto px-4 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl shadow-purple-500/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/40 text-sm font-semibold">
                  Oferta relâmpago
                  <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-xs tracking-wide">
                    {minutes}:{seconds}
                  </span>
                </div>
                <h1 className="text-3xl font-bold">Pro Debugger + Conteúdo Exclusivo</h1>
                <p className="text-sm text-gray-200/80">
                  Pro custa $2/mês (USD). Seu banco converte para BRL ou outras moedas. Bloqueie este preço enquanto o timer estiver ativo.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {user?.isPro ? (
                  <Button onClick={handlePortal} variant="secondary" className="w-full sm:w-auto">
                    Gerenciar assinatura
                  </Button>
                ) : (
                  <Button onClick={handleUpgrade} className="w-full sm:w-auto">
                    Ativar Pro por $2/mês
                  </Button>
                )}
                <div className="text-xs text-gray-300 text-center sm:text-left">
                  Acesso imediato ao debugger avançado + exercícios ilimitados.
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="max-w-5xl mx-auto px-4 mb-6">
            <div className="bg-red-500/15 border border-red-400/40 text-red-200 rounded-xl p-4">
              {error}
            </div>
          </div>
        )}

        {confirming && (
          <div className="max-w-5xl mx-auto px-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white">Confirmando pagamento...</div>
          </div>
        )}

        {proToken && (
          <div className="max-w-5xl mx-auto px-4 mb-6">
            <div className="bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 rounded-xl p-4 space-y-2">
              <div className="font-semibold">Pagamento confirmado!</div>
              <div className="text-sm">Seu código Pro foi gerado. Use esse código ao criar sua conta:</div>
              <div className="font-mono text-white bg-black/30 px-3 py-2 rounded">{proToken}</div>
              <div>
                <Button onClick={() => navigator.clipboard.writeText(proToken)} size="sm">
                  Copiar código
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Pro Features Grid */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 mb-4">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">Recursos Premium</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 bg-clip-text text-transparent mb-4">
              Ferramentas Profissionais para Desenvolvedores
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Desbloqueie um conjunto completo de ferramentas avançadas de depuração, análise de performance e visualização em tempo real.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="group relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 hover:border-amber-400/40 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl group-hover:from-amber-400/40 transition-all" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 mb-4">
                  <Cpu className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pro Debugger</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Depurador visual avançado com breakpoints, watch variables e stack traces detalhados
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Execução passo a passo
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Inspeção de variáveis
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 hover:border-amber-400/40 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl group-hover:from-amber-400/40 transition-all" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 mb-4">
                  <BarChart3 className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Performance Analyzer</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Analise tempo de execução, uso de memória e otimize seu código
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Timeline de execução
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Uso de memória
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 hover:border-amber-400/40 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl group-hover:from-amber-400/40 transition-all" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 mb-4">
                  <Layers className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Visualização de Estruturas</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Veja arrays, objetos e estruturas de dados em tempo real com diagrama interativo
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Estruturas complexas
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Gráficos interativos
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 hover:border-amber-400/40 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl group-hover:from-amber-400/40 transition-all" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 mb-4">
                  <Lightbulb className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">IA Assistant</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Receba sugestões automáticas de otimização e explicações de erros
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Análise automática
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Sugestões em tempo real
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 hover:border-amber-400/40 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl group-hover:from-amber-400/40 transition-all" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 mb-4">
                  <GitBranch className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Snapshots de Execução</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Capture e compartilhe estados de execução completos para debug colaborativo
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Captura e replay
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Compartilhamento
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 hover:border-amber-400/40 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl group-hover:from-amber-400/40 transition-all" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 mb-4">
                  <Database className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Database Inspector</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Inspecione queries, visualize índices e otimize performance de DB
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Análise de queries
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-amber-400" />
                    Otimizações
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-400/30 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-300">Oferta Especial</span>
                </div>
                <h3 className="text-3xl font-bold text-white">Acesso Completo Pro</h3>
                <p className="text-gray-300">
                  Todas as ferramentas profissionais, exercícios ilimitados, atualizações prioritárias e suporte dedicado.
                </p>
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-amber-400" />
                    <span>Acesso a 6+ ferramentas avançadas</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-amber-400" />
                    <span>Exercícios com conteúdo exclusivo</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-amber-400" />
                    <span>Suporte prioritário 24/7</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-amber-400" />
                    <span>Atualizações gratuitas permanentes</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  <div className="inline-block">
                    <span className="text-5xl font-bold text-white">$2</span>
                    <span className="text-gray-300 ml-2">/mês</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Conversão automática em BRL</p>
                </div>
                <div className="w-full flex flex-col gap-2">
                  {user?.isPro ? (
                    <>
                      <Button
                        onClick={handlePortal}
                        className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold h-12"
                      >
                        <Crown className="w-5 h-5 mr-2" />
                        Gerenciar Assinatura
                      </Button>
                      <div className="text-center text-sm text-amber-300 font-semibold">✓ Seu plano está ativo</div>
                    </>
                  ) : (
                    <Button
                      onClick={handleUpgrade}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold h-12"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Ativar Pro Agora
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Debugger */}
        <div className="border-t border-white/10 pt-12">
          <Suspense fallback={<div className="text-center p-8 text-white">Carregando debugger...</div>}>
            <ProDebuggerLazy />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}
