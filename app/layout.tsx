import Footer from '@/components/Footer'
import './globals.css'
import Header from '@/components/Header'

const SITE_URL = process.env.SITE_URL

export const metadata = {
  title: 'Gompose',
  description: 'A ready-to-run and flexible backend framework for Go that gets your services up and running in seconds.',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: ["Gompose", "Go framework", "REST API", "Backend", "Documentation"],
  authors: [{ name: "Iman Asgari", url: "https://www.linkedin.com/in/unk-iman-dev" }],
  openGraph: {
    title: "Gompose",
    description: "A ready-to-run and flexible backend framework for Go that gets your services up and running in seconds.",
    url: `${SITE_URL}`,
    siteName: "Gompose",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Gompose"
      }
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gompose",
    description: "A ready-to-run and flexible backend framework for Go that gets your services up and running in seconds.",
    images: [`${SITE_URL}/og-image.png`],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
