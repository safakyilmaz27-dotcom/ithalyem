import Seo from '../components/Seo'
import Hero from '../components/Hero'
import Advantages from '../components/Advantages'
import Products from '../components/Products'
import StockStatus from '../components/StockStatus'
import SocialProof from '../components/SocialProof'
import HopaComparison from '../components/HopaComparison'
import Logistics from '../components/Logistics'
import ContactForm from '../components/ContactForm'
import { SITE } from '../config'
import { useLang } from '../i18n/LanguageContext'

export default function Home() {
  const { c } = useLang()

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: c.seo.home.desc,
    areaServed: 'Doğu Anadolu Bölgesi, Türkiye',
    email: SITE.email,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phoneRaw,
      contactType: 'sales',
      availableLanguage: ['Turkish', 'English', 'Arabic'],
    },
  }

  return (
    <>
      <Seo title={c.seo.home.title} description={c.seo.home.desc} path="/" jsonLd={orgJsonLd} />
      <Hero />
      <Advantages />
      <Products />
      <StockStatus />
      <SocialProof />
      <HopaComparison />
      <Logistics />
      <ContactForm />
    </>
  )
}
