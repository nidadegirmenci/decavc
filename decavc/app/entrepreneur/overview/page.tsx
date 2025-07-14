"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  Eye,
  DollarSign,
  Calendar,
  Edit,
  Share2,
  AlertCircle,
  Plus,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function EntrepreneurOverviewPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [campaign, setCampaign] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser)
        setCampaign(parsedUser.campaign || null)
      } else {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleCreateCampaign = () => {
    router.push("/entrepreneur/editor")
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  // If no campaign exists, show empty state
  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Empty State */}
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">İlk Kampanyanızı Oluşturun</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Girişiminiz için fon toplama kampanyanızı oluşturun ve binlerce yatırımcıya ulaşın. Başlamak için kampanya
            editörüne gidin ve temel bilgilerinizi doldurun.
          </p>

          <Button
            onClick={handleCreateCampaign}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            Kampanya Oluştur
          </Button>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Geniş Yatırımcı Ağı</h3>
              <p className="text-gray-600">Binlerce aktif yatırımcıya ulaşın ve projenizi tanıtın</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Kolay Fon Toplama</h3>
              <p className="text-gray-600">Profesyonel araçlarla kampanyanızı yönetin</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Eye className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Şeffaf Süreç</h3>
              <p className="text-gray-600">Tüm süreçleri takip edin ve yatırımcılarla iletişim kurun</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const fundingProgress = campaign.raisedAmount ? (campaign.raisedAmount / campaign.fundingGoal) * 100 : 0
  const daysLeft = campaign.endDate
    ? Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 30

  // Calculate completion percentage based on filled fields
  const getCompletionPercentage = () => {
    const fields = [
      campaign.name,
      campaign.description,
      campaign.sector,
      campaign.fundingGoal,
      campaign.stage,
      campaign.basics?.tagline,
      campaign.basics?.mainImage,
      campaign.basics?.logo,
    ]
    const filledFields = fields.filter((field) => field && field !== "").length
    return Math.round((filledFields / fields.length) * 100)
  }

  const completionPercentage = getCompletionPercentage()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
          <p className="text-gray-600 mt-1">{campaign.description}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => router.push("/entrepreneur/editor")}>
            <Edit className="w-4 h-4 mr-2" />
            Düzenle
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            disabled={completionPercentage < 100}
          >
            <Share2 className="w-4 h-4 mr-2" />
            {completionPercentage < 100 ? "Tamamla ve Yayınla" : "Paylaş"}
          </Button>
        </div>
      </div>

      {/* Completion Status */}
      <Card
        className={`border-2 ${completionPercentage < 100 ? "border-orange-200 bg-orange-50" : "border-green-200 bg-green-50"}`}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {completionPercentage < 100 ? (
                <Clock className="w-5 h-5 text-orange-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <div>
                <h3 className={`font-medium ${completionPercentage < 100 ? "text-orange-900" : "text-green-900"}`}>
                  {completionPercentage < 100 ? "Kampanya Tamamlanıyor" : "Kampanya Hazır"}
                </h3>
                <p className={`text-sm ${completionPercentage < 100 ? "text-orange-700" : "text-green-700"} mt-1`}>
                  {completionPercentage < 100
                    ? "Kampanyanızı tamamlayın ve yayınlayarak yatırımcılara ulaşmaya başlayın."
                    : "Kampanyanız yayınlanmaya hazır! Artık yatırımcılar görebilir."}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-2xl font-bold ${completionPercentage < 100 ? "text-orange-600" : "text-green-600"}`}
              >
                {completionPercentage}%
              </div>
              <div className="text-sm text-gray-500">Tamamlandı</div>
            </div>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          {completionPercentage < 100 && (
            <Button size="sm" className="mt-4" onClick={() => router.push("/entrepreneur/editor")}>
              Kampanyayı Tamamla
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplanan Fon</p>
                <p className="text-2xl font-bold text-gray-900">₺{(campaign.raisedAmount || 0).toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-4">
              <Progress value={fundingProgress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">Hedef: ₺{campaign.fundingGoal.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Yatırımcı Sayısı</p>
                <p className="text-2xl font-bold text-gray-900">{campaign.investorCount || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Görüntülenme</p>
                <p className="text-2xl font-bold text-gray-900">{campaign.viewCount || 0}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Kalan Gün</p>
                <p className="text-2xl font-bold text-gray-900">{daysLeft}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Status */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kampanya Durumu</CardTitle>
            <CardDescription>Kampanyanızın mevcut durumu ve ilerlemesi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Durum</span>
              <Badge variant={campaign.published ? "default" : "secondary"}>
                {campaign.published ? "Yayında" : "Taslak"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sektör</span>
              <span className="text-sm text-gray-600">{campaign.sector}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Aşama</span>
              <span className="text-sm text-gray-600">{campaign.stage}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Oluşturulma</span>
              <span className="text-sm text-gray-600">{new Date(campaign.createdAt).toLocaleDateString("tr-TR")}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
            <CardDescription>Kampanyanızı yönetmek için hızlı erişim</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => router.push("/entrepreneur/editor")}
            >
              <Edit className="w-4 h-4 mr-2" />
              Kampanyayı Düzenle
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => router.push("/entrepreneur/updates")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Güncelleme Paylaş
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => window.open(`/campaign/${campaign.id}`, "_blank")}
              disabled={completionPercentage < 100}
            >
              <Eye className="w-4 h-4 mr-2" />
              Kampanyayı Görüntüle
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Son Aktiviteler</CardTitle>
          <CardDescription>Kampanyanızdaki son gelişmeler</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaign.published ? (
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Henüz aktivite bulunmuyor</p>
                <p className="text-sm">Kampanyanız yayınlandığında aktiviteler burada görünecek</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Kampanyanızı tamamlayın</p>
                <p className="text-sm">Aktiviteleri görmek için önce kampanyanızı tamamlayın</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
