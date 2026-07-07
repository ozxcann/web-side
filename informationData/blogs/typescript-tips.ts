export default {
  slug: "typescript-tips",
  title: "TypeScript ile Daha Güvenli Kod Yazın",
  excerpt: "TypeScript'in gücünü kullanarak runtime hatalarını önleyin ve daha iyi developer experience elde edin.",
  date: "2024-10-12",
  readTime: "6 dk",
  category: "TypeScript",
  tags: ["TypeScript", "JavaScript", "Best Practices"],
  content: `
# TypeScript ile Daha Güvenli Kod Yazın

TypeScript, JavaScript'e static typing ekleyerek kod kalitesini artırır. İşte pratik ipuçları:

## Type vs Interface

\`\`\`typescript
// Type - Union ve primitive'ler için
type ID = string | number;
type Status = 'pending' | 'success' | 'error';

// Interface - Object yapıları için
interface User {
  id: ID;
  name: string;
  email: string;
}

// Interface extends edilebilir
interface Admin extends User {
  permissions: string[];
}
\`\`\`

## Utility Types

TypeScript'in built-in utility type'ları çok güçlü:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Partial - Tüm field'ları optional yapar
type UpdateUser = Partial<User>;

// Pick - Sadece belirli field'ları seç
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - Belirli field'ları çıkar
type PublicUser = Omit<User, 'password'>;

// Readonly - Tüm field'ları readonly yapar
type ImmutableUser = Readonly<User>;
\`\`\`

## Generics ile Reusable Functions

\`\`\`typescript
// Generic API response
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Kullanım
const users = await fetchData<User[]>('/api/users');
const profile = await fetchData<User>('/api/profile');
\`\`\`

## Type Guards

\`\`\`typescript
function isUser(obj: any): obj is User {
  return 'id' in obj && 'name' in obj && 'email' in obj;
}

function processData(data: unknown) {
  if (isUser(data)) {
    // TypeScript artık data'nın User olduğunu biliyor
    console.log(data.name);
  }
}
\`\`\`

## Enum Alternatifleri

\`\`\`typescript
// Enum yerine const object kullanın
const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
} as const;

type UserRole = typeof UserRole[keyof typeof UserRole];
\`\`\`

## Best Practices

1. **\`any\` yerine \`unknown\` kullanın**
2. **Strict mode'u aktif edin**
3. **Type assertion'dan kaçının**
4. **Complex type'lar için type alias oluşturun**
5. **API response'ları için interface tanımlayın**

TypeScript, kodunuzu daha güvenli ve maintainable hale getirir!
  `
};
