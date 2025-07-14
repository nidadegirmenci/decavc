"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Shield, Users, Clock, Megaphone } from "lucide-react"

const features = [
  {
    id: 1,
    title: "Yatırım Yapın ve Hisse Alın",
    description:
      "Kickstarter gibi ürün karşılığı bağış yapmak yerine, gerçek hisse senedi karşılığında yatırım yapın ve şirketin büyümesinden pay alın.",
    icon: TrendingUp,
    color: "from-green-400 to-blue-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: 2,
    title: "Zaman İçinde Servet Biriktirin",
    description:
      "Uzun vadeli yatırım portföyü oluşturun. Kendi bilginizi ve topluluğun deneyimini kullanarak akıllı yatırım kararları verin.",
    icon: Clock,
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: 3,
    title: "Ön Sıra Koltuklarına Sahip Olun",
    description:
      "Yatırım yaptığınızda, sevdiğiniz şirketlerden özel yatırımcı güncellemeleri alın ve onların büyümesine katkıda bulunma fırsatı yakalayın.",
    icon: Megaphone,
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
]

export default function WhyInvestSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-50 to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Neden Deca VC Üzerinden Yatırım Yapmalısınız?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Girişimcileri destekleyin, portföyünüzü büyütün ve bir topluluğun parçası olun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={feature.id}
                className={`${feature.bgColor} ${feature.borderColor} border-2 hover:shadow-xl transition-all duration-300 group hover:scale-105`}
              >
                <CardContent className="p-8 text-center space-y-6">
                  {/* Icon */}
                  <div className="relative">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full opacity-80 group-hover:scale-125 transition-transform duration-300"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-300 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">{feature.description}</p>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className={`w-16 h-1 bg-gradient-to-r ${feature.color} rounded-full mx-auto opacity-60 group-hover:opacity-100 group-hover:w-20 transition-all duration-300`}
                  ></div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">SPK Lisanslı Platform</h4>
                  <p className="text-gray-600 text-sm">
                    Sermaye Piyasası Kurulu tarafından lisanslanmış güvenilir platform ile yatırımlarınız güvende.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Aktif Yatırımcı Topluluğu</h4>
                  <p className="text-gray-600 text-sm">
                    1500+ aktif yatırımcı ile deneyim paylaşın ve birlikte akıllı yatırım kararları verin.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
