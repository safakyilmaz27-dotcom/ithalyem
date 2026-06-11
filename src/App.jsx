import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Advantages from './components/Advantages'
import Products from './components/Products'
import Logistics from './components/Logistics'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Advantages />
        <Products />
        <Logistics />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
