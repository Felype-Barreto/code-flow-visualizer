import { useUser } from "@/hooks/use-user";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Sparkles, Cpu, BarChart3, Lightbulb, Layers, GitBranch, Database } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState, useMemo, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PricingPage() {
  const { user, token } = useUser();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  const plans = [
    {
      name: t.planFree,
      price: t.planFreePrice,
      period: t.planFreePeriod,
      description: t.planFreeDescription,
      features: [
        t.planFeature1,
        t.planFeature2,
        t.planFeature3,
        t.planFeature4,
        t.planFeature5,
      ],
      notIncluded: [
        t.planNotIncluded1,
        t.planNotIncluded2,
        t.planNotIncluded3,
        t.planNotIncluded4,
      ],
      cta: t.currentPlan,
      ctaVariant: "secondary" as const,
      isFree: true,
    },
    {
      name: t.planPro,
      price: t.planProPrice,
      period: t.planProPeriod,
      description: t.planProDescription,
      badge: t.planProBadge,
      features: [
        t.planFeature6,
        t.planFeature7,
        t.planFeature8,
        t.planFeature9,
        t.planFeature10,
        t.planFeature11,
        t.planFeature4,
        t.planFeature5,
      ],
      notIncluded: [],
      cta: t.activatePro,
      ctaVariant: "default" as const,
      isPro: true,
    },
  ];
  const [billingPlan] = useState<"monthly">("monthly");
  const [secondsLeft, setSecondsLeft] = useState(3600); // 1h urgency banner
  const [vipOpen, setVipOpen] = useState(false);
  const [vipStep, setVipStep] = useState<"collect" | "verify">("collect");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const monthlyBenefits = useMemo(
    () => [
      t.benefit1,
      t.benefit2,
      t.benefit3,
      t.benefit4,
    ],
    [t]
  );

  const roadmapItems = useMemo(
    () => [
      { title: t.proRoadmap1Title, eta: t.proRoadmap1Eta, status: t.proRoadmap1Status },
      { title: t.proRoadmap2Title, eta: t.proRoadmap2Eta, status: t.proRoadmap2Status },
      { title: t.proRoadmap3Title, eta: t.proRoadmap3Eta, status: t.proRoadmap3Status },
    ],
    [t]
  );

  const proFeatureCards = useMemo(
    () => [
      {
        icon: <Cpu className="w-6 h-6 text-white" />,
        title: t.proFeatureDebuggerTitle,
        desc: t.proFeatureDebuggerDesc,
        bullets: [t.proFeatureDebuggerB1, t.proFeatureDebuggerB2],
      },
      {
        icon: <BarChart3 className="w-6 h-6 text-white" />,
        title: t.proFeatureAnalyzerTitle,
        desc: t.proFeatureAnalyzerDesc,
        bullets: [t.proFeatureAnalyzerB1, t.proFeatureAnalyzerB2],
      },
      {
        icon: <Layers className="w-6 h-6 text-white" />,
        title: t.proFeatureStructuresTitle,
        desc: t.proFeatureStructuresDesc,
        bullets: [t.proFeatureStructuresB1, t.proFeatureStructuresB2],
      },
      {
        icon: <Lightbulb className="w-6 h-6 text-white" />,
        title: t.proFeatureAiTitle,
        desc: t.proFeatureAiDesc,
        bullets: [t.proFeatureAiB1, t.proFeatureAiB2],
      },
      {
        icon: <GitBranch className="w-6 h-6 text-white" />,
        title: t.proFeatureSnapshotsTitle,
        desc: t.proFeatureSnapshotsDesc,
        bullets: [t.proFeatureSnapshotsB1, t.proFeatureSnapshotsB2],
      },
      {
        icon: <Database className="w-6 h-6 text-white" />,
        title: t.proFeatureDbTitle,
        desc: t.proFeatureDbDesc,
        bullets: [t.proFeatureDbB1, t.proFeatureDbB2],
      },
    ],
    [t]
  );

  const proExerciseTracks = useMemo(
    () => [
      {
        title: t.proTrackBeginnerTitle,
        accent: "from-emerald-500/15 to-emerald-700/10",
        items: [
          t.proTrackBeginner1,
          t.proTrackBeginner2,
          t.proTrackBeginner3,
          t.proTrackBeginner4,
          t.proTrackBeginner5,
          t.proTrackBeginner6,
        ],
      },
      {
        title: t.proTrackIntermediateTitle,
        accent: "from-amber-500/15 to-orange-600/10",
        items: [
          t.proTrackIntermediate1,
          t.proTrackIntermediate2,
          t.proTrackIntermediate3,
          t.proTrackIntermediate4,
          t.proTrackIntermediate5,
          t.proTrackIntermediate6,
        ],
      },
      {
        title: t.proTrackAdvancedTitle,
        accent: "from-purple-500/15 to-indigo-700/10",
        items: [
          t.proTrackAdvanced1,
          t.proTrackAdvanced2,
          t.proTrackAdvanced3,
          t.proTrackAdvanced4,
          t.proTrackAdvanced5,
          t.proTrackAdvanced6,
        ],
      },
    ],
    [t]
  );

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Auto-open VIP modal when coming from Pro with vip=1
    const params = new URLSearchParams(window.location.search);
    if (params.get("vip") === "1") {
      setVipOpen(true);
      setVipStep("collect");
      const url = new URL(window.location.href);
      url.searchParams.delete("vip");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  const handleUpgrade = () => {
    // Open VIP modal to ensure email verification before payment
    setVipOpen(true);
    setVipStep("collect");
    if (user?.email) setEmail(user.email);
  };

  const submitCollect = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email) {
      toast({ title: t.emailRequired, description: t.emailRequired });
      return;
    }
    try {
      setLoading(true);
      const dobIso = dateOfBirth && dateOfBirth.length <= 10
        ? new Date(dateOfBirth + "T00:00:00.000Z").toISOString()
        : dateOfBirth;
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, dateOfBirth: dobIso, country, password }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || t.error);
      // Persist pending signup so we can complete after payment
      const pending = { firstName, lastName, country, dateOfBirth, email, password };
      sessionStorage.setItem("pendingSignup", JSON.stringify(pending));
      setVipStep("verify");
      toast({ title: t.vipCodeSent, description: t.vipCheckEmail });
    } catch (err: any) {
      toast({ title: t.error, description: err?.message || String(err) });
    } finally {
      setLoading(false);
    }
  };

  const submitVerifyThenCheckout = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email || !code) {
      toast({ title: t.error, description: t.error });
      return;
    }
    try {
      setLoading(true);
      const vres = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const vdata = await vres.json();
      if (!vres.ok || !vdata?.ok) throw new Error(vdata?.error || t.error);

      const cres = await fetch("/api/pro/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: billingPlan, currency: "BRL", email }),
      });
      const cdata = await cres.json();
      if (cres.ok && cdata?.url) {
        window.location.href = cdata.url;
        return;
      }
      toast({ title: t.error, description: t.error });
      setLocation("/pro");
    } catch (err: any) {
      toast({ title: t.error, description: err?.message || String(err) });
    } finally {
      setLoading(false);
    }
  };

  const handlePortal = async () => {
    if (!token) {
      setLocation("/");
      return;
    }
    try {
      const res = await fetch("/api/billing/portal", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.url) {
          window.location.href = data.url;
          return;
        }
      }
      alert(t.error);
    } catch (err) {
      alert(t.error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 py-12 px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">{t.pricingPlansTitle}</h1>
          <p className="text-xl text-gray-400">
            {t.pricingPlansSubtitle}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-200">
            <span className="font-semibold text-white">{t.planPro}: {t.planProPrice}{t.planProPeriod}</span>
            <span className="text-gray-300">{t.billingCurrency}</span>
          </div>

          <div className="mt-4 inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-red-600/80 to-orange-500/80 border border-red-500/50 text-sm text-white shadow-lg shadow-red-500/30">
            <span className="font-bold text-base">{t.flashOffer}</span>
            <span className="text-white/90">{t.flashOfferText}</span>
            <span className="px-2 py-1 rounded bg-black/40 font-mono text-sm tracking-wide">{minutes}:{seconds}</span>
          </div>
        </div>

        {/* Pro value highlights (moved from Pro page) */}
        <div className="max-w-5xl mx-auto mb-10 px-4 grid md:grid-cols-2 gap-4">
          <Card className="p-6 border-amber-400/30 bg-amber-500/5">
            <div className="flex items-center gap-2 text-amber-300 font-semibold mb-2">
              <Crown className="w-4 h-4" />
              {t.premiumBadge}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.premiumHeadline}</h3>
            <p className="text-sm text-gray-300">{t.premiumDescription}</p>
          </Card>
          <Card className="p-6 border-amber-400/20 bg-slate-800/60">
            <div className="flex items-center gap-2 text-amber-200 font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              {t.proTracksBadge}
            </div>
            <p className="text-sm text-gray-300">{t.proTracksSubtitle}</p>
          </Card>
        </div>

        {/* Detailed Pro features */}
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 mb-3">
              <Crown className="w-5 h-5 text-amber-300" />
              <span className="text-sm font-semibold text-amber-200">{t.premiumBadge}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">{t.premiumHeadline}</h2>
            <p className="text-sm text-gray-300 max-w-3xl mx-auto">{t.premiumDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proFeatureCards.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
                bullets={feature.bullets}
              />
            ))}
          </div>
        </div>

        {/* Pro tracks overview */}
        <div className="max-w-6xl mx-auto px-4 mb-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              {t.proTracksBadge}
            </span>
            <p className="text-sm text-gray-400">{t.proTracksSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {proExerciseTracks.map((track) => (
              <div
                key={track.title}
                className={`relative overflow-hidden rounded-2xl border border-amber-400/25 bg-gradient-to-br ${track.accent} p-5`}
              >
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2 text-white">
                    <Crown className="w-4 h-4 text-amber-300" />
                    <h3 className="text-lg font-semibold">{track.title}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-200">
                    {track.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-300 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Single price: $2 USD/month; card conversion handles FX */}

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
              {plan.isPro && (
                <div className="pointer-events-none absolute -right-12 -top-6 w-48 rotate-45 drop-shadow-xl">
                  <div
                    className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 text-white text-xs font-bold text-center py-2 border border-white/30"
                    style={{
                      clipPath: "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Oferta relâmpago · {minutes}:{seconds}
                  </div>
                </div>
              )}

              {plan.badge && (
                <div className="absolute -top-4 left-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">{plan.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  {plan.isPro ? (
                    <>
                      <span className="text-4xl font-bold text-white">$2.00</span>
                      <span className="text-gray-400">/month</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400">{plan.period}</span>
                    </>
                  )}
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
              <div className="flex flex-col gap-3">
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
                {user?.isPro && plan.isPro && (
                  <Button
                    onClick={handlePortal}
                    variant="secondary"
                    className="w-full py-2 font-semibold text-base"
                  >
                    {t.manageSubscription}
                  </Button>
                )}
                {plan.isPro && !user?.isPro && (
                  <div className="text-xs text-center space-y-1 text-gray-300">
                    <p>Cobrança em USD ($2/mês). Seu banco converte para BRL/outras moedas.</p>
                    <p className="text-red-300 font-semibold">Oferta relâmpago: preço fixo por tempo limitado.</p>
                    <p className="text-amber-200">Tempo restante: {minutes}:{seconds}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Pro Benefits and Roadmap moved from Pro page */}
        <div className="max-w-6xl mx-auto mb-16 grid lg:grid-cols-3 gap-6 px-4">
          <div className="lg:col-span-2 rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-200 font-semibold text-sm">
              <span className="w-4 h-4">✨</span>
              Benefícios mensais do Pro
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {monthlyBenefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-gray-200 bg-black/25 border border-amber-400/20 rounded-lg p-3">
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-400/25 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-200 font-semibold text-sm">
              <span className="w-4 h-4">👑</span>
              Roadmap Pro
            </div>
            <div className="space-y-3 text-sm text-gray-200">
              {roadmapItems.map((item) => (
                <div key={item.title} className="border border-amber-400/20 rounded-lg p-3 bg-black/25">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{item.title}</span>
                    <span className="text-amber-200 text-xs">{item.eta}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Billing & Receipts */}
        {user?.isPro && (
          <div className="max-w-6xl mx-auto mb-16 px-4">
            <div className="rounded-2xl border border-amber-400/25 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-5 space-y-3 text-gray-200">
              <div className="flex items-center gap-2 text-amber-200 font-semibold text-sm">
                <span className="w-4 h-4">👑</span>
                {t.billingTitle}
              </div>
              <p className="text-sm text-slate-300">{t.billingDescription}</p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handlePortal} className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold">
                  {t.openBillingPortal}
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-400/60 text-amber-200"
                  onClick={async () => {
                    if (!token) {
                      alert(t.signInButton);
                      return;
                    }
                    try {
                      const res = await fetch("/api/pro/receipt", {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      const data = await res.json();
                      if (res.ok && data?.receiptUrl) {
                        window.open(data.receiptUrl, "_blank");
                      } else {
                        alert(t.downloadReceipts);
                      }
                    } catch (err) {
                      alert(t.downloadReceipts);
                    }
                  }}
                >
                  {t.downloadReceipts}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">{t.faqTitle}</h2>

          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">{t.faq1Question}</h3>
              <p className="text-gray-400">
                {t.faq1Answer}
              </p>
            </div>

            <div className="bg-slate-800/40 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">{t.faq2Question}</h3>
              <p className="text-gray-400">
                {t.faq2Answer}
              </p>
            </div>

            <div className="bg-slate-800/40 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">{t.faq3Question}</h3>
              <p className="text-gray-400">
                {t.faq3Answer}
              </p>
            </div>

            <div className="bg-slate-800/40 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">{t.faq4Question}</h3>
              <p className="text-gray-400">
                {t.faq4Answer}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        {!user?.isPro ? (
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-4">{t.ctaTitle}</h2>
              <p className="text-purple-100 mb-6 text-lg">
                {t.ctaSubtitle}
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="font-bold text-lg px-8 py-6"
                onClick={handleUpgrade}
              >
                {t.activateProNow}
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <div className="bg-slate-900/60 border border-gray-700 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-4">{t.youArePro}</h2>
              <p className="text-gray-300 mb-6 text-lg">
                {t.youAreProDesc}
              </p>
              <Button size="lg" className="font-bold text-lg px-8 py-6" onClick={handlePortal}>
                {t.manageSubscription}
              </Button>
            </div>
          </div>
        )}
       
       {/* VIP Signup Modal */}
       <Dialog open={vipOpen} onOpenChange={setVipOpen}>
        <DialogContent className="bg-slate-900 border border-amber-400/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-300" /> {t.vipSignupTitle}
            </DialogTitle>
            <DialogDescription className="text-amber-100/80">
              {t.vipSignupDesc}
            </DialogDescription>
          </DialogHeader>

          {vipStep === "collect" ? (
            <form onSubmit={submitCollect} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">{t.firstName}</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="lastName">{t.lastName}</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="country">{t.country}</Label>
                  <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="dob">{t.dateOfBirth}</Label>
                  <Input id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="email">{t.emailLabel}</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="password">{t.passwordLabel}</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                </div>
              </div>
              <Button type="submit" className="w-full bg-amber-500 text-black font-semibold" disabled={loading}>
                {loading ? t.sendingCode : t.continueToEmailConfirm}
              </Button>
            </form>
          ) : (
            <form onSubmit={submitVerifyThenCheckout} className="space-y-4">
              <div>
                <Label>{t.codeSentTo} {email}</Label>
                <div className="mt-2">
                  <InputOTP maxLength={6} value={code} onChange={setCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="border-amber-400/50 text-amber-200" onClick={() => setVipStep("collect")} disabled={loading}>
                  {t.back}
                </Button>
                <Button type="submit" className="flex-1 bg-amber-500 text-black font-semibold" disabled={loading}>
                  {loading ? t.verifying : t.continueToPayment}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </Layout>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  bullets,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  bullets: string[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-6 hover:border-amber-400/40 transition-all hover:shadow-lg hover:shadow-amber-500/10">
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-2xl group-hover:from-amber-400/40 transition-all" />
      <div className="relative z-10 space-y-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-2.5">{icon}</div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-300">{desc}</p>
        <div className="space-y-2">
          {bullets.map((b) => (
            <div key={b} className="flex items-center gap-2 text-sm text-gray-400">
              <Check className="w-4 h-4 text-amber-400" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
