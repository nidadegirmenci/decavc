"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, ArrowLeft, DollarSign } from "lucide-react"

const incomeRanges = [
  { value: "0-50000", label: "₺0 - ₺50,000", description: "Yıllık gelir" },
  { value: "50000-100000", label: "₺50,000 - ₺100,000", description: "Yıllık gelir" },
  { value: "100000-250000", label: "₺100,000 - ₺250,000", description: "Yıllık gelir" },
  { value: "250000-500000", label: "₺250,000 - ₺500,000", description: "Yıllık gelir" },
  { value: "500000-1000000", label: "₺500,000 - ₺1,000,000", description: "Yıllık gelir" },
  { value: "1000000+", label: "₺1,000,000+", description: "Yıllık gelir" },
]

export default function AnnualIncomePage() {
  const router = useRouter()
  const [selectedIncome, setSelectedIncome] = useState("")
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
    if (userData.onboardingData?.annualIncome) {
      setSelectedIncome(userData.onboardingData.annualIncome.range || "")
    }
  }, [router])

  const handleIncomeChange = (value: string) => {
    setSelectedIncome(value)
    if (errors.income) {
      setErrors((prev) => ({ ...prev, income: "" }))
    }
  }

  const handleNext = async () => {
    if (!selectedIncome) {
      setErrors({ income: "Lütfen gelir aralığınızı seçin" })
      return
    }

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
          annualIncome: {
            range: selectedIncome,
            currency: "TRY",
          },
        },
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Navigate to next step
      router.push("/onboarding/investment-experience")
    } catch (error) {
      console.error("Error saving annual income:", error)
      setErrors({ general: "Bilgiler kaydedilirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/onboarding/investment-experience")
  }

  const handleBack = () => {
    router.push("/onboarding/phone-verification")
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
              <span className="text-sm text-gray-500">3/5</span>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Yıllık Gelir
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Yatırım profilinizi belirlemek için yıllık gelirinizi seçin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">Yıllık gelir aralığınızı seçin</Label>
                <RadioGroup value={selectedIncome} onValueChange={handleIncomeChange}>
                  {incomeRanges.map((range) => (
                    <div key={range.value} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={range.value}
                        id={range.value}
                        className="border-gray-300 text-purple-600"
                      />
                      <Label
                        htmlFor={range.value}
                        className="flex-1 cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">{range.label}</div>
                        <div className="text-sm text-gray-600">{range.description}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.income && <p className="text-red-500 text-sm">{errors.income}</p>}
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm">
                  <strong>Gizlilik:</strong> Gelir bilgileriniz güvenli bir şekilde saklanır ve sadece uygun yatırım
                  fırsatlarını belirlemek için kullanılır.
                </p>
              </div>

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
