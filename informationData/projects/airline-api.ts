import { Project } from "./types";

const airlineApi: Project = {
  slug: "airline-api",
  title: "Airline Company API",
  description: "JWT tabanlı kimlik doğrulama ile havayolu bilet yönetim sistemi REST API",
  longDescription: `Admin ve mobil uygulama kullanıcıları için geliştirilmiş tam özellikli havayolu bilet yönetim API'si.

Admin paneli üzerinden uçuş ekleme, kapasite raporları oluşturma ve sistem yönetimi yapılabilir. Mobil uygulama kullanıcıları ise tarih, kalkış ve varış noktasına göre uçuş arama, bilet satın alma ve check-in işlemlerini gerçekleştirebilir.

Proje, tekrarlayan uçuş programlarını destekler ve yolcu adına göre bilet ID üretimi yapar. Büyük veri setleri için pagination desteği sunar.`,
  thumbnail: "/projects/airline-api/airline_company_api_main_photo.png",
  images: [
    "/projects/airline-api/Authentication_token.png",
    "/projects/airline-api/admin_flights.png",
    "/projects/airline-api/admin_capacity_report.png",
    "/projects/airline-api/flight_query.png",
    "/projects/airline-api/buy_ticket.png",
    "/projects/airline-api/checkin_ticket.png",
  ],
  technologies: [
    "Node.js",
    "Express.js",
    "MySQL",
    "JWT",
    "Swagger",
    "Heroku",
  ],
  features: [
    "JWT tabanlı güvenli kimlik doğrulama",
    "Admin paneli: Uçuş ekleme ve kapasite raporları",
    "Mobil app: Uçuş arama, bilet satın alma, check-in",
    "Tarih, kalkış ve varış noktasına göre gelişmiş arama",
    "Tekrarlayan uçuş programları desteği",
    "Yolcu adına göre otomatik bilet ID üretimi",
    "Pagination ile büyük veri yönetimi",
    "Swagger API dokümantasyonu",
  ],
  sections: [
    {
      id: "overview",
      title: "Genel Bakış",
      content: `Airline Company API, kurgusal bir havayolu şirketi için geliştirilmiş kapsamlı bir bilet yönetim sistemidir. Proje, admin kullanıcıları ve mobil uygulama müşterileri için farklı özelliklere sahip iki ana kullanıcı grubunu destekler.

Admin kullanıcıları sistem üzerinden uçuş planlaması yapar, kapasite raporları oluşturur ve tüm sistemi yönetir. Mobil uygulama kullanıcıları ise müşteri rolündedir ve uçuş arama, bilet satın alma ve check-in işlemlerini gerçekleştirir.

API, RESTful mimaride tasarlanmış olup Heroku üzerinde deploy edilmiştir. MySQL veritabanı Google Cloud platformunda barındırılmaktadır.`,
    },
    {
      id: "authentication",
      title: "Kimlik Doğrulama ve Güvenlik",
      content: `JWT (JSON Web Token) tabanlı güvenli kimlik doğrulama sistemi kullanılmaktadır. Admin kullanıcıları login olurken kullanıcı adı ve şifre ile doğrulama yapar ve 1 saatlik geçerlilik süresi olan bir JWT token alır.

Token yapısı:
- Header: Algoritma ve token tipi
- Payload: Kullanıcı bilgileri ve yetkilendirme
- Signature: Güvenlik imzası

Her admin işleminde (uçuş ekleme, rapor oluşturma) Authorization header'ında Bearer token gönderilmesi zorunludur. Token süresi dolduğunda kullanıcının tekrar login olması gerekir.

Mobil uygulama kullanıcıları için authentication gerektirmez, bu sayede misafir kullanıcılar da uçuş sorgulayabilir ve bilet alabilir.`,
    },
    {
      id: "admin-features",
      title: "Admin Paneli Özellikleri",
      content: `Admin kullanıcıları sistem üzerinde geniş yetkilere sahiptir:

1. Uçuş Yönetimi (POST /api/admin/flights):
   - Yeni uçuş rotaları ekleme
   - Uçuş tarihi, saati ve fiyat belirleme
   - Kalkış ve varış noktalarını tanımlama
   - Uçak kapasitesini ayarlama (koltuk sayısı)
   - Tekrarlayan uçuş programları oluşturma

2. Kapasite Raporları (POST /api/admin/creports):
   - Belirli tarih aralığı için doluluk raporları
   - Uçuş bazında satılan bilet sayısı
   - Boş koltuk analizi
   - Gelir tahminleri

Tüm admin işlemleri JWT token ile korunur ve loglama sistemi ile takip edilir.`,
    },
    {
      id: "mobile-features",
      title: "Mobil Uygulama Özellikleri",
      content: `Mobil uygulama kullanıcıları için üç ana işlev sunulur:

1. Uçuş Sorgulama (GET /api/flights):
   - Tarih aralığına göre filtreleme
   - Kalkış havalimanı seçimi
   - Varış havalimanı seçimi
   - Müsait uçuşları listeleme
   - Fiyat ve süre bilgilerini görüntüleme
   - Pagination ile sayfalama (büyük veri setleri için)

2. Bilet Satın Alma (POST /api/tickets/buy):
   - Yolcu bilgilerini girme (ad, soyad, kimlik)
   - Uçuş seçimi
   - Otomatik bilet ID üretimi
   - Koltuk kapasitesi kontrolü
   - Bilet onay bilgisi alma

3. Check-in İşlemi (POST /api/tickets/checkin):
   - Bilet ID ile sorgulama
   - Yolcu doğrulama
   - Check-in statüsü güncelleme
   - Boarding pass bilgileri`,
    },
    {
      id: "database",
      title: "Veritabanı Yapısı",
      content: `MySQL veritabanı kullanılarak iki ana tablo ile veri yönetimi sağlanır:

1. Flights Tablosu:
   - flight_id: Benzersiz uçuş kimliği
   - origin: Kalkış havalimanı
   - destination: Varış havalimanı
   - departure_time: Kalkış zamanı
   - arrival_time: Varış zamanı
   - price: Bilet fiyatı
   - capacity: Toplam koltuk sayısı
   - available_seats: Müsait koltuk sayısı

2. Tickets Tablosu:
   - ticket_id: Otomatik oluşturulan bilet ID
   - flight_id: İlişkili uçuş kimliği (foreign key)
   - passenger_name: Yolcu adı
   - passenger_id: Yolcu kimlik bilgisi
   - purchase_date: Satın alma tarihi
   - checkin_status: Check-in durumu (boolean)

mysql2 kütüphanesi ile connection pooling yapılarak performans optimize edilmiştir.`,
    },
    {
      id: "api-endpoints",
      title: "API Endpoint Yapısı",
      content: `RESTful API prensiplerine uygun endpoint tasarımı:

Admin Endpoints (JWT Gerekli):
• POST /api/auth/login
  Body: { username, password }
  Response: { token, expiresIn }

• POST /api/admin/flights
  Header: Authorization: Bearer <token>
  Body: { origin, destination, date, time, price, capacity }
  Response: { flightId, message }

• POST /api/admin/creports
  Header: Authorization: Bearer <token>
  Body: { startDate, endDate }
  Response: { flights: [], totalRevenue, occupancyRate }

Public Endpoints:
• GET /api/flights
  Query: ?origin=IST&destination=ANK&date=2024-01-01
  Response: { flights: [], pagination }

• POST /api/tickets/buy
  Body: { flightId, passengerName, passengerId }
  Response: { ticketId, confirmationCode }

• POST /api/tickets/checkin
  Body: { ticketId, passengerId }
  Response: { success, boardingPass }`,
    },
    {
      id: "technical-implementation",
      title: "Teknik Uygulama Detayları",
      content: `Projenin teknik implementasyonunda dikkat edilen önemli noktalar:

1. Bilet ID Üretimi:
   Yolcu adına göre algoritmik ID üretimi yapılır. Örnek: "John Doe" + timestamp + random hash = JD20240101ABC123

2. Tekrarlayan Uçuşlar:
   Admin, belirli günlerde düzenli sefer ekleyebilir. Sistem, batch insert ile performanslı kayıt yapar.

3. Kapasite Yönetimi:
   Her bilet satışında available_seats değeri otomatik güncellenir. Transaction kullanılarak data consistency sağlanır.

4. Pagination:
   Büyük veri setlerinde sayfa başına 20 sonuç gösterilir. LIMIT ve OFFSET kullanılarak SQL sorguları optimize edilir.

5. Error Handling:
   Tüm endpoint'ler try-catch blokları ile korunur. HTTP status kodları (200, 400, 401, 500) doğru kullanılır.

6. Swagger Dokümantasyon:
   API endpoints, request/response formatları ve örnek kullanımlar Swagger UI üzerinden görüntülenebilir.`,
    },
    {
      id: "deployment",
      title: "Deployment ve Hosting",
      content: `Proje production ortamında şu şekilde deploy edilmiştir:

Platform: Heroku
- Node.js buildpack kullanımı
- Environment variables ile config yönetimi
- Otomatik SSL sertifikası
- Dyno scaling desteği

Database: Google Cloud MySQL
- Cloud SQL instance
- Otomatik backup sistemi
- Connection pooling
- IP whitelist güvenliği

CI/CD:
- GitHub repository ile entegrasyon
- Push to main branch → otomatik deploy
- Environment-based configuration

Monitoring:
- Heroku logs ile hata takibi
- Database query performance monitoring
- API response time tracking`,
    },
    {
      id: "challenges",
      title: "Karşılaşılan Zorluklar ve Çözümler",
      content: `Proje geliştirme sürecinde karşılaşılan teknik zorluklar:

1. Token Yönetimi:
   Problem: Token expiration handling
   Çözüm: 1 saatlik süre + refresh token mekanizması tasarımı

2. Concurrency Kontrolü:
   Problem: Aynı uçuşa eş zamanlı bilet satışı
   Çözüm: MySQL transaction ve row locking kullanımı

3. Tarih Formatları:
   Problem: Farklı timezone'lar için tarih yönetimi
   Çözüm: UTC standardına geçiş ve client-side conversion

4. Database Performance:
   Problem: Büyük veri setlerinde yavaş sorgu
   Çözüm: Index oluşturma ve pagination implementasyonu

5. Heroku Deployment:
   Problem: Environment variables ve port binding
   Çözüm: process.env kullanımı ve dynamic port configuration

Bu zorluklar, REST API geliştirme ve production deployment konusunda derinlemesine bilgi kazandırdı.`,
    },
  ],
  githubUrl: "https://github.com/omdgn/airline_company_api_design",
  date: "2024",
  category: "Backend",
};

export default airlineApi;
