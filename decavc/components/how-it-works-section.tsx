"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Search, Brain, FolderOpen } from "lucide-react"

const steps = [
  {
    id: 1,
    step: "ADIM 1",
    title: "Girişimleri Keşfedin",
    description:
      "Türkiye'nin en geniş startup ve küçük işletme seçkisini inceleyin. Her sektörden yatırım arayan girişimleri keşfedin.",
    icon: FolderOpen,
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    illustration: "📁",
  },
  {
    id: 2,
    step: "ADIM 2",
    title: "Kendi Araştırmanızı Yapın",
    description:
      "Şirketin finansallarını, iş planını ve diğer yatırımcı yorumlarını inceleyin. Ya da tanıdığınız bir girişimciyi desteklemek istiyorsanız, bu da harika!",
    icon: Search,
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-50",
    illustration: "🔍",
  },
  {
    id: 3,
    step: "ADIM 3",
    title: "Anladığınız Alana Yatırım Yapın",
    description:
      "Kendi deneyiminizi ve bilginizi kullanarak gerçekten inandığınız şirketlere yatırım yapın. Uzmanlık alanınızda avantaj sağlayın.",
    icon: Brain,
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    illustration: "🧠",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-cream-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Melek Yatırımcılıkta Yeni misiniz?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Deca VC'de nasıl çalıştığını öğrenin.</p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="space-y-4">
                  <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                    {step.step}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Illustration */}
              <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <Card
                  className={`${step.bgColor} border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent className="p-12 flex items-center justify-center">
                    <div className="relative">
                      {/* Main illustration */}
                      <div
                        className={`w-32 h-32 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-6xl">{step.illustration}</span>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full opacity-80"></div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-300 rounded-full opacity-60"></div>
                      <div className="absolute top-1/2 -right-6 w-4 h-4 bg-blue-300 rounded-full opacity-70"></div>

                      {/* Floating elements */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                      </div>
                      <div className="absolute -bottom-6 right-1/4">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Başlamaya Hazır mısınız?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Sadece birkaç dakikada hesap oluşturun ve Türkiye'nin en heyecan verici startup'larına yatırım yapmaya
              başlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-purple-pink hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200">
                Ücretsiz Hesap Oluştur
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl font-semibold border border-gray-300 transition-all duration-200">
                Daha Fazla Bilgi
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
