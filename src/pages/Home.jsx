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

  // Organization schema'sı index.html'de site geneli olarak zaten yayınlanıyor.
  // Burada onu tekrarlamak yerine ana sayfaya özgü WebSite düğümünü veriyoruz.
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: c.seo.home.desc,
    inLanguage: ['tr', 'en', 'ar'],
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  }

  return (
    <>
      <Seo title={c.seo.home.title} description={c.seo.home.desc} path="/" jsonLd={homeJsonLd} />
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
