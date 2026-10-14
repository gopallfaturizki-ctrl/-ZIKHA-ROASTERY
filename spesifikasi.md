# Spesifikasi Lengkap Website Katalog ZIKHA ROASTERY

## 1. Arsitektur & Teknologi

### Stack Teknologi
```
- Framework: Next.js 14 (App Router) dengan Static Export
- Styling: Tailwind CSS + Custom CSS
- Content Management: Markdown (.md) files
- Deployment: Vercel (Static Site)
- Build Tool: Next.js static generation
- Icons: Lucide React
- Fonts: Google Fonts (Playfair Display + Inter)
```

### Struktur Project
```
zikha-roastery/
├── public/
│   ├── images/
│   │   ├── products/
│   │   ├── hero/
│   │   └── logo/
│   └── favicon.ico
├── content/
│   ├── config.md          # Konfigurasi umum (harga, kontak, dll)
│   ├── services.md        # Data jasa roasting
│   ├── products/
│   │   ├── light-roast.md
│   │   ├── medium-roast.md
│   │   └── dark-roast.md
│   └── about.md           # Informasi tentang perusahaan
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ── components/
│   │       ├── Navbar.tsx
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Services.tsx
│   │       ├── Products.tsx
│   │       ├── Contact.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── markdown.ts    # Parser markdown
│   │   └── types.ts       # TypeScript types
│   └── utils/
│       └── constants.ts   # Konstanta aplikasi
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

## 2. Fitur Profesional yang Ditambahkan

### A. Fitur Katalog
1. **Filter & Search Produk**
   - Filter berdasarkan roast level
   - Filter berdasarkan jenis biji (Robusta/Arabica/House Blend)
   - Search bar untuk mencari produk

2. **Product Detail Modal**
   - Popup detail produk dengan informasi lengkap
   - Gallery gambar produk
   - Spesifikasi lengkap (origin, process, roast level, tasting notes)

3. **Shopping Cart (Simulasi)**
   - Tambah produk ke keranjang (localStorage)
   - Lihat total pesanan
   - Checkout via WhatsApp dengan format pesan otomatis

4. **Product Comparison**
   - Bandingkan hingga 3 produk side-by-side
   - Highlight perbedaan spesifikasi

### B. Fitur Konten
5. **Blog/Artikel Section**
   - Artikel tentang kopi
   - Tips brewing
   - Cerita tentang petani

6. **Testimonials**
   - Review dari pelanggan
   - Rating system

7. **FAQ Section**
   - Pertanyaan umum tentang jasa roasting
   - Informasi pengiriman

### C. Fitur UX/UI
8. **Dark/Light Mode Toggle**
9. **Loading Skeleton**
10. **Smooth Animations** (Framer Motion)
11. **Image Lazy Loading**
12. **SEO Optimized** (Meta tags, Open Graph)
13. **PWA Ready** (Progressive Web App)
14. **Accessibility** (ARIA labels, keyboard navigation)

## 3. Template Markdown Files

### File: `content/config.md`
```markdown
---
siteName: "ZIKHA ROASTERY"
tagline: "Growing Goodness Through Coffee"
currency: "Rp"
contact:
  phone: "+6281234567890"
  email: "info@zikharoastery.com"
  address: "Jl. Kopi Nusantara No. 123, Jakarta"
  whatsapp: "6281234567890"
  instagram: "@zikharoastery"
  facebook: "zikharoastery"
operationalHours:
  weekdays: "08:00 - 17:00"
  saturday: "08:00 - 15:00"
  sunday: "Tutup"
shipping:
  available: true
  areas: "Seluruh Indonesia"
  estimate: "2-5 hari kerja"
  cost: "Mulai dari Rp 15.000"
seo:
  title: "ZIKHA ROASTERY - Kopi Premium & Jasa Roasting"
  description: "Kopi berkualitas dari petani lokal, diroasting dengan penuh dedikasi"
  keywords: "kopi, roasting, arabica, robusta, coffee roastery"
---

# Konfigurasi Website ZIKHA ROASTERY

## Informasi Umum
- Nama Bisnis: ZIKHA ROASTERY
- Tagline: Growing Goodness Through Coffee
- Mata Uang: Rupiah (Rp)

## Kontak
- Telepon: +6281234567890
- Email: info@zikharoastery.com
- Alamat: Jl. Kopi Nusantara No. 123, Jakarta
- WhatsApp: 6281234567890
- Instagram: @zikharoastery
- Facebook: zikharoastery

## Jam Operasional
- Senin - Jumat: 08:00 - 17:00
- Sabtu: 08:00 - 15:00
- Minggu: Tutup

## Pengiriman
- Tersedia: Ya
- Area: Seluruh Indonesia
- Estimasi: 2-5 hari kerja
- Biaya: Mulai dari Rp 15.000

## SEO
- Title: ZIKHA ROASTERY - Kopi Premium & Jasa Roasting
- Description: Kopi berkualitas dari petani lokal, diroasting dengan penuh dedikasi
- Keywords: kopi, roasting, arabica, robusta, coffee roastery
```

### File: `content/services.md`
```markdown
---
services:
  - id: "light-roast"
    name: "Light Roast"
    price: 20000
    unit: "kg"
    description: "Roasting ringan yang mempertahankan karakteristik asli biji kopi dengan acidity yang cerah dan flavor yang kompleks."
    features:
      - "Acidity cerah"
      - "Flavor kompleks"
      - "Cocok untuk filter coffee"
    icon: "sun"
    popular: false
  
  - id: "medium-roast"
    name: "Medium Roast"
    price: 20000
    unit: "kg"
    description: "Roasting sedang dengan keseimbangan sempurna antara acidity dan body, menghasilkan rasa yang smooth dan well-rounded."
    features:
      - "Balanced flavor"
      - "Smooth taste"
      - "Versatile brewing"
    icon: "coffee"
    popular: true
  
  - id: "dark-roast"
    name: "Dark Roast"
    price: 20000
    unit: "kg"
    description: "Roasting gelap dengan body yang full, rasa yang bold dan sedikit bitterness yang khas untuk pecinta kopi kuat."
    features:
      - "Bold flavor"
      - "Full body"
      - "Perfect for espresso"
    icon: "flame"
    popular: false
---

# Jasa Roasting ZIKHA ROASTERY

## Layanan Kami
Kami menyediakan jasa roasting profesional untuk biji kopi Anda dengan tiga tingkat roasting yang dapat disesuaikan dengan preferensi rasa Anda.

### Light Roast
- Harga: Rp 20.000/kg
- Cocok untuk: Filter coffee, pour over
- Karakter: Acidity cerah, flavor kompleks

### Medium Roast
- Harga: Rp 20.000/kg
- Cocok untuk: Semua metode brewing
- Karakter: Balanced, smooth, versatile

### Dark Roast
- Harga: Rp 20.000/kg
- Cocok untuk: Espresso, kopi susu
- Karakter: Bold, full body, intense
```

### File: `content/products/light-roast.md`
```markdown
---
category: "Light Roast"
products:
  - id: "robusta-light"
    name: "Robusta Light"
    origin: "Lampung"
    price: 85000
    weight: "250g"
    beanType: "Robusta"
    roastLevel: "Light"
    process: "Natural"
    tastingNotes:
      - "Dark Chocolate"
      - "Nutty"
      - "Spicy"
    description: "Robusta dengan roast ringan, menghasilkan cita rasa yang cerah dengan notes coklat dan坚果."
    image: "/images/products/robusta-light.jpg"
    stock: true
  
  - id: "arabica-light"
    name: "Arabica Light"
    origin: "Lereng Slamet"
    price: 95000
    weight: "250g"
    beanType: "Arabica"
    roastLevel: "Light"
    process: "Washed"
    tastingNotes:
      - "Floral"
      - "Citrus"
      - "Honey"
    description: "Arabica premium dengan acidity yang bright, floral notes, dan finish yang clean."
    image: "/images/products/arabica-light.jpg"
    stock: true
  
  - id: "house-blend-light"
    name: "House Blend Light"
    origin: "Special Blend"
    price: 90000
    weight: "250g"
    beanType: "Blend"
    roastLevel: "Light"
    process: "Mixed"
    tastingNotes:
      - "Balanced"
      - "Smooth"
      - "Sweet"
    description: "Perpaduan sempurna antara robusta dan arabica untuk keseimbangan rasa yang unik."
    image: "/images/products/house-blend-light.jpg"
    stock: true
---

# Produk Light Roast

## Deskripsi Kategori
Light roast mempertahankan karakteristik asli biji kopi dengan acidity yang cerah dan flavor yang kompleks. Cocok untuk metode brewing manual seperti pour over, French press, dan AeroPress.

## Produk Tersedia
1. Robusta Light - Rp 85.000/250g
2. Arabica Light - Rp 95.000/250g
3. House Blend Light - Rp 90.000/250g
```

### File: `content/products/medium-roast.md`
```markdown
---
category: "Medium Roast"
products:
  - id: "robusta-medium"
    name: "Robusta Medium"
    origin: "Lampung"
    price: 85000
    weight: "250g"
    beanType: "Robusta"
    roastLevel: "Medium"
    process: "Natural"
    tastingNotes:
      - "Chocolate"
      - "Caramel"
      - "Nutty"
    description: "Robusta dengan body yang medium, rasa coklat yang kaya dan sedikit nutty finish."
    image: "/images/products/robusta-medium.jpg"
    stock: true
  
  - id: "arabica-medium"
    name: "Arabica Medium"
    origin: "Lereng Slamet"
    price: 95000
    weight: "250g"
    beanType: "Arabica"
    roastLevel: "Medium"
    process: "Washed"
    tastingNotes:
      - "Fruity"
      - "Caramel"
      - "Balanced"
    description: "Arabica dengan keseimbangan sempurna, fruity notes, dan caramel sweetness."
    image: "/images/products/arabica-medium.jpg"
    stock: true
  
  - id: "house-blend-medium"
    name: "House Blend Medium"
    origin: "Special Blend"
    price: 90000
    weight: "250g"
    beanType: "Blend"
    roastLevel: "Medium"
    process: "Mixed"
    tastingNotes:
      - "Well-balanced"
      - "Smooth"
      - "Rich"
    description: "Blend signature kami dengan karakter yang well-balanced dan smooth."
    image: "/images/products/house-blend-medium.jpg"
    stock: true
---

# Produk Medium Roast

## Deskripsi Kategori
Medium roast menawarkan keseimbangan sempurna antara acidity dan body. Pilihan paling populer untuk berbagai metode brewing.

## Produk Tersedia
1. Robusta Medium - Rp 85.000/250g
2. Arabica Medium - Rp 95.000/250g
3. House Blend Medium - Rp 90.000/250g
```

### File: `content/products/dark-roast.md`
```markdown
---
category: "Dark Roast"
products:
  - id: "robusta-dark"
    name: "Robusta Dark"
    origin: "Lampung"
    price: 85000
    weight: "250g"
    beanType: "Robusta"
    roastLevel: "Dark"
    process: "Natural"
    tastingNotes:
      - "Dark Chocolate"
      - "Smoky"
      - "Bold"
    description: "Robusta bold dengan body yang full, rasa dark chocolate dan smoky finish."
    image: "/images/products/robusta-dark.jpg"
    stock: true
  
  - id: "arabica-dark"
    name: "Arabica Dark"
    origin: "Lereng Slamet"
    price: 95000
    weight: "250g"
    beanType: "Arabica"
    roastLevel: "Dark"
    process: "Washed"
    tastingNotes:
      - "Intense"
      - "Rich"
      - "Lingering"
    description: "Arabica dengan intensity tinggi, rich flavor, dan lingering aftertaste yang memorable."
    image: "/images/products/arabica-dark.jpg"
    stock: true
  
  - id: "house-blend-dark"
    name: "House Blend Dark"
    origin: "Special Blend"
    price: 90000
    weight: "250g"
    beanType: "Blend"
    roastLevel: "Dark"
    process: "Mixed"
    tastingNotes:
      - "Bold"
      - "Strong"
      - "Espresso-ready"
    description: "Blend kuat dengan karakter yang bold, perfect untuk espresso dan kopi susu."
    image: "/images/products/house-blend-dark.jpg"
    stock: true
---

# Produk Dark Roast

## Deskripsi Kategori
Dark roast menghasilkan kopi dengan body yang full, rasa yang bold, dan bitterness yang khas. Sempurna untuk espresso dan minuman berbasis susu.

## Produk Tersedia
1. Robusta Dark - Rp 85.000/250g
2. Arabica Dark - Rp 95.000/250g
3. House Blend Dark - Rp 90.000/250g
```

### File: `content/about.md`
```markdown
---
title: "Tentang ZIKHA ROASTERY"
mission: "Menghadirkan kopi berkualitas tinggi dengan mendukung rantai pasok yang berkelanjutan dan memberdayakan petani lokal."
vision: "Menjadi roastery terdepan yang dikenal karena kualitas kopi dan komitmen terhadap keberlanjutan."
values:
  - icon: "coffee"
    title: "Quality Coffee"
    description: "Kopi berkualitas premium"
  - icon: "leaf"
    title: "Sustainable"
    description: "Rantai pasok berkelanjutan"
  - icon: "users"
    title: "Supporting Farmers"
    description: "Mendukung petani lokal"
  - icon: "heart"
    title: "Better Together"
    description: "Berkembang bersama"
story: |
  ZIKHA ROASTERY didirikan dengan passion untuk kopi berkualitas dan komitmen untuk mendukung petani lokal. Kami percaya bahwa kopi yang baik dimulai dari biji yang dipilih dengan teliti dan diproses dengan dedikasi.
  
  Setiap batch kopi yang kami roasting melalui proses quality control yang ketat untuk memastikan konsistensi rasa dan kualitas. Kami bekerja langsung dengan petani untuk memastikan praktik pertanian yang berkelanjutan dan harga yang adil.
---

# Tentang ZIKHA ROASTERY

## Misi
Menghadirkan kopi berkualitas tinggi dengan mendukung rantai pasok yang berkelanjutan dan memberdayakan petani lokal.

## Visi
Menjadi roastery terdepan yang dikenal karena kualitas kopi dan komitmen terhadap keberlanjutan.

## Nilai-Nilai Kami
1. **Quality Coffee** - Kopi berkualitas premium
2. **Sustainable** - Rantai pasok berkelanjutan
3. **Supporting Farmers** - Mendukung petani lokal
4. **Better Together** - Berkembang bersama

## Cerita Kami
ZIKHA ROASTERY didirikan dengan passion untuk kopi berkualitas dan komitmen untuk mendukung petani lokal. Kami percaya bahwa kopi yang baik dimulai dari biji yang dipilih dengan teliti dan diproses dengan dedikasi.

Setiap batch kopi yang kami roasting melalui proses quality control yang ketat untuk memastikan konsistensi rasa dan kualitas. Kami bekerja langsung dengan petani untuk memastikan praktik pertanian yang berkelanjutan dan harga yang adil.
```

## 4. Konfigurasi Teknis

### File: `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
```

### File: `vercel.json`
```json
{
  "buildCommand": "next build",
  "outputDirectory": "out",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### File: `package.json`
```json
{
  "name": "zikha-roastery",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.1",
    "remark-html": "^16.0.1",
    "lucide-react": "^0.294.0",
    "framer-motion": "^10.16.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

## 5. Cara Penggunaan

### Mengubah Harga Produk
Edit file `content/products/[roast-level].md`:
```markdown
products:
  - id: "robusta-light"
    name: "Robusta Light"
    price: 85000  # Ubah angka ini
    weight: "250g"
```

### Mengubah Harga Jasa Roasting
Edit file `content/services.md`:
```markdown
services:
  - id: "light-roast"
    name: "Light Roast"
    price: 20000  # Ubah angka ini
    unit: "kg"
```

### Mengubah Informasi Kontak
Edit file `content/config.md`:
```markdown
contact:
  phone: "+6281234567890"  # Ubah nomor ini
  email: "info@zikharoastery.com"
  whatsapp: "6281234567890"
```

### Menambah Produk Baru
1. Buka file `content/products/[roast-level].md` yang sesuai
2. Tambahkan entry baru di array `products`
3. Tambahkan gambar di folder `public/images/products/`
4. Rebuild website

### Mengubah Warna Brand
Edit file `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      'dark-brown': '#3E2F25',
      'beige': '#D9C9B2',
      'coffee-green': '#4B5E3F',
      'charcoal': '#2B2B2B',
    }
  }
}
```

## 6. Deployment ke Vercel

### Langkah-langkah:
1. Push code ke GitHub repository
2. Buka [vercel.com](https://vercel.com)
3. Import project dari GitHub
4. Vercel akan auto-detect Next.js
5. Klik "Deploy"
6. Website akan live dalam 1-2 menit

### Update Konten:
1. Edit file `.md` di repository
2. Commit dan push ke GitHub
3. Vercel akan auto-deploy perubahan

## 7. Fitur Tambahan yang Direkomendasikan

1. **Analytics**: Tambahkan Google Analytics atau Plausible
2. **Newsletter**: Integrasi dengan Mailchimp atau ConvertKit
3. **Live Chat**: Tambahkan Tawk.to atau Crisp
4. **Reviews**: Integrasi dengan Google Reviews
5. **Instagram Feed**: Tampilkan feed Instagram terbaru

Website ini fully static, tidak memerlukan database atau backend, dan dapat dihosting gratis di Vercel dengan performa tinggi.
