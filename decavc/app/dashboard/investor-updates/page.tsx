"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, TrendingUp, Calendar, ExternalLink } from "lucide-react"

// Mock investor updates data
const updatesData = [
  {
    id: 1,
    companyName: "TechFlow AI",
    companyLogo: "🤖",
    title: "Q3 2023 Finansal Sonuçları Açıklandı",
    content:
      "Bu çeyrekte %45 büyüme kaydettik ve yeni müşteri sayımız 1000'i aştı. Gelecek çeyrek için hedeflerimiz...",
    date: "2023-10-15",
    type: "financial",
    isRead: false,
    metrics: {
      revenue: "₺2.5M",
      growth: "+45%",
    },
  },
  {
    id: 2,
    companyName: "EcoGreen Solutions",
    companyLogo: "🌱",
    title: "Yeni Ürün Lansmanı: Akıllı Enerji Sistemi",
    content: "Geliştirdiğimiz yeni akıllı enerji sistemi ile evlerde %60 enerji tasarrufu sağlanabiliyor...",
    date: "2023-10-12",
    type: "product",
    isRead: true,
    metrics: {
      efficiency: "60%",
      savings: "₺500/ay",
    },
  },
  {
    id: 3,
    companyName: "HealthTech Pro",
    companyLogo: "🏥",
    title: "Seri A Yatırım Turu Başarıyla Tamamlandı",
    content: "5 milyon TL'lik Seri A yatırım turumuz başarıyla tamamlandı. Bu yatırım ile ekibimizi genişletecek...",
    date: "2023-10-10",
    type: "funding",
    isRead: false,
    metrics: {
      funding: "₺5M",
      valuation: "₺25M",
    },
  },
  {
    id: 4,
    companyName: "FinanceFlow",
    companyLogo: "💳",
    title: "Yeni Ortaklık: Türkiye'nin En Büyük Bankası",
    content: "Türkiye'nin en büyük bankalarından biri ile stratejik ortaklık anlaşması imzaladık...",
    date: "2023-10-08",
    type: "partnership",
    isRead: true,
    metrics: {
      customers: "10K+",
      transactions: "₺50M",
    },
  },
]

export default function InvestorUpdatesPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case "financial":
        return "bg-green-100 text-green-800 border-green-200"
      case "product":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "funding":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "partnership":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUpdateTypeLabel = (type: string) => {
    switch (type) {
      case "financial":
        return "Finansal"
      case "product":
        return "Ürün"
      case "funding":
        return "Yatırım"
      case "partnership":
        return "Ortaklık"
      default:
        return "Genel"
    }
  }

  const unreadCount = updatesData.filter((update) => !update.isRead).length

  return (
    <div className="space-y-6">
      {/* Updates Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Toplam Güncelleme</p>
                <p className="text-3xl font-bold text-blue-900">{updatesData.length}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Okunmamış</p>
                <p className="text-3xl font-bold text-orange-900">{unreadCount}</p>
              </div>
              <Bell className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Bu Ay</p>
                <p className="text-3xl font-bold text-green-900">8</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Updates List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Yatırımcı Güncellemeleri</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {updatesData.map((update) => (
              <div
                key={update.id}
                className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  update.isRead ? "bg-white border-gray-200" : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-purple-pink rounded-lg flex items-center justify-center text-lg">
                      {update.companyLogo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{update.companyName}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getUpdateTypeColor(update.type)}>{getUpdateTypeLabel(update.type)}</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(update.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {!update.isRead && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">{update.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{update.content}</p>
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {Object.entries(update.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-xs text-gray-500 capitalize">{key}</p>
                        <p className="font-semibold text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>
                  <button className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium">
                    Detayları Gör
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
