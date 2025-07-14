"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, CheckCircle, TrendingUp, Users, BookOpen } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser)

        // Mark onboarding as completed
        const updatedUser = {
          ...parsedUser,
          onboardingCompleted: true,
          onboardingStep: "completed",
        }

        localStorage.setItem("user", JSON.stringify(updatedUser))

        // Update registered users if not demo user
        if (!parsedUser.isDemo) {
          const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
          const updatedUsers = registeredUsers.map((u: any) => (u.email === parsedUser.email ? updatedUser : u))
          localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))
        }
      } else {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleContinue = () => {
    router.push("/dashboard")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-warm-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-warm-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        {/* Welcome Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Deca Venture platformuna hoş geldiniz!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Merhaba {user.fullName}, profiliniz başarıyla oluşturuldu. Artık yatırım fırsatlarını keşfetmeye
          başlayabilirsiniz.
        </p>

        {/* Completion Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Profil Kurulumu Tamamlandı
            </CardTitle>
            <CardDescription>Tüm onboarding adımlarını başarıyla tamamladınız</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>Kişisel bilgiler</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>Telefon doğrulama</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>Gelir bilgileri</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>Yatırım deneyimi</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>Profil kurulumu</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span>Hesap doğrulama</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sırada Ne Var?</CardTitle>
            <CardDescription>Platformdan en iyi şekilde yararlanmak için önerilerimiz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Startupları Keşfet</h3>
                <p className="text-sm text-gray-600">Yatırım fırsatlarını inceleyin</p>
              </div>
              <div className="text-center p-4">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Topluluk</h3>
                <p className="text-sm text-gray-600">Diğer yatırımcılarla bağlantı kurun</p>
              </div>
              <div className="text-center p-4">
                <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Öğrenin</h3>
                <p className="text-sm text-gray-600">Yatırım rehberlerini okuyun</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-3"
        >
          Dashboard'a Git
        </Button>
      </div>
    </div>
  )
}
