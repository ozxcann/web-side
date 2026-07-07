import { Project } from "./types";

const ecommerceLandingPage: Project = {
  slug: "ecommerce-landing-page",
  title: "E-commerce Landing Page",
  description: "React, Redux ve Express.js ile geliştirilmiş modern, interaktif e-ticaret landing page. Full-stack web geliştirme becerilerimi sergileyen kapsamlı bir proje",
  longDescription: `Modern e-ticaret deneyimini simüle eden, full-stack bir web uygulaması. React frontend, Express.js backend ve SQLite veritabanı kullanılarak geliştirilmiştir.

Proje, dinamik ürün bölümleri, Redux ile state management, responsive tasarım ve API-driven architecture ile gerçek dünya e-ticaret platformlarının temel özelliklerini içerir.

Not: Live demo Render.com üzerinde host ediliyordu ancak şu anda suspend durumda. Hangi email hesabı ile deploy ettiğimi bulamadığım için şu an aktif değil. Görseller, projenin çalışır haldeki demo videosundan ekran görüntüsü alınarak eklenmiştir.`,
  thumbnail: "/projects/e-commerce-StaticWeb/e-commerce_static_webSite_main_photo.png",
  images: [
    "/projects/e-commerce-StaticWeb/photo1.png",
    "/projects/e-commerce-StaticWeb/photo2.png",
    "/projects/e-commerce-StaticWeb/photo3.png",
  ],
  technologies: [
    "React",
    "Redux",
    "Tailwind CSS",
    "Express.js",
    "SQLite",
    "Axios",
    "Swiper.js",
    "Node.js",
    "REST API",
  ],
  features: [
    "React Hooks ile modern component yapısı",
    "Redux ile global state management",
    "Son gezilen ürünleri takip etme (Redux)",
    "Dinamik ürün slider'ları (Swiper.js)",
    "Ana kampanya banner'ları",
    "Hızlı promosyon linkleri",
    "Elektronik ürün fırsatları bölümü",
    "Kişiselleştirilmiş ürün önerileri",
    "Express.js REST API backend",
    "SQLite veritabanı entegrasyonu",
    "Axios ile API calls",
    "Fully responsive mobile & tablet tasarım",
    "Touch-friendly navigation",
    "Smooth transitions ve animasyonlar",
  ],
  sections: [
    {
      id: "overview",
      title: "Genel Bakış",
      content: `E-commerce Landing Page, modern e-ticaret platformlarının temel özelliklerini barındıran full-stack bir web uygulamasıdır.

Proje Amacı:
Full-stack web geliştirme becerilerimi sergilemek ve gerçek dünya e-ticaret senaryolarını simüle etmek.

Teknik Mimari:
- Frontend: React + Redux + Tailwind CSS
- Backend: Express.js + SQLite
- Deployment: Render.com (şu anda suspend)

Proje Durumu Hakkında:
Live demo orijinal olarak Render.com üzerinde host ediliyordu ancak şu anda suspend durumda. Deploy için kullandığım email hesabını bulamadığım için aktif hale getiremiyorum. Bu sayfadaki görseller, projenin çalışır haldeki demo videosundan alınmış ekran görüntüleridir ve projenin gerçek işlevselliğini yansıtmaktadır.

Proje, API-driven architecture, modern React patterns ve responsive design ile profesyonel bir e-ticaret deneyimi sunar.`,
    },
    {
      id: "frontend-architecture",
      title: "Frontend Mimarisi",
      content: `React ve modern frontend teknolojileri kullanılarak geliştirilmiş component-based mimari:

React Hooks:
- useState: Component-level state management
- useEffect: Side effects ve data fetching
- useSelector: Redux store'dan veri okuma
- useDispatch: Redux actions dispatch etme
- Custom hooks: Reusable logic

Redux State Management:
Store Structure:
{
  recentlyVisited: [],
  products: [],
  campaigns: [],
  user: {}
}

Actions & Reducers:
- ADD_RECENTLY_VISITED: Son gezilen ürünleri kaydet
- FETCH_PRODUCTS: API'den ürünleri çek
- UPDATE_CAMPAIGN: Kampanya bilgilerini güncelle

Component Hierarchy:
App
├── Header
│   ├── Logo
│   ├── SearchBar
│   └── UserMenu
├── MainSlider (Swiper.js)
├── QuickLinks
├── ProductSections
│   ├── ElectronicsDeals
│   ├── RecommendedProducts
│   └── RecentlyVisited (Redux)
└── Footer

Tailwind CSS Styling:
- Utility-first CSS framework
- Responsive breakpoints
- Custom color palette
- Hover ve transition effects
- Mobile-first approach`,
    },
    {
      id: "backend-api",
      title: "Backend API ve Veritabanı",
      content: `Express.js ile geliştirilmiş RESTful API ve SQLite veritabanı:

Express.js REST API:

Endpoints:
GET  /api/products           - Tüm ürünleri getir
GET  /api/products/:id       - Spesifik ürün detayı
GET  /api/campaigns          - Aktif kampanyalar
GET  /api/recommendations    - Önerilen ürünler
POST /api/track-visit        - Ürün ziyareti kaydet

Middleware:
- CORS: Cross-origin requests
- Body Parser: JSON parsing
- Error Handler: Global error handling
- Logger: Request logging

SQLite Database Schema:

Products Table:
- id (PRIMARY KEY)
- name (TEXT)
- price (REAL)
- category (TEXT)
- image_url (TEXT)
- description (TEXT)
- stock (INTEGER)

Campaigns Table:
- id (PRIMARY KEY)
- title (TEXT)
- banner_url (TEXT)
- discount (REAL)
- start_date (DATE)
- end_date (DATE)

Database Operations:
- CRUD operations
- Query optimization
- Index kullanımı
- Transaction handling

API Security:
- Input validation
- SQL injection prevention
- Rate limiting (planned)`,
    },
    {
      id: "product-sections",
      title: "Dinamik Ürün Bölümleri",
      content: `E-commerce Landing Page, çeşitli dinamik ürün gösterim bölümleri içerir:

1. Ana Kampanya Slider'ları (Swiper.js):
   - Full-width banner slider
   - Auto-play özelliği
   - Touch/swipe navigation
   - Pagination dots
   - Responsive images
   - Lazy loading

2. Hızlı Promosyon Linkleri:
   - Grid-based layout
   - Icon + text combination
   - Hover efektleri
   - Kategori shortcuts
   - Mobile stack layout

3. Elektronik Ürün Fırsatları:
   - API'den dinamik ürün çekme
   - Fiyat gösterimi
   - İndirim yüzdeleri
   - Stok durumu
   - "Sepete Ekle" butonu
   - Responsive product cards

4. Kişiselleştirilmiş Öneriler:
   - User behavior bazlı (backend logic)
   - Dinamik rendering
   - Carousel format
   - "Daha Fazla" butonu
   - Smooth scrolling

5. Son Gezilen Ürünler (Redux):
   - Redux store'da tutulur
   - Local storage persistence
   - Maksimum 10 ürün
   - Chronological sıralama
   - Clear history özelliği

Her bölüm Axios ile backend API'den veri çeker ve dinamik olarak render edilir.`,
    },
    {
      id: "responsive-design",
      title: "Responsive ve Mobile-First Tasarım",
      content: `Tailwind CSS ile geliştirilmiş fully responsive, mobile-first tasarım:

Desktop (1024px+):
- 4-column product grid
- Sidebar navigation
- Hover efektleri
- Mouse interactions
- Full-width slider

Tablet (768px - 1023px):
- 3-column product grid
- Collapsible sidebar
- Touch-optimized
- Reduced spacing
- Adaptive typography

Mobile (< 768px):
- Single column layout
- Hamburger menu
- Touch-friendly buttons (min 44x44px)
- Stack navigation
- Bottom navigation bar (planned)
- Swipe gestures

Responsive Breakpoints (Tailwind):
sm: 640px   → Mobile landscape
md: 768px   → Tablet portrait
lg: 1024px  → Desktop
xl: 1280px  → Large desktop

Tailwind Utilities:
- Grid: grid-cols-1 md:grid-cols-3 lg:grid-cols-4
- Spacing: p-4 md:p-6 lg:p-8
- Typography: text-sm md:text-base lg:text-lg
- Display: hidden md:block
- Flexbox: flex flex-col md:flex-row

Performance Optimizations:
- Image lazy loading
- Code splitting
- Debounced search
- Virtualized lists (large datasets)
- Skeleton loaders

Accessibility:
- ARIA labels
- Keyboard navigation
- Focus indicators
- Color contrast (WCAG AA)`,
    },
    {
      id: "state-management",
      title: "Redux State Management",
      content: `Redux ile merkezi state yönetimi ve data flow:

Redux Store Yapısı:

store/
├── reducers/
│   ├── productsReducer.js
│   ├── campaignsReducer.js
│   └── recentlyVisitedReducer.js
├── actions/
│   ├── productActions.js
│   ├── campaignActions.js
│   └── visitActions.js
└── store.js

Recently Visited Ürünler:
Action Creator:
const addRecentlyVisited = (product) => ({
  type: 'ADD_RECENTLY_VISITED',
  payload: product
});

Reducer:
case 'ADD_RECENTLY_VISITED':
  const exists = state.find(p => p.id === action.payload.id);
  if (exists) return state;

  return [action.payload, ...state].slice(0, 10);

Usage in Component:
const dispatch = useDispatch();
const recentProducts = useSelector(state =>
  state.recentlyVisited
);

const handleProductClick = (product) => {
  dispatch(addRecentlyVisited(product));
};

Redux DevTools:
- Time-travel debugging
- Action history
- State inspection
- Performance monitoring

Middleware:
- Redux Thunk: Async actions
- Logger: Development logging

Local Storage Persistence:
Redux state, localStorage'a sync edilir:
- Page refresh'te data korunur
- Cross-tab synchronization
- Storage limit kontrolü`,
    },
    {
      id: "swiper-integration",
      title: "Swiper.js Carousel Entegrasyonu",
      content: `Modern, touch-enabled carousel için Swiper.js kullanımı:

Swiper Configuration:

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

<Swiper
  modules={[Autoplay, Pagination, Navigation]}
  spaceBetween={30}
  slidesPerView={1}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false
  }}
  pagination={{ clickable: true }}
  navigation={true}
  loop={true}
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }}
>

Özellikler:
✓ Auto-play kampanya banner'ları
✓ Touch/swipe gestures
✓ Keyboard navigation (arrow keys)
✓ Pagination dots
✓ Navigation arrows
✓ Loop mode
✓ Lazy loading images
✓ Responsive slides per view

Ana Kampanya Slider:
- Full-width hero slider
- 3 saniye auto-play
- Click-to-pause
- Smooth transitions

Ürün Carousel'leri:
- Horizontal scroll
- Multiple slides visible
- Responsive breakpoints
- Touch-optimized

CSS Customization:
- Custom pagination colors
- Arrow button styling
- Tailwind integration
- Dark mode support (planned)`,
    },
    {
      id: "api-integration",
      title: "Axios ile API Entegrasyonu",
      content: `Frontend ve backend arasında Axios ile API communication:

Axios Instance Configuration:

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ||
           'https://ecommerce-project-public.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

Request Interceptor:
api.interceptors.request.use(
  config => {
    // Add auth token if exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  error => Promise.reject(error)
);

Response Interceptor:
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);

API Service Functions:

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(\`/products/\${id}\`),
  search: (query) => api.get('/products', {
    params: { q: query }
  })
};

Usage in Components:
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

Error Handling:
- Network errors
- Timeout handling
- Retry logic
- User-friendly messages`,
    },
    {
      id: "deployment",
      title: "Deployment ve Hosting",
      content: `Render.com üzerinde full-stack deployment:

Deployment Mimarisi:

Frontend (React):
- Build: npm run build
- Static files: /build klasörü
- Serve: Express static middleware

Backend (Express.js):
- Node.js runtime
- Environment variables
- SQLite database

Render.com Configuration:

render.yaml:
services:
  - type: web
    name: ecommerce-project
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000

Environment Variables:
- DATABASE_URL: SQLite file path
- API_SECRET: JWT secret
- CORS_ORIGIN: Frontend URL

Deployment Process:
1. Git push to main branch
2. Render auto-detects changes
3. Runs build commands
4. Deploys to production
5. Health check validation

Proje Durumu:
⚠️ Live demo şu anda SUSPEND durumda
❌ Deploy email hesabı kayıp
📸 Görseller demo videosundan alındı

Alternatif Deployment (Future):
- Vercel (Frontend)
- Railway (Backend + DB)
- Netlify (Static frontend)
- Docker containerization`,
    },
    {
      id: "learning-outcomes",
      title: "Öğrenilen Teknolojiler",
      content: `Bu full-stack proje kapsamında edinilen beceriler:

Frontend Development:
✓ React Hooks (useState, useEffect, useSelector, useDispatch)
✓ Redux state management
✓ Tailwind CSS utility-first styling
✓ Swiper.js carousel implementation
✓ Responsive design patterns
✓ Component composition

Backend Development:
✓ Express.js REST API
✓ SQLite database operations
✓ CRUD implementation
✓ Middleware usage
✓ Error handling
✓ CORS configuration

Full-Stack Integration:
✓ Axios HTTP client
✓ API design ve consumption
✓ Frontend-backend communication
✓ State synchronization
✓ Data flow architecture

Development Tools:
✓ Git version control
✓ npm package management
✓ Environment variables
✓ Build optimization
✓ Deployment process

Best Practices:
✓ Component reusability
✓ Code organization
✓ Error handling strategies
✓ Performance optimization
✓ Responsive design
✓ Accessibility basics

Real-World Skills:
✓ Full-stack application development
✓ Database design
✓ API architecture
✓ State management
✓ Deployment ve hosting
✓ Problem solving`,
    }
  ],
  githubUrl: "https://github.com/omdgn/ecommerce_project",
  date: "2024",
  category: "Full-Stack",
};

export default ecommerceLandingPage;
