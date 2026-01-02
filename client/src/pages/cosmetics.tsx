import Layout from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Rainbow, Flame, Shield, Crown } from "lucide-react";

const frames = [
  { id: "bronze_frame", name: "Moldura Bronze", desc: "Borda simples para iniciar sua coleção", color: "from-amber-700 to-amber-600", price: 200 },
  { id: "gold_frame", name: "Moldura Dourada", desc: "Brilho dourado com sombra suave", color: "from-yellow-500 to-amber-400", price: 600 },
  { id: "galaxy_frame", name: "Moldura Galáxia", desc: "Gradiente roxo-azul com partículas", color: "from-indigo-500 to-fuchsia-500", price: 1200 },
  { id: "flame_frame", name: "Moldura Chamas", desc: "Animação flamejante para seu avatar", color: "from-orange-500 to-red-500", price: 1500 },
];

const nameEffects = [
  { id: "gold_name", name: "Nome Dourado", desc: "Texto dourado com brilho", color: "text-yellow-300", price: 500 },
  { id: "rainbow_name", name: "Nome Rainbow", desc: "Gradiente animado arco-íris", color: "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400", price: 900 },
  { id: "flame_name", name: "Nome Flamejante", desc: "Efeito de chamas animadas", color: "text-orange-300", price: 1100 },
  { id: "matrix_name", name: "Nome Matrix", desc: "Verde neon com brilho", color: "text-emerald-300", price: 800 },
];

export default function CosmeticsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="container mx-auto px-4 py-12 space-y-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Cosméticos</p>
              <h1 className="text-4xl font-black text-amber-100 drop-shadow-[0_10px_40px_rgba(255,193,7,0.18)]">Frames & Name Effects</h1>
              <p className="text-slate-200 mt-2 max-w-2xl">Prévia dos cosméticos premium. Em breve compra e equipar direto aqui (integração em progresso).</p>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold" onClick={() => { window.location.href = "/pricing?product=cosmetics"; }}>
              Ver planos na Pricing
            </Button>
          </div>

          <Card className="bg-slate-900/70 border-white/10 shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Molduras</p>
                <h2 className="text-xl font-bold text-amber-100">Escolha seu brilho</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
              {frames.map((f) => (
                <div key={f.id} className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-4">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-3 bg-gradient-to-br ${f.color} border border-white/20 shadow-lg`} />
                  <h3 className="text-lg font-semibold text-amber-100 text-center">{f.name}</h3>
                  <p className="text-sm text-slate-300 text-center mt-1">{f.desc}</p>
                  <div className="text-center text-amber-200 font-bold mt-3">{f.price} coins</div>
                  <Button className="w-full mt-3" variant="secondary" disabled>Em breve</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-900/70 border-white/10 shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
              <Rainbow className="w-5 h-5 text-fuchsia-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Efeitos de Nome</p>
                <h2 className="text-xl font-bold text-amber-100">Mostre seu estilo</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
              {nameEffects.map((n) => (
                <div key={n.id} className="rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-4">
                  <div className="text-center text-lg font-bold" style={{ letterSpacing: '0.02em' }}>
                    <span className={n.color.replace('text-transparent', '')}>{n.name}</span>
                  </div>
                  <p className="text-sm text-slate-300 text-center mt-2">{n.desc}</p>
                  <div className="text-center text-amber-200 font-bold mt-3">{n.price} coins</div>
                  <Button className="w-full mt-3" variant="secondary" disabled>Em breve</Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-yellow-500/20 border border-amber-400/40 shadow-[0_20px_40px_rgba(255,193,7,0.25)]">
            <div className="p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-200">Roadmap</p>
                <h3 className="text-2xl font-black text-amber-50">Equipar direto no perfil + loja integrada</h3>
                <p className="text-amber-100/80 max-w-2xl">Próximo passo: compra com coins ou $5 na Pricing, equipar molduras/efeitos e sincronizar com leaderboard e profile.</p>
              </div>
              <div className="flex flex-col gap-2 text-amber-100">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm"><Crown className="w-4 h-4" /> Temporada + Cosméticos exclusivos</div>
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm"><Flame className="w-4 h-4" /> Efeitos animados</div>
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm"><Shield className="w-4 h-4" /> Progresso salvo na conta</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
