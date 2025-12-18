# Setup e Teste Local - Pro Feature
# Script para configurar ambiente de teste e iniciar servidor

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        CODE-FLOW PRO TESTING SETUP - Local Environment       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Ler DATABASE_URL do .env se existir
$envFile = ".env"
if (Test-Path $envFile) {
    Write-Host "📄 Carregando .env..." -ForegroundColor Yellow
    $content = Get-Content $envFile
    $dbUrl = $content | Select-String 'DATABASE_URL' | ForEach-Object { $_.Line -replace 'DATABASE_URL=' }
    if ($dbUrl) {
        $env:DATABASE_URL = $dbUrl.Trim()
        Write-Host "✅ DATABASE_URL carregado de .env" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  .env não encontrado. DATABASE_URL será carregada do sistema ou padrão" -ForegroundColor Yellow
}

# Configurar variáveis de ambiente obrigatórias
Write-Host ""
Write-Host "🔧 Configurando variáveis de ambiente..." -ForegroundColor Yellow

$env:JWT_SECRET = "dev-secret-do-nao-use-em-prod"
Write-Host "  ✓ JWT_SECRET = dev-secret-do-nao-use-em-prod" -ForegroundColor Green

$env:PRO_SIGNUP_CODE = "DEV-PRO-TEST"
Write-Host "  ✓ PRO_SIGNUP_CODE = DEV-PRO-TEST" -ForegroundColor Green

$env:ADMIN_API_TOKEN = "admin-dev-secret-local"
Write-Host "  ✓ ADMIN_API_TOKEN = admin-dev-secret-local" -ForegroundColor Green

# Opcionais (Resend/Stripe)
if ([string]::IsNullOrEmpty($env:RESEND_API_KEY)) {
    $env:RESEND_API_KEY = "dev-key"
    Write-Host "  ℹ️  RESEND_API_KEY = dev-key (emails não serão enviados)" -ForegroundColor Gray
}

if ([string]::IsNullOrEmpty($env:STRIPE_SECRET_KEY)) {
    $env:STRIPE_SECRET_KEY = "sk_test_local"
    Write-Host "  ℹ️  STRIPE_SECRET_KEY = sk_test_local (Stripe desativado)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📋 Preparando servidor..." -ForegroundColor Yellow

# Verificar se node_modules existe
if (!(Test-Path "node_modules")) {
    Write-Host "⚠️  node_modules não encontrado. Instalando dependências..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependências instaladas" -ForegroundColor Green
} else {
    Write-Host "✅ node_modules encontrado" -ForegroundColor Green
}

# Build
Write-Host ""
Write-Host "🔨 Fazendo build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build concluído com sucesso" -ForegroundColor Green

# Iniciar servidor
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              🚀 Iniciando servidor de desenvolvimento          ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📌 URL Local: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📌 Pro Page:  http://localhost:5000/pro" -ForegroundColor Cyan
Write-Host "📌 Admin:     http://localhost:5000/admin" -ForegroundColor Cyan
Write-Host "📌 API Index: http://localhost:5000/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "⌨️  Pressione CTRL+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""

# Iniciar servidor
npm run -s dev:env
