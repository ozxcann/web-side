import { Project } from "./types";

const pusulaObs: Project = {
  slug: "pusula-obs",
  title: "Pusula OBS - Öğrenci Bilgi Sistemi",
  description: "React ve ASP.NET Core ile geliştirilmiş kapsamlı öğrenci otomasyon sistemi. JWT authentication, rol bazlı yetkilendirme, ders yönetimi, notlandırma ve yoklama takibi özellikleriyle modern bir OBS platformu",
  longDescription: `Pusula OBS, akademik yönetimi kolaylaştırmak için tasarlanmış full-stack bir öğrenci bilgi sistemidir.

Sistem, admin, öğretmen ve öğrenci rollerinde farklı yetkilere sahip kullanıcılar için kapsamlı bir akademik yönetim deneyimi sunar. React frontend, ASP.NET Core backend ve PostgreSQL veritabanı ile geliştirilmiş, Render.com üzerinde Docker containerization ile deploy edilmiştir.

JWT authentication, rol bazlı erişim kontrolü, modern UI/UX ve dark/light mode desteği ile profesyonel bir öğrenci otomasyon platformudur.`,
  thumbnail: "/projects/pusula-obs/pusula-studentautomation_main_photo.png",
  images: [
    "/projects/pusula-obs/dashboard_dark.png",
    "/projects/pusula-obs/dashboard_light.png",
    "/projects/pusula-obs/login-register.png",
    "/projects/pusula-obs/teacher1.png",
    "/projects/pusula-obs/teacher2.png",
    "/projects/pusula-obs/teacher3.png",
    "/projects/pusula-obs/teacher4.png",
    "/projects/pusula-obs/teacher5.png",
    "/projects/pusula-obs/teacher6.png",
    "/projects/pusula-obs/student1.png",
    "/projects/pusula-obs/admin1.png",
    "/projects/pusula-obs/admin2.png",
  ],
  technologies: [
    "React",
    "ASP.NET Core 8.0",
    "PostgreSQL",
    "Entity Framework Core",
    "JWT",
    "Tailwind CSS",
    "React Router",
    "Axios",
    "Recharts",
    "BCrypt",
    "Docker",
    "Render.com",
  ],
  features: [
    "JWT token tabanlı authentication",
    "Rol bazlı yetkilendirme (Admin, Teacher, Student)",
    "Kullanıcı yönetimi (CRUD operations)",
    "Ders yönetimi ve takibi",
    "Notlandırma sistemi",
    "Yoklama (attendance) takibi",
    "Öğrenci yorumlama/feedback sistemi",
    "Dark/Light mode desteği",
    "Responsive modern UI",
    "Dashboard ve raporlama (Recharts)",
    "Docker containerization",
    "PostgreSQL veritabanı",
    "BCrypt password hashing",
  ],
  sections: [
    {
      id: "overview",
      title: "Genel Bakış",
      content: `Pusula OBS (Öğrenci Bilgi Sistemi), akademik yönetimi kolaylaştırmak için geliştirilmiş kapsamlı bir öğrenci otomasyon platformudur.

Proje Amacı:
Üniversite/okul yönetiminin ihtiyaç duyduğu tüm temel öğrenci bilgi sistemi özelliklerini modern teknolojilerle sunmak.

Teknik Stack:
- Frontend: React 19.1.1 + Tailwind CSS
- Backend: ASP.NET Core 8.0
- Database: PostgreSQL
- Authentication: JWT
- Deployment: Render.com (Docker)

Kullanıcı Rolleri:

1. Admin: Tüm kullanıcıları yönetme, öğretmen ve öğrenci oluşturma, sistem genelinde raporlama
2. Öğretmen: Kendi derslerini yönetme, öğrencilere not verme, yoklama kaydetme, yorum ekleme
3. Öğrenci: Kendi notlarını görüntüleme, yoklama geçmişi, ders programı, yorumları okuma

Proje, modern web development best practices ve secure authentication ile geliştirilmiştir.`,
    },
    {
      id: "authentication",
      title: "Authentication ve Yetkilendirme",
      content: `JWT tabanlı authentication ve rol bazlı yetkilendirme sistemi:

JWT Authentication:
- Email + password ile giriş
- BCrypt password hashing
- JWT token generation
- Bearer token ile API requests
- Token expiration (24 saat)

Role-Based Access Control (RBAC):

Admin Yetkileri:
✓ Tüm kullanıcıları görüntüleme ve yönetme
✓ Öğretmen ve öğrenci oluşturma
✓ Sistem raporları

Teacher Yetkileri:
✓ Kendi derslerini yönetme
✓ Not girişi ve yoklama kaydetme
✓ Öğrenci yorumları ekleme

Student Yetkileri:
✓ Kendi notlarını ve yoklamalarını görme
✓ Ders programı ve yorumları okuma

ASP.NET Core Authorization:
[Authorize(Roles = "Admin")]
[Authorize(Roles = "Teacher, Admin")]

Frontend Route Protection:
<ProtectedRoute requiredRole="Admin">
  <AdminDashboard />
</ProtectedRoute>`,
    },
    {
      id: "course-management",
      title: "Ders ve Not Yönetimi",
      content: `Kapsamlı ders yönetimi ve notlandırma sistemi:

Ders Yönetimi:
- Ders oluşturma (kod, ad, kredi, kontenjan)
- Öğretmen ataması
- Öğrenci kayıt (enrollment)
- Kontenjan kontrolü
- Ders listeleme ve filtreleme

Notlandırma Sistemi:
Not Bileşenleri:
- Vize (%30)
- Final (%40)
- Ödev (%15)
- Proje (%15)

Harf Notu Dönüşümü:
90-100: AA, 85-89: BA, 80-84: BB, etc.

Öğretmen: Not girişi, toplu güncelleme, sınıf ortalaması
Öğrenci: Tüm notları görme, GPA hesaplama, trend grafikleri

Entity Framework Navigation:
public class Course {
  public Teacher Teacher { get; set; }
  public ICollection<Enrollment> Enrollments { get; set; }
}`,
    },
    {
      id: "attendance-comment",
      title: "Yoklama ve Yorum Sistemi",
      content: `Yoklama Takibi:

Yoklama Durumları:
✅ Present (Mevcut)
❌ Absent (Devamsız)
📝 Excused (Mazeret)
⏰ Late (Geç)

Öğretmen: Yoklama kaydı, toplu işlemler, geçmiş düzenleme
Öğrenci: Yoklama geçmişi, devam yüzdesi, uyarılar

Yorum Sistemi:

Öğretmen Yorumları:
- Akademik, davranış veya genel kategoriler
- Pozitif/Negatif etiketleme
- Ders bazlı yorumlama

Öğrenci: Tüm yorumları görüntüleme, filtreleme, istatistikler`,
    },
    {
      id: "ui-deployment",
      title: "Modern UI/UX ve Deployment",
      content: `Modern Arayüz:

Tailwind CSS:
- Utility-first styling
- Dark/Light mode toggle
- Responsive design (mobile-first)
- Component library

Data Visualization:
Recharts ile dashboard grafikleri:
- Enrollment trends (line chart)
- Grade distribution (bar chart)
- Attendance statistics (pie chart)

Docker Deployment:

Dockerfile (Backend):
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY publish .
ENTRYPOINT ["dotnet", "PusulaObs.API.dll"]

Render.com Services:
- Backend: Docker web service
- Frontend: Static site (npm build)
- Database: PostgreSQL (Starter plan)

CI/CD: GitHub Actions ile otomatik deployment

Environment Variables:
- DATABASE_URL
- JWT_SECRET
- ASPNETCORE_ENVIRONMENT`,
    },
    {
      id: "learning-outcomes",
      title: "Teknolojiler ve Kazanımlar",
      content: `Full-Stack Development:
✓ React 19.1.1 + Tailwind CSS
✓ ASP.NET Core 8.0 Web API
✓ PostgreSQL + Entity Framework Core
✓ JWT authentication + RBAC
✓ Docker containerization
✓ Render.com deployment

Backend:
✓ RESTful API design
✓ Entity Framework migrations
✓ Middleware pipeline
✓ Dependency Injection
✓ LINQ queries

Frontend:
✓ React Router
✓ Axios HTTP client
✓ Context API
✓ Recharts visualization
✓ Responsive design

DevOps:
✓ Docker multi-stage builds
✓ CI/CD pipeline
✓ Environment management
✓ Production optimization

Bu proje, enterprise-level full-stack OBS development deneyimi sağlamıştır.`,
    },
  ],
  githubUrl: "https://github.com/omdgn/Pusula-Obs-TestCase",
  liveUrl: "https://pusula-obs-testcase.onrender.com/",
  date: "2025",
  category: "Full-Stack",
};

export default pusulaObs;
