export default {
  slug: "react-hooks-guide",
  title: "React Hooks: useState ve useEffect Kullanımı",
  excerpt: "Modern React uygulamalarında hook'ların doğru kullanımı ve best practices.",
  date: "2024-10-15",
  readTime: "5 dk",
  category: "React",
  tags: ["React", "Hooks", "JavaScript"],
  content: `
# React Hooks: useState ve useEffect Kullanımı

React Hooks, fonksiyonel component'lerde state ve lifecycle özellikleri kullanmamızı sağlar. İşte en yaygın kullanılanlar:

## useState - State Yönetimi

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Artır
      </button>
    </div>
  );
}
\`\`\`

**Önemli Noktalar:**
- \`useState\` initial value alır
- Array destructuring ile [value, setter] döner
- State güncellemeleri asenkrondur

## useEffect - Yan Etkiler

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]); // Dependency array

  return user ? <div>{user.name}</div> : <p>Loading...</p>;
}
\`\`\`

**Dependency Array:**
- \`[]\` - Sadece mount'ta çalışır
- \`[userId]\` - userId değişince çalışır
- Yok - Her render'da çalışır

## Cleanup Functions

\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  return () => clearInterval(timer); // Cleanup
}, []);
\`\`\`

## Best Practices

1. **Her state için ayrı useState kullanın**
2. **useEffect'te cleanup unutmayın**
3. **Dependency array'i doğru belirleyin**
4. **Complex state için useReducer tercih edin**

React Hooks, daha temiz ve okunabilir kod yazmanızı sağlar!
  `
};
