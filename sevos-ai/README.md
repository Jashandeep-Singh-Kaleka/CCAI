# SEVOS.AI - AI-Powered Trucking Brokerage Platform

A modern, AI-powered platform for trucking brokerage operations built with Next.js 15, React 19, and OpenAI integration.

## 🚀 Features

### Core Functionality
- **Smart Email Classification** - AI-powered email sorting into business categories
- **Intelligent Call Management** - Call transcription and automated follow-ups
- **Invoice Processing** - Automated invoice extraction and management
- **Lead Management** - Comprehensive CRM for prospect tracking
- **Financial Dashboard** - Real-time financial metrics and reporting
- **AI Bid Assistant** - ChatGPT-powered bid drafting for email and voice

### AI-Powered Features
- **Communication Classification** - Automatically categorize emails and calls
- **Document Extraction** - Extract structured data from invoices and documents
- **Bid Generation** - Generate professional bid responses
- **Content Summarization** - Summarize communications and documents
- **Journal Entry Generation** - Automated accounting entries

## 🛠 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide React
- **AI Integration**: OpenAI GPT-4, Zod for schema validation
- **Charts**: Recharts for data visualization
- **Runtime**: Edge Runtime for optimal performance

## 📁 Project Structure

```
sevos-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/        # Marketing pages
│   │   ├── api/                # API routes
│   │   │   ├── classify/       # Communication classification
│   │   │   ├── draft-bid/      # Bid generation
│   │   │   ├── extract-invoice/# Invoice extraction
│   │   │   ├── finance/        # Financial operations
│   │   │   └── summarize/      # Content summarization
│   │   ├── demo/               # Demo pages
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── ai-assistant/       # AI chat interface
│   │   ├── calls/              # Call management
│   │   ├── finance/            # Financial dashboard
│   │   ├── inbox/              # Email management
│   │   ├── invoices/           # Invoice management
│   │   ├── leads/              # Lead management
│   │   ├── metrics/            # Analytics dashboard
│   │   └── ui/                 # Base UI components
│   └── lib/                    # Utilities and configuration
│       ├── buckets.ts          # Classification categories
│       ├── demo-data.ts        # Demo data
│       ├── format.ts           # Formatting utilities
│       ├── llm.ts              # OpenAI integration
│       ├── schema.ts           # Zod schemas
│       ├── tools.ts            # Utility functions
│       └── utils.ts            # Common utilities
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager
- OpenAI API key (optional - demo mode available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sevos-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   Or use demo mode:
   ```env
   OPENAI_API_KEY=demo-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts
- `npm run analyze` - Analyze bundle size

## 🎯 Usage

### Demo Mode
The application includes comprehensive demo data and can run without an OpenAI API key. Set `OPENAI_API_KEY=demo-key` in your environment to use mock AI responses.

### Main Features

1. **Dashboard** - Overview of operations, metrics, and key activities
2. **Inbox** - Smart email classification and management
3. **Calls** - Call center with transcription and follow-up tracking
4. **Leads** - CRM for managing prospects and opportunities
5. **Invoices** - Invoice processing and payment tracking
6. **Finance** - Financial dashboard with automated journal entries
7. **AI Assistant** - Interactive AI helper for various tasks

### API Endpoints

- `POST /api/classify` - Classify communications
- `POST /api/draft-bid` - Generate bid responses
- `POST /api/extract-invoice` - Extract invoice data
- `POST /api/summarize` - Summarize content
- `POST /api/finance/je` - Generate journal entries

## 🔧 Configuration

### OpenAI Integration
Configure your OpenAI settings in `src/lib/llm.ts`. The application uses GPT-4 by default but can be configured to use other models.

### Demo Data
Demo data is located in `src/lib/demo-data.ts` and includes sample emails, calls, leads, invoices, and journal entries.

### Styling
The application uses Tailwind CSS with custom design tokens. Global styles are in `src/app/globals.css`.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
npx vercel --prod
```

### Other Platforms
Build the application and deploy the `.next` folder:
```bash
npm run build
npm run start
```

## 🧪 Development

### Adding New Features
1. Create API routes in `src/app/api/`
2. Add components in `src/components/`
3. Update schemas in `src/lib/schema.ts`
4. Add demo data in `src/lib/demo-data.ts`

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Zod for runtime validation
- Edge Runtime for performance

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

Please read the contributing guidelines before submitting pull requests.

## 📞 Support

For support and questions, please contact the development team.
