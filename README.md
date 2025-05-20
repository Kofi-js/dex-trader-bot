# DEX Trading Bot

An automated DEX (Decentralized Exchange) trading bot built with Next.js, Fastify, and Solidity smart contracts.

## 🏗️ Project Structure

```
dex-trader-bot/
├── apps/
│   ├── frontend/     # Next.js frontend application
│   └── backend/      # Fastify backend server
├── contracts/        # Solidity smart contracts
└── infra/           # Infrastructure configurations
```

## 🚀 Features

- **Frontend**
  - Modern Next.js application with TypeScript
  - Supabase authentication (login/signup)
  - Protected dashboard
  - Dark theme UI

- **Backend**
  - Fastify server with TypeScript
  - Supabase integration
  - JWT authentication
  - Health check endpoint

- **Smart Contracts**
  - `DexExecutor`: Main contract for executing DEX trades
  - `MockRouter`: Mock contract for local testing
  - Hardhat development environment

## 🛠️ Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dex-trader-bot.git
cd dex-trader-bot
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd apps/frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install contract dependencies
cd ../../contracts
npm install
```

3. Set up environment variables:

Create `.env` files in the following locations with the required variables:

**Frontend** (`apps/frontend/.env`):
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Authentication
NEXT_PUBLIC_AUTH_REDIRECT_URL=http://localhost:3000/dashboard
```

**Backend** (`apps/backend/.env`):
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_KEY=your-supabase-service-key

# JWT Configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h

# Contract Configuration
CONTRACT_ADDRESS=your-deployed-contract-address
```

**Contracts** (`contracts/.env`):
```env
# Network Configuration
PRIVATE_KEY=your-wallet-private-key

# For testnet deployment
ALCHEMY_API_KEY=your-alchemy-api-key
ETHERSCAN_API_KEY=your-etherscan-api-key

# Contract Configuration
CONTRACT_OWNER_ADDRESS=your-wallet-address
```

4. Start development servers:
```bash
# Start frontend (from apps/frontend)
npm run dev

# Start backend (from apps/backend)
npm run dev

# Start local blockchain (from contracts)
npm run node
```

## 🔧 Development

- Frontend runs on: `http://localhost:3000`
- Backend runs on: `http://localhost:3001`
- Local blockchain runs on: `http://localhost:8545`

## 📝 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 