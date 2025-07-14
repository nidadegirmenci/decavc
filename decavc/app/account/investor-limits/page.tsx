"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Edit, Save, X, TrendingUp, DollarSign, Target, CheckCircle, AlertTriangle, Info } from "lucide-react"

export default function InvestorLimitsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [formData, setFormData] = useState({
    minInvestment: 1000,
    maxInvestment: 50000,
    monthlyBudget: 10000,
    riskTolerance: "medium",
    investmentHorizon: "medium",
    preferredSectors: [] as string[],
    autoInvest: false,
    diversificationLevel: 5,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")

  const riskLevels = [
    { value: "low", label: "Düşük Risk", description: "Güvenli yatırımlar tercih ederim" },
    { value: "medium", label: "Orta Risk", description: "Dengeli portföy isterim" },
    { value: "high", label: "Yüksek Risk", description: "Yüksek getiri için risk alabilirim" },
  ]

  const investmentHorizons = [
    { value: "short", label: "Kısa Vadeli (1-2 yıl)", description: "Hızlı getiri bekliyorum" },
    { value: "medium", label: "Orta Vadeli (3-5 yıl)", description: "Dengeli büyüme hedefliyorum" },
    { value: "long", label: "Uzun Vadeli (5+ yıl)", description: "Uzun vadeli büyüme odaklıyım" },
  ]

  const sectors = [
    "Teknoloji",
    "Fintech",
    "E-ticaret",
    "Sağlık",
    "Eğitim",
    "Oyun",
    "Yapay Zeka",
    "Blockchain",
    "Sürdürülebilirlik",
    "Gıda & İçecek",
    "Turizm",
    "Lojistik",
  ]

  useEffect(() => {
    // Load user data
    const user = localStorage.getItem("user")
    if (user) {
      const parsedUser = JSON.parse(user)
      setUserData(parsedUser)

      // Load existing limits or onboarding data
      const limits = parsedUser.investorLimits
      const onboardingData = parsedUser.onboardingData

      if (limits) {
        setFormData(limits)
      } else if (onboardingData) {
        // Use onboarding data if limits not set
        const annualIncomeAmount = onboardingData.annualIncome?.amount
          ? Number.parseInt(onboardingData.annualIncome.amount.replace(/[^\d]/g, ""))
          : 120000

        setFormData({
          minInvestment: 1000,
          maxInvestment: Math.min(annualIncomeAmount / 2, 100000),
          monthlyBudget: Math.floor(annualIncomeAmount / 12),
          riskTolerance: onboardingData.investmentExperience?.riskTolerance || "medium",
          investmentHorizon: "medium",
          preferredSectors: [],
          autoInvest: false,
          diversificationLevel: 5,
        })
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : Number.parseInt(value) || value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSectorToggle = (sector: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredSectors: prev.preferredSectors.includes(sector)
        ? prev.preferredSectors.filter((s) => s !== sector)
        : [...prev.preferredSectors, sector],
    }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.minInvestment >= formData.maxInvestment) {
      newErrors.minInvestment = "Minimum yatırım maksimumdan küçük olmalıdır"
    }

    if (formData.minInvestment < 100) {
      newErrors.minInvestment = "Minimum yatırım 100 TL'den az olamaz"
    }

    if (formData.monthlyBudget > formData.maxInvestment) {
      newErrors.monthlyBudget = "Aylık bütçe maksimum yatırımdan fazla olamaz"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user data in localStorage
      const updatedUser = {
        ...userData,
        investorLimits: formData,
        limitsSet: true,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUserData(updatedUser)
      setIsEditing(false)
      setSuccessMessage("Yatırım limitleri başarıyla güncellendi")
    } catch (error) {
      console.error("Error saving investor limits:", error)
      setErrors({ general: "Limitler kaydedilirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form data
    const limits = userData?.investorLimits
    if (limits) {
      setFormData(limits)
    }
    setIsEditing(false)
    setErrors({})
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yatırım Limitleri</h1>
          <p className="text-gray-600">Yatırım limitlerini ve tercihlerinizi belirleyin</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
            <Edit className="w-4 h-4 mr-2" />
            Düzenle
          </Button>
        )}
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <p className="text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Investment Amounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Yatırım Miktarları
          </CardTitle>
          <CardDescription>Minimum ve maksimum yatırım limitlerini belirleyin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Min Investment */}
            <div className="space-y-2">
              <Label className="text-gray-700">Minimum Yatırım</Label>
              {isEditing ? (
                <div>
                  <Input
                    name="minInvestment"
                    type="number"
                    value={formData.minInvestment}
                    onChange={handleInputChange}
                    className={`bg-white border-gray-300 ${errors.minInvestment ? "border-red-500" : ""}`}
                    min="100"
                    step="100"
                  />
                  {errors.minInvestment && <p className="text-red-500 text-sm mt-1">{errors.minInvestment}</p>}
                </div>
              ) : (
                <p className="text-gray-900 font-medium text-lg">{formatCurrency(formData.minInvestment)}</p>
              )}
            </div>

            {/* Max Investment */}
            <div className="space-y-2">
              <Label className="text-gray-700">Maksimum Yatırım</Label>
              {isEditing ? (
                <Input
                  name="maxInvestment"
                  type="number"
                  value={formData.maxInvestment}
                  onChange={handleInputChange}
                  className="bg-white border-gray-300"
                  min="1000"
                  step="1000"
                />
              ) : (
                <p className="text-gray-900 font-medium text-lg">{formatCurrency(formData.maxInvestment)}</p>
              )}
            </div>

            {/* Monthly Budget */}
            <div className="space-y-2">
              <Label className="text-gray-700">Aylık Bütçe</Label>
              {isEditing ? (
                <div>
                  <Input
                    name="monthlyBudget"
                    type="number"
                    value={formData.monthlyBudget}
                    onChange={handleInputChange}
                    className={`bg-white border-gray-300 ${errors.monthlyBudget ? "border-red-500" : ""}`}
                    min="500"
                    step="500"
                  />
                  {errors.monthlyBudget && <p className="text-red-500 text-sm mt-1">{errors.monthlyBudget}</p>}
                </div>
              ) : (
                <p className="text-gray-900 font-medium text-lg">{formatCurrency(formData.monthlyBudget)}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk & Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Risk ve Strateji
          </CardTitle>
          <CardDescription>Yatırım stratejinizi ve risk toleransınızı belirleyin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risk Tolerance */}
            <div className="space-y-3">
              <Label className="text-gray-700">Risk Toleransı</Label>
              {isEditing ? (
                <div className="space-y-2">
                  {riskLevels.map((risk) => (
                    <div
                      key={risk.value}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.riskTolerance === risk.value
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleSelectChange("riskTolerance", risk.value)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{risk.label}</p>
                          <p className="text-sm text-gray-600">{risk.description}</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.riskTolerance === risk.value
                              ? "border-purple-500 bg-purple-500"
                              : "border-gray-300"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Badge className={getRiskColor(formData.riskTolerance)}>
                    {riskLevels.find((r) => r.value === formData.riskTolerance)?.label}
                  </Badge>
                </div>
              )}
            </div>

            {/* Investment Horizon */}
            <div className="space-y-3">
              <Label className="text-gray-700">Yatırım Vadesi</Label>
              {isEditing ? (
                <Select
                  value={formData.investmentHorizon}
                  onValueChange={(value) => handleSelectChange("investmentHorizon", value)}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {investmentHorizons.map((horizon) => (
                      <SelectItem key={horizon.value} value={horizon.value}>
                        <div>
                          <p className="font-medium">{horizon.label}</p>
                          <p className="text-sm text-gray-600">{horizon.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-900 font-medium">
                  {investmentHorizons.find((h) => h.value === formData.investmentHorizon)?.label}
                </p>
              )}
            </div>
          </div>

          {/* Diversification Level */}
          <div className="space-y-3">
            <Label className="text-gray-700">Çeşitlendirme Seviyesi</Label>
            <div className="space-y-2">
              {isEditing ? (
                <div>
                  <Slider
                    value={[formData.diversificationLevel]}
                    onValueChange={(value) => handleSliderChange("diversificationLevel", value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Düşük (1)</span>
                    <span>Orta (5)</span>
                    <span>Yüksek (10)</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(formData.diversificationLevel / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{formData.diversificationLevel}/10</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferred Sectors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Tercih Edilen Sektörler
          </CardTitle>
          <CardDescription>Yatırım yapmak istediğiniz sektörleri seçin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {sectors.map((sector) => (
              <div
                key={sector}
                className={`p-3 border rounded-lg cursor-pointer transition-colors text-center ${
                  formData.preferredSectors.includes(sector)
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300"
                } ${!isEditing ? "cursor-default" : ""}`}
                onClick={() => isEditing && handleSectorToggle(sector)}
              >
                <p className="text-sm font-medium">{sector}</p>
                {formData.preferredSectors.includes(sector) && (
                  <CheckCircle className="w-4 h-4 mx-auto mt-1 text-purple-600" />
                )}
              </div>
            ))}
          </div>
          {formData.preferredSectors.length === 0 && !isEditing && (
            <p className="text-gray-500 text-center py-4">Henüz sektör seçimi yapılmamış</p>
          )}
        </CardContent>
      </Card>

      {/* Auto Investment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Otomatik Yatırım
          </CardTitle>
          <CardDescription>Otomatik yatırım özelliklerini yapılandırın</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Otomatik Yatırım</p>
              <p className="text-sm text-gray-600">
                Belirlediğiniz kriterlere uygun startup'lara otomatik yatırım yapın
              </p>
            </div>
            {isEditing ? (
              <input
                type="checkbox"
                name="autoInvest"
                checked={formData.autoInvest}
                onChange={handleInputChange}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            ) : (
              <Badge className={formData.autoInvest ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {formData.autoInvest ? "Aktif" : "Pasif"}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-800">{errors.general}</p>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="flex justify-end space-x-4">
          <Button onClick={handleCancel} variant="outline">
            <X className="w-4 h-4 mr-2" />
            İptal
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      )}
    </div>
  )
}
