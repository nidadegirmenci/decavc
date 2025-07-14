import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import StartupCard from "@/components/startup-card"
import SuccessfulInvestments from "@/components/successful-investments"
import FlowingStartupTags from "@/components/flowing-startup-tags"
import SocialLoginSection from "@/components/social-login-section"
import InvestorTestimonials from "@/components/investor-testimonials"
import Footer from "@/components/footer"
import mockData from "@/data/mock-data.json"
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react"
import WhyInvestSection from "@/components/why-invest-section"
import HowItWorksSection from "@/components/how-it-works-section"

export default function HomePage() {
  const featuredStartups = mockData.startups.filter((startup) => startup.featured)
  const activeStartups = mockData.startups.filter((startup) => startup.status === "active")

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-warm-gray-50">
      <Navbar />

      {/* Hero Section - Updated Design */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-cream-50/90 backdrop-blur-sm rounded-full text-sm font-medium text-purple-600 mb-6 border border-cream-200">
                <Sparkles className="w-4 h-4 mr-2" />
                Türkiye'nin Önde Gelen Startup Yatırım Platformu
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-sky-400 bg-clip-text text-transparent">
                    Geleceği
                  </span>{" "}
                  <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                    inşa eden
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                    girişimcilere yatırım yapın
                  </span>
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Sevdiğiniz startup'lara ve küçük işletmelere hisse senedi alın ve ön sıra koltuklarına sahip olun—500₺
                  kadar düşük tutarlarla.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/explore">
                  <Button
                    size="lg"
                    className="bg-gradient-purple-pink hover:opacity-90 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl"
                  >
                    Startup'ları Keşfet
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/learn">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm border-gray-300 px-8 py-4 text-lg font-semibold rounded-xl hover:bg-white"
                  >
                    Nasıl Çalışır?
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Successful Investments */}
            <div className="relative">
              <SuccessfulInvestments />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">1500+ AKTİF YATIRIMCI AİLESİNE KATIL</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-cream-50/80 backdrop-blur-sm rounded-2xl border border-cream-200">
              <div className="w-12 h-12 bg-gradient-purple-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">₺2.5M+</h3>
              <p className="text-gray-600">Toplam Yatırım</p>
            </div>
            <div className="text-center p-6 bg-cream-50/80 backdrop-blur-sm rounded-2xl border border-cream-200">
              <div className="w-12 h-12 bg-gradient-blue-mint rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1500+</h3>
              <p className="text-gray-600">Aktif Yatırımcı</p>
            </div>
            <div className="text-center p-6 bg-cream-50/80 backdrop-blur-sm rounded-2xl border border-cream-200">
              <div className="w-12 h-12 bg-gradient-soft rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">45+</h3>
              <p className="text-gray-600">Desteklenen Startup</p>
            </div>
          </div>

          {/* Flowing Startup Tags */}
          <FlowingStartupTags />
        </div>
      </section>

      {/* Featured Startups */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Öne Çıkan Girişimler</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En çok ilgi gören ve yüksek potansiyelli startup projelerini keşfedin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredStartups.map((startup) => (
              <StartupCard key={startup.id} {...startup} />
            ))}
          </div>
        </div>
      </section>

      {/* Active Startups */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Devam Eden Girişimler</h2>
              <p className="text-xl text-gray-600">Şu anda yatırım arayan aktif projeler</p>
            </div>
            <Link href="/explore">
              <Button variant="outline" className="bg-white border-gray-300 mt-4 md:mt-0">
                Tümünü Görüntüle
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeStartups.map((startup) => (
              <StartupCard key={startup.id} {...startup} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <WhyInvestSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Social Login Section */}
      <SocialLoginSection />

      {/* Investor Testimonials */}
      <InvestorTestimonials />

      {/* Footer */}
      <Footer />
    </div>
  )
}
