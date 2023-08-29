import '../styles/globals.css'
import {Poppins} from 'next/font/google'
import Navbar from './components/header/NavBar'
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
    <html lang="en" className={poppins.className}>
      <body>
        <Navbar/>
        {children}
    </body>
    </html>
  )
}
