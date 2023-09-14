import '../styles/globals.css'
import {Poppins} from 'next/font/google'
import Navbar from '@/components/ui/header/NavBar'
import Provider from '@/components/context/Provider'
const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins'
})

export const metadata = {
  title: 'Tessera',
  description: 'Event Ticket Sales Platform',
}

export default function RootLayout({ children }) {
  return (
        <Provider>
    <html lang="en" className={poppins.className}>
            <body className='bg-primary'>
                <div className="min-h-screen flex flex-col relative bg-primary">
                    <Navbar />
                <main className="mx-auto w-full px-10 py-5 bg-primary mt-2">
                    {children}
                </main>
            </div>
            </body>
    </html>
        </Provider>
  )
}
