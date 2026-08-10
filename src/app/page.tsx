import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import About from '@/components/sections/About'
import ManagingDirector from '@/components/sections/ManagingDirector'
import Expertise from '@/components/sections/Expertise'
import Credentials from '@/components/sections/Credentials'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <ManagingDirector />
      <Expertise />
      <Credentials />
      <Footer />
    </main>
  )
}
