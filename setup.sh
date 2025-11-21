#!/bin/bash

# Strapi Blog Platform - Quick Setup Script
# This script helps automate the initial setup

echo "================================"
echo "Strapi Blog Platform Setup"
echo "================================"
echo ""

# Check Node.js installation
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "Node.js found: $NODE_VERSION"
else
    echo "Node.js not found. Please install Node.js v16 or higher."
    exit 1
fi

echo ""
echo "Step 1: Setting up Backend (Strapi)"
echo "-----------------------------------"

# Generate random keys for .env
generate_random_key() {
    openssl rand -base64 32
}

# Create backend .env file
if [ ! -f "backend/.env" ]; then
    echo "Creating backend .env file..."
    
    APP_KEY1=$(generate_random_key)
    APP_KEY2=$(generate_random_key)
    API_TOKEN_SALT=$(generate_random_key)
    ADMIN_JWT_SECRET=$(generate_random_key)
    TRANSFER_TOKEN_SALT=$(generate_random_key)
    JWT_SECRET=$(generate_random_key)
    
    cat > backend/.env << EOF
HOST=0.0.0.0
PORT=1337
APP_KEYS=$APP_KEY1,$APP_KEY2
API_TOKEN_SALT=$API_TOKEN_SALT
ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
JWT_SECRET=$JWT_SECRET
EOF
    
    echo "Backend .env file created with secure keys"
else
    echo "Backend .env file already exists"
fi

echo ""
echo "Step 2: Setting up Frontend (Next.js)"
echo "--------------------------------------"

# Create frontend .env.local file
if [ ! -f "frontend/.env.local" ]; then
    echo "Creating frontend .env.local file..."
    
    echo "NEXT_PUBLIC_STRAPI_URL=http://localhost:1337" > frontend/.env.local
    
    echo "Frontend .env.local file created"
else
    echo "Frontend .env.local file already exists"
fi

echo ""
echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Install backend dependencies:"
echo "   cd backend"
echo "   npm install"
echo ""
echo "2. Start Strapi:"
echo "   npm run develop"
echo ""
echo "3. In a new terminal, install frontend dependencies:"
echo "   cd frontend"
echo "   npm install"
echo ""
echo "4. Start Next.js:"
echo "   npm run dev"
echo ""
echo "5. Open your browser:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:1337/admin"
echo ""
echo "For detailed instructions, see docs/SETUP_GUIDE.md"
