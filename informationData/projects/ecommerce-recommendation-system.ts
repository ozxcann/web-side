import { Project } from "./types";

const ecommerceRecommendationSystem: Project = {
  slug: "ecommerce-recommendation-system",
  title: "E-commerce Recommendation System",
  description: "Müşteri alışveriş trendleri verisi kullanılarak 'Tavsiye Edilir' veya 'Tavsiye Edilmez' etiketleme yapan makine öğrenmesi sınıflandırma projesi",
  longDescription: `Kaggle'dan alınan yaklaşık 3,900 müşteri alışveriş kaydı üzerinde klasik makine öğrenmesi algoritmaları kullanılarak geliştirilen tavsiye sistemi.

Proje, müşterinin geçmiş alışverişleri, değerlendirme puanı ve satın alma tutarı gibi özellikleri analiz ederek bir işlemin tavsiye edilip edilmeyeceğini belirler. Support Vector Machine (SVM) algoritması %86.28 doğruluk oranı ile en iyi performansı göstermiştir.

Klasik makine öğrenmesi yaklaşımı kullanılarak gerçek dünya e-ticaret problemlerine çözüm üretilmiştir.`,
  thumbnail: "/projects/Ecommerce-recommendation-system/exommerce_project_main_photo.png",
  images: [
    //"/projects/Ecommerce-recommendation-system/exommerce_project_main_photo.png",
  ],
  technologies: [
    "Python",
    "Pandas",
    "Scikit-learn",
    "NumPy",
    "Google Colab",
    "Jupyter Notebook",
    "Logistic Regression",
    "SVM",
    "k-NN",
  ],
  features: [
    "3,900 müşteri alışveriş kaydı analizi",
    "One-hot encoding ile kategorik veri dönüşümü",
    "MinMaxScaler ile veri normalizasyonu",
    "Otomatik etiket oluşturma (Review > 3, Purchases > 10, Amount > $50)",
    "Logistic Regression sınıflandırma",
    "Support Vector Machine (RBF kernel) - En iyi performans",
    "k-Nearest Neighbors (k=3) algoritması",
    "Model performans karşılaştırması",
    "F1-Score ve Accuracy metrikleri",
    "Google Colab üzerinde geliştirme",
  ],
  sections: [
    {
      id: "overview",
      title: "Genel Bakış",
      content: `E-commerce Recommendation System, müşteri alışveriş davranışlarını analiz ederek bir ürün veya işlemin tavsiye edilip edilmeyeceğini belirleyen bir sınıflandırma projesidir.

Proje Amacı:
Bir müşteri işlemini 'Recommended' (Tavsiye Edilir) veya 'Not Recommended' (Tavsiye Edilmez) olarak etiketleyebilen bir sınıflandırma modeli geliştirmek.

Veri Seti Özellikleri:
- Kayıt Sayısı: ~3,900 müşteri işlemi
- Kaynak: Kaggle "Customer Shopping Trends" dataset
- Özellikler: Geçmiş alışverişler, değerlendirme puanı, satın alma tutarı, abonelik durumu, sezon, kategori, satın alınan ürün

Bu proje, klasik makine öğrenmesi teknikleri kullanılarak e-ticaret tavsiye sistemlerinin temellerini gösterir.`,
    },
    {
      id: "dataset",
      title: "Veri Seti ve Özellikler",
      content: `Kaggle platformundan alınan "Customer Shopping Trends" veri seti kullanılmıştır.

Ana Özellikler:

1. Previous Purchases (Geçmiş Alışverişler):
   Müşterinin daha önce yaptığı alışveriş sayısı

2. Review Rating (Değerlendirme Puanı):
   Müşterinin ürüne verdiği puan (1-5 arası)

3. Purchase Amount (Satın Alma Tutarı):
   İşlemin toplam tutarı (USD)

4. Subscription Status (Abonelik Durumu):
   Müşterinin abonelik durumu (Var/Yok)

5. Season (Sezon):
   Alışverişin yapıldığı sezon (Bahar, Yaz, Sonbahar, Kış)

6. Category (Kategori):
   Ürün kategorisi (Giyim, Elektronik, vb.)

7. Item Purchased (Satın Alınan Ürün):
   Spesifik ürün adı

Veri seti, gerçek dünya e-ticaret senaryolarını yansıtan çeşitli müşteri davranışlarını içerir.`,
    },
    {
      id: "preprocessing",
      title: "Veri Ön İşleme",
      content: `Veri seti, makine öğrenmesi modelleri için hazırlanmadan önce kapsamlı ön işleme aşamalarından geçirilmiştir:

1. One-Hot Encoding:
   Kategorik değişkenler (Season, Category, Item Purchased, Subscription Status) binary vektörlere dönüştürülmüştür.

   Örnek: Season = "Winter" → [0, 0, 0, 1]

2. MinMaxScaler Normalizasyonu:
   Sayısal özellikler (Previous Purchases, Review Rating, Purchase Amount) 0-1 aralığına ölçeklendirilmiştir.

   Formül: (x - min) / (max - min)

3. Eksik Veri Kontrolü:
   Veri setinde eksik değerler kontrol edilmiş ve temizlenmiştir.

4. Aykırı Değer Analizi:
   Extreme değerler incelenmiş ve gerekli düzenlemeler yapılmıştır.

Bu ön işleme adımları, modellerin daha iyi performans göstermesini ve tutarlı sonuçlar üretmesini sağlamıştır.`,
    },
    {
      id: "label-creation",
      title: "Etiket Oluşturma Kriterleri",
      content: `Supervised learning için hedef değişken (label) otomatik olarak oluşturulmuştur. Bir işlemin 'Recommended' olarak etiketlenmesi için aşağıdaki kriterlerin HEPSİ sağlanmalıdır:

Kriterler:

1. Review Rating > 3:
   Müşterinin ürüne 3'ten yüksek puan vermesi
   → Ürün memnuniyetini gösterir

2. Previous Purchases > 10:
   Müşterinin daha önce 10'dan fazla alışveriş yapmış olması
   → Sadık müşteriyi gösterir

3. Purchase Amount > $50:
   İşlem tutarının 50 dolardan fazla olması
   → Değerli bir işlemi gösterir

Etiketleme Mantığı:
IF (rating > 3 AND purchases > 10 AND amount > 50):
    label = "Recommended"
ELSE:
    label = "Not Recommended"

Bu kriterler, e-ticaret platformları için değerli ve tavsiye edilebilir işlemleri tanımlar.`,
    },
    {
      id: "algorithms",
      title: "Kullanılan Sınıflandırma Algoritmaları",
      content: `Üç farklı klasik makine öğrenmesi algoritması eğitilmiş ve karşılaştırılmıştır:

1. Logistic Regression:
   - Linear sınıflandırma algoritması
   - Hızlı ve yorumlanabilir
   - Binary classification için ideal
   - Probabilistic çıktılar verir

2. Support Vector Machine (SVM):
   - Kernel: RBF (Radial Basis Function)
   - Non-linear karar sınırları oluşturabilir
   - Yüksek boyutlu veri için etkili
   - Margin maximization prensibi
   - ⭐ En İyi Performans

3. k-Nearest Neighbors (k-NN):
   - k değeri: 3
   - Instance-based learning
   - Non-parametric algoritma
   - Basit ve etkili yaklaşım

Her algoritma aynı train-test split (%80-%20) ile eğitilmiş ve test edilmiştir.`,
    },
    {
      id: "performance",
      title: "Model Performansı ve Sonuçlar",
      content: `Modeller test seti üzerinde değerlendirilmiş ve performans metrikleri karşılaştırılmıştır:

Support Vector Machine (SVM) - En İyi Performans:
- Accuracy (Doğruluk): %86.28
- F1-Score: %81.06
- RBF kernel sayesinde non-linear kalıpları yakalayabildi
- Balanced performance gösterdi

Logistic Regression:
- Basit ve hızlı eğitim
- İyi baseline performans
- Yorumlanabilir sonuçlar

k-Nearest Neighbors (k=3):
- Instance-based öğrenme
- No training phase
- Reasonable performance

Sonuç:
SVM algoritması, RBF kernel kullanarak en yüksek doğruluk oranını (%86.28) ve F1-Score'u (%81.06) sağlamıştır. Bu, modelin hem precision hem de recall açısından dengeli olduğunu gösterir.`,
    },
    {
      id: "evaluation-metrics",
      title: "Değerlendirme Metrikleri",
      content: `Modellerin performansı iki temel metrik ile ölçülmüştür:

1. Accuracy (Doğruluk Oranı):
   Doğru tahmin edilen örneklerin toplam örnek sayısına oranı.

   Formül: (TP + TN) / (TP + TN + FP + FN)

   SVM Accuracy: %86.28
   → Her 100 işlemden 86'sını doğru sınıflandırıyor

2. F1-Score:
   Precision ve Recall metriklerinin harmonik ortalaması.

   Formül: 2 × (Precision × Recall) / (Precision + Recall)

   SVM F1-Score: %81.06
   → Dengeli precision ve recall performansı

F1-Score Önemi:
Özellikle dengesiz veri setlerinde önemlidir. Hem false positive hem false negative'leri dikkate alır. E-ticaret senaryolarında, hem yanlış tavsiye etmemek hem de iyi fırsatları kaçırmamak kritiktir.`,
    },
    {
      id: "technical-approach",
      title: "Teknik Yaklaşım ve Metodoloji",
      content: `Proje, klasik makine öğrenmesi pipeline'ı kullanılarak geliştirilmiştir:

Geliştirme Süreci:

1. Veri Yükleme ve Keşif:
   - Kaggle dataset import
   - Exploratory Data Analysis (EDA)
   - Feature distribution analizi

2. Veri Ön İşleme:
   - Categorical encoding
   - Numerical scaling
   - Label creation

3. Train-Test Split:
   - %80 Training set
   - %20 Test set
   - Random state for reproducibility

4. Model Eğitimi:
   - Multiple algorithms
   - Cross-validation
   - Hyperparameter tuning

5. Model Değerlendirme:
   - Accuracy, F1-Score
   - Confusion matrix
   - Performance comparison

Platform: Google Colab
→ Cloud-based, GPU destekli, kolaboratif geliştirme ortamı

Bu metodoloji, makine öğrenmesi projelerinde best practices'i takip eder.`,
    },
    {
      id: "key-insights",
      title: "Ana Bulgular ve Öğrenimler",
      content: `Proje sonucunda elde edilen önemli bulgular:

1. SVM'in Üstünlüğü:
   RBF kernel kullanan SVM, non-linear ilişkileri yakalamada en başarılı model oldu.

2. Feature Engineering'in Önemi:
   One-hot encoding ve MinMaxScaler, model performansını önemli ölçüde artırdı.

3. Balanced Metrics:
   %86 accuracy ve %81 F1-Score, modelin dengeli performansını gösterir.

4. Label Creation:
   Business logic ile oluşturulan etiketler, gerçekçi tavsiye kriterleri sağladı.

5. Classical ML'in Gücü:
   Deep learning gerektirmeyen, küçük-orta ölçekli veri setleri için klasik ML yeterli olabilir.

Real-World Uygulanabilirlik:
Bu model, e-ticaret platformlarında müşteri segmentasyonu, personalized recommendations ve targeted marketing için temel oluşturabilir.`,
    }
  ],
  githubUrl: "https://github.com/omdgn/Ecommerce_recommendation_system",
  date: "2024",
  category: "Machine Learning",
};

export default ecommerceRecommendationSystem;
