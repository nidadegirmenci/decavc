"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rocket, Building2, Users, TrendingUp, CheckCircle } from "lucide-react"

const sectors = [
  "Teknoloji",
  "E-ticaret",
  "Fintech",
  "Sağlık",
  "Eğitim",
  "Oyun",
  "Medya",
  "Tarım",
  "Enerji",
  "Ulaşım",
  "Diğer",
]

export default function StartCampaignPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    sector: "",
    fundingGoal: "",
    stage: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser)
        // If user already has a campaign, redirect to overview
        if (parsedUser.campaign) {
          router.push("/entrepreneur/overview")
        }
      } else {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create campaign object
      const campaign = {
        id: Date.now().toString(),
        name: formData.companyName,
        description: formData.description,
        sector: formData.sector,
        fundingGoal: Number.parseInt(formData.fundingGoal),
        stage: formData.stage,
        createdAt: new Date().toISOString(),
        published: false,
        status: "draft",
      }

      // Update user data with campaign
      const updatedUser = {
        ...user,
        campaign: campaign,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Redirect to overview
      router.push("/entrepreneur/overview")
    } catch (error) {
      console.error("Error creating campaign:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.companyName && formData.description && formData.sector && formData.fundingGoal && formData.stage

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kampanyanızı Başlatın</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Girişiminiz için fon toplama kampanyanızı oluşturun ve yatırımcılarla buluşun. Başlamak için temel
          bilgilerinizi paylaşın.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Profesyonel Sunum</h3>
            <p className="text-sm text-gray-600">Şirketinizi en iyi şekilde tanıtın</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Geniş Yatırımcı Ağı</h3>
            <p className="text-sm text-gray-600">Binlerce yatırımcıya ulaşın</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Büyüme Desteği</h3>
            <p className="text-sm text-gray-600">Sadece fon değil, mentorluk da alın</p>
          </CardContent>
        </Card>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Kampanya Bilgileri</CardTitle>
          <CardDescription>Kampanyanızı oluşturmak için gerekli temel bilgileri girin</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Şirket Adı *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Şirketinizin adını girin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector">Sektör *</Label>
                <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sektör seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Şirket Açıklaması *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Şirketinizin ne yaptığını kısaca açıklayın..."
                rows={4}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fundingGoal">Hedef Fon Miktarı (₺) *</Label>
                <Input
                  id="fundingGoal"
                  type="number"
                  value={formData.fundingGoal}
                  onChange={(e) => handleInputChange("fundingGoal", e.target.value)}
                  placeholder="500000"
                  min="50000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">Şirket Aşaması *</Label>
                <Select value={formData.stage} onValueChange={(value) => handleInputChange("stage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Aşama seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Fikir Aşaması</SelectItem>
                    <SelectItem value="prototype">Prototip</SelectItem>
                    <SelectItem value="mvp">MVP</SelectItem>
                    <SelectItem value="early-revenue">Erken Gelir</SelectItem>
                    <SelectItem value="growth">Büyüme</SelectItem>
                    <SelectItem value="expansion">Genişleme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                İptal
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Kampanyayı Oluştur
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
