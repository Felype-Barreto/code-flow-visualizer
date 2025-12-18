# Setup e Teste Local - Pro Feature Script
# Configurar ambiente de teste e iniciar servidor

Write-Host "Setup PRO Testing - Local Dev Server"
Write-Host "======================================"

# Ler DATABASE_URL do .env se existir
if (Test-Path ".env") {
    Write-Host "Carregando .env..."
    $env:DATABASE_URL = (Get-Content ".env" | Select-String "DATABASE_URL" | ForEach-Object { $_.Line.Replace("DATABASE_URL=","") }).Trim()
}

# Configurar variáveis de ambiente
$env:JWT_SECRET = "dev-secret-do-nao-use-em-prod"
$env:PRO_SIGNUP_CODE = "DEV-PRO-TEST"
$env:ADMIN_API_TOKEN = "admin-dev-secret-local"
$env:RESEND_API_KEY = "dev-key"
$env:STRIPE_SECRET_KEY = "sk_test_local"

Write-Host "Ambiente configurado:"
Write-Host "  - JWT_SECRET: $env:JWT_SECRET"
Write-Host "  - PRO_SIGNUP_CODE: $env:PRO_SIGNUP_CODE"
Write-Host "  - ADMIN_API_TOKEN: $env:ADMIN_API_TOKEN"
Write-Host ""

# Verificar node_modules
if (!(Test-Path "node_modules")) {
    Write-Host "Instalando dependências..."
    npm install
}

# Build
Write-Host "Executando build..."
npm run build

Write-Host ""
Write-Host "======================================"
Write-Host "Iniciando servidor local..."
Write-Host "URL: http://localhost:5000"
Write-Host "======================================"
Write-Host ""

npm run -s dev:env
