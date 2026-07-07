import { Project } from "./types";

const doctorAppointmentApi: Project = {
  slug: "doctor-appointment-api",
  title: "Doctor Appointment API and Basic UI",
  description: "Mikroservis mimarisi ile geliştirilmiş doktor randevu yönetim sistemi REST API",
  longDescription: `Hastalar, doktorlar ve admin kullanıcıları için mikroservis mimarisi ile geliştirilmiş kapsamlı doktor randevu yönetim API'si.

Proje, rol tabanlı kimlik doğrulama, doktor kayıt ve listeleme, randevu oluşturma ve yönetimi, RabbitMQ ile otomatik bildirim servisi gibi özellikleri içerir. API Gateway ile merkezi yönetim ve mikroservis mimarisi sayesinde ölçeklenebilir yapı sunar.

Modüler yapısı sayesinde her servis bağımsız çalışabilir ve sistem performansı optimize edilmiştir.`,
  thumbnail: "/projects/Doctor-appointment-api/doctor_appointment_main_photo.png",
  images: [
    "/projects/Doctor-appointment-api/login.png",
    "/projects/Doctor-appointment-api/doctor_register.png",
    "/projects/Doctor-appointment-api/user_dashboard.png",
    "/projects/Doctor-appointment-api/gateway.png",
    "/projects/Doctor-appointment-api/rabbitmq_notification_output.png",
    "/projects/Doctor-appointment-api/scheduled_mail.png",
    "/projects/Doctor-appointment-api/test notificitation.png",
  ],
  technologies: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "RabbitMQ",
    "JWT",
    "API Gateway",
    "Nodemailer",
    "Node-cron",
  ],
  features: [
    "Mikroservis mimarisi ile modüler yapı",
    "Rol tabanlı kimlik doğrulama (Patient, Doctor, Admin)",
    "JWT ile güvenli token-based authentication",
    "Doctor Service: Doktor kayıt, listeleme ve profil yönetimi",
    "Patient Service: Hasta kayıt ve randevu yönetimi",
    "Appointment Service: Randevu oluşturma, düzenleme ve iptal",
    "Notification Service: RabbitMQ ile otomatik e-posta bildirimleri",
    "Zamanlanmış bildirimler (node-cron ile)",
    "Merkezi API Gateway ile servis yönlendirme",
    "MongoDB ile NoSQL veritabanı yönetimi",
  ],
  sections: [
    {
      id: "overview",
      title: "Genel Bakış",
      content: `Doctor Appointment API, modern mikroservis mimarisi ile geliştirilmiş kapsamlı bir doktor randevu yönetim sistemidir. Hastalar, doktorlar ve admin kullanıcıları için özel servisler sunar.

Her servis bağımsız çalışabilir ve kendi veritabanına sahiptir. API Gateway üzerinden tüm servisler merkezi bir noktadan yönetilir. RabbitMQ ile asenkron bildirim sistemi sayesinde hastalar ve doktorlar randevu durumu hakkında otomatik e-posta alırlar.`,
    },
    {
      id: "architecture",
      title: "Mikroservis Mimarisi",
      content: `Proje 6 ana servisten oluşur:

1. Auth Service: Kullanıcı kayıt ve giriş işlemleri (hastalar, doktorlar, adminler)
2. Doctor Service: Doktor profil yönetimi, uzmanlık alanları ve müsaitlik
3. Patient Service: Hasta profil yönetimi ve randevu geçmişi
4. Appointment Service: Randevu oluşturma, düzenleme ve iptal işlemleri
5. Notification Service: RabbitMQ ile e-posta bildirimleri (randevu onayı, hatırlatma)
6. API Gateway: Tüm servisleri merkezi noktadan yönlendirir

Her servis kendi MongoDB veritabanına sahiptir ve Express.js ile geliştirilmiştir. Servisler arası iletişim RabbitMQ message queue üzerinden sağlanır.`,
    },
    {
      id: "authentication",
      title: "Authentication ve Authorization",
      content: `JWT (JSON Web Token) tabanlı güvenli kimlik doğrulama sistemi. Kullanıcılar kayıt olurken rollerini seçer: Patient, Doctor veya Admin.

Her rol farklı yetkilere sahiptir:
- Patient: Randevu oluşturabilir, görüntüleyebilir ve iptal edebilir
- Doctor: Kendi randevularını görebilir, profil bilgilerini güncelleyebilir, müsaitlik durumunu ayarlayabilir
- Admin: Tüm randevuları görebilir, doktor ve hastaları yönetebilir

Token-based authentication sayesinde her istekte kullanıcı doğrulaması yapılır ve hassas veriler korunur.`,
    },
    {
      id: "doctor-features",
      title: "Doktor Özellikleri",
      content: `Doctor servisi, doktorların profil ve randevu yönetimini sağlar:

- Doktor kaydı ve profil oluşturma
- Uzmanlık alanı (kardiolog, diyetisyen, psikolog, vb.) seçimi
- Çalışma saatleri ve müsaitlik takvimi ayarlama
- Randevu taleplerini görüntüleme ve onaylama
- Hasta geçmişi ve notları görüntüleme
- Profil bilgilerini güncelleme (biyografi, eğitim, deneyim)

Doktorlar, dashboard üzerinden tüm randevularını ve hasta bilgilerini kolayca takip edebilir.`,
    },
    {
      id: "patient-features",
      title: "Hasta Özellikleri",
      content: `Patient servisi, hastaların randevu almasını ve yönetmesini sağlar:

- Hasta kaydı ve profil oluşturma
- Doktor arama ve listeleme (uzmanlık alanına göre filtreleme)
- Müsait doktorları görüntüleme ve randevu oluşturma
- Gelecek randevuları görüntüleme
- Randevu iptal etme veya erteleme
- Randevu geçmişi ve doktor yorumları
- E-posta bildirimleri alma (randevu onayı, hatırlatma)

Hastalar, kullanıcı dostu dashboard üzerinden tüm işlemlerini gerçekleştirebilir.`,
    },
    {
      id: "appointment-management",
      title: "Randevu Yönetimi",
      content: `Appointment servisi, randevu işlemlerinin merkezi yönetimini sağlar:

- Hasta tarafından randevu talebi oluşturma
- Doktor müsaitliğine göre zaman slotu seçimi
- Randevu onayı ve güncelleme
- Randevu iptali ve erteleme
- Geçmiş randevu kayıtları
- Çakışma kontrolü ve doğrulama

Randevu durumu değiştiğinde (onay, iptal, hatırlatma) otomatik olarak Notification Service'e mesaj gönderilir.`,
    },
    {
      id: "notification-system",
      title: "Bildirim Sistemi (RabbitMQ)",
      content: `RabbitMQ tabanlı asenkron bildirim sistemi:

- Randevu oluşturulduğunda hastaya ve doktora onay e-postası
- Randevu öncesi otomatik hatırlatma e-postaları (node-cron ile zamanlanmış)
- Randevu iptalinde bilgilendirme e-postaları
- Message Queue: Notification istekleri kuyruğa eklenir
- Worker Process: Arka planda kuyrukları dinler ve e-postaları gönderir
- Nodemailer ile SMTP entegrasyonu

Bu sayede e-posta gönderim işlemleri API yanıt süresini etkilemez ve sistem performansı artar.`,
    },
    {
      id: "scheduled-notifications",
      title: "Zamanlanmış Bildirimler",
      content: `node-cron ile otomatik hatırlatma sistemi:

- Her gün sabah 08:00'de sistem randevuları kontrol eder
- Randevuya 24 saat kala hastaya hatırlatma e-postası gönderilir
- Randevuya 1 saat kala doktora hatırlatma e-postası gönderilir
- Cron job sayesinde manuel müdahale gerektirmez
- MongoDB'den randevu verileri alınır ve RabbitMQ'ya gönderilir

Zamanlanmış görevler sayesinde kullanıcı deneyimi geliştirilir ve randevu unutma oranı azalır.`,
    },
    {
      id: "gateway",
      title: "API Gateway",
      content: `Merkezi API Gateway, tüm mikroservisleri yönlendirir:

- /auth/* → Auth Service
- /doctors/* → Doctor Service
- /patients/* → Patient Service
- /appointments/* → Appointment Service
- /notifications/* → Notification Service

express-http-proxy kullanılarak istekler ilgili servislere yönlendirilir. Bu sayede frontend tek bir endpoint üzerinden tüm servislere erişebilir.

Gateway ayrıca rate limiting, CORS yönetimi ve merkezi logging sağlar.`,
    },
    {
      id: "challenges",
      title: "Teknik Zorluklar ve Çözümler",
      content: `Proje geliştirme sürecinde karşılaşılan zorluklar:

1. RabbitMQ entegrasyonu: Manuel kurulum ve konfigürasyon, queue yönetimi
2. E-posta SMTP ayarları: Nodemailer ile Gmail SMTP entegrasyonu ve güvenlik ayarları
3. Zamanlanmış görevler: node-cron ile arka plan görevleri ve zaman dilimi yönetimi
4. Servisler arası iletişim: RESTful API ve message queue kombinasyonu
5. Veritabanı yönetimi: Her servis için ayrı MongoDB instance ve veri senkronizasyonu

Bu zorluklar, mikroservis mimarisinin karmaşıklığını ve gerçek dünya problemlerine çözüm üretme becerisini gösterir.`,
    }
  ],
  githubUrl: "https://github.com/omdgn/Doctor_Appointment_api",
  date: "2024",
  category: "Full-Stack",
};

export default doctorAppointmentApi;
