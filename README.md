# GoG Player Assembly

Hub digitale per coalizzare i rappresentanti dei server di Guns of Glory. Il sistema consente ai referenti di ogni server di raccogliere feedback dai giocatori, proporre modifiche al gioco, votare su proposte della comunità e rappresentare in modo strutturato il sentiment della community.

## Features

- **Gestione Rappresentanti**: Sistema di registrazione e verifica per rappresentanti server
- **Sistema Proposte**: Creazione, categorizzazione e gestione proposte della comunità
- **Voto Democratico**: Sistema di voto con quorum del 60% e prevenzione duplicati
- **Raccolta Feedback**: Strumenti per raccogliere e aggregare feedback dai giocatori
- **CSPI (Community Spending Propensity Index)**: Indicatore del sentiment della comunità
- **Comunicazione**: Hub sicuro per comunicazione tra rappresentanti
- **Reporting**: Dashboard e report per sviluppatori

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Email**: Resend

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd gog-player-assembly
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials and other required environment variables.

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Supabase Setup

1. Create a new Supabase project
2. Copy your project URL and anon key to `.env.local`
3. Run the database migrations (will be created in subsequent tasks)
4. Set up Row Level Security policies (will be configured in subsequent tasks)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   └── ui/             # Reusable UI components
├── lib/                # Utility functions and configurations
│   ├── supabase.ts     # Supabase client configuration
│   └── utils.ts        # General utilities
└── types/              # TypeScript type definitions
```

## Environment Variables

See `.env.example` for required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `RESEND_API_KEY`: API key for email service

## Deployment

The project is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

This project follows the GoG Player Assembly specification. Please refer to the requirements and design documents in `.kiro/specs/gog-player-assembly/` for detailed information about features and implementation guidelines.

## License

See LICENSE file for details.
