export default {
  slug: "new-react-hooks",
  title: "React 19'daki Yeni Hooklar",
  excerpt: "React 19 ile gelen yeni hooklar: use, useFormStatus, useFormState ve useOptimistic.",
  date: "2024-12-19",
  readTime: "5 dk",
  category: "React",
  tags: ["React", "Hooks", "React 19"],
  content: `
# React 19'daki Yeni Hooklar

React 19 ile birlikte form yönetimi ve asenkron işlemleri kolaylaştıran yeni hooklar geldi. İşte en önemlileri:

## 1. use - Promise ve Context İçin

\`use\` hook'u, Promise'leri ve Context'i doğrudan component içinde okumamızı sağlar.

\`\`\`jsx
import { use } from 'react';

function UserProfile({ userPromise }) {
  // Promise resolve olana kadar Suspense tetiklenir
  const user = use(userPromise);

  return <div>{user.name}</div>;
}

// Kullanım
function App() {
  const userPromise = fetch('/api/user').then(r => r.json());

  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
\`\`\`

**Özellikler:**
- Conditional olarak kullanılabilir (diğer hookların aksine!)
- Promise resolve olana kadar Suspense tetiklenir
- Context okumak için de kullanılabilir

## 2. useFormStatus - Form Durumu

Form submit durumunu takip etmek için kullanılır. **Sadece form içindeki child component'lerde çalışır!**

\`\`\`jsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data, method } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Gönderiliyor...' : 'Gönder'}
    </button>
  );
}

function MyForm() {
  async function handleSubmit(formData) {
    await fetch('/api/submit', {
      method: 'POST',
      body: formData
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="username" />
      <SubmitButton /> {/* Form içinde child component */}
    </form>
  );
}
\`\`\`

## 3. useFormState - Form State Yönetimi

Server Actions ile form state'ini yönetmek için kullanılır.

\`\`\`jsx
'use client';
import { useFormState } from 'react-dom';

async function createUser(prevState, formData) {
  const name = formData.get('name');

  // Validation
  if (!name || name.length < 3) {
    return { error: 'İsim en az 3 karakter olmalı' };
  }

  // API call
  await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ name })
  });

  return { success: 'Kullanıcı oluşturuldu!' };
}

function CreateUserForm() {
  const [state, formAction] = useFormState(createUser, null);

  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit">Oluştur</button>

      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state?.success && <p style={{ color: 'green' }}>{state.success}</p>}
    </form>
  );
}
\`\`\`

## 4. useOptimistic - Optimistic Updates

Kullanıcı deneyimini iyileştirmek için optimistic updates yapmamızı sağlar.

\`\`\`jsx
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function handleAddTodo(formData) {
    const title = formData.get('title');

    // Optimistic update - anında UI'da göster
    addOptimisticTodo({ id: Date.now(), title });

    // Server'a gönder
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title })
    });

    // Server'dan gerçek data gelince otomatik güncellenir
  }

  return (
    <>
      <form action={handleAddTodo}>
        <input name="title" />
        <button>Ekle</button>
      </form>

      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.title}
            {todo.pending && ' (Kaydediliyor...)'}
          </li>
        ))}
      </ul>
    </>
  );
}
\`\`\`

## Özet

| Hook | Kullanım |
|------|----------|
| \`use\` | Promise ve Context okuma |
| \`useFormStatus\` | Form submit durumu |
| \`useFormState\` | Form state yönetimi |
| \`useOptimistic\` | Optimistic UI updates |

Bu yeni hooklar, özellikle form işlemleri ve asenkron veri yönetimini çok daha kolay hale getiriyor. React 19 ile modern, kullanıcı dostu uygulamalar geliştirin!
  `
};
