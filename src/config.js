// Site geneli iletişim ve marka bilgileri — tek yerden yönetilir.
export const SITE = {
  name: 'İthalyem.com',
  slogan: "Orta Asya'dan Türkiye'ye Güvenilir Yem Ham Maddesi Tedariki",
  phoneDisplay: '0545 133 28 59',
  phoneRaw: '+905451332859',
  whatsapp: '905451332859',
  email: 'info@ithalyem.com',
  region: 'Doğu Anadolu Bölgesi',
}

// WhatsApp linki, opsiyonel ön tanımlı mesaj ile.
export const waLink = (message) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`

export const PRODUCTS = [
  {
    id: 'kepek',
    category: 'hayvan-yemleri',
    name: 'Kepek',
    tag: 'Ana Ürün',
    origin: 'Orta Asya',
    summary:
      'Yüksek besleyici değere sahip, Orta Asya menşeli ithal kepek. Piyasa ortalamasının üzerinde nişasta oranıyla yem rasyonlarında enerji kaynağı.',
    badge: { label: 'Nişasta', value: '%32' },
    specs: [
      { label: 'Nişasta Oranı', value: '%32' },
      { label: 'Menşei', value: 'Orta Asya' },
      { label: 'Kullanım', value: 'Büyükbaş & Yem Fabrikası' },
    ],
    highlight: 'Piyasa ortalamasının üzerinde %32 nişasta oranı',
  },
  {
    id: 'pamuk-kuspesi',
    category: 'hayvan-yemleri',
    name: 'Pamuk Yağı Küspesi',
    tag: 'Yüksek Protein',
    origin: 'Orta Asya',
    summary:
      'Yüksek protein içeriğiyle özellikle Doğu Anadolu’daki besiciler ve yem fabrikaları için ideal protein kaynağı.',
    badge: { label: 'Protein', value: '%22.80' },
    specs: [
      { label: 'Protein Oranı', value: '%22.80' },
      { label: 'Menşei', value: 'Orta Asya' },
      { label: 'Kullanım', value: 'Besi & Süt Hayvancılığı' },
    ],
    highlight: 'Besiciler için ideal %22.80 protein oranı',
  },
  {
    id: 'atk-36',
    category: 'hayvan-yemleri',
    name: 'ATK 36 (Ayçiçeği Tohumu Küspesi)',
    tag: 'Yüksek Protein',
    origin: 'Orta Asya',
    summary:
      'Yüksek proteinli ayçiçeği tohumu küspesi. Yem rasyonlarında dengeli protein takviyesi için tercih edilen ham madde.',
    badge: { label: 'Protein', value: '%36' },
    specs: [
      { label: 'Protein Oranı', value: '%36' },
      { label: 'Menşei', value: 'Orta Asya' },
      { label: 'Kullanım', value: 'Yem Rasyonu Protein Takviyesi' },
    ],
    highlight: 'Yüksek %36 protein oranı',
  },
  {
    id: 'ddgs',
    category: 'hayvan-yemleri',
    name: 'DDGS',
    tag: 'Enerji & Protein',
    origin: 'İthal',
    summary:
      'Kurutulmuş Damıtık Tahıl ve Çözünürleri (DDGS) — hem enerji hem protein deposu ithal ham madde. Yüksek verimli rasyonların vazgeçilmezi.',
    badge: { label: 'Enerji + Protein', value: 'Deposu' },
    specs: [
      { label: 'İçerik', value: 'Enerji + Protein' },
      { label: 'Menşei', value: 'İthal' },
      { label: 'Kullanım', value: 'Yüksek Verimli Rasyon' },
    ],
    highlight: 'Enerji ve protein deposu ithal ham madde',
  },
  {
    id: 'findik-kabugu',
    category: 'kabuk-urunleri',
    name: 'Fındık Kabuğu',
    tag: 'Doğal Yan Ürün',
    origin: 'Türkiye',
    hideAnalysis: true,
    summary:
      'Kurutulmuş fındık kabuğu — biyokütle yakıt, organik gübre ve hayvan altlığı uygulamaları için doğal yerli yan ürün. Toplu tedarik imkânı.',
    badge: { label: 'Menşei', value: 'Yerli' },
    specs: [
      { label: 'Form', value: 'Kuru, Doğal' },
      { label: 'Menşei', value: 'Türkiye' },
      { label: 'Kullanım', value: 'Biyokütle & Altlık' },
    ],
    highlight: 'Biyokütle ve altlık için doğal yerli kaynak',
  },
  {
    id: 'nar-kabugu',
    category: 'kabuk-urunleri',
    name: 'Kurutulmuş Nar Kabuğu',
    tag: 'Doğal Yan Ürün',
    origin: 'Türkiye',
    hideAnalysis: true,
    summary:
      'Doğal yöntemlerle kurutulmuş nar kabuğu — ekstrakt, bitkisel ürün ve yem katkı sektörü için değerli ham madde. İstenen miktarda tedarik.',
    badge: { label: 'Form', value: 'Kuru' },
    specs: [
      { label: 'Form', value: 'Kurutulmuş' },
      { label: 'Menşei', value: 'Türkiye' },
      { label: 'Kullanım', value: 'Ekstrakt & Yem Katkı' },
    ],
    highlight: 'Ekstrakt ve katkı sektörü için kurutulmuş ham madde',
  },
]

// Ürünler iki ana kategoride gruplanır: hayvan yemleri ve doğal kabuk ürünleri.
export const CATEGORIES = [
  {
    id: 'hayvan-yemleri',
    title: 'Hayvan Yemleri',
    description:
      'Orta Asya menşeli, yüksek analiz değerli ithal yem ham maddeleri.',
  },
  {
    id: 'kabuk-urunleri',
    title: 'Fındık & Nar Kabuğu',
    description:
      'Doğal yöntemlerle kurutulmuş yerli kabuk ürünleri — biyokütle ve katkı sektörü için.',
  },
]

// Bir kategoriye ait ürünleri döndürür.
export const productsByCategory = (categoryId) =>
  PRODUCTS.filter((p) => p.category === categoryId)
