import Hero from "@/components/hero"
import About from "@/components/about"
import HowItWorks from "@/components/how-it-works"
import LiveDemo from "@/components/live-demo"
import Team from "@/components/team"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Hero />
      <Chatbot />
      <About />
      <HowItWorks />
      <LiveDemo />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}

