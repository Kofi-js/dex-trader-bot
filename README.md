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
   - Copy `.env.example` to `.env` in each directory
   - Fill in the required environment variables

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