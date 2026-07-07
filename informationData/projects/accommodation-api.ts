import { Project } from "./types";

const accommodationApi: Project = {
  slug: "accommodation-api",
  title: "Accommodation API",
  description: "Mikroservis mimarisi ile geliştirilmiş konaklama yönetim sistemi REST API",
  longDescription: `Ev sahipleri, misafirler ve admin kullanıcıları için mikroservis mimarisi ile geliştirilmiş kapsamlı konaklama yönetim API'si.

Proje, rol tabanlı kimlik doğrulama, mülk listeleme, rezervasyon ve ödeme işlemleri, yorum sistemi gibi özellikleri içerir. RabbitMQ ile asenkron ödeme işlemleri ve API Gateway ile merkezi yönetim sağlar.

Modüler yapısı sayesinde her servis bağımsız çalışabilir ve ölçeklenebilir bir mimari sunar.`,
  thumbnail: "/projects/accommodation-api/accommodation_api_main_photo.png",
  images: [
    //"/projects/accommodation-api/accommodation_api_main_photo.png",
  ],
  technologies: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "RabbitMQ",
    "JWT",
    "API Gateway",
  ],
  features: [
    "Mikroservis mimarisi ile modüler yapı",
    "Rol tabanlı kimlik doğrulama (Host, Guest, Admin)",
    "JWT ile güvenli token-based authentication",
    "Host servisi: Mülk listeleme ve yönetim",
    "Guest servisi: Rezervasyon, ödeme ve yorum",
    "Admin servisi: Sistem geneli yönetim ve denetim",
    "RabbitMQ ile asenkron ödeme ve iade işlemleri",
    "Merkezi API Gateway ile servis yönlendirme",
    "MongoDB ile NoSQL veritabanı yönetimi",
  ],
  sections: [
    {
      id: "overview",
      title: "Genel Bakış",
      content: `Accommodation API, modern mikroservis mimarisi ile geliştirilmiş kapsamlı bir konaklama yönetim sistemidir. Proje, ev sahipleri, misafirler ve admin kullanıcıları için özel servisler sunar.

Her servis bağımsız çalışabilir ve kendi veritabanına sahiptir. Bu sayede sistemin bir bölümünde yaşanan sorun diğer servisleri etkilemez. API Gateway üzerinden tüm servisler merkezi bir noktadan yönetilir.`,
    },
    {
      id: "architecture",
      title: "Mikroservis Mimarisi",
      content: `Proje 5 ana servisten oluşur:

1. Auth Service: Kullanıcı kayıt ve giriş işlemleri
2. Host Service: Ev sahipleri için mülk listeleme ve yönetim
3. Guest Service: Misafirler için rezervasyon, ödeme ve yorum
4. Admin Service: Sistem yöneticileri için genel denetim
5. API Gateway: Tüm servisleri merkezi noktadan yönlendirir

Her servis kendi MongoDB veritabanına sahiptir ve Express.js ile geliştirilmiştir.`,
    },
    {
      id: "authentication",
      title: "Authentication ve Authorization",
      content: `JWT (JSON Web Token) tabanlı güvenli kimlik doğrulama sistemi. Kullanıcılar kayıt olurken rollerini seçer: Host, Guest veya Admin.

Her rol farklı yetkilere sahiptir:
- Host: Mülk ekleyebilir, düzenleyebilir ve silebilir
- Guest: Rezervasyon yapabilir, ödeme gerçekleştirebilir ve yorum yazabilir
- Admin: Tüm mülkleri görebilir ve sistemi yönetebilir

Token-based authentication sayesinde her istekte kullanıcı doğrulaması yapılır.`,
    },
    {
      id: "host-features",
      title: "Ev Sahibi Özellikleri",
      content: `Host servisi, ev sahiplerinin mülklerini yönetmesini sağlar:

- Yeni mülk ekleme (başlık, açıklama, fiyat, konum, fotoğraf)
- Mevcut mülkleri görüntüleme ve düzenleme
- Mülk silme işlemleri
- Mülk durumu güncelleme (müsait/dolu)
- Rezervasyon taleplerini görüntüleme

Her mülk, MongoDB'de detaylı bilgilerle saklanır ve sadece sahibi tarafından düzenlenebilir.`,
    },
    {
      id: "guest-features",
      title: "Misafir Özellikleri",
      content: `Guest servisi, misafirlerin konaklama rezervasyonu yapmalarını sağlar:

- Mevcut mülkleri arama ve listeleme
- Tarih, konum ve fiyata göre filtreleme
- Rezervasyon oluşturma
- Ödeme işlemleri (RabbitMQ ile asenkron)
- Rezervasyon iptali ve iade
- Konaklama sonrası yorum ve değerlendirme

Ödeme işlemleri RabbitMQ kuyruğuna gönderilir ve arka planda işlenir.`,
    },
    {
      id: "admin-features",
      title: "Admin Özellikleri",
      content: `Admin servisi, sistem yöneticilerine kapsamlı kontrol sağlar:

- Tüm mülkleri görüntüleme ve yönetme
- Kullanıcı hesaplarını inceleme
- Şüpheli mülkleri silme veya askıya alma
- Sistem geneli raporlama
- İstatistik ve analiz verileri

Admin paneli, tüm servislere erişim yetkisi olan merkezi bir yönetim arayüzüdür.`,
    },
    {
      id: "rabbitmq",
      title: "RabbitMQ ile Asenkron İşlemler",
      content: `RabbitMQ, ödeme ve iade işlemlerinin asenkron olarak gerçekleştirilmesini sağlar:

- Payment Queue: Ödeme istekleri kuyruğa eklenir
- Refund Queue: İade işlemleri ayrı kuyrukta işlenir
- Worker Process: Arka planda kuyrukları dinler ve işler
- Error Handling: Başarısız işlemler tekrar kuyruğa eklenir

Bu sayede ödeme işlemleri API yanıt süresini etkilemez ve sistem performansı artar.`,
    },
    {
      id: "gateway",
      title: "API Gateway",
      content: `Merkezi API Gateway, tüm mikroservisleri yönlendirir:

- /auth/* → Auth Service
- /host/* → Host Service
- /guest/* → Guest Service
- /admin/* → Admin Service

express-http-proxy kullanılarak istekler ilgili servislere yönlendirilir. Bu sayede frontend tek bir endpoint üzerinden tüm servislere erişebilir.`,
    },
    {
      id: "challenges",
      title: "Teknik Zorluklar ve Çözümler",
      content: `Proje geliştirme sürecinde karşılaşılan zorluklar:

1. RabbitMQ Docker olmadan kurulum: Manuel kurulum ve konfigürasyon
2. API Gateway port yönlendirme: express-http-proxy ile çözüldü
3. Servisler arası iletişim: RESTful API ve message queue kombinasyonu
4. Veritabanı yönetimi: Her servis için ayrı MongoDB instance

Bu zorluklar, mikroservis mimarisinin karmaşıklığını ve çözüm üretme becerisini gösterir.`,
    },
  ],
  githubUrl: "https://github.com/omdgn/Accommodation_API_project",
  date: "2024",
  category: "Backend",
};

export default accommodationApi;
