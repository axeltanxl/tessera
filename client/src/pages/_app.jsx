import Navbar from '@/components/ui/header/NavBar'
import '../styles/globals.css';
import {Poppins} from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins'
})
function MyApp({ Component, pageProps }) {
  return <main className={`${poppins.className} bg-primary`}>
    <Navbar/>
    <Component {...pageProps} />
  </main>
}

export default MyApp