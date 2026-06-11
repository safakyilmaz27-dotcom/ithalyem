# İthalyem.com

Orta Asya'dan Doğu Anadolu'ya güvenilir yem ham maddesi tedariki — kurumsal tanıtım sitesi.

İthal kepek (%32 nişasta), pamuk yağı küspesi (%22.80 protein), ATK 36 ve DDGS ürünleri için B2B tanıtım ve iletişim sitesi.

## Teknoloji

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) ikonları

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
