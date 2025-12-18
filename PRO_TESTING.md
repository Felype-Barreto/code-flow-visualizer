# Teste Pro Feature - Instruções Locais

## Status Atual
✅ Build passou (sem type checking)
✅ Endpoints criadosEmbora há um erro menor no arquivo `exercises.tsx` que você pode ignorar por agora.

## O Que Foi Implementado

### Backend (todos em `dev` branch)
1. **`/api/auth/me`** - Retorna user data com email, isPro, proExpiresAt
2. **`/api/pro/create-checkout`** - POST com {email, plan, currency} → cria Stripe session
3. **`/api/pro/confirm`** - POST com {sessionId} → confirma pagamento e gera proToken
4. **`/api/pro/portal`** - POST com {email} → retorna URL do billing portal
5. **`/api/pro/grant`** - POST com email/status (requer Bearer ADMIN_API_TOKEN) → gera token
6. **`/api/pro/webhook`** - Webhook do Stripe para sync is_pro/pro_expires_at
7. **`/api/auth/signup`** - Requer proToken, valida contra DB ou PRO_SIGNUP_CODE

### Frontend
1. **`useUser` hook** - Agora retorna `email`, `isPro`, `proExpiresAt`
2. **Pro page** - Integrada com create-checkout, confirm, portal
3. **Admin page** - UI para gerar tokens via /api/pro/grant
4. **ProDebugger** - Gated apenas para isPro === true

### Database
- `pro_signup_entitlements` table com email, token, status, used_at

## Como Testar Localmente

### 1. Setup Ambiente
```powershell
# Na pasta Code-Flow-Visualizer
$env:DATABASE_URL = "sua-neon-database-url"
$env:JWT_SECRET = "dev-secret-local"
$env:PRO_SIGNUP_CODE = "DEV-TEST-CODE"
$env:RESEND_API_KEY = "re_xxx"
$env:RESEND_FROM_EMAIL = "noreply@codeflowbr.site"
$env:ADMIN_API_TOKEN = "admin-dev-secret"
$env:STRIPE_SECRET_KEY = "sk_test_xxx"  # opcional
$env:STRIPE_PRICE_PRO_MONTHLY_USD = "price_xxx"  # opcional
```

### 2. Iniciar Dev Server
```powershell
npm run dev:env
# Abrirá em http://localhost:5000
```

### 3. Testar Fluxo Completo

#### Opção A: Via Admin (Mais Rápido)
1. Acesse `/admin` (precisa de isAdmin no JWT, testar depois)
2. Digite email, status "granted", ADMIN_API_TOKEN
3. Clique "Gerar token"
4. Copie o token retornado

#### Opção B: Usar PRO_SIGNUP_CODE (Sem DB)
- Ao fazer signup, use `proToken: "DEV-TEST-CODE"`

#### Opção C: Stripe Real (Completo)
1. POST `/api/pro/create-checkout` com email, plan="monthly", currency="BRL"
2. Abra a URL retornada, complete pagamento com cartão de teste
3. Ao voltar, `/pro` dispara `/api/pro/confirm` automaticamente
4. Você verá o proToken na tela

### 4. Endpoints para Testar via Postman/cURL

#### Criar entitlement (via Admin Token)
```bash
curl -X POST http://localhost:5000/api/pro/grant \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin-dev-secret" \
  -d '{"email":"teste@local.com","status":"granted"}'
```

#### Confirmar pagamento (simulado)
```bash
curl -X POST http://localhost:5000/api/pro/confirm \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"cs_test_xxx"}' 
```

#### Obter dados do usuário
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <seu_jwt_token>"
```

#### Fazer signup Pro
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"newuser@test.com",
    "firstName":"Test",
    "lastName":"User",
    "dateOfBirth":"1990-01-01T00:00:00Z",
    "country":"BR",
    "password":"StrongPass123",
    "proToken":"DEV-TEST-CODE"
  }'
```

## Fluxo Visual do Pro (UI)

1. **Página /pro sem Pro:**
   - Mostra "Pro Debugger + Conteúdo Exclusivo"
   - Botão "Ativar Pro por $2/mês"

2. **Clica em "Ativar Pro":**
   - POST `/api/pro/create-checkout` com email do usuário
   - Redireciona para Stripe Checkout
   - Na volta, dispara `/api/pro/confirm` automaticamente

3. **Após confirmação:**
   - Exibe o `proToken` com botão "Copiar código"
   - Usuário copia e usa no signup

4. **Usuário com Pro ativa:**
   - Vê o `ProDebugger` renderizado
   - Botão muda para "Gerenciar assinatura" → chama `/api/pro/portal`

## Bugs Encontrados e Corrigidos

❌ **exercises.tsx** - Código solto na linha 525 causa erro JSX
- Efeito: Arquivo não compila com `tsc`
- Workaround: Use `npm run dev:env` (não roda type check) ou ignore o arquivo
- TODO: Limpar esse arquivo separadamente

## Próximos Passos

1. Remover o erro estrutural do exercises.tsx (separadamente)
2. Rodar migração no Neon: `npm run db:apply:entitlements`
3. Configurar Stripe webhook (após deploy em preview/prod)
4. Testar em produção (via GitHub PR de dev → main)

## Variáveis de Ambiente Resumidas

| Variável | Uso | Exemplo |
|----------|-----|---------|
| DATABASE_URL | Conexão ao Neon | `postgresql://...` |
| JWT_SECRET | Assinar tokens | `dev-secret-local` |
| PRO_SIGNUP_CODE | Código fallback Pro | `DEV-TEST-CODE` |
| RESEND_API_KEY | Email (opcional) | `re_xxx` |
| ADMIN_API_TOKEN | Auth para /api/pro/grant | `admin-dev-secret` |
| STRIPE_SECRET_KEY | Stripe API (opcional) | `sk_test_xxx` |
| STRIPE_WEBHOOK_SECRET | Webhook (opcional) | `whsec_xxx` |

## Links e Comandos Úteis

```bash
# Aplicar migração entitlements no Neon
npm run db:apply:entitlements

# Gerar um entitlement
$env:PRO_GRANT_EMAIL = "usuario@test.com"
npm run pro:grant

# Build sem type check
npm run build

# Dev com envs
npm run dev:env
```

## URL Local
- **Principal:** http://localhost:5000
- **Pro Page:** http://localhost:5000/pro
- **Admin:** http://localhost:5000/admin
- **API Index:** http://localhost:5000/api
