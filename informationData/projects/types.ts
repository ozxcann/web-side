export type ProjectSection = {
  id: string;
  title: string;
  content: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string; // Kısa açıklama (liste için)
  longDescription: string; // Detaylı açıklama (detay sayfası için)
  thumbnail: string; // Küçük görsel (liste için) - /projects/xxx/thumbnail.png
  images: string[]; // Detay sayfası için galeri görselleri
  technologies: string[]; // Kullanılan teknolojiler
  features: string[]; // Proje özellikleri
  sections?: ProjectSection[]; // Alt başlıklar (scroll-spy için)
  githubUrl?: string;
  liveUrl?: string;
  date?: string; // Tamamlanma tarihi
  category?: string; // Backend, Frontend, Full Stack, vb.
};
