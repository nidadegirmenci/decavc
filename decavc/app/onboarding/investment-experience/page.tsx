"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, TrendingUp } from "lucide-react"

const experienceLevels = [
  { value: "beginner", label: "Yeni Başlayan", description: "Hiç yatırım deneyimim yok" },
  { value: "intermediate", label: "Orta Seviye", description: "Bazı yatırım deneyimim var" },
  { value: "expert", label: "Uzman", description: "Deneyimli yatırımcıyım" },
]

export default function InvestmentExperiencePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    hasAngelInvestmentExperience: "",
    experienceLevel: "",
    previousInvestments: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }

    // Load existing data if available
    const userData = JSON.parse(user)
    if (userData.onboardingData?.investmentExperience) {
      const experience = userData.onboardingData.investmentExperience
      setFormData({
        hasAngelInvestmentExperience: experience.hasAngelInvestmentExperience ? "yes" : "no",
        experienceLevel: experience.experienceLevel || "",
        previousInvestments: experience.previousInvestments?.toString() || "",
      })
    }
  }, [router])

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.hasAngelInvestmentExperience) {
      newErrors.hasAngelInvestmentExperience = "Lütfen melek yatırım deneyiminizi belirtin"
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Lütfen deneyim seviyenizi seçin"
    }

    if (formData.previousInvestments && isNaN(Number(formData.previousInvestments))) {
      newErrors.previousInvestments = "Lütfen geçerli bir sayı girin"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save data to localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const updatedUser = {
        ...user,
        onboardingData: {
          ...user.onboardingData,
          investmentExperience: {
            hasAngelInvestmentExperience: formData.hasAngelInvestmentExperience === "yes",
            experienceLevel: formData.experienceLevel,
            previousInvestments: formData.previousInvestments ? Number(formData.previousInvestments) : 0,
          },
        },
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Navigate to next step
      router.push("/onboarding/profile-setup")
    } catch (error) {
      console.error("Error saving investment experience:", error)
      setErrors({ general: "Bilgiler kaydedilirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/onboarding/profile-setup")
  }

  const handleBack = () => {
    router.push("/onboarding/annual-income")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-0 h-auto text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri
              </Button>
              <span className="text-sm text-gray-500">4/5</span>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Yatırım Deneyimi
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Size uygun fırsatları sunabilmek için yatırım deneyiminizi öğrenmek istiyoruz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Angel Investment Experience */}
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">Daha önce melek yatırım yaptınız mı?</Label>
                <RadioGroup
                  value={formData.hasAngelInvestmentExperience}
                  onValueChange={(value) => handleRadioChange("hasAngelInvestmentExperience", value)}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="angel-yes" className="border-gray-300 text-purple-600" />
                    <Label htmlFor="angel-yes" className="cursor-pointer">
                      Evet, melek yatırım deneyimim var
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="angel-no" className="border-gray-300 text-purple-600" />
                    <Label htmlFor="angel-no" className="cursor-pointer">
                      Hayır, ilk kez melek yatırım yapacağım
                    </Label>
                  </div>
                </RadioGroup>
                {errors.hasAngelInvestmentExperience && (
                  <p className="text-red-500 text-sm">{errors.hasAngelInvestmentExperience}</p>
                )}
              </div>

              {/* Experience Level */}
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">Genel yatırım deneyim seviyeniz nedir?</Label>
                <RadioGroup
                  value={formData.experienceLevel}
                  onValueChange={(value) => handleRadioChange("experienceLevel", value)}
                >
                  {experienceLevels.map((level) => (
                    <div key={level.value} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={level.value}
                        id={level.value}
                        className="border-gray-300 text-purple-600"
                      />
                      <Label
                        htmlFor={level.value}
                        className="flex-1 cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">{level.label}</div>
                        <div className="text-sm text-gray-600">{level.description}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel}</p>}
              </div>

              {/* Previous Investments */}
              <div className="space-y-2">
                <Label htmlFor="previousInvestments" className="text-gray-700 font-medium">
                  Kaç startup'a yatırım yaptınız? (Opsiyonel)
                </Label>
                <Input
                  id="previousInvestments"
                  name="previousInvestments"
                  type="number"
                  value={formData.previousInvestments}
                  onChange={handleInputChange}
                  className={`bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 ${
                    errors.previousInvestments ? "border-red-500" : ""
                  }`}
                  placeholder="0"
                  min="0"
                />
                {errors.previousInvestments && <p className="text-red-500 text-sm">{errors.previousInvestments}</p>}
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={handleSkip} className="flex-1 bg-transparent" disabled={isLoading}>
                  Atla
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {isLoading ? (
                    "Kaydediliyor..."
                  ) : (
                    <>
                      İleri
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
