# Sistema de Anúncios - Code Flow

## Visão Geral

O sistema de anúncios permite que usuários gratuitos ganhem **+5 usos** assistindo vídeos publicitários. Implementamos suporte para múltiplos provedores de anúncios.

## Provedores Suportados

### 1. Google AdSense (Recomendado)
**Melhor para:** Sites web estabelecidos
**Requisitos:** Domínio próprio, conteúdo original

#### Setup:
1. Acesse https://adsense.google.com
2. Crie uma conta e adicione seu site
3. Aguarde aprovação (2-3 dias)
4. Crie unidades de anúncio:
   - **Rewarded Video** (anúncio com recompensa)
   - **Display Ad** (banner)
5. Copie seu Publisher ID e Slot IDs

#### Configuração:

```javascript
// client/src/lib/adsense.ts
export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-1234567890123456', // Seu Publisher ID
  slots: {
    rewardVideo: '9876543210',  // Seu Slot ID
    displayAd: '1234567890',
    banner: '0987654321',
  },
  testMode: false, // true para teste
};
```

#### Adicione ao HTML:

```html
<!-- client/index.html -->
<head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-SEU_ID"
     crossorigin="anonymous"></script>
</head>
```

---

### 2. PropellerAds (Aprovação Rápida)
**Melhor para:** Sites novos, aprovação fácil
**Requisitos:** Mínimos

#### Setup:
1. Acesse https://propellerads.com
2. Cadastre-se como Publisher
3. Adicione seu site (aprovação rápida)
4. Copie Zone IDs para vídeo rewarded

#### Configuração:

```javascript
// client/src/lib/adsense.ts
export const PROPELLER_ADS_CONFIG = {
  publisherId: '1234567',
  zoneIds: {
    rewardedVideo: '7654321',
    interstitial: '1112131',
    banner: '4151617',
  },
};
```

---

### 3. Adsterra (Alternativa)
**Melhor para:** Tráfego internacional
**Vantagens:** Sem requisito mínimo de tráfego

#### Setup:
1. Acesse https://adsterra.com
2. Cadastre como Publisher
3. Configure Direct Link ou Banner
4. Adicione código ao site

---

### 4. Unity Ads (Mobile/Gaming)
**Melhor para:** Apps mobile ou sites de jogos

#### Setup:
1. Acesse https://unity.com/products/unity-ads
2. Crie projeto Unity
3. Configure Rewarded Video Placement
4. Integre SDK Unity Ads

---

## Fluxo do Usuário

1. **Usuário gratuito** clica em "Assistir Anúncio +5 Usos"
2. Modal de anúncio abre com vídeo
3. Vídeo play automático por 15 segundos
4. Botão "Pular" disponível após 5 segundos
5. Ao completar, API valida e adiciona +5 usos
6. Cooldown de 5 minutos entre anúncios

## Backend (Já Implementado)

```typescript
// api/monetization/index.ts

export async function watchAd(req, res) {
  // ✅ Valida cooldown de 5 minutos
  // ✅ Adiciona +5 usos gratuitos
  // ✅ Registra log no adRewards
  // ✅ Retorna novo total de usos
}
```

## Banco de Dados

```sql
-- Tabela adRewards (já existe)
CREATE TABLE adRewards (
  id SERIAL PRIMARY KEY,
  userId TEXT NOT NULL,
  adProvider TEXT NOT NULL,
  rewardType TEXT NOT NULL,
  rewardAmount INTEGER NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

## Frontend Components

### AdVideoPlayer
**Localização:** `client/src/components/ad-video-player.tsx`

**Features:**
- Player de vídeo completo
- Barra de progresso
- Skip button após 5s
- Controles de áudio
- Fallback para anúncio simulado

**Uso:**
```tsx
import { AdVideoPlayer } from '@/components/ad-video-player';

<AdVideoPlayer 
  onAdComplete={handleReward}
  onClose={handleClose}
/>
```

## Configuração para Produção

### Passo 1: Escolha o Provedor
Recomendamos Google AdSense para sites profissionais, ou PropellerAds para sites novos.

### Passo 2: Configure as Credenciais

```typescript
// client/src/lib/adsense.ts
export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-SEU_PUBLISHER_ID',
  slots: {
    rewardVideo: 'SEU_SLOT_ID',
    displayAd: 'SEU_SLOT_ID',
  },
  testMode: false, // IMPORTANTE: false em produção
};
```

### Passo 3: Adicione Script ao HTML

```html
<!-- client/index.html -->
<head>
  <!-- Google AdSense -->
  <script async 
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-SEU_ID"
    crossorigin="anonymous">
  </script>
  
  <!-- Google Analytics (opcional) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID"></script>
</head>
```

### Passo 4: Variáveis de Ambiente

```bash
# .env
ADSENSE_PUBLISHER_ID=ca-pub-1234567890123456
ADSENSE_SLOT_REWARDED=9876543210
```

## Monetização Esperada

Com 1.000 visualizações diárias de anúncios:
- **Google AdSense:** $2-10 CPM = $2-10/dia
- **PropellerAds:** $1-5 CPM = $1-5/dia
- **Adsterra:** $0.50-3 CPM = $0.50-3/dia

## Políticas Importantes

### ✅ Permitido:
- Oferecer recompensas por assistir anúncios
- Cooldown entre anúncios
- Skip após tempo mínimo (5s)
- Anúncios em páginas de conteúdo

### ❌ Proibido:
- Forçar cliques em anúncios
- Ocultar botão de fechar
- Anúncios automáticos sem ação do usuário
- Recarregar página para gerar impressões falsas

## Troubleshooting

### Anúncios não aparecem:
1. Verifique se AdSense está aprovado
2. Confirme Publisher ID e Slot IDs corretos
3. Teste com `testMode: true`
4. Verifique console do navegador
5. Desabilite bloqueador de anúncios

### Recompensas não funcionam:
1. Verifique conexão com backend
2. Confirme que cooldown expirou
3. Teste endpoint `/api/monetization/watch-ad`
4. Verifique logs do servidor

### AdSense rejeitado:
- Use PropellerAds ou Adsterra como alternativa
- Adicione mais conteúdo original ao site
- Aguarde mais tempo antes de reaplicar
- Verifique políticas do AdSense

## Próximos Passos

1. **Cadastrar no Google AdSense**
   - Site: https://adsense.google.com
   - Adicionar domínio codeflowbr.site
   - Aguardar aprovação

2. **Configurar Unidades de Anúncio**
   - Criar Rewarded Video Ad Unit
   - Copiar Publisher ID e Slot ID
   - Atualizar `client/src/lib/adsense.ts`

3. **Adicionar Script ao HTML**
   - Editar `client/index.html`
   - Adicionar script do AdSense
   - Deploy para produção

4. **Monitorar Performance**
   - Verificar impressões no painel AdSense
   - Analisar taxa de conversão
   - Ajustar cooldown se necessário

## Alternativas (Sem Anúncios)

Se não quiser usar anúncios, você pode:
1. **Remover sistema de ads** e dar usos ilimitados
2. **Reduzir cooldown** para melhorar UX
3. **Focar apenas em Pro subscriptions**
4. **Implementar sistema de referral** (ganhe usos convidando amigos)

## Suporte

Para dúvidas sobre implementação, consulte:
- **AdSense:** https://support.google.com/adsense
- **PropellerAds:** https://propellerads.com/blog/
- **Documentação Code Flow:** README.md
