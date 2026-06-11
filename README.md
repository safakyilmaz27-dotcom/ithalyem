# İthalyem.com

Orta Asya'dan Doğu Anadolu'ya güvenilir yem ham maddesi tedariki — kurumsal tanıtım sitesi.

İthal kepek (%32 nişasta), pamuk yağı küspesi (%22.80 protein), ATK 36 ve DDGS ürünleri için B2B tanıtım ve iletişim sitesi.

## Teknoloji

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [React Router 6](https://reactrouter.com/) — sayfa yönlendirme (ürün detay sayfaları, /teklif)
- [react-helmet-async](https://github.com/staylor/react-helmet-async) — sayfa başına dinamik SEO etiketleri ve JSON-LD
- [Tailwind CSS 4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) ikonları

## Diller (TR / EN / AR)

- Site üç dillidir: Türkçe (varsayılan), İngilizce ve Arapça. Dil, sağ üstteki **küre (🌐)**
  menüsünden değiştirilir ve `localStorage`'da saklanır. Arapça'da sayfa otomatik olarak
  **sağdan-sola (RTL)** moduna geçer (`<html dir="rtl">`).
- Tüm metinler `src/i18n/content/{tr,en,ar}.js` dosyalarındadır. Üç dosya **aynı yapıya** sahip
  olmalıdır; bir metni güncellerken üçünü birden güncelleyin.
- Yeni dil eklemek için: yeni bir `content/<kod>.js` oluşturup `src/i18n/LanguageContext.jsx`
  içindeki `CONTENT` ve `LANGS` listelerine ekleyin (RTL ise `RTL_LANGS`'a da).
- ⚠️ Arapça çeviriler makine çevirisidir; yayından önce bir ana dil konuşanın gözden geçirmesi önerilir.

## İçerik Güncelleme

- **Stok durumu:** `public/data/stock.json` dosyasını elle düzenleyin (CMS gerekmez).
  `tarih` her dil için (`{ tr, en, ar }`), `durumlar` dizisi ürün/bölge/teslim/durum **anahtarları**
  ile tutulur (dile göre otomatik çevrilir). Anahtarlar: `durum` = `stokta`/`sinirli`/`yolda`,
  `teslim` = `depo-liman`/`depo`/`liman`, `id` = ürün id'si, `regions` = şehir anahtarları.
- **Blog yazıları:** `src/i18n/content/{tr,en,ar}.js` → `blog.posts` altında (üç dilde). Yeni yazı
  eklerken slug'ı `src/config.js` → `BLOG_SLUGS` dizisine de ekleyin.
- **Ürünler / analiz değerleri:** `src/config.js` içindeki `PRODUCTS` dizisi.
- **Teklif formu:** Formspree kullanmak için `src/config.js` → `QUOTE.formspreeId` doldurun;
  boş bırakılırsa form `mailto:` ile gönderilir.

## Yönlendirme Notu

Ürün ve teklif sayfaları gerçek URL'lerdir (`/urunler/...`, `/teklif`). GitHub Pages'te
derin URL yenilemelerinin çalışması için `public/404.html` SPA yönlendirme tekniği kullanılır.

## Geliştirme

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # dist/ klasörüne production build
npm run preview  # build önizleme
```

## Yayın

`main` dalına her push'ta GitHub Actions (`.github/workflows/deploy.yml`) siteyi otomatik build edip
GitHub Pages'e yayınlar. Özel domain: **ithalyem.com** (`public/CNAME`).
