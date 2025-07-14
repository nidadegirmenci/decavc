"use client"

const startupTags = {
  row1: [
    { icon: "🤖", text: "Tüm sektörler için AI çözümleri" },
    { icon: "🌱", text: "Sürdürülebilir tarım teknolojileri" },
    { icon: "🏥", text: "Dijital sağlık izleme platformu" },
    { icon: "🎮", text: "Mobil oyun geliştirme stüdyosu" },
    { icon: "📚", text: "Online eğitim ve kurs platformu" },
    { icon: "🚗", text: "Elektrikli araç şarj istasyonları" },
    { icon: "🏠", text: "Akıllı ev otomasyon sistemleri" },
    { icon: "💳", text: "KOBİ'ler için fintech çözümleri" },
    { icon: "🍕", text: "Yemek teslimat ve lojistik" },
    { icon: "👕", text: "Sürdürülebilir moda markası" },
  ],
  row2: [
    { icon: "☕", text: "Mahalle kahvesi ve sosyal mekan" },
    { icon: "🎨", text: "Dijital sanat ve NFT platformu" },
    { icon: "🚴", text: "Bisiklet paylaşım uygulaması" },
    { icon: "📱", text: "Sosyal medya yönetim aracı" },
    { icon: "🌍", text: "Çevre dostu ambalaj çözümleri" },
    { icon: "💊", text: "Kişiselleştirilmiş vitamin servisi" },
    { icon: "🎵", text: "Müzik prodüksiyon stüdyosu" },
    { icon: "🏋️", text: "Fitness ve wellness uygulaması" },
    { icon: "📦", text: "E-ticaret lojistik çözümleri" },
    { icon: "🌟", text: "Freelancer ve proje yönetimi" },
  ],
}

export default function FlowingStartupTags() {
  // Kartları duplike et sonsuz döngü için
  const row1Cards = [...startupTags.row1, ...startupTags.row1]
  const row2Cards = [...startupTags.row2, ...startupTags.row2]

  return (
    <div className="w-full overflow-hidden py-8 space-y-6">
      {/* İlk sıra - Sağa doğru akan */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-right space-x-4">
          {row1Cards.map((tag, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="text-lg">{tag.icon}</span>
                <span className="text-sm font-medium text-gray-700">{tag.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* İkinci sıra - Sola doğru akan */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-left space-x-4">
          {row2Cards.map((tag, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="text-lg">{tag.icon}</span>
                <span className="text-sm font-medium text-gray-700">{tag.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
