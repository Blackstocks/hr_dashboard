# TalentHub - HR Dashboard

![TalentHub Dashboard](public/abstract-geometric-shapes.png)

## Overview

TalentHub is a comprehensive HR management platform designed to streamline recruitment, candidate assessment, and talent management processes. This modern dashboard provides HR professionals with powerful tools to manage job listings, track candidates, gain insights through analytics, and communicate effectively with team members and candidates.

## Features

- **Job Management**: Create, edit, and track job listings with detailed information
- **Candidate Tracking**: Manage candidate profiles, applications, and interview processes
- **Analytics Dashboard**: Visualize recruitment metrics and talent acquisition insights
- **AI-Powered Chat**: Communicate with team members and candidates through an intelligent chat interface
- **Voice Capabilities**: Text-to-speech and speech-to-text functionality for accessibility and convenience
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts for data visualization
- **Authentication**: Built-in authentication system
- **AI Services**: Integration with speech-to-text and text-to-speech APIs
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/talenthub.git
   cd talenthub
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   # API Keys for TTS/STT services
   TTS_API_KEY=your_tts_api_key
   STT_API_KEY=your_stt_api_key
   
   # Database connection (if applicable)
   DATABASE_URL=your_database_connection_string
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

\`\`\`
talenthub/
├── app/                    # Next.js App Router structure
│   ├── api/                # API routes for TTS/STT proxies
│   ├── dashboard/          # Dashboard pages (jobs, candidates, insights)
│   ├── register/           # User registration
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout with metadata
├── components/             # Reusable UI components
│   └── ui/                 # shadcn/ui components
├── public/                 # Static assets and images
└── tailwind.config.ts      # Tailwind CSS configuration
\`\`\`

## Code Examples

### Dashboard Layout

The main dashboard layout that wraps all dashboard pages:

\`\`\`tsx
// app/dashboard/layout.tsx
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNav } from "./dashboard-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <DashboardNav />
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
\`\`\`

### API Usage Example

Using the Text-to-Speech API:

\`\`\`tsx
// Example of using the TTS API
async function convertTextToSpeech(text: string) {
  try {
    const response = await fetch('/api/proxy/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to convert text to speech');
    }
    
    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error converting text to speech:', error);
    return null;
  }
}

// Usage
const audioUrl = await convertTextToSpeech('Hello, welcome to TalentHub!');
if (audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();
}
\`\`\`

### Creating a New Job Listing

Example of how to create a new job listing:

\`\`\`tsx
// Example function to create a new job
async function createJob(jobData) {
  try {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create job');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
}

// Example usage
const newJob = {
  title: 'Senior Frontend Developer',
  department: 'Engineering',
  location: 'Remote',
  type: 'Full-time',
  salary: '$120,000 - $150,000',
  description: 'We are looking for an experienced Frontend Developer...',
  requirements: ['5+ years of React experience', 'TypeScript knowledge', 'UI/UX skills'],
  responsibilities: ['Develop new features', 'Optimize application performance', 'Collaborate with design team']
};

try {
  const createdJob = await createJob(newJob);
  console.log('Job created successfully:', createdJob);
} catch (error) {
  // Handle error
}
\`\`\`

### Chart Component Example

Example of using the chart component for analytics:

\`\`\`tsx
// Example of using the Chart component for job application analytics
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const applicationData = [
  { month: "Jan", applications: 45 },
  { month: "Feb", applications: 52 },
  { month: "Mar", applications: 49 },
  { month: "Apr", applications: 62 },
  { month: "May", applications: 87 },
  { month: "Jun", applications: 75 },
];

export function ApplicationsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Applications</CardTitle>
        <CardDescription>Monthly application trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer
              data={applicationData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <Chart>
                <XAxis dataKey="month" />
                <YAxis />
                <AreaChart>
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.2}
                  />
                </AreaChart>
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
              </Chart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
\`\`\`

## Customization

### Tailwind Configuration

The application uses a custom Tailwind configuration:

\`\`\`ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
\`\`\`

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your repository to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UI components powered by [shadcn/ui](https://ui.shadcn.com/)
- Charts created with [Recharts](https://recharts.org/)
- Icons from [Lucide React](https://lucide.dev/)

---

© 2025 TalentHub. All rights reserved.
