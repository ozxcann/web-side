export default {
  slug: "tailwind-best-practices",
  title: "Tailwind CSS: Best Practices ve İpuçları",
  excerpt: "Tailwind CSS ile profesyonel ve maintainable stil yazmanın yolları.",
  date: "2024-10-08",
  readTime: "5 dk",
  category: "CSS",
  tags: ["Tailwind CSS", "CSS", "UI/UX"],
  content: `
# Tailwind CSS: Best Practices ve İpuçları

Tailwind CSS kullanarak daha temiz ve sürdürülebilir stil yazmak için ipuçları:

## Custom Config

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... diğer tonlar
          900: '#1e3a8a',
        },
        brand: '#0066ff',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
\`\`\`

## Component Extraction

Tekrar eden stilleri component'lere ayırın:

\`\`\`jsx
// ❌ Kötü - Tekrar eden classlar
function Buttons() {
  return (
    <>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Primary
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Secondary
      </button>
    </>
  );
}

// ✅ İyi - Component extraction
function Button({ children, variant = 'primary' }) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };

  return (
    <button className={\`\${baseStyles} \${variants[variant]}\`}>
      {children}
    </button>
  );
}
\`\`\`

## @apply Directive (Dikkatli Kullanın)

\`\`\`css
/* styles/components.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg;
    @apply hover:bg-blue-700 transition-colors;
    @apply focus:outline-none focus:ring-2 focus:ring-blue-500;
  }

  .card {
    @apply rounded-xl bg-white shadow-lg p-6;
    @apply border border-gray-200;
  }
}
\`\`\`

**Not:** @apply'ı sadece gerçekten gerekli yerlerde kullanın. Component extraction genelde daha iyi bir çözümdür.

## Responsive Design

\`\`\`jsx
function Hero() {
  return (
    <div className="
      px-4 py-8
      sm:px-6 sm:py-12
      md:px-8 md:py-16
      lg:px-12 lg:py-20
      xl:px-16 xl:py-24
    ">
      <h1 className="
        text-2xl
        sm:text-3xl
        md:text-4xl
        lg:text-5xl
        xl:text-6xl
        font-bold
      ">
        Responsive Başlık
      </h1>
    </div>
  );
}
\`\`\`

## Dark Mode

\`\`\`jsx
// tailwind.config.js
module.exports = {
  darkMode: 'class', // veya 'media'
};

// Component
function Card() {
  return (
    <div className="
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-white
      border border-gray-200 dark:border-gray-700
      shadow-lg dark:shadow-xl
    ">
      <h2 className="text-xl font-bold">Card Title</h2>
    </div>
  );
}

// Theme toggle
function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
\`\`\`

## Custom Utilities

\`\`\`css
/* styles/utilities.css */
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .bg-gradient-radial {
    background-image: radial-gradient(circle, var(--tw-gradient-stops));
  }
}
\`\`\`

## Container Queries (Yeni!)

\`\`\`jsx
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
};

// Kullanım
function Card() {
  return (
    <div className="@container">
      <div className="grid @lg:grid-cols-2 gap-4">
        <div>Content 1</div>
        <div>Content 2</div>
      </div>
    </div>
  );
}
\`\`\`

## Performance Tips

1. **JIT Mode** - Tailwind v3 varsayılan olarak JIT kullanır
2. **PurgeCSS** - Unused class'ları production'da temizler
3. **Class sıralaması** - Prettier plugin kullanın:

\`\`\`bash
npm install -D prettier prettier-plugin-tailwindcss
\`\`\`

\`\`\`json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
\`\`\`

## Best Practices

1. **Semantic naming** - Custom color'lara anlamlı isimler verin
2. **Component extraction** - Tekrar eden stilleri componentlere ayırın
3. **Config extend** - Tailwind'i override etmeyin, extend edin
4. **Responsive first** - Mobile-first yaklaşım kullanın
5. **Dark mode** - Baştan planlayın
6. **Prettier plugin** - Class sıralaması için kullanın

Tailwind CSS ile hızlı ve maintainable UI geliştirin!
  `
};
