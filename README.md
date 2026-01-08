# GoG Player Assembly

A democratic platform where Guns of Glory server representatives collaborate to shape the game's future through structured feedback, transparent voting, and data-driven insights.

## 🎯 Mission

GoG Player Assembly empowers the Guns of Glory community by providing a transparent, democratic platform for server representatives to:

- Collect and aggregate player feedback
- Create and vote on community proposals  
- Track community sentiment through the CSPI (Community Spending Propensity Index)
- Facilitate structured communication with game developers
- Build consensus across the global player base

## ✨ Key Features

### 🗳️ **Democratic Governance**
- Transparent voting system with 60% quorum requirement
- One representative per server ensures fair representation
- Immutable voting records and real-time results

### 📊 **Community Analytics** 
- **CSPI Index**: Track community sentiment and engagement patterns
- Historical trend analysis and predictive insights
- Neutral, data-driven reporting for developers

### 💬 **Structured Communication**
- Secure messaging between representatives
- Automatic feedback categorization and aggregation
- Direct developer communication channels

### 🛡️ **Enterprise Security**
- Row Level Security (RLS) with Supabase
- End-to-end encryption for sensitive communications
- Comprehensive audit trails and GDPR compliance

### 🌍 **Global Community**
- Multi-language support (ready for internationalization)
- Server-specific feedback collection
- Cross-server collaboration tools

## 🏗️ Architecture & Tech Stack

### Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom component library
- **Backend**: Next.js API Routes with TypeScript
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with email verification
- **Deployment**: Vercel with automatic CI/CD
- **Email**: Resend for transactional emails

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard and management
│   ├── api/               # API routes and endpoints  
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   └── donate/            # Donation and support pages
├── components/            # React components
│   └── ui/               # Reusable UI component library
├── lib/                  # Utilities and configurations
│   ├── supabase.ts       # Database client setup
│   └── utils.ts          # Helper functions
├── types/                # TypeScript definitions
└── __tests__/            # Test suites and specs
```

### Database Schema

The platform uses a comprehensive PostgreSQL schema with:

- **Users & Profiles**: Identity management with role-based access
- **Servers & Representatives**: One-to-one server representation
- **Proposals & Voting**: Democratic decision-making system
- **Feedback Collection**: Structured community input
- **CSPI Tracking**: Community sentiment indicators
- **Audit Logs**: Complete activity tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone and Install**:
```bash
git clone <repository-url>
cd gog-player-assembly
npm install
```

2. **Start Development Server**:
```bash
npm run dev
```

3. **Setup Database**: 
   - Open [http://localhost:3000](http://localhost:3000)
   - Follow the guided setup wizard to configure Supabase
   - The app will walk you through creating your database and environment variables

### 🎮 For Server Representatives

1. **Register**: Create your account at `/auth/register`
2. **Verify**: Complete identity verification process
3. **Connect**: Link your server and start representing your community
4. **Participate**: Vote on proposals, submit feedback, and engage with the assembly

### 👨‍💼 For Administrators  

1. **Admin Access**: Navigate to `/admin` after registration
2. **Server Management**: Create servers and assign representatives at `/admin/servers`
3. **User Management**: Verify representatives and manage permissions
4. **Analytics**: Monitor community engagement and platform health

## 🔧 Development & Deployment

### Database Setup

The application includes a guided setup wizard, but you can also configure manually:

1. **Create Supabase Project**:
   - Visit [supabase.com](https://supabase.com) and create a new project
   - Name it "gog-player-assembly" for consistency
   - Save your project URL and API keys

2. **Environment Configuration**:
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials from the setup wizard
   - Restart the development server

3. **Database Migration**:
   - Run SQL scripts from `supabase/migrations/` in order:
     - `001_initial_schema.sql` - Core tables and constraints
     - `002_custom_functions.sql` - Database functions and triggers  
     - `003_rls_policies.sql` - Row Level Security policies

4. **Admin Setup**:
   - Register your first account through the app
   - Manually set `role = 'admin'` and `verified = true` in Supabase dashboard

### Development Workflow

The platform includes comprehensive management interfaces:

- **Admin Dashboard**: `/admin` - Central management hub
- **Server Management**: `/admin/servers` - Create and manage servers
- **Representative Management**: `/admin/representatives` - Verify and manage users
- **Analytics Dashboard**: Monitor community engagement and platform health

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode  
npm run test:watch

# Run specific test suites
npm test -- --testNamePattern="Server Management"
```

### Deployment

**Vercel Deployment** (Recommended):
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

**Manual Deployment**:
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📈 Implementation Status

### ✅ Completed Features

- **🏗️ Infrastructure**: Complete project setup with Next.js 14 and Supabase
- **🔐 Authentication**: Secure user registration, login, and email verification
- **👥 User Management**: Role-based access control with admin capabilities
- **🖥️ Server Management System** (Task 4.1):
  - Full CRUD operations for server management
  - Representative assignment and removal
  - Admin interface with real-time updates
  - Single representative per server constraint enforcement
- **🎨 Modern UI**: Professional landing page with donation system
- **🛡️ Security**: Row Level Security policies and audit trails

### 🔄 In Development

- **📝 Proposal System**: Community proposal creation and management
- **🗳️ Voting System**: Democratic voting with quorum requirements
- **💬 Feedback Collection**: Structured community feedback aggregation
- **📊 CSPI Analytics**: Community Spending Propensity Index tracking
- **📋 Developer Reporting**: Structured communication with game developers

### 🌟 Upcoming Features

- **🌍 Internationalization**: Multi-language support system
- **📱 Mobile App**: Native mobile applications
- **🔔 Real-time Notifications**: Push notifications and alerts
- **📈 Advanced Analytics**: Enhanced community insights and reporting

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### For Developers

1. **Fork the Repository**: Create your own fork on GitHub
2. **Set Up Development**: Follow the installation guide above
3. **Pick an Issue**: Check our GitHub issues for tasks
4. **Submit PR**: Create a pull request with your changes

### For Community Members

1. **Feedback**: Share your experience and suggestions
2. **Testing**: Help test new features and report bugs
3. **Documentation**: Improve guides and documentation
4. **Spread the Word**: Share the platform with other server representatives

### Development Guidelines

- Follow the project specification in `.kiro/specs/gog-player-assembly/`
- Write tests for new features
- Maintain TypeScript strict mode compliance
- Follow the established code style and patterns

## 📄 Environment Variables

Create a `.env.local` file with these required variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Next.js Configuration  
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Email Configuration
RESEND_API_KEY=your_resend_api_key
```

## 💝 Support the Project

GoG Player Assembly is a community-driven initiative. Support our mission:

- **💰 Donate**: Visit `/donate` to contribute financially
- **⭐ Star**: Give us a star on GitHub
- **📢 Share**: Spread the word in your gaming communities
- **🐛 Report**: Help us improve by reporting issues

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for the Guns of Glory community**

*Empowering democratic governance and transparent communication in gaming communities worldwide.*
