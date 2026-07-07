import reactHooksGuide from './react-hooks-guide';
import typescriptTips from './typescript-tips';
import nextjsPerformance from './nextjs-performance';
import tailwindBestPractices from './tailwind-best-practices';
import restApiBestPractices from './rest-api-best-practices';
import reactNextjsSecurity from './react-nextjs-security';
import newReactHooks from './new-react-hooks';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string;
};

const posts: BlogPost[] = [
  reactHooksGuide,
  typescriptTips,
  nextjsPerformance,
  tailwindBestPractices,
  restApiBestPractices,
  reactNextjsSecurity,
  newReactHooks,
];

// Sort by date (newest first)
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default posts;
