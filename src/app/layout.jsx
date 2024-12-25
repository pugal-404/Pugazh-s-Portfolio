import './globals.css'
import { Inter } from 'next/font/google'
import ClientLayout from './ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pugazholi R - Web3 Portfolio',
  description: 'Frontend Developer | Blockchain Enthusiast | AI Researcher',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white bg-gray-900`}>
        <ClientLayout>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  )
}

