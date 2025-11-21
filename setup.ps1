# Strapi Blog Platform - Quick Setup Script for Windows
# This script helps automate the initial setup

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Strapi Blog Platform Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js not found. Please install Node.js v16 or higher." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 1: Setting up Backend (Strapi)" -ForegroundColor Cyan
Write-Host "-----------------------------------" -ForegroundColor Cyan

# Generate random keys for .env
function Generate-RandomKey {
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($bytes)
    return [Convert]::ToBase64String($bytes)
}

# Create backend .env file
if (-not (Test-Path "backend\.env")) {
    Write-Host "Creating backend .env file..." -ForegroundColor Yellow
    
    $appKey1 = Generate-RandomKey
    $appKey2 = Generate-RandomKey
    $apiTokenSalt = Generate-RandomKey
    $adminJwtSecret = Generate-RandomKey
    $transferTokenSalt = Generate-RandomKey
    $jwtSecret = Generate-RandomKey
    
    $envContent = @"
HOST=0.0.0.0
PORT=1337
APP_KEYS=$($appKey1),$($appKey2)
API_TOKEN_SALT=$($apiTokenSalt)
ADMIN_JWT_SECRET=$($adminJwtSecret)
TRANSFER_TOKEN_SALT=$($transferTokenSalt)
JWT_SECRET=$($jwtSecret)
"@
    
    Set-Content -Path "backend\.env" -Value $envContent
    Write-Host "Backend .env file created with secure keys" -ForegroundColor Green
} else {
    Write-Host "Backend .env file already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Setting up Frontend (Next.js)" -ForegroundColor Cyan
Write-Host "--------------------------------------" -ForegroundColor Cyan

# Create frontend .env.local file
if (-not (Test-Path "frontend\.env.local")) {
    Write-Host "Creating frontend .env.local file..." -ForegroundColor Yellow
    
    $frontendEnv = "NEXT_PUBLIC_STRAPI_URL=http://localhost:1337"
    Set-Content -Path "frontend\.env.local" -Value $frontendEnv
    
    Write-Host "Frontend .env.local file created" -ForegroundColor Green
} else {
    Write-Host "Frontend .env.local file already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Install backend dependencies:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm install" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start Strapi:" -ForegroundColor White
Write-Host "   npm run develop" -ForegroundColor Gray
Write-Host ""
Write-Host "3. In a new terminal, install frontend dependencies:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm install" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Start Next.js:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Open your browser:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Gray
Write-Host "   Backend:  http://localhost:1337/admin" -ForegroundColor Gray
Write-Host ""
Write-Host "For detailed instructions, see docs/SETUP_GUIDE.md" -ForegroundColor Cyan
