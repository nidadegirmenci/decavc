"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, LogIn, User } from "lucide-react"
import { demoUsers, isDemoUser, getDemoUser } from "@/utils/demo-users"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleDemoLogin = (email: string) => {
    setFormData({
      email: email,
      password: "123456",
    })
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.email) {
      newErrors.email = "E-posta adresi gereklidir"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin"
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      let user = null

      // Check demo users first
      if (isDemoUser(formData.email)) {
        const demoUser = getDemoUser(formData.email)
        if (demoUser && formData.password === "123456") {
          user = {
            ...demoUser,
            isLoggedIn: true,
          }
        }
      } else {
        // Check registered users
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
        const foundUser = registeredUsers.find(
          (u: any) => u.email === formData.email && u.password === formData.password,
        )

        if (foundUser) {
          user = {
            ...foundUser,
            isLoggedIn: true,
          }
        }
      }

      if (!user) {
        setErrors({ general: "E-posta veya şifre hatalı" })
        setIsLoading(false)
        return
      }

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user))

      // Trigger login event
      window.dispatchEvent(new Event("userLogin"))

      // Redirect based on onboarding status
      if (user.onboardingCompleted) {
        router.push("/dashboard")
      } else {
        // Redirect to appropriate onboarding step
        const step = user.onboardingStep || "personal-information"
        router.push(`/onboarding/${step}`)
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ general: "Giriş sırasında bir hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-warm-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Giriş Yap</CardTitle>
            <CardDescription className="text-gray-600">Deca Venture hesabınıza giriş yapın</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {errors.general}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-posta Adresi</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                  placeholder="ornek@email.com"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    placeholder="Şifrenizi girin"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Giriş Yapılıyor...
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Hesabınız yok mu?{" "}
                  <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-medium">
                    Kayıt Olun
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Demo Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-purple-600" />
              Demo Hesaplar
            </CardTitle>
            <CardDescription>
              Platformu hızlıca keşfetmek için demo hesaplardan birini kullanabilirsiniz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoUsers.map((user) => (
              <div
                key={user.email}
                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{user.fullName}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-purple-600 mt-1">{user.role}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(user.email)}
                    className="text-purple-600 border-purple-600 hover:bg-purple-50"
                  >
                    Giriş Yap
                  </Button>
                </div>
              </div>
            ))}
            <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-md">
              <strong>Not:</strong> Demo hesapların şifresi: <code className="bg-white px-1 rounded">123456</code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
