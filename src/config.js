// Site geneli, dilden bağımsız teknik/iletişim bilgileri.
// Tüm kullanıcıya görünen metinler src/i18n/content/{tr,en,ar}.js içindedir.
export const SITE = {
  name: 'İthalyem.com',
  url: 'https://ithalyem.com',
  phoneDisplay: '0545 133 28 59',
  phoneRaw: '+905451332859',
  whatsapp: '905451332859',
  email: 'info@ithalyem.com',
}

// Teklif formu gönderim ayarları.
// formspreeId doldurulursa form Formspree üzerinden gönderilir; boş ise mailto fallback kullanılır.
export const QUOTE = {
  formspreeId: '', // örn: 'xmyzabcd' → https://formspree.io/f/xmyzabcd
  mailto: 'info@ithalyem.com',
}

// WhatsApp linki, opsiyonel ön tanımlı mesaj ile.
export const waLink = (message) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`

// Ürünlerin dilden bağımsız meta verisi. Metinler (ad, özet, analiz vb.)
// content sözlüklerinde products.items[id] altında tutulur.
export const PRODUCT_META = [
  { id: 'kepek', slug: 'bugday-kepegi', category: 'hayvan-yemleri', hideAnalysis: false },
  { id: 'pamuk-kuspesi', slug: 'pamuk-yagi-kuspesi', category: 'hayvan-yemleri', hideAnalysis: false },
  { id: 'atk-36', slug: 'atk-36', category: 'hayvan-yemleri', hideAnalysis: false },
  { id: 'ddgs', slug: 'ddgs', category: 'hayvan-yemleri', hideAnalysis: false },
  { id: 'findik-kabugu', slug: 'findik-kabugu', category: 'kabuk-urunleri', hideAnalysis: true },
  { id: 'nar-kabugu', slug: 'nar-kabugu', category: 'kabuk-urunleri', hideAnalysis: true },
]

// Kategori sırası (başlık/açıklama content'te).
export const CATEGORY_IDS = ['hayvan-yemleri', 'kabuk-urunleri']

// Lojistikte hizmet verilen il anahtarları (isimler content.cities.names'te).
export const SERVICE_CITY_KEYS = [
  'erzurum', 'malatya', 'elazig', 'igdir', 'kars', 'van', 'agri',
  'bingol', 'mus', 'erzincan', 'kayseri', 'tokat', 'diyarbakir',
]

export const metaBySlug = (slug) => PRODUCT_META.find((p) => p.slug === slug)
export const metasByCategory = (categoryId) =>
  PRODUCT_META.filter((p) => p.category === categoryId)

// Blog yazılarının gösterim sırası (içerik content.blog.posts[slug] altında).
export const BLOG_SLUGS = ['kepek-nisasta-32', 'hopa-lojistik', 'kuspe-vs-atk']

// Dil koduna karşılık gelen Intl locale.
export const INTL_LOCALE = { tr: 'tr-TR', en: 'en-US', ar: 'ar' }
