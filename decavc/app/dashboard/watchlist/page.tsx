"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Eye, TrendingUp, Calendar, ExternalLink } from "lucide-react"

// Mock watchlist data
const watchlistData = [
  {
    id: 1,
    companyName: "GameStudio",
    companyLogo: "🎮",
    description: "Mobil oyun geliştirme stüdyosu",
    category: "Gaming",
    fundingGoal: 750000,
    currentFunding: 450000,
    daysLeft: 25,
    investorCount: 89,
    addedDate: "2023-10-10",
    status: "active",
    minInvestment: 1000,
  },
  {
    id: 2,
    companyName: "CleanTech",
    companyLogo: "♻️",
    description: "Atık yönetimi çözümleri",
    category: "Clean Energy",
    fundingGoal: 500000,
    currentFunding: 320000,
    daysLeft: 18,
    investorCount: 67,
    addedDate: "2023-10-08",
    status: "active",
    minInvestment: 500,
  },
  {
    id: 3,
    companyName: "SportsTech",
    companyLogo: "⚽",
    description: "Atletik performans takip sistemi",
    category: "Sports",
    fundingGoal: 400000,
    currentFunding: 380000,
    daysLeft: 5,
    investorCount: 124,
    addedDate: "2023-10-05",
    status: "almost-funded",
    minInvestment: 750,
  },
  {
    id: 4,
    companyName: "TravelApp",
    companyLogo: "✈️",
    description: "Akıllı seyahat planlama uygulaması",
    category: "Travel",
    fundingGoal: 600000,
    currentFunding: 180000,
    daysLeft: 45,
    investorCount: 34,
    addedDate: "2023-10-02",
    status: "active",
    minInvestment: 1000,
  },
]

export default function WatchlistPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const getFundingPercentage = (current: number, goal: number) => {
    return Math.round((current / goal) * 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "almost-funded":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "almost-funded":
        return "Neredeyse Fonlandı"
      case "active":
        return "Aktif"
      default:
        return "Bilinmiyor"
    }
  }

  const handleRemoveFromWatchlist = (companyId: number) => {
    console.log(`Removing company ${companyId} from watchlist`)
    // Burada watchlist'ten çıkarma işlemi yapılacak
  }

  const handleInvest = (companyId: number) => {
    console.log(`Investing in company ${companyId}`)
    // Burada yatırım sayfasına yönlendirme yapılacak
  }

  return (
    <div className="space-y-6">
      {/* Watchlist Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">İzlenen Şirketler</p>
                <p className="text-3xl font-bold text-purple-900">{watchlistData.length}</p>
              </div>
              <Bookmark className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Yakında Kapanacak</p>
                <p className="text-3xl font-bold text-orange-900">
                  {watchlistData.filter((item) => item.daysLeft <= 7).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Yatırım Fırsatları</p>
                <p className="text-3xl font-bold text-green-900">
                  {watchlistData.filter((item) => item.status === "active").length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Watchlist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5" />
            <span>İzleme Listem</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {watchlistData.map((company) => {
              const fundingPercentage = getFundingPercentage(company.currentFunding, company.fundingGoal)

              return (
                <div
                  key={company.id}
                  className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-purple-pink rounded-lg flex items-center justify-center text-xl">
                        {company.companyLogo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{company.companyName}</h3>
                        <p className="text-gray-600 text-sm">{company.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary" className="bg-white text-gray-700 border-gray-300">
                            {company.category}
                          </Badge>
                          <Badge className={getStatusColor(company.status)}>{getStatusLabel(company.status)}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {formatDate(company.addedDate)} tarihinde eklendi
                      </div>
                    </div>
                  </div>

                  {/* Funding Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Fonlama Durumu</span>
                      <span className="font-semibold">{fundingPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">
                        {formatCurrency(company.currentFunding)} / {formatCurrency(company.fundingGoal)}
                      </span>
                      <span className="text-gray-600">{company.daysLeft} gün kaldı</span>
                    </div>
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold">{company.investorCount}</span> yatırımcı
                      </div>
                      <div>
                        Min. yatırım: <span className="font-semibold">{formatCurrency(company.minInvestment)}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFromWatchlist(company.id)}
                        className="text-gray-600 hover:text-red-600 hover:border-red-300"
                      >
                        Listeden Çıkar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleInvest(company.id)}
                        className="bg-gradient-purple-pink hover:opacity-90 text-white border-0"
                      >
                        Yatırım Yap
                      </Button>
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
