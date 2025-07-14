"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, User, Upload } from "lucide-react"

export default function ProfileSetupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    bio: "",
    linkedinUrl: "",
    websiteUrl: "",
    profileImage: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }

    // Load existing data if available
    const userData = JSON.parse(user)
    if (userData.onboardingData?.profileSetup) {
      const profile = userData.onboardingData.profileSetup
      setFormData({
        bio: profile.bio || "",
        linkedinUrl: profile.linkedinUrl || "",
        websiteUrl: profile.websiteUrl || "",
        profileImage: null, // File objects can't be stored in localStorage
      })
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors({ profileImage: "Lütfen geçerli bir resim dosyası seçin" })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ profileImage: "Resim dosyası 5MB'dan küçük olmalıdır" })
        return
      }

      setFormData((prev) => ({ ...prev, profileImage: file }))

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Clear error
      if (errors.profileImage) {
        setErrors((prev) => ({ ...prev, profileImage: "" }))
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // LinkedIn URL validation
    if (formData.linkedinUrl && !formData.linkedinUrl.includes("linkedin.com")) {
      newErrors.linkedinUrl = "Geçerli bir LinkedIn URL'si girin"
    }

    // Website URL validation
    if (formData.websiteUrl && !formData.websiteUrl.startsWith("http")) {
      newErrors.websiteUrl = "Website URL'si http:// veya https:// ile başlamalıdır"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save data to localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const updatedUser = {
        ...user,
        onboardingData: {
          ...user.onboardingData,
          profileSetup: {
            bio: formData.bio,
            linkedinUrl: formData.linkedinUrl,
            websiteUrl: formData.websiteUrl,
            profileImage: imagePreview, // Store base64 for demo purposes
          },
        },
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Navigate to welcome page
      router.push("/onboarding/welcome")
    } catch (error) {
      console.error("Error saving profile setup:", error)
      setErrors({ general: "Profil bilgileri kaydedilirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/onboarding/welcome")
  }

  const handleBack = () => {
    router.push("/onboarding/investment-experience")
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
              <span className="text-sm text-gray-500">5/5</span>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Profil Kurulumu
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Profilinizi tamamlayın ve diğer yatırımcılarla bağlantı kurun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Profile Image */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Profil Fotoğrafı (Opsiyonel)</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="profileImage"
                      className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Fotoğraf Yükle
                    </Label>
                  </div>
                </div>
                {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage}</p>}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-700 font-medium">
                  Kısa Biyografi (Opsiyonel)
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 min-h-[80px]"
                  placeholder="Kendinizi kısaca tanıtın..."
                  maxLength={500}
                />
                <div className="text-right text-xs text-gray-500">{formData.bio.length}/500</div>
              </div>

              {/* LinkedIn URL */}
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl" className="text-gray-700 font-medium">
                  LinkedIn Profili (Opsiyonel)
                </Label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  className={`bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 ${
                    errors.linkedinUrl ? "border-red-500" : ""
                  }`}
                  placeholder="https://linkedin.com/in/kullaniciadi"
                />
                {errors.linkedinUrl && <p className="text-red-500 text-sm">{errors.linkedinUrl}</p>}
              </div>

              {/* Website URL */}
              <div className="space-y-2">
                <Label htmlFor="websiteUrl" className="text-gray-700 font-medium">
                  Kişisel Website (Opsiyonel)
                </Label>
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="url"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  className={`bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 ${
                    errors.websiteUrl ? "border-red-500" : ""
                  }`}
                  placeholder="https://website.com"
                />
                {errors.websiteUrl && <p className="text-red-500 text-sm">{errors.websiteUrl}</p>}
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
                      Tamamla
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
