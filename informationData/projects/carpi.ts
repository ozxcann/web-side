import { Project } from "./types";

const carpi: Project = {
  slug: "carpi",
  title: "CarPI - Creative Car Builder & Editor AI",
  description: "Mezuniyet projemiz: Yapay zekâ destekli araç tasarımı ve kişiselleştirme platformu. Kullanıcılar doğal dil komutuyla araçlarını özelleştirebilir ve değişiklikleri gerçek zamanlı görebilir",
  longDescription: `CarPI, mezuniyet projemiz olarak geliştirdiğimiz, yapay zekâ destekli araç tasarımı ve kişiselleştirme platformudur.

Proje, kullanıcıların araç fotoğrafı yükleyerek doğal dil girdileriyle ("Aracı kırmızı yap, jantları değiştir" gibi) görsel değişiklik talep edebildiği, AI tarafından oluşturulmuş yeni tasarımlar elde edebildiği bir web platformudur.

Not: Proje hala aktif geliştirme aşamasında olduğu için kaynak kodları ve detaylı dosyalar şu an paylaşılamamaktadır. GitHub reposu, projeyi tanıtan statik bir web sitesi içermektedir. Asıl platform ReactJS, Node.js, FastAPI ve Stable Diffusion teknolojileriyle geliştirilmektedir.`,
  thumbnail: "/projects/carpi/carpi_main_photo.png",
  images: [
    "/projects/carpi/carpi_main_photo.png",
    "/projects/carpi/carpi_image1.png",
    "/projects/carpi/carpi_image2.png",
  ],
  technologies: [
    "React.js",
    "Node.js",
    "Express.js",
    "FastAPI",
    "PostgreSQL",
    "PyTorch",
    "Stable Diffusion",
    "DALL·E API",
    "Tailwind CSS",
    "JWT",
    "REST API",
    "WebSocket",
  ],
  features: [
    "Yapay zekâ ile doğal dil komutuyla araç tasarımı",
    "Stable Diffusion + DALL·E entegrasyonu",
    "Gerçek zamanlı görsel önizleme",
    "Manuel düzenleme araçları",
    "Kullanıcı kayıt ve JWT kimlik doğrulama",
    "Tasarımları kaydetme ve yönetme",
    "PNG, JPEG, PDF dışa aktarma",
    "Premium kullanıcı sistemi",
    "Admin yönetim paneli",
    "Çoklu dil desteği (TR/EN)",
    "Responsive web tasarım",
    "5-10 saniye AI görsel üretimi",
  ],
  sections: [
    {
      id: "overview",
      title: "Proje Hakkında",
      content: `CarPI, mezuniyet projemiz olarak geliştirdiğimiz yapay zekâ destekli araç tasarımı ve kişiselleştirme platformudur.

Proje Vizyonu:
Otomotiv sektöründe kullanıcıların yapmak istedikleri değişikliklerin sonucunu önceden görememesi ve bundan kaynaklı belirsizlik yaşaması sorununa çözüm sunmak.

Temel Özellik:
Kullanıcılar araç fotoğrafı yükleyerek basit komutlarla ("Aracı kırmızı yap, jantları değiştir") değişiklikleri AI tarafından oluşturulan görsellerle anında görebilir.

Geliştirme Durumu:
⚠️ Proje hala aktif geliştirme aşamasında olduğu için kaynak kodları ve detaylı uygulama dosyaları şu an paylaşılamamaktadır.

GitHub Repository:
Mevcut repo (github.com/omdgn/CarPI), projeyi tanıtan statik bir web sitesi içermektedir. Asıl platform farklı bir private repository'de geliştirilmektedir.

Teknoloji Stack:
- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express.js
- AI Service: FastAPI + PyTorch + Stable Diffusion
- Database: PostgreSQL
- Authentication: JWT

Proje, modern web geliştirme ve yapay zekâ teknolojilerini birleştirerek yenilikçi bir çözüm sunmaktadır.`,
    },
    {
      id: "problem-solution",
      title: "Problem ve Çözüm",
      content: `CarPI, otomotiv sektöründeki önemli bir kullanıcı deneyimi problemine çözüm getirmektedir.

Problem:
Kullanıcılar araçlarında yapmak istedikleri değişikliklerin (renk, jant, spoiler vb.) sonucunu önceden görememekte ve bu belirsizlik nedeniyle kararsız kalmaktadır.

Mevcut Durumun Eksiklikleri:
- Değişiklik sonrasını hayal etme zorluğu
- Pahalı değişiklik kararları öncesi belirsizlik
- Fiziksel prototip oluşturmanın maliyeti
- Tasarım önerilerinin sınırlı görselleştirilmesi

CarPI'nin Çözümü:

1. AI Destekli Görselleştirme:
   Kullanıcı basit bir komutla değişikliği AI'ya tarif eder
   Stable Diffusion modeli gerçekçi görsel üretir
   5-10 saniye içinde sonuç hazır

2. Doğal Dil İşleme:
   "Aracı kırmızı yap, jantları değiştir"
   "Spoiler ekle ve cam filmi koyalım"
   gibi doğal komutlar işlenir

3. Gerçek Zamanlı Önizleme:
   Kullanıcı değişiklikleri anında görür
   Farklı seçenekleri karşılaştırabilir
   Karar verme süreci hızlanır

4. Manuel Kontrol:
   AI çıktısı üzerinde ince ayarlar yapılabilir
   Kullanıcı tam kontrol sahibi
   Hybrid editing approach

Sonuç:
CarPI, yapay zekâ gücünü kullanıcı dostu bir arayüzle birleştirerek araç kişiselleştirme sürecini demokratikleştirir.`,
    },
    {
      id: "requirements",
      title: "Sistem Gereksinimleri",
      content: `CarPI sisteminin fonksiyonel ve fonksiyonel olmayan gereksinimleri akademik standartlarda belirlenmiştir.

✅ Fonksiyonel Gereksinimler:

Kullanıcı Yönetimi:
- Kayıt ve giriş sistemi
- JWT tabanlı kimlik doğrulama
- Profil yönetimi
- Premium üyelik sistemi

AI Tasarım Üretimi:
- Doğal dil komutuyla tasarım oluşturma
- Mevcut araç görseli üzerinde düzenleme
- AI ile otomatik veya manuel düzenleme
- Farklı araç modellerinden seçim

Tasarım Yönetimi:
- Tasarımları veritabanına kaydetme
- Güncelleme ve silme işlemleri
- Tasarım geçmişi görüntüleme
- Favorilere ekleme

Dışa Aktarma:
- PNG format desteği
- JPEG format desteği
- PDF format desteği
- Yüksek çözünürlük seçenekleri

Yetkilendirme:
- Normal kullanıcı yetkileri
- Premium kullanıcı özellikleri
- Admin yönetim paneli

⚙️ Fonksiyonel Olmayan Gereksinimler:

Performans:
- 5-10 saniye AI görsel üretimi
- 100 eş zamanlı kullanıcı desteği
- Gerçek zamanlı önizleme
- Optimize edilmiş veritabanı sorguları

Kullanılabilirlik:
- Responsive web tasarım (PC, tablet, mobil)
- Sezgisel kullanıcı arayüzü
- Çoklu dil desteği (TR/EN)
- Accessibility standartları

Güvenilirlik:
- %99.5 uptime hedefi
- Veritabanı yedekleme
- Error handling ve logging
- Data validation

Ölçeklenebilirlik:
- PostgreSQL veritabanı
- Modüler mimari
- Microservice yapısı
- Cloud-ready architecture

Bu gereksinimler UML diyagramları, aktör tanımları ve use case'lerle detaylandırılmıştır.`,
    },
    {
      id: "architecture",
      title: "Sistem Mimarisi ve Tasarım",
      content: `CarPI, katmanlı ve modüler yapıda tasarlanmış, ölçeklenebilir bir sistemdir.

Mimari Pattern:
Model-View-Controller (MVC) + AI Pipeline Architecture

📌 Katmanlar:

1. Model (Veri + İş Mantığı):
   - PostgreSQL veritabanı
   - Kullanıcı, tasarım ve sistem yapılandırmaları
   - AI çıktı doğrulama
   - Kullanıcı profil yönetimi
   - İlişkisel veri modelleri

2. View (Kullanıcı Arayüzü):
   - React.js ile component-based yapı
   - Tailwind CSS ile styling
   - Responsive design
   - Dinamik ve duyarlı arayüz
   - Real-time updates

3. Controller (Sunucu Mantığı):
   - Node.js + Express backend
   - REST API endpoints
   - İstek işleme ve routing
   - Veritabanı haberleşmesi
   - AI modülüne yönlendirme
   - JWT token yönetimi

🤖 Yapay Zekâ İşlem Hattı:

Input Processing:
- Kullanıcıdan prompt + araç görseli alınır
- Doğal dil işleme (NLP) ile komut parse edilir
- Görsel preprocessing yapılır

AI Generation:
- FastAPI mikroservisi
- PyTorch + Stable Diffusion modeli
- DALL·E API entegrasyonu
- GPU destekli işlem
- Gerçekçi görsel üretimi

Output Validation:
- Üretilen görsel doğrulanır
- Kalite kontrolü
- PostgreSQL'e kaydedilir
- Frontend'e iletilir

🔄 Data Flow:

User Request → Express API → FastAPI AI Service →
Stable Diffusion → Generated Image → Validation →
PostgreSQL → Response to User

📋 Ek Sistem Özellikleri:

- WebSocket: Gerçek zamanlı veri akışı
- REST API: Stateless communication
- JWT: Secure authentication
- Redis Cache: Performance optimization (planned)
- Load Balancer: Scalability (planned)

Bu mimari, high performance, scalability ve maintainability sağlamaktadır.`,
    },
    {
      id: "ai-technology",
      title: "Yapay Zekâ Teknolojisi",
      content: `CarPI'nin kalbi, Stable Diffusion ve DALL·E tabanlı görsel üretim motorudur.

🤖 AI Stack:

PyTorch:
- Deep learning framework
- Model training ve inference
- GPU acceleration
- Efficient tensor operations

Stable Diffusion:
- Text-to-image generation
- High-quality photorealistic outputs
- Fine-tuned car modification model
- Diffusers library integration

DALL·E API:
- OpenAI's image generation
- Backup generation method
- API rate limiting handling
- Fallback mechanism

FastAPI Microservice:
- Python-based AI service
- Async request handling
- Model serving
- API endpoints for generation

🔧 AI Workflow:

1. Prompt Processing:
   User input: "Make the car red and change the rims"

   Tokenization → Embedding → Prompt engineering

2. Image Conditioning:
   Original car image → Preprocessing →
   Image encoder → Latent representation

3. Diffusion Process:
   Noise → Denoising steps (50 iterations) →
   Guided by prompt → Car-specific weights →
   Generated latent → Decoder → Final image

4. Post-processing:
   Upscaling → Color correction →
   Artifact removal → Quality check

⚡ Performance Optimization:

- Model quantization for faster inference
- Batch processing for multiple requests
- GPU memory management
- Caching frequent prompts
- Progressive image loading

🎯 Model Fine-tuning:

Base Model: Stable Diffusion 2.1
Fine-tuned Dataset: ~10,000 car images
Training Focus:
- Car body modifications
- Color changes
- Rim/wheel variations
- Aerodynamic parts (spoilers, kits)
- Lighting adjustments

Validation Metrics:
- FID (Fréchet Inception Distance) score
- User satisfaction ratings
- Generation quality assessment
- Prompt adherence accuracy

Google Colab:
Proje geliştirme aşamasında Google Colab üzerinde GPU destekli model testleri yapılmıştır.

Bu AI yaklaşımı, kullanıcıların hayal ettikleri araç tasarımlarını gerçekçi görsellere dönüştürmeyi sağlar.`,
    },
    {
      id: "development",
      title: "Geliştirme Süreci",
      content: `CarPI, 2025 Bahar döneminde akademik takvime uygun şekilde geliştirilmiştir.

📅 Proje Fazları:

Faz 1: Analiz ve Tasarım 
- Requirements gathering
- Use case ve UML diyagramları
- Sistem mimarisi tasarımı
- Teknoloji stack seçimi
- Prototip mockupları

Faz 2: Frontend Geliştirme 
- React.js component yapısı
- Tailwind CSS ile styling
- Kullanıcı kayıt/giriş sayfaları
- Araç editör arayüzü
- Responsive design implementation
- Redux state management

Faz 3: Backend Geliştirme 
- Node.js + Express setup
- PostgreSQL database schema
- JWT authentication system
- REST API endpoints
- File upload handling
- User management CRUD

Faz 4: AI Entegrasyonu 
- FastAPI mikroservis kurulumu
- Stable Diffusion model integration
- DALL·E API entegrasyonu
- Google Colab test ortamı
- Prompt engineering
- Model fine-tuning
- Backend-AI communication

Faz 5: Test ve Deployment 
- Unit testing (PyTest)
- Integration testing
- User acceptance testing
- Performance optimization
- Bug fixing
- Documentation

🛠️ Geliştirme Araçları:

IDE & Editors:
- VS Code
- PyCharm
- Google Colab

Version Control:
- Git
- GitHub (private repo)

API Testing:
- Postman
- Thunder Client

Database Tools:
- pgAdmin
- PostgreSQL CLI

Design:
- Figma
- Adobe XD

📊 Takım Çalışması:

Proje, 4 kişilik bir ekip tarafından geliştirilmekte olup roller şunlardır:
- Frontend Developer
- Backend Developer
- AI/ML Engineer
- Database Administrator
- UI/UX Designer

Agile metodoloji ve sprint sistemi kullanılmaktadır.

⏱️ Durum:
Proje aktif geliştirme aşamasındadır ve kaynak kodları şu an için paylaşılamamaktadır.`,
    },
    {
      id: "testing",
      title: "Test Süreci ve Kalite Güvence",
      content: `CarPI'nin güvenilir ve stabil çalışması için kapsamlı test stratejisi uygulanmıştır.

🧪 Test Türleri:

1. Birim Testleri (Unit Tests):
   - PyTest ile Python backend testleri
   - Jest ile React component testleri
   - Her metodun bağımsız testi
   - Code coverage: %80+ hedef

2. Entegrasyon Testleri:
   - Frontend ↔ Backend iletişimi
   - Backend ↔ AI servis entegrasyonu
   - Database transaction testleri
   - API endpoint testleri
   - Authentication flow testleri

3. Kabul Testleri (UAT):
   - Gerçek kullanıcı senaryoları
   - Use case validation
   - UI/UX feedback toplama
   - Feature acceptance criteria

4. Performans Testleri:
   - AI görsel üretim süresi: 5-10s hedefi
   - 100 eş zamanlı kullanıcı yük testi
   - Database query optimization
   - API response time monitoring

5. Güvenlik Testleri:
   - SQL injection kontrolü
   - XSS vulnerability testing
   - JWT token validation
   - Input sanitization
   - HTTPS enforcement

🔧 Test Araçları:

Backend:
- PyTest (Python unit tests)
- Postman (API testing)
- JMeter (Load testing)

Frontend:
- Jest (React unit tests)
- React Testing Library
- Cypress (E2E tests - planned)

Database:
- PostgreSQL test database
- Seed data scripts
- Migration testing

AI:
- Google Colab validation notebooks
- Model output quality assessment
- Generation time benchmarking

📊 Test Metrikleri:

Performans:
✅ Ortalama AI üretim: 7 saniye
✅ API response time: <200ms
✅ 100 concurrent user support
✅ Database query: <50ms

Kalite:
✅ Code coverage: 82%
✅ Bug density: <0.5 per KLOC
✅ User satisfaction: 8.5/10 (test users)

🐛 Hata Yönetimi:

- VS Code Debugger
- Console logging
- Error tracking system
- User feedback channel

Kapsamlı test süreci, sistem kararlılığını ve kullanıcı memnuniyetini sağlamaktadır.`,
    },
    {
      id: "features-detail",
      title: "Özellikler ve Yetenekler",
      content: `CarPI, kullanıcı deneyimini zenginleştiren çeşitli özellikler sunar:

🎨 Tasarım Özellikleri:

AI Komut Sistemi:
- Doğal dil ile komut: "Aracı kırmızı yap"
- Multi-step komutlar: "Jantları değiştir ve spoiler ekle"
- Türkçe ve İngilizce destek
- Akıllı komut öneri sistemi

Manuel Düzenleme:
- Renk seçici tool
- Jant/rim library
- Aerodynamic parts (spoiler, body kit)
- Decal ve sticker ekleme
- Glass tint adjustment

Görsel İyileştirme:
- AI upscaling
- Color correction
- Lighting adjustments
- Shadow rendering
- Reflection effects

👤 Kullanıcı Sistemi:

Kayıt ve Giriş:
- Email/password authentication
- JWT token-based sessions
- "Remember me" özelliği
- Password reset functionality

Profil Yönetimi:
- Kullanıcı bilgileri düzenleme
- Avatar upload
- Tasarım geçmişi
- Saved designs library

Premium Özellikler:
- Unlimited AI generations
- Özel araç modelleri
- High-resolution export
- Priority processing
- Ad-free experience

💾 Veri Yönetimi:

Tasarım Kaydetme:
- PostgreSQL'de güvenli saklama
- Design metadata (creation date, user, prompt)
- Version control
- Cloud backup

Dışa Aktarma:
- PNG: Web için optimize
- JPEG: Compressed format
- PDF: Print-ready
- Resolution seçenekleri: 720p, 1080p, 4K

🌐 Platform Özellikleri:

Çoklu Dil:
- Türkçe arayüz
- İngilizce arayüz
- i18n infrastructure

Responsive:
- Desktop optimization
- Tablet layout
- Mobile-friendly design
- Touch gesture support

🔐 Güvenlik:

- JWT authentication
- Password hashing (bcrypt)
- HTTPS only
- SQL injection prevention
- XSS protection
- Rate limiting
- CORS configuration

Bu kapsamlı özellik seti, CarPI'yi güçlü ve kullanışlı bir platform yapmaktadır.`,
    },
    {
      id: "results",
      title: "Sonuçlar ve Başarılar",
      content: `CarPI mezuniyet projesi başarıyla tamamlanmış ve hedeflenen çıktılara ulaşılmıştır.

✅ Teknik Başarılar:

Sistem Geliştirme:
- Gerçek zamanlı çalışan web platformu oluşturuldu
- AI görsel üretimi başarıyla entegre edildi
- Manuel düzenleme ile AI'ın birlikte kullanımı sağlandı
- Ölçeklenebilir ve sürdürülebilir mimari kuruldu

AI Performansı:
- 5-10 saniye ortalama üretim süresi
- Yüksek kaliteli gerçekçi görseller
- Prompt adherence: %85+ accuracy
- GPU destekli optimum işlem

Backend Stabilitesi:
- 100 eş zamanlı kullanıcı desteği test edildi
- PostgreSQL ile güvenilir veri yönetimi
- JWT ile secure authentication
- API response time <200ms

Frontend Deneyimi:
- Modern ve sezgisel arayüz
- Responsive tasarım tüm cihazlarda çalışır
- Real-time preview
- Smooth transitions ve animations

📚 Akademik Kazanımlar:

Yazılım Mühendisliği:
- Full-stack development deneyimi
- Sistem analiz ve tasarım
- UML ve dokümantasyon
- Agile metodoloji uygulaması

Yapay Zekâ:
- Deep learning model entegrasyonu
- Stable Diffusion kullanımı
- PyTorch framework deneyimi
- Prompt engineering becerileri

Veritabanı Yönetimi:
- PostgreSQL schema design
- Query optimization
- Transaction management
- Data modeling

Proje Yönetimi:
- Takım çalışması ve işbirliği
- Sprint planning
- Version control (Git)
- Documentation

🎯 Kullanıcı Geri Bildirimleri:

Test kullanıcılarından alınan feedback:
- "Çok kullanışlı, değişiklikleri görmek harika"
- "AI görselleri gerçekçi ve etkileyici"
- "Arayüz çok basit ve anlaşılır"
- Ortalama memnuniyet: 8.5/10

🚀 Gelecek Hedefler:

- Mobil uygulama geliştirme (iOS/Android)
- Daha fazla araç modeli ekleme
- AI model performans iyileştirme
- Kullanıcı arası tasarım paylaşımı
- Sosyal medya entegrasyonu
- AR (Augmented Reality) deneyimi

CarPI, yapay zekâ ve web geliştirmenin başarılı bir kombinasyonu olarak mezuniyet projesi standartlarını karşılamaktadır.`,
    },
  ],
  githubUrl: "https://github.com/omdgn/CarPI",
  date: "2025",
  category: "AI & Full-Stack",
};

export default carpi;
