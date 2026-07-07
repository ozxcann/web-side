import { Project } from "./types";

const newsPortal: Project = {
  slug: "news-portal",
  title: "News Portal - Modern Haber Sitesi",
  description: "İlk web geliştirme projelerimden biri. Dinamik haber kartları, finans ticker'ı ve responsive tasarımıyla modern bir haber portalı simülasyonu",
  longDescription: `Web geliştirme yolculuğumun ilk projelerinden biri olan bu haber portalı, SE 3355 Web Development dersi midterm projesi olarak geliştirildi.

Proje, modern bir haber sitesinin tüm temel özelliklerini içerir: dinamik haber yükleme, finans ticker'ı, yazar profilleri ve tam responsive tasarım. Backend veya veritabanı kullanmadan, JSON verisiyle beslenen bu site, front-end geliştirme becerilerimi geliştirmek için tasarlanmıştır.

Fetch API kullanarak JSON'dan veri çekme, responsive design prensipleri ve interaktif UI elementleri ile gerçek dünya senaryolarını simüle eder. Bu proje sayesinde HTML, CSS ve JavaScript temellerini sağlamlaştırdım.`,
  thumbnail: "/projects/news-staticWeb/news_staticWeb_main_photo.png",
  images: [
    "/projects/news-staticWeb/photo1.png",
    "/projects/news-staticWeb/photo2.png",
    "/projects/news-staticWeb/photo3.png",
  ],
  technologies: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "Fetch API",
    "JSON",
    "Responsive Design",
    "GitHub Pages",
  ],
  features: [
    "JSON'dan dinamik haber kartları yükleme",
    "Gerçek zamanlı finans ticker simülasyonu",
    "Yazarlar/Köşe yazarları bölümü",
    "Fully responsive mobile-first tasarım",
    "İnteraktif dropdown menüler",
    "Hava durumu widget entegrasyonu",
    "Mobil için optimize edilmiş navbar",
    "Dinamik slider/carousel",
    "Reklam alanları yönetimi",
    "Touch-friendly mobile UI",
  ],
  sections: [
    {
      id: "overview",
      title: "Genel Bakış",
      content: `News Portal, web geliştirme yolculuğumun ilk projelerinden biri olarak, modern bir haber sitesinin tüm temel özelliklerini barındıran front-end odaklı bir projedir.

Proje Hikayesi:
Bu proje, web development öğrenmeye başladığım ilk dönemlerde, SE 3355 Web Development dersi midterm projesi olarak geliştirildi. HTML, CSS ve JavaScript temellerini pekiştirmek ve gerçek dünya uygulamaları yaratma deneyimi kazanmak için ideal bir öğrenme aracı oldu.

Proje Amacı:
Front-end geliştirme becerilerini gerçek dünya senaryolarıyla birleştirerek, sıfırdan bir haber portalı inşa etmek.

Teknik Yaklaşım:
- Backend/Database kullanmadan statik JSON ile veri yönetimi
- Fetch API ile asenkron veri yükleme
- Responsive design prensipleri
- Modern JavaScript ES6+ özellikleri

Canlı Demo:
Proje GitHub Pages üzerinden yayında: https://omdgn.github.io/newsPortal/homepage.html

İlk projelerimden biri olmasına rağmen, profesyonel bir haber sitesinin görünümünü ve temel işlevselliğini başarıyla simüle ediyor.`,
    },
    {
      id: "features",
      title: "Temel Özellikler",
      content: `News Portal, modern bir haber sitesinin tüm kritik bileşenlerini içerir:

1. Dinamik Haber Sistemi:
   JSON dosyasından Fetch API ile haber verisi çekme
   Dinamik haber kartları oluşturma
   Kategori bazlı filtreleme yapısı

2. Finans Ticker:
   Borsa/döviz bilgilerini simüle eden ticker
   Animasyonlu piyasa hareketleri
   Gerçek zamanlı görünüm

3. Yazarlar Bölümü:
   Köşe yazarları ve editörler profilleri
   Yazar kartları ile dinamik gösterim
   Hover efektleri ve detaylı bilgiler

4. İnteraktif Menüler:
   Dropdown navigasyon menüleri
   Kategori bazlı alt menüler
   Placeholder subcategories

5. Hava Durumu Widget:
   Entegre hava durumu gösterimi
   Lokasyon bazlı bilgiler
   Görsel weather icons

6. Reklam Yönetimi:
   Stratejik reklam alanları
   Responsive ad placement
   Mobilde gizlenebilir yapı`,
    },
    {
      id: "responsive-design",
      title: "Responsive Tasarım",
      content: `Proje, mobile-first yaklaşımıyla tam responsive bir deneyim sunar:

Desktop Özellikleri:
- Geniş layout ile 3-sütunlu grid
- Sidebar'da reklam ve yazar bölümleri
- Tam genişlik slider/carousel
- Detaylı navigasyon menüleri

Tablet Optimizasyonu:
- 2-sütunlu grid layout
- Optimize edilmiş spacing
- Touch-friendly butonlar
- Dengeli content distribution

Mobile Tasarım:
- Slider %95 genişliğe küçülür
- Reklam bölümleri gizlenir
- Yazarlar bölümü gizlenir
- Navbar ve haber kartları dikey stack
- Hamburger menu (planlanan)
- Touch-optimized interactive elements

Responsive Breakpoints:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

CSS Media Queries ile her ekran boyutunda optimize edilmiş görünüm sağlanmıştır.`,
    },
    {
      id: "data-management",
      title: "Veri Yönetimi ve Fetch API",
      content: `Proje, backend kullanmadan JSON tabanlı veri yönetimi sistemi kullanır:

JSON Veri Yapısı:
- Haber objeleri (başlık, içerik, kategori, tarih, görsel)
- Yazar bilgileri
- Finans verileri
- Metadata

Fetch API Kullanımı:
JavaScript Fetch API ile JSON dosyalarından asenkron veri çekme:

async function loadNews() {
  const response = await fetch('data/news.json');
  const newsData = await response.json();
  renderNewsCards(newsData);
}

Avantajlar:
✓ Backend gereksinimsiz geliştirme
✓ Hızlı prototipleme
✓ Kolay deployment (GitHub Pages)
✓ Asenkron veri yükleme
✓ JSON ile esnek veri yapısı

Dinamik Rendering:
Fetch edilen veriler JavaScript ile DOM'a dinamik olarak eklenir, böylece içerik güncellemeleri kolaylaşır.`,
    },
    {
      id: "ui-components",
      title: "UI Bileşenleri ve İnteraktivite",
      content: `News Portal, modern web UI standartlarına uygun interaktif bileşenler içerir:

1. Haber Kartları:
   - Hover efektleri
   - Görsel önizlemeler
   - Kategori etiketleri
   - Tarih damgası
   - Dinamik içerik truncation

2. Navigation Bar:
   - Sticky header
   - Dropdown menüler
   - Active state highlighting
   - Mobile-optimized

3. Slider/Carousel:
   - Auto-play özelliği
   - Manuel navigation arrows
   - Dot indicators
   - Responsive images
   - Smooth transitions

4. Finans Ticker:
   - Yatay scrolling animation
   - Renk kodlu değişimler (↑ yeşil, ↓ kırmızı)
   - Continuous loop
   - Pause on hover

5. Yazar Kartları:
   - Profil fotoğrafları
   - Bio snippets
   - Social media links
   - Hover zoom effects

6. Search Bar:
   - Real-time arama (planlanan)
   - Autocomplete öneriler
   - Icon integration

Tüm componentler CSS3 transitions ve JavaScript events ile interaktif hale getirilmiştir.`,
    },
    {
      id: "styling-approach",
      title: "Styling ve CSS Metodolojisi",
      content: `Proje, modern CSS teknikleri ve best practices kullanır:

CSS Organizasyonu:
- Global styles (reset, typography)
- Component-specific styles
- Responsive utilities
- Animation definitions

Kullanılan CSS Teknikleri:

1. Flexbox Layout:
   Navbar, haber kartları ve footer için esnek layout sistemleri

2. CSS Grid:
   Ana content alanı için grid-based layout

3. CSS Transitions:
   Hover efektleri, dropdown animasyonları

4. Media Queries:
   Responsive breakpoints için

5. CSS Variables (Custom Properties):
   Renk temaları ve spacing sistemi (opsiyonel)

Tipografi:
- Web-safe font families
- Responsive font-sizing
- Line-height optimizasyonu
- Readability focus

Renk Paleti:
- Primary: Haber kategorileri
- Secondary: UI elementleri
- Neutral: Text ve backgrounds
- Accent: CTA butonları

CSS best practices ile temiz, maintainable ve scalable kod yapısı sağlanmıştır.`,
    },
    {
      id: "performance",
      title: "Performance ve Optimizasyon",
      content: `News Portal, optimal performans için çeşitli teknikler kullanır:

Image Optimization:
- Compressed images
- Appropriate image formats (WebP fallback)
- Lazy loading for below-fold images
- Responsive image sizing

Code Optimization:
- Minified CSS (production)
- Efficient JavaScript
- Minimal DOM manipulation
- Event delegation where applicable

Loading Strategy:
- Critical CSS inline (opsiyonel)
- Deferred non-critical scripts
- Async data fetching
- Progressive enhancement

Caching:
- Browser cache headers (GitHub Pages)
- Static asset caching
- Service Worker (future enhancement)

Performance Metrikleri:
✓ Fast First Contentful Paint (FCP)
✓ Quick Time to Interactive (TTI)
✓ Minimal Cumulative Layout Shift (CLS)
✓ Optimized Largest Contentful Paint (LCP)

Accessibility:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly

Bu optimizasyonlar sayesinde hızlı ve erişilebilir bir kullanıcı deneyimi sağlanır.`,
    },
    {
      id: "deployment",
      title: "Deployment ve GitHub Pages",
      content: `Proje, GitHub Pages üzerinden ücretsiz hosting ile yayınlanmıştır:

GitHub Pages Avantajları:
✓ Ücretsiz static site hosting
✓ HTTPS support
✓ Custom domain desteği
✓ Kolay deployment (git push)
✓ Automatic builds

Deployment Süreci:

1. Repository Oluşturma:
   GitHub'da public repository

2. GitHub Pages Aktivasyonu:
   Settings → Pages → Source: main branch

3. URL Yapısı:
   https://omdgn.github.io/newsPortal/homepage.html

4. Updates:
   Git push ile otomatik deployment

File Structure:
newsPortal/
├── homepage.html (ana sayfa)
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── data/
│   └── news.json
└── images/
    └── (news images)

Best Practices:
- Relative paths kullanımı
- Cross-browser compatibility
- Mobile-first testing
- SEO-friendly structure

Proje canlı olarak erişilebilir ve test edilebilir durumda!`,
    },
    {
      id: "learning-outcomes",
      title: "Öğrenilen Teknolojiler ve Kazanımlar",
      content: `Bu proje kapsamında edinilen temel beceriler ve deneyimler:

Front-End Development:
✓ HTML5 semantic markup
✓ CSS3 advanced layouts (Flexbox, Grid)
✓ Responsive design implementation
✓ JavaScript ES6+ features
✓ Asynchronous programming (Fetch API)

Design & UX:
✓ Mobile-first design approach
✓ User interaction patterns
✓ Visual hierarchy
✓ Typography and spacing
✓ Color theory application

Problem Solving:
✓ JSON data structure design
✓ DOM manipulation efficiency
✓ Cross-browser compatibility
✓ Performance optimization
✓ Debugging techniques

Tools & Workflow:
✓ Git version control
✓ GitHub collaboration
✓ GitHub Pages deployment
✓ Browser DevTools
✓ Code organization

Real-World Skills:
✓ Simulating dynamic content without backend
✓ Creating responsive layouts
✓ Building interactive UI components
✓ Managing project structure
✓ Writing maintainable code

Academic Achievement:
Proje SE 3355 Web Development dersi midterm projesi olarak başarıyla tamamlanmıştır.`,
    }
  ],
  githubUrl: "https://github.com/omdgn/newsPortal",
  liveUrl: "https://omdgn.github.io/newsPortal/homepage.html",
  date: "2024",
  category: "Web Development",
};

export default newsPortal;
