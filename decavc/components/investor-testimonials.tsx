"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = {
  row1: [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      title: "Teknoloji Girişimcisi",
      avatar: "https://i.pinimg.com/736x/1f/8e/0d/1f8e0d5f2a3a2a3b661c6eb2c470d0f4.jpg",
      rating: 5,
      investment: "TechFlow AI",
      comment:
        "Deca VC sayesinde TechFlow AI'ya yatırım yapabildim. Platform çok kullanıcı dostu ve şeffaf. 6 ayda %40 getiri elde ettim!",
      investmentAmount: "₺25,000",
    },
    {
      id: 2,
      name: "Zeynep Kaya",
      title: "Pazarlama Uzmanı",
      avatar: "https://i.pinimg.com/736x/0b/ec/6d/0bec6d810ecb85e8a81eb6bb2ba6ce63.jpg",
      rating: 5,
      investment: "EcoGreen Solutions",
      comment:
        "Sürdürülebilir projelere yatırım yapmak istiyordum. EcoGreen'e yaptığım yatırım hem karlı hem de çevreye faydalı oldu.",
      investmentAmount: "₺15,000",
    },
    {
      id: 3,
      name: "Mehmet Demir",
      title: "Finans Danışmanı",
      avatar: "https://i.pinimg.com/736x/65/05/f5/6505f5357c55b9314cb74ae29f26d707.jpg",
      rating: 5,
      investment: "HealthTech Pro",
      comment:
        "Sağlık teknolojilerine olan ilgim sayesinde HealthTech Pro'yu keşfettim. Harika bir deneyim ve güzel getiriler!",
      investmentAmount: "₺30,000",
    },
    {
      id: 4,
      name: "Ayşe Özkan",
      title: "Yazılım Geliştirici",
      avatar: "https://i.pinimg.com/736x/89/73/02/89730203a385183fba17f44131a712ac.jpg",
      rating: 5,
      investment: "FinanceFlow",
      comment: "KOBİ'lere yönelik fintech çözümlerine yatırım yapmak istiyordum. FinanceFlow mükemmel bir seçim oldu.",
      investmentAmount: "₺20,000",
    },
    {
      id: 5,
      name: "Can Arslan",
      title: "İş Geliştirme",
      avatar: "https://i.pinimg.com/736x/8e/59/9f/8e599f42152913f87c6f42c0f8883dad.jpg",
      rating: 5,
      investment: "GameStudio",
      comment:
        "Oyun sektörüne olan tutkum sayesinde GameStudio'ya yatırım yaptım. Hem eğlenceli hem karlı bir deneyim!",
      investmentAmount: "₺18,000",
    },
  ],
  row2: [
    {
      id: 6,
      name: "Elif Şahin",
      title: "Proje Yöneticisi",
      avatar: "https://i.pinimg.com/736x/24/85/a2/2485a22a49e225de8fa0a551e4f30ca8.jpg",
      rating: 5,
      investment: "CleanTech",
      comment:
        "Çevre dostu teknolojilere yatırım yapmak harika bir his. CleanTech ile hem para kazandım hem de dünyaya katkı sağladım.",
      investmentAmount: "₺22,000",
    },
    {
      id: 7,
      name: "Burak Çelik",
      title: "Satış Müdürü",
      avatar: "https://i.pinimg.com/736x/5e/49/23/5e49235e6f4ce3fe2e6d6c92a1dd9904.jpg",
      rating: 5,
      investment: "FoodieApp",
      comment: "Yemek sektörüne olan ilgim sayesinde FoodieApp'i keşfettim. Platform çok şeffaf ve güvenilir.",
      investmentAmount: "₺12,000",
    },
    {
      id: 8,
      name: "Selin Yıldız",
      title: "İnsan Kaynakları",
      avatar: "https://i.pinimg.com/736x/cd/07/58/cd0758f8f5486b1a53b7f3ba28daa294.jpg",
      rating: 5,
      investment: "EduTech Plus",
      comment: "Eğitim teknolojilerine yatırım yapmak istiyordum. EduTech Plus ile harika bir deneyim yaşadım!",
      investmentAmount: "₺16,000",
    },
    {
      id: 9,
      name: "Emre Koç",
      title: "Ürün Müdürü",
      avatar: "https://i.pinimg.com/736x/6d/b5/7b/6db57ba5c89b15e3d12f2c8dd5c57f8f.jpg",
      rating: 5,
      investment: "SportsTech",
      comment: "Spor teknolojilerine olan tutkum sayesinde SportsTech'e yatırım yaptım. Mükemmel bir platform!",
      investmentAmount: "₺28,000",
    },
    {
      id: 10,
      name: "Deniz Acar",
      title: "Grafik Tasarımcı",
      avatar: "https://i.pinimg.com/736x/f8/77/81/f87781de590adcc0bc3b3b83dcb134d5.jpg",
      rating: 5,
      investment: "TravelApp",
      comment:
        "Seyahat uygulamalarına yatırım yapmak istiyordum. TravelApp ile hem para kazandım hem de seyahat deneyimim arttı.",
      investmentAmount: "₺14,000",
    },
  ],
}

export default function InvestorTestimonials() {
  // Kartları duplike et sonsuz döngü için
  const row1Cards = [...testimonials.row1, ...testimonials.row1]
  const row2Cards = [...testimonials.row2, ...testimonials.row2]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-50 to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Yatırımcılarımız Ne Diyor?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Binlerce yatırımcı Deca VC ile hayallerindeki startup'lara yatırım yapıyor
          </p>
        </div>

        <div className="space-y-8">
          {/* İlk sıra - Sağdan sola akan */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left space-x-6">
              {row1Cards.map((testimonial, index) => (
                <TestimonialCard key={`row1-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* İkinci sıra - Soldan sağa akan */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-right space-x-6">
              {row2Cards.map((testimonial, index) => (
                <TestimonialCard key={`row2-${testimonial.id}-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <Card className="flex-shrink-0 w-96 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                <AvatarFallback className="bg-gradient-purple-pink text-white">
                  {testimonial.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
              </div>
            </div>
            <Quote className="w-6 h-6 text-purple-400 flex-shrink-0" />
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Comment */}
          <p className="text-gray-700 text-sm leading-relaxed">"{testimonial.comment}"</p>

          {/* Investment Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-600">Yatırım Yaptığı Startup</p>
                <p className="font-semibold text-purple-700">{testimonial.investment}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">Yatırım Miktarı</p>
                <p className="font-semibold text-green-600">{testimonial.investmentAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
