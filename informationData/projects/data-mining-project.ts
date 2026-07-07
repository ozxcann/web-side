import { Project } from "./types";

const dataMiningProject: Project = {
  slug: "data-mining-project",
  title: "Data Mining Project - Car Evaluation Analysis",
  description: "Araba değerlendirme veri seti üzerinde veri madenciliği teknikleri ve makine öğrenmesi algoritmalarının uygulandığı kapsamlı analiz projesi",
  longDescription: `1,728 araba örneği içeren Car Evaluation veri seti üzerinde kapsamlı veri madenciliği çalışması. Proje, Association Rule Mining (Apriori), Clustering (K-Means) ve Classification (Decision Tree, k-NN, Random Forest) tekniklerini içerir.

Farklı makine öğrenmesi algoritmaları karşılaştırılmış ve Random Forest algoritması %98 doğruluk oranı ile en iyi performansı göstermiştir. Veri ön işleme, özellik mühendisliği ve model değerlendirme aşamaları detaylı bir şekilde uygulanmıştır.

Proje, veri bilimi ve makine öğrenmesi konularında kapsamlı bir uygulama örneğidir.`,
  thumbnail: "/projects/data-mining-project/data_mining_main_photo.png",
  images: [
    //"/projects/data-mining-project/data_mining_main_photo.png",
  ],
  technologies: [
    "Python",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Matplotlib",
    "Seaborn",
    "Apriori Algorithm",
    "K-Means",
    "Decision Tree",
    "Random Forest",
    "k-NN",
  ],
  features: [
    "1,728 araba örneği üzerinde kapsamlı analiz",
    "Association Rule Mining (Apriori algoritması)",
    "K-Means clustering (Silhouette score: 0.55)",
    "Decision Tree sınıflandırma (%97 doğruluk)",
    "k-NN algoritması (%96 doğruluk)",
    "Random Forest algoritması (%98 doğruluk - en iyi performans)",
    "Veri ön işleme ve normalizasyon (Min-Max)",
    "Kategorik değişkenlerin sayısal dönüşümü",
    "Model performans karşılaştırması (Accuracy, F1-Score)",
    "Detaylı görselleştirme ve raporlama",
  ],
  sections: [
    {
      id: "overview",
      title: "Genel Bakış",
      content: `Bu proje, Car Evaluation veri seti üzerinde veri madenciliği tekniklerinin ve makine öğrenmesi algoritmalarının uygulandığı kapsamlı bir analiz çalışmasıdır.

Veri seti, 1,728 araba örneği içerir ve her araba 6 özellik ile tanımlanır:
- Satın alma fiyatı (buying)
- Bakım maliyeti (maint)
- Kapı sayısı (doors)
- Yolcu kapasitesi (persons)
- Bagaj büyüklüğü (lug_boot)
- Güvenlik seviyesi (safety)

Hedef değişken (target), arabanın kabul edilebilirlik durumunu gösterir: unacc (kabul edilemez), acc (kabul edilebilir), good (iyi), vgood (çok iyi).`,
    },
    {
      id: "preprocessing",
      title: "Veri Ön İşleme",
      content: `Veri seti analiz öncesi detaylı ön işleme aşamalarından geçirilmiştir:

1. Eksik Veri Kontrolü: Veri setinde eksik veri bulunmamaktadır
2. Aykırı Değer Analizi: Önemli aykırı değer tespit edilmemiştir
3. Kategorik Dönüşüm: Tüm kategorik değişkenler sayısal değerlere dönüştürülmüştür
4. Normalizasyon: Min-Max normalizasyon tekniği uygulanarak özellikler 0-1 aralığına ölçeklendirilmiştir

Bu ön işleme adımları, modellerin daha iyi performans göstermesini ve doğru sonuçlar üretmesini sağlamıştır.`,
    },
    {
      id: "association-rules",
      title: "Association Rule Mining (Apriori)",
      content: `Apriori algoritması kullanılarak veri setindeki özellikler arasındaki birliktelik kuralları keşfedilmiştir.

Önemli Bulgular:

1. Güvenlik ve Kabul Edilebilirlik İlişkisi:
   "Eğer güvenlik seviyesi düşükse (low), araba kabul edilemez (unacc) sınıfına aittir"
   - Bu kural, güvenliğin araba değerlendirmesindeki kritik önemini gösterir

2. Fiyat ve Değerlendirme İlişkisi:
   "Eğer satın alma fiyatı düşük VE bakım maliyeti düşükse, araba çok iyi (vgood) sınıfına aittir"
   - Ekonomik arabaların yüksek değerlendirme alabileceğini gösterir

Bu kurallar, veri setindeki gizli kalıpları ortaya çıkararak araba değerlendirme sürecine ışık tutar.`,
    },
    {
      id: "clustering",
      title: "Kümeleme Analizi (K-Means)",
      content: `K-Means algoritması kullanılarak veri seti 4 farklı kümeye ayrılmıştır.

Kümeleme Parametreleri:
- Küme sayısı (k): 4
- Silhouette Score: 0.55

Silhouette score, kümeleme kalitesini ölçen bir metriktir ve -1 ile 1 arasında değer alır. 0.55 değeri, kümelerin iyi bir şekilde ayrıldığını ve arabaların anlamlı gruplara bölündüğünü gösterir.

Her küme, benzer özelliklere sahip arabaları içerir ve veri setindeki doğal grupları ortaya çıkarır.`,
    },
    {
      id: "classification",
      title: "Sınıflandırma Algoritmaları",
      content: `Üç farklı sınıflandırma algoritması uygulanmış ve performansları karşılaştırılmıştır:

1. Decision Tree (Karar Ağacı)
   - Accuracy: %97
   - F1-Score: 0.91
   - Yorumlanabilir ve görsel model yapısı

2. k-Nearest Neighbors (k-NN)
   - Accuracy: %96
   - F1-Score: 0.90
   - Basit ve etkili algoritma

3. Random Forest (En İyi Performans)
   - Accuracy: %98
   - F1-Score: 0.92
   - Ensemble learning ile üstün performans
   - Overfitting'e karşı dirençli

Random Forest algoritması, birden fazla karar ağacını birleştirerek en yüksek doğruluk oranını sağlamıştır.`,
    },
    {
      id: "performance-metrics",
      title: "Performans Metrikleri",
      content: `Modellerin değerlendirilmesinde iki temel metrik kullanılmıştır:

1. Accuracy (Doğruluk Oranı):
   Modelin doğru tahmin ettiği örneklerin toplam örnek sayısına oranı
   - Decision Tree: %97
   - k-NN: %96
   - Random Forest: %98

2. F1-Score:
   Precision ve Recall metriklerinin harmonik ortalaması
   - Decision Tree: 0.91
   - k-NN: 0.90
   - Random Forest: 0.92

F1-Score, özellikle dengesiz veri setlerinde önemli bir metriktir ve modelin hem hassasiyet hem de duyarlılık açısından performansını ölçer.`,
    },
    {
      id: "key-insights",
      title: "Ana Bulgular ve Öğrenimler",
      content: `Proje sonucunda elde edilen önemli bulgular:

1. Güvenlik faktörü, araba değerlendirmesinde en kritik özelliktir
2. Ekonomik (düşük fiyatlı ve düşük bakım maliyetli) arabalar yüksek değerlendirme alabilir
3. Random Forest algoritması, ensemble learning yaklaşımı sayesinde en iyi performansı göstermiştir
4. Veri ön işleme ve normalizasyon, model performansını önemli ölçüde artırır
5. Kümeleme analizi, veri setindeki doğal grupları başarıyla ortaya çıkarır

Bu bulgular, veri madenciliği tekniklerinin gerçek dünya problemlerine nasıl uygulanabileceğini gösterir.`,
    },
    {
      id: "future-work",
      title: "Gelecek Geliştirmeler",
      content: `Projenin geliştirilmesi için planlanan iyileştirmeler:

1. Daha Karmaşık Modeller:
   - Deep Learning (Neural Networks)
   - Gradient Boosting (XGBoost, LightGBM)
   - Support Vector Machines (SVM)

2. Veri Artırma Teknikleri:
   - SMOTE (Synthetic Minority Over-sampling Technique)
   - Veri dengeleme yöntemleri

3. Gelişmiş Özellik Mühendisliği:
   - Feature extraction
   - Polynomial features
   - Feature selection teknikleri

4. Hyperparameter Tuning:
   - Grid Search
   - Random Search
   - Bayesian Optimization

Bu geliştirmeler, modellerin performansını daha da artırabilir ve daha derinlemesine analizler yapılmasını sağlayabilir.`,
    },
    {
      id: "technologies-used",
      title: "Kullanılan Teknolojiler ve Kütüphaneler",
      content: `Proje, Python ekosistemindeki güçlü veri bilimi kütüphaneleri kullanılarak geliştirilmiştir:

Veri İşleme:
- Pandas: Veri manipülasyonu ve analizi
- NumPy: Sayısal hesaplamalar ve matris işlemleri

Makine Öğrenmesi:
- Scikit-learn: Algoritma implementasyonu ve model değerlendirme
- Apriori: Association rule mining

Görselleştirme:
- Matplotlib: Grafikler ve görselleştirme
- Seaborn: İstatistiksel veri görselleştirme

Python'un zengin ekosistemi, veri madenciliği ve makine öğrenmesi projeleri için güçlü ve esnek bir platform sağlar.`,
    },
  ],
  githubUrl: "https://github.com/omdgn/Data_Mining_Project",
  date: "2024",
  category: "Data Science",
};

export default dataMiningProject;
