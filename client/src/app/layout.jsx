import '../styles/globals.css'
import {Poppins} from 'next/font/google'
import Navbar from '@/components/ui/header/NavBar'
import Provider from '@/components/context/Provider'
import { getServerSession } from 'next-auth'
const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins'
})

export const metadata = {
  title: 'Tessera',
  description: 'Event Ticket Sales Platform',
}

export default async function RootLayout({ children }) {
    const session = await getServerSession();
  return (
      <html lang="en" className={poppins.className}>
        <Provider session={session}>
            <body className='bg-primary'>
                <div className="min-h-screen flex flex-col relative bg-primary">
                    <Navbar />
                <main className="mx-auto w-full px-10 py-5 bg-primary mt-2">
                    {children}
                </main>
            </div>
            </body>
        </Provider>
    </html>
  )
}
