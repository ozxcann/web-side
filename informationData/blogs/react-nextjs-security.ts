export default {
  slug: "react-nextjs-security",
  title: "React ve Next.js Güvenlik Açıkları",
  excerpt: "Modern web uygulamalarında karşılaşılan güvenlik açıkları ve korunma yöntemleri.",
  date: "2024-12-19",
  readTime: "6 dk",
  category: "Güvenlik",
  tags: ["React", "Next.js", "Security", "XSS"],
  content: `
# React ve Next.js Güvenlik Açıkları

Modern web uygulamalarında güvenlik kritik öneme sahiptir. İşte React ve Next.js'te dikkat edilmesi gereken güvenlik açıkları ve çözümleri:

## 1. XSS (Cross-Site Scripting)

### Tehlikeli Kullanım:
\`\`\`jsx
// ❌ Tehlikeli - XSS açığı!
function UserComment({ comment }) {
  return <div dangerouslySetInnerHTML={{ __html: comment }} />;
}
\`\`\`

### Güvenli Kullanım:
\`\`\`jsx
// ✅ Güvenli - React otomatik escape eder
function UserComment({ comment }) {
  return <div>{comment}</div>;
}

// veya DOMPurify ile temizle
import DOMPurify from 'dompurify';

function SafeHTML({ html }) {
  return <div dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(html)
  }} />;
}
\`\`\`

## 2. API Route Güvenliği (Next.js)

### Tehlikeli:
\`\`\`typescript
// ❌ Kimlik doğrulama yok!
export async function POST(req: Request) {
  const data = await req.json();
  await db.users.delete(data.userId);
  return Response.json({ success: true });
}
\`\`\`

### Güvenli:
\`\`\`typescript
// ✅ Kimlik doğrulama ve yetkilendirme
export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();

  // Input validation
  if (!data.userId || typeof data.userId !== 'string') {
    return Response.json({ error: 'Invalid input' }, { status: 400 });
  }

  await db.users.delete(data.userId);
  return Response.json({ success: true });
}
\`\`\`

## 3. Environment Variables

### Tehlikeli:
\`\`\`jsx
// ❌ API anahtarını client'a gönderme!
const API_KEY = process.env.SECRET_API_KEY;

function App() {
  fetch(\`/api?key=\${API_KEY}\`); // Client'ta görünür!
}
\`\`\`

### Güvenli:
\`\`\`typescript
// ✅ Server-side kullan
// app/api/data/route.ts
export async function GET() {
  const apiKey = process.env.SECRET_API_KEY; // Sadece server'da
  const data = await fetch('https://api.example.com', {
    headers: { 'Authorization': \`Bearer \${apiKey}\` }
  });
  return Response.json(data);
}
\`\`\`

**Not:** Next.js'te \`NEXT_PUBLIC_\` prefix'i ile başlayan değişkenler client'a gönderilir!

## 4. CSRF (Cross-Site Request Forgery)

\`\`\`typescript
// ✅ CSRF token kullan
import { csrf } from '@/lib/csrf';

export async function POST(req: Request) {
  const isValid = await csrf.verify(req);

  if (!isValid) {
    return Response.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  // İşlemi yap...
}
\`\`\`

## 5. SQL Injection

### Tehlikeli:
\`\`\`typescript
// ❌ Raw SQL query
const userId = req.query.id;
const user = await db.raw(\`SELECT * FROM users WHERE id = \${userId}\`);
\`\`\`

### Güvenli:
\`\`\`typescript
// ✅ Parameterized query veya ORM kullan
const userId = req.query.id;
const user = await db.users.findUnique({
  where: { id: userId }
});
\`\`\`

## Güvenlik Kontrol Listesi

- ✅ Kullanıcı inputlarını her zaman validate et
- ✅ API route'larında kimlik doğrulama kullan
- ✅ Hassas verileri client'a gönderme
- ✅ HTTPS kullan (production'da zorunlu)
- ✅ Content Security Policy (CSP) header'ları ekle
- ✅ Rate limiting uygula
- ✅ Dependencies'i güncel tut (\`npm audit\`)

Güvenlik, sürekli dikkat gerektiren bir konudur. Bu temel önlemlerle uygulamanızı daha güvenli hale getirebilirsiniz!
  `
};
