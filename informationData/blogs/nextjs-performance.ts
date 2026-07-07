export default {
  slug: "nextjs-performance",
  title: "Next.js Performance Optimizasyonu",
  excerpt: "Next.js uygulamanızı daha hızlı ve verimli hale getirmek için pratik teknikler.",
  date: "2024-10-10",
  readTime: "7 dk",
  category: "Next.js",
  tags: ["Next.js", "Performance", "Optimization"],
  content: `
# Next.js Performance Optimizasyonu

Next.js uygulamalarınızı optimize etmek için kullanabileceğiniz teknikler:

## Image Optimization

Next.js'in Image component'i otomatik optimizasyon sağlar:

\`\`\`jsx
import Image from 'next/image';

function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      priority // Above the fold için
      placeholder="blur" // Blur placeholder
      blurDataURL="data:image/jpeg;base64,..." // Blur data
    />
  );
}
\`\`\`

**Avantajlar:**
- Otomatik WebP/AVIF dönüşümü
- Lazy loading
- Responsive images
- CLS (Cumulative Layout Shift) önleme

## Dynamic Imports - Code Splitting

\`\`\`jsx
import dynamic from 'next/dynamic';

// Component lazy load
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Client-side only
});

// Library lazy load
function Editor() {
  const [showEditor, setShowEditor] = useState(false);

  const loadEditor = async () => {
    const module = await import('react-quill');
    // Use module
  };

  return (
    <button onClick={loadEditor}>Load Editor</button>
  );
}
\`\`\`

## Server Components (App Router)

\`\`\`jsx
// app/page.tsx - Server Component (default)
async function HomePage() {
  const data = await fetch('https://api.example.com/data');
  const posts = await data.json();

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// Client Component sadece gerektiğinde
'use client';

function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

## Font Optimization

\`\`\`jsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono'
});

export default function RootLayout({ children }) {
  return (
    <html className={\`\${inter.variable} \${robotoMono.variable}\`}>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

## Metadata API

\`\`\`jsx
// app/page.tsx
export const metadata = {
  title: 'My App',
  description: 'My awesome app',
  openGraph: {
    title: 'My App',
    description: 'My awesome app',
    images: ['/og-image.jpg'],
  },
};
\`\`\`

## Caching Strategies

\`\`\`jsx
// Static Generation (default)
async function StaticPage() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* render */}</div>;
}

// Revalidate every 60 seconds
async function RevalidatedPage() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }
  });
  return <div>{/* render */}</div>;
}

// Dynamic (no cache)
async function DynamicPage() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  });
  return <div>{/* render */}</div>;
}
\`\`\`

## Route Handlers

\`\`\`jsx
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const users = await fetchUsers();

  return NextResponse.json(users, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
    }
  });
}
\`\`\`

## Performance Tips

1. **Server Components kullanın** - JS bundle'ı küçültür
2. **Dynamic imports** - Sadece gerekli kodu yükleyin
3. **Image optimization** - Next/Image kullanın
4. **Font optimization** - next/font kullanın
5. **Caching strategy** - Doğru cache stratejisi seçin
6. **Bundle analyzer** - @next/bundle-analyzer ile analiz edin

\`\`\`bash
# Bundle analizi
npm install @next/bundle-analyzer
ANALYZE=true npm run build
\`\`\`

Next.js'in bu özelliklerini kullanarak performansı ciddi şekilde artırabilirsiniz!
  `
};
