// Site geneli, dilden bağımsız teknik/iletişim bilgileri.
// Tüm kullanıcıya görünen metinler src/i18n/content/{tr,en,ar}.js içindedir.
export const SITE = {
  name: 'İthalyem.com',
  url: 'https://ithalyem.com',
  phoneDisplay: '0545 133 28 59',
  phoneRaw: '+905451332859',
  whatsapp: '905451332859',
  email: 'info@ithalyem.com',
  // Sosyal paylaşım / Open Graph varsayılan görseli (public/og-cover.png).
  ogImage: 'https://ithalyem.com/og-cover.png',
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

// Bölge (şehir) sayfaları: /bolgeler/<slug>.
//
// Her il ayrı bir URL ve ayrı bir arama niyeti demektir ("erzurum kepek
// fiyatları", "kars ithal buğday kepeği" ...). Sayfa metni tek bir şablondan
// üretilir (bkz. content.regions.build); burada yalnızca ile özgü değişkenler
// tutulur: görünen ad, ilçeler ve iç bağlantı verilecek komşu iller.
export const REGION_META = [
  { id: 'erzurum', slug: 'erzurum-ithal-bugday-kepegi',
    districts: ['Yakutiye', 'Palandöken', 'Aziziye', 'Horasan', 'Pasinler', 'Oltu'],
    neighbors: ['kars', 'erzincan', 'agri', 'igdir', 'bayburt', 'mus', 'ardahan'] },
  { id: 'kars', slug: 'kars-ithal-bugday-kepegi',
    districts: ['Merkez', 'Sarıkamış', 'Selim', 'Kağızman', 'Digor', 'Arpaçay'],
    neighbors: ['erzurum', 'ardahan', 'igdir', 'agri', 'erzincan'] },
  { id: 'erzincan', slug: 'erzincan-ithal-bugday-kepegi',
    districts: ['Merkez', 'Tercan', 'Üzümlü', 'Refahiye', 'Çayırlı', 'Kemah'],
    neighbors: ['erzurum', 'bayburt', 'mus', 'kars'] },
  { id: 'agri', slug: 'agri-ithal-bugday-kepegi',
    districts: ['Merkez', 'Doğubayazıt', 'Patnos', 'Eleşkirt', 'Diyadin', 'Tutak'],
    neighbors: ['igdir', 'kars', 'mus', 'erzurum'] },
  { id: 'igdir', slug: 'igdir-ithal-bugday-kepegi',
    districts: ['Merkez', 'Tuzluca', 'Aralık', 'Karakoyunlu'],
    neighbors: ['kars', 'agri', 'ardahan', 'erzurum'] },
  { id: 'mus', slug: 'mus-ithal-bugday-kepegi',
    districts: ['Merkez', 'Bulanık', 'Malazgirt', 'Varto', 'Hasköy', 'Korkut'],
    neighbors: ['agri', 'erzurum', 'erzincan', 'kars'] },
  { id: 'bayburt', slug: 'bayburt-ithal-bugday-kepegi',
    districts: ['Merkez', 'Demirözü', 'Aydıntepe'],
    neighbors: ['erzurum', 'erzincan', 'kars', 'ardahan'] },
  { id: 'ardahan', slug: 'ardahan-ithal-bugday-kepegi',
    districts: ['Merkez', 'Göle', 'Çıldır', 'Hanak', 'Posof', 'Damal'],
    neighbors: ['kars', 'erzurum', 'igdir', 'agri'] },
]

export const regionBySlug = (slug) => REGION_META.find((r) => r.slug === slug)

export const metaBySlug = (slug) => PRODUCT_META.find((p) => p.slug === slug)
export const metasByCategory = (categoryId) =>
  PRODUCT_META.filter((p) => p.category === categoryId)

// Blog yazılarının gösterim sırası (içerik content.blog.posts[slug] altında).
export const BLOG_SLUGS = [
  'bugday-kepegi-ton-fiyati-nasil-belirlenir',
  'ithal-bugday-kepegi-mi-yerli-kepek-mi',
  'toptan-kepek-alim-rehberi',
  'suriyede-nohut-pazari',
  'toptan-kepek-satis-rehberi',
  'toptan-kepek-yem-ham-maddesi-rehberi',
  'ithal-kepek-verimlilik-ekonomik-cozumler',
  'ithal-kepek-nedir-hayvan-beslemede-onemi',
  'dogru-kepek-tedarikcisi-secimi',
  'dogu-anadolu-yem-sektoru',
  'erzurum-kepek-fiyati-analizi',
  'kalin-kepek-ince-kepek-farklari',
  'ithal-kepek-besin-degerleri',
  'hammadde-ithalat-kalite-kontrol',
  'yem-maliyetlerini-dusurme-stratejileri',
  'gelecegin-hayvanciligi-surdurulebilir-yem',
  'yuksek-nisastali-ithal-kepek',
  'ithal-bugday-kepegi-nedir',
  'pamuk-yagi-kuspesi-nedir',
  'kepek-nisasta-32',
  'hopa-lojistik',
  'kuspe-vs-atk',
]

// Dil koduna karşılık gelen Intl locale.
export const INTL_LOCALE = { tr: 'tr-TR', en: 'en-US', ar: 'ar' }
