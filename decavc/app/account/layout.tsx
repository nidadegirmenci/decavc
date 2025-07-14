"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Settings, Shield, User, CreditCard, Bell, Crown, Info } from "lucide-react"

const accountSections = [
  {
    id: "login-security",
    label: "Giriş ve Güvenlik",
    icon: Shield,
    path: "/account/login-security",
  },
  {
    id: "investor-information",
    label: "Yatırımcı Bilgileri",
    icon: Info,
    path: "/account/investor-information",
  },
  {
    id: "investor-limits",
    label: "Yatırımcı Limitleri",
    icon: Settings,
    path: "/account/investor-limits",
  },
  {
    id: "banks-cards",
    label: "Bankalar ve Kartlar",
    icon: CreditCard,
    path: "/account/banks-cards",
  },
  {
    id: "public-profile",
    label: "Genel Profil",
    icon: User,
    path: "/account/public-profile",
  },
  {
    id: "notifications",
    label: "Bildirimler",
    icon: Bell,
    path: "/account/notifications",
  },
  {
    id: "vip",
    label: "VIP",
    icon: Crown,
    path: "/account/vip",
  },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser)
      } else {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const activeSection = accountSections.find((section) => pathname === section.path)

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-warm-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-warm-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hesap Ayarları</h1>
          <p className="text-gray-600">Hesap bilgilerinizi ve güvenlik ayarlarınızı yönetin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border border-cream-200 shadow-lg">
              <div className="p-6">
                <nav className="space-y-2">
                  {accountSections.map((section) => {
                    const IconComponent = section.icon
                    const isActive = pathname === section.path

                    return (
                      <button
                        key={section.id}
                        onClick={() => router.push(section.path)}
                        className={`${
                          isActive
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : "text-gray-700 hover:bg-gray-50 border-transparent"
                        } w-full text-left px-3 py-2 rounded-lg border transition-colors duration-200 flex items-center space-x-3`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-medium">{section.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-sm border border-cream-200 shadow-lg">
              <div className="p-6">
                {/* Section Header */}
                {activeSection && (
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <activeSection.icon className="w-6 h-6 text-purple-600" />
                      <h2 className="text-2xl font-bold text-gray-900">{activeSection.label}</h2>
                    </div>
                  </div>
                )}

                {/* Section Content */}
                {children}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
