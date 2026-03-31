import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Nossa Jornada com Deus',
  description: 'Plano devocional para dois — 276 dias, 30 mar → 31 dez',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-180.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: 'Nossa Jornada com Deus',
    description: 'Plano devocional para dois — 276 dias juntos',
    type: 'website',
  },
  themeColor: '#2C2018',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-cream font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
