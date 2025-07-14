"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Smartphone } from "lucide-react"

export default function PhoneVerificationPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }

    // Load existing data if available
    const userData = JSON.parse(user)
    if (userData.onboardingData?.phoneVerification) {
      setPhoneNumber(userData.onboardingData.phoneVerification.phoneNumber || "")
      setIsCodeSent(userData.onboardingData.phoneVerification.codeSent || false)
    } else if (userData.phoneNumber) {
      setPhoneNumber(userData.phoneNumber)
    }
  }, [router])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhoneNumber(value)

    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: "" }))
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setVerificationCode(value)

    if (errors.verificationCode) {
      setErrors((prev) => ({ ...prev, verificationCode: "" }))
    }
  }

  const validatePhoneNumber = () => {
    if (!phoneNumber.trim()) {
      setErrors({ phoneNumber: "Telefon numarası gereklidir" })
      return false
    }

    // Basic phone number validation
    const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      setErrors({ phoneNumber: "Geçerli bir Türk telefon numarası girin" })
      return false
    }

    return true
  }

  const handleSendCode = async () => {
    if (!validatePhoneNumber()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsCodeSent(true)
      setCountdown(60)
      setErrors({})

      // Save phone number to localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const updatedUser = {
        ...user,
        phoneNumber,
        onboardingData: {
          ...user.onboardingData,
          phoneVerification: {
            phoneNumber,
            codeSent: true,
            verified: false,
          },
        },
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Error sending verification code:", error)
      setErrors({ general: "Doğrulama kodu gönderilirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setErrors({ verificationCode: "Doğrulama kodu gereklidir" })
      return
    }

    if (verificationCode.length !== 6) {
      setErrors({ verificationCode: "Doğrulama kodu 6 haneli olmalıdır" })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, accept any 6-digit code
      if (verificationCode === "123456" || verificationCode.length === 6) {
        // Save verification status
        const user = JSON.parse(localStorage.getItem("user") || "{}")
        const updatedUser = {
          ...user,
          phoneNumber,
          phoneVerified: true,
          onboardingData: {
            ...user.onboardingData,
            phoneVerification: {
              phoneNumber,
              codeSent: true,
              verified: true,
            },
          },
        }

        localStorage.setItem("user", JSON.stringify(updatedUser))

        // Navigate to next step
        router.push("/onboarding/annual-income")
      } else {
        setErrors({ verificationCode: "Geçersiz doğrulama kodu" })
      }
    } catch (error) {
      console.error("Error verifying code:", error)
      setErrors({ general: "Doğrulama kodu kontrol edilirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/onboarding/annual-income")
  }

  const handleBack = () => {
    router.push("/onboarding/personal-information")
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
              <span className="text-sm text-gray-500">2/5</span>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Telefon Doğrulama
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {!isCodeSent
                ? "Güvenlik için telefon numaranızı doğrulayın"
                : "Telefonunuza gönderilen 6 haneli kodu girin"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!isCodeSent ? (
                <>
                  {/* Phone Number Input */}
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-gray-700">
                      Telefon Numarası
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className={`bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 ${
                        errors.phoneNumber ? "border-red-500" : ""
                      }`}
                      placeholder="+90 5XX XXX XX XX"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                  </div>

                  {/* Send Code Button */}
                  <Button
                    onClick={handleSendCode}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    {isLoading ? "Kod Gönderiliyor..." : "Doğrulama Kodu Gönder"}
                  </Button>
                </>
              ) : (
                <>
                  {/* Verification Code Input */}
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode" className="text-gray-700">
                      Doğrulama Kodu
                    </Label>
                    <Input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      value={verificationCode}
                      onChange={handleCodeChange}
                      className={`bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-center text-lg tracking-widest ${
                        errors.verificationCode ? "border-red-500" : ""
                      }`}
                      placeholder="123456"
                      maxLength={6}
                    />
                    {errors.verificationCode && <p className="text-red-500 text-sm">{errors.verificationCode}</p>}
                  </div>

                  {/* Resend Code */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Kodu {phoneNumber} numarasına gönderdik</p>
                    {countdown > 0 ? (
                      <p className="text-sm text-gray-500">Yeniden gönder ({countdown}s)</p>
                    ) : (
                      <Button
                        variant="ghost"
                        onClick={handleSendCode}
                        disabled={isLoading}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        Kodu Yeniden Gönder
                      </Button>
                    )}
                  </div>

                  {/* Verify Button */}
                  <Button
                    onClick={handleVerifyCode}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    {isLoading ? "Doğrulanıyor..." : "Doğrula"}
                  </Button>

                  {/* Change Phone Number */}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsCodeSent(false)
                      setVerificationCode("")
                      setCountdown(0)
                    }}
                    className="w-full text-gray-600 hover:text-gray-900"
                  >
                    Telefon Numarasını Değiştir
                  </Button>
                </>
              )}

              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Demo Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm">
                  <strong>Demo:</strong> Herhangi bir 6 haneli kod kullanabilirsiniz (örn: 123456)
                </p>
              </div>

              {/* Action Buttons */}
              {!isCodeSent && (
                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" onClick={handleSkip} className="flex-1 bg-transparent" disabled={isLoading}>
                    Atla
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
