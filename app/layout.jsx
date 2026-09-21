import { Analytics } from '@vercel/analytics/next'
import { Manrope, Outfit } from 'next/font/google'
import './globals.css'

const _manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const _outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata = {
  title: 'Uday Gupta — Software Developer | C#, .NET, REST APIs',
  description:
    'Portfolio of Uday Gupta, a software developer building scalable web applications, secure REST APIs and modern digital experiences with C#, .NET, ASP.NET MVC, SQL Server and Node.js.',
  keywords: [
    'Uday Gupta',
    'Software Developer',
    'C#',
    '.NET',
    'ASP.NET MVC',
    'REST API',
    'JWT',
    'SQL Server',
    'MongoDB',
    'Node.js',
  ],
  openGraph: {
    title: 'Uday Gupta — Software Developer',
    description:
      'Building scalable web applications, secure REST APIs and modern digital experiences.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#080807',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`bg-background ${_manrope.variable} ${_outfit.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-background text-foreground font-sans antialiased"
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
