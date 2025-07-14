"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Briefcase, Users, Bell, Bookmark, Wallet, FileText } from "lucide-react"

const dashboardTabs = [
  {
    id: "portfolio",
    label: "Portföy",
    icon: Briefcase,
    path: "/dashboard/portfolio",
  },
  {
    id: "followers",
    label: "Takipçiler",
    icon: Users,
    path: "/dashboard/followers",
  },
  {
    id: "investor-updates",
    label: "Yatırımcı Güncellemeleri",
    icon: Bell,
    path: "/dashboard/investor-updates",
  },
  {
    id: "watchlist",
    label: "İzleme Listesi",
    icon: Bookmark,
    path: "/dashboard/watchlist",
  },
  {
    id: "cash",
    label: "Nakit",
    icon: Wallet,
    path: "/dashboard/cash",
  },
  {
    id: "tax-documents",
    label: "Vergi Belgeleri",
    icon: FileText,
    path: "/dashboard/tax-documents",
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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

  const activeTab = dashboardTabs.find((tab) => pathname === tab.path)

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
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hoş Geldiniz, {user.fullName}!</h1>
          <p className="text-gray-600">Yatırım portföyünüzü ve hesap bilgilerinizi yönetin</p>
        </div>

        {/* Dashboard Tabs */}
        <Card className="bg-white/80 backdrop-blur-sm border border-cream-200 shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {dashboardTabs.map((tab) => {
                const IconComponent = tab.icon
                const isActive = pathname === tab.path

                return (
                  <button
                    key={tab.id}
                    onClick={() => router.push(tab.path)}
                    className={`${
                      isActive
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">{children}</div>
        </Card>
      </div>
    </div>
  )
}
