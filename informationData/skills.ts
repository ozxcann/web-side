export interface SkillDetail {
  id: string;
  title: string;
  description: string;
  experiences: {
    title: string;
    details: string[];
  }[];
  technologies: string[];
  projects: {
    name: string;
    description: string;
  }[];
}

export const skillsData: SkillDetail[] = [
  {
    id: "business-analysis",
    title: "Business Analysis & Agile Methodologies",
    description:
      "Gereksinim analizi, iş süreçlerinin modellenmesi ve belgelenmesi konusunda deneyim. Çevik (Agile/Scrum) yazılım geliştirme süreçlerinde aktif rol alma ve test yönetimi.",
    experiences: [
      {
        title: "Türkiye Finans Katılım Bankası - Business Analyst Intern (2025)",
        details: [
          "Gereksinim toplama, iş analizleri ve iş süreçlerinin belgelenmesi/raporlanması çalışmalarını yürüttüm.",
          "Entegrasyon testleri, Kullanıcı Kabul Testi (UAT) ve birim testlerinin koşumunu yaparak hataları raporladım.",
          "Scrum toplantılarına aktif katılım sağlayarak görev takibi ve çevik süreç süreçlerine katkıda bulundum."
        ],
      },
      {
        title: "TÜBİT (Bilişim ve İnovasyon Topluluğu) - Başkan Yardımcısı (2023 - 2025)",
        details: [
          "Teknik etkinliklerin, eğitim süreçlerinin koordinasyonunu ve kurum içi iş birliklerinin raporlanmasını yürüttüm.",
          "Ekip içi koordinasyon, görev takibi, kaynak planlaması ve organizasyon yönetimi gerçekleştirdim."
        ],
      }
    ],
    technologies: [
      "İş Analizi",
      "Scrum Metodolojisi",
      "Gereksinim Analizi",
      "Süreç Modelleme",
      "UAT (Kullanıcı Kabul Testi)",
      "Yönetim ve Organizasyon",
      "Analitik Düşünme",
      "Etkili İletişim"
    ],
    projects: [
      {
        name: "BT Şirketi Süreç Analizi ve Test Koşumu",
        description:
          "Banka bünyesinde geliştirilen BT projelerinde gereksinimlerin çıkarılması, süreçlerin dokümante edilmesi ve entegrasyon testlerinin başarıyla tamamlanması."
      },
      {
        name: "Teknik Eğitim ve Etkinlik Organizasyonları",
        description:
          "TÜBİT topluluğu kapsamında yüzlerce öğrenciye ulaşan teknoloji zirvelerinin, liderlik ve kaynak planlama süreçlerinin uçtan uca yönetilmesi."
      }
    ],
  },
  {
    id: "data-database",
    title: "Database Management & Data Analysis",
    description:
      "İlişkisel veritabanı yönetimi, veri analizi çalışmaları, karmaşık sorguların yazılması ve raporlama süreçlerinde yetkinlik.",
    experiences: [
      {
        title: "Türkiye Finans Katılım Bankası - Staj Dönemi",
        details: [
          "SQL Server kullanarak veri analizi çalışmaları ve veri çekme/raporlama süreçlerini gerçekleştirdim.",
          "Kurumsal veritabanı yönetimi ve SQL mimarisi üzerine pratik eğitimler tamamladım."
        ],
      },
      {
        title: "Akademik Çalışmalar",
        details: [
          "Trakya Üniversitesi Bilişim Sistemleri ve Teknolojileri eğitimi süresince veritabanı tasarımı ve veri modelleme üzerine projeler geliştirdim."
        ],
      }
    ],
    technologies: [
      "SQL",
      "Microsoft SQL Server",
      "Veri Analizi",
      "Veritabanı Yönetimi",
      "Raporlama",
      "Coğrafi Bilgi Sistemleri (CBS)"
    ],
    projects: [
      {
        name: "SQL Server ile Veri Analitiği Çalışmaları",
        description:
          "Staj sürecinde bankacılık veri setleri üzerinde SQL Server kullanarak analizler yapılması, performans optimizasyonları ve rapor çıktılarının hazırlanması."
      }
    ],
  },
  {
    id: "software-ai",
    title: "Software Development & AI / Testing",
    description:
      "C# ve Python dilleriyle yazılım geliştirme; makine öğrenmesi, derin öğrenme tabanlı görüntü işleme ve Postman ile API test otomasyonu yetkinlikleri.",
    experiences: [
      {
        title: "Kişisel & Akademik Gelişim Projeleri",
        details: [
          "Python kullanarak makine öğrenmesi ve görüntü işleme algoritmaları üzerinde çalışmalar yaptım.",
          "Postman kullanarak backend servislerinin API test süreçlerini ve test otomasyon senaryolarını kurguladım."
        ],
      }
    ],
    technologies: [
      "C#",
      "Python",
      "Postman",
      "API Testi & Otomasyonu",
      "Makine Öğrenmesi",
      "Derin Öğrenme (Görüntü İşleme)",
      "Siber Güvenlik 101"
    ],
    projects: [
      {
        name: "Postman API Test Otomasyonu",
        description:
          "Geliştirilen backend servislerinin ve arayüz entegrasyonlarının doğrulanması için uçtan uca API test senaryolarının kurgulanması."
      },
      {
        name: "Görüntü İşleme ve Derin Öğrenme Çalışmaları",
        description:
          "Cumhurbaşkanlığı Dijital Dönüşüm Ofisi eğitimleri kapsamında Python ve popüler kütüphaneler kullanılarak geliştirilen nesne tespiti ve veri sınıflandırma modelleri."
      }
    ],
  },
];

export default skillsData;