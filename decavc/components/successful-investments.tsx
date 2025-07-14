"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, ExternalLink } from "lucide-react"

// Inline data to avoid import issues
const investments = [
  {
    id: 1,
    companyName: "TechFlow AI",
    logo: "🤖",
    totalInvested: "₺2,450,000",
    investorCount: 127,
    coInvestor: "Techstars",
    description: "AI-powered workflow optimization",
    color: "from-blue-500 to-purple-600",
    url: "/startup/1",
  },
  {
    id: 2,
    companyName: "EcoGreen Solutions",
    logo: "🌱",
    totalInvested: "₺1,890,000",
    investorCount: 89,
    coInvestor: "500 Startups",
    description: "Sustainable energy solutions",
    color: "from-green-500 to-teal-600",
    url: "/startup/2",
  },
  {
    id: 3,
    companyName: "HealthTech Pro",
    logo: "🏥",
    totalInvested: "₺3,200,000",
    investorCount: 156,
    coInvestor: "Y Combinator",
    description: "Digital health monitoring",
    color: "from-red-500 to-pink-600",
    url: "/startup/3",
  },
  {
    id: 4,
    companyName: "FinanceFlow",
    logo: "💳",
    totalInvested: "₺1,650,000",
    investorCount: 94,
    coInvestor: "Plug and Play",
    description: "SME financial management",
    color: "from-yellow-500 to-orange-600",
    url: "/startup/4",
  },
  {
    id: 5,
    companyName: "EduTech Plus",
    logo: "📚",
    totalInvested: "₺980,000",
    investorCount: 67,
    coInvestor: "Endeavor",
    description: "Online education platform",
    color: "from-indigo-500 to-blue-600",
    url: "/startup/5",
  },
  {
    id: 6,
    companyName: "FoodieApp",
    logo: "🍕",
    totalInvested: "₺1,340,000",
    investorCount: 112,
    coInvestor: "Rocket Internet",
    description: "Food delivery innovation",
    color: "from-orange-500 to-red-600",
    url: "/startup/6",
  },
  {
    id: 7,
    companyName: "GameStudio",
    logo: "🎮",
    totalInvested: "₺2,100,000",
    investorCount: 143,
    coInvestor: "Unity Ventures",
    description: "Mobile gaming platform",
    color: "from-purple-500 to-pink-600",
    url: "/startup/7",
  },
  {
    id: 8,
    companyName: "CleanTech",
    logo: "♻️",
    totalInvested: "₺1,750,000",
    investorCount: 98,
    coInvestor: "Green Fund",
    description: "Waste management solutions",
    color: "from-green-600 to-blue-500",
    url: "/startup/8",
  },
]

export default function SuccessfulInvestments() {
  // Kartları iki gruba böl
  const leftColumnCards = [...investments, ...investments] // Döngü için duplike et
  const rightColumnCards = [...investments.slice().reverse(), ...investments.slice().reverse()] // Ters sırada duplike et

  return (
    <div className="relative h-[600px] w-full overflow-hidden group">
      <div className="flex space-x-4 h-full">
        {/* Sol Kolon - Yukarıdan Aşağıya */}
        <div className="flex-1 relative overflow-hidden">
          <div className="animate-scroll-down-slow group-hover:animate-pause space-y-4">
            {leftColumnCards.map((investment, index) => (
              <InvestmentCard key={`left-${investment.id}-${index}`} investment={investment} />
            ))}
          </div>
        </div>

        {/* Sağ Kolon - Aşağıdan Yukarıya */}
        <div className="flex-1 relative overflow-hidden">
          <div className="animate-scroll-up-slow group-hover:animate-pause space-y-4">
            {rightColumnCards.map((investment, index) => (
              <InvestmentCard key={`right-${investment.id}-${index}`} investment={investment} />
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Overlay - Üst ve Alt */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-cream-50 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream-50 to-transparent pointer-events-none z-10" />
    </div>
  )
}

function InvestmentCard({ investment }: { investment: any }) {
  const handleClick = () => {
    // Startup detay sayfasına yönlendir
    window.location.href = investment.url
  }

  return (
    <Card
      className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-80 hover:border-gray-100"
      onClick={handleClick}
    >
      <CardContent className="p-4 relative">
        {/* Hover durumunda görünecek link ikonu */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ExternalLink className="w-4 h-4 text-sky-500" />
        </div>

        <div className="flex items-start space-x-3 mb-3">
          <div
            className={`w-10 h-10 bg-gradient-to-r ${investment.color} rounded-lg flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
          >
            {investment.logo}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm text-gray-900 truncate group-hover:text-sky-600 transition-colors duration-200">
              {investment.companyName}
            </h3>
            <p className="text-xs text-gray-600 truncate">{investment.description}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-200">
              {investment.totalInvested}
            </span>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 border-green-200 text-xs group-hover:bg-green-50 group-hover:text-green-600 transition-colors duration-200"
            >
              <TrendingUp className="w-2.5 h-2.5 mr-1" />
              Başarılı
            </Badge>
          </div>

          <div className="text-xs text-gray-500">invested</div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center text-gray-600">
              <Users className="w-3 h-3 mr-1" />
              <span className="font-semibold text-xs">{investment.investorCount}</span>
            </div>
            <div className="text-xs text-gray-500 truncate ml-2">
              <span className="font-semibold">{investment.coInvestor}</span> co-invested
            </div>
          </div>
        </div>

        {/* Hover durumunda görünecek overlay - daha açık renk */}
        <div className="absolute inset-0 bg-sky-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="text-sky-600 font-semibold text-sm bg-white/95 px-3 py-1 rounded-full shadow-lg border border-sky-200">
            Detayları Gör
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
