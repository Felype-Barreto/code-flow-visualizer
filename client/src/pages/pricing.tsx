import { useUser } from "@/hooks/use-user";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useLocation } from "wouter";

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    period: "para sempre",
    description: "Perfeito para começar",
    features: [
      "✓ Acesso a lições básicas",
      "✓ Editor de código",
      "✓ Exercícios limitados (5 por dia)",
      "✓ 5 linguagens de programação",
      "✓ Comunidade",
    ],
    notIncluded: [
      "✗ Debugger avançado (Pro)",
      "✗ Certificados",
      "✗ Lições exclusivas",
      "✗ Suporte prioritário",
    ],
    cta: "Atual",
    ctaVariant: "secondary" as const,
    isFree: true,
  },
  {
    name: "Pro",
    price: "R$ 29,90",
    period: "/mês",
    description: "Para desenvolvedores sérios",
    badge: "Popular",
    features: [
      "✓ Tudo do plano Free",
      "✓ Debugger Python avançado",
      "✓ Exercícios ilimitados",
      "✓ Lições exclusivas",
      "✓ Certificados de conclusão",
      "✓ Histórico completo",
      "✓ Suporte prioritário",
      "✓ Comunidade VIP",
    ],
    notIncluded: [],
    cta: "Ativar Pro",
    ctaVariant: "default" as const,
    isPro: true,
  },
];

export default function PricingPage() {
  const { user, token } = useUser();
  const [, setLocation] = useLocation();

  const handleUpgrade = async () => {
    if (!token) {
      setLocation("/");
      return;
    }

    try {
      const res = await fetch("/api/pro/upgrade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ months: 1 }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`✓ Bem-vindo ao Pro!\nExpira em: ${new Date(data.expiresAt).toLocaleDateString("pt-BR")}`);
        window.location.reload();
      } else {
        alert("Erro ao ativar Pro");
      }
    } catch (err) {
      alert("Erro na requisição");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Planos de Assinatura</h1>
          <p className="text-xl text-gray-400">
            Escolha o plano perfeito para sua jornada de programação
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative p-8 border-2 transition-all ${
                plan.isPro
                  ? "border-purple-500 bg-slate-800/80 shadow-lg shadow-purple-500/20"
                  : "border-gray-700 bg-slate-800/40"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">{plan.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature.replace("✓ ", "")}</span>
                  </div>
                ))}

                {plan.notIncluded.length > 0 && (
                  <>
                    <div className="border-t border-gray-700 my-4" />
                    {plan.notIncluded.map((feature, i) => (
                      <div key={`not-${i}`} className="flex items-center gap-3 text-gray-500">
                        <span className="w-5 h-5 flex-shrink-0">✗</span>
                        <span className="line-through">{feature.replace("✗ ", "")}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => {
                  if (plan.isFree) return;
                  handleUpgrade();
                }}
                disabled={plan.isFree || (user?.isPro && plan.isPro)}
                variant={plan.ctaVariant}
                className="w-full py-2 font-semibold text-base"
              >
                {user?.isPro && plan.isPro ? "✓ Ativo" : plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Perguntas Frequentes</h2>

          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-gray-400">
                Sim! Você pode cancelar sua assinatura Pro a qualquer momento e terá acesso até o final do período pago.
              </p>
            </div>

            <div className="bg-slate-800/40 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">O que são "Exercícios ilimitados"?</h3>
              <p className="text-gray-400">
                Usuários Free podem fazer apenas 5 exercícios por dia. Usuários Pro podem fazer quantos quiserem, quando quiserem.
              </p>
            </div>

            <div className="bg-slate-800/40 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">Preciso de cartão de crédito para começar?</h3>
              <p className="text-gray-400">
                Não! O plano Free é 100% gratuito e sem cartão de crédito. Você só precisa adicionar dados de pagamento quando quiser fazer upgrade para Pro.
              </p>
            </div>

            <div className="bg-slate-800/40 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">Existe desconto anual?</h3>
              <p className="text-gray-400">
                Sim! Ao escolher plano anual, você economiza 20% comparado ao pagamento mensal.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        {!user?.isPro && (
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Comece a aprender hoje!</h2>
              <p className="text-purple-100 mb-6 text-lg">
                Desbloqueia novos exercícios, ferramentas avançadas e certificados com o plano Pro.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="font-bold text-lg px-8 py-6"
                onClick={handleUpgrade}
              >
                Ativar Pro Agora
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
