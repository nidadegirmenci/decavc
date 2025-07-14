"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Edit3,
  Bell,
  TrendingUp,
  FileText,
  Shield,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const entrepreneurTabs = [
  {
    id: "overview",
    label: "Genel Bakış",
    icon: BarChart3,
    path: "/entrepreneur/overview",
  },
  {
    id: "editor",
    label: "Kampanya Editörü",
    icon: Edit3,
    path: "/entrepreneur/editor",
  },
  {
    id: "updates",
    label: "Güncellemeler",
    icon: Bell,
    path: "/entrepreneur/updates",
  },
  {
    id: "investments",
    label: "Yatırımlar",
    icon: TrendingUp,
    path: "/entrepreneur/investments",
    locked: true,
  },
  {
    id: "reports",
    label: "Raporlar",
    icon: FileText,
    path: "/entrepreneur/reports",
    locked: true,
  },
  {
    id: "legal",
    label: "Yasal/Açıklamalar",
    icon: Shield,
    path: "/entrepreneur/legal",
    locked: true,
  },
  {
    id: "community",
    label: "Topluluk",
    icon: Users,
    path: "/entrepreneur/community",
  },
]

const resourceLinks = [
  {
    id: "legal-primer",
    label: "Yasal Rehber",
    icon: BookOpen,
    path: "/entrepreneur/resources/legal-primer",
  },
  {
    id: "founder-faq",
    label: "Girişimci SSS",
    icon: BookOpen,
    path: "/entrepreneur/resources/founder-faq",
  },
  {
    id: "fundraising-playbook",
    label: "Fon Toplama Rehberi",
    icon: BookOpen,
    path: "/entrepreneur/resources/fundraising-playbook",
  },
]

export default function EntrepreneurLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [campaign, setCampaign] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser)
        setCampaign(parsedUser.campaign || null)
      } else {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

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

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "w-64" : "w-12"} transition-all duration-300 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-hidden`}
        >
          <div className="p-4">
            {/* Sidebar Toggle */}
            <div className="flex items-center justify-between mb-6">
              {sidebarOpen && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{campaign?.name || "Yeni Kampanya"}</h2>
                  {campaign && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent mt-2"
                      onClick={() => window.open(`/campaign/${campaign.id}`, "_blank")}
                    >
                      Kampanyayı Görüntüle
                    </Button>
                  )}
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto">
                {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 mb-8">
              {entrepreneurTabs.map((tab) => {
                const IconComponent = tab.icon
                const isActive = pathname === tab.path
                const isLocked = tab.locked && !campaign?.published

                return (
                  <button
                    key={tab.id}
                    onClick={() => !isLocked && router.push(tab.path)}
                    disabled={isLocked}
                    className={`${
                      isActive
                        ? "bg-purple-50 text-purple-600 border-r-2 border-purple-600"
                        : isLocked
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-50"
                    } w-full flex items-center space-x-3 px-3 py-2 text-left text-sm font-medium transition-colors duration-200 ${
                      !sidebarOpen ? "justify-center" : ""
                    }`}
                    title={!sidebarOpen ? tab.label : ""}
                  >
                    <IconComponent className="w-4 h-4 flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span>{tab.label}</span>
                        {isLocked && <Shield className="w-3 h-3 ml-auto" />}
                      </>
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Resources */}
            {sidebarOpen && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Kaynaklar</h3>
                <nav className="space-y-1">
                  {resourceLinks.map((link) => {
                    const IconComponent = link.icon
                    const isActive = pathname === link.path

                    return (
                      <button
                        key={link.id}
                        onClick={() => router.push(link.path)}
                        className={`${
                          isActive ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:bg-gray-50"
                        } w-full flex items-center space-x-3 px-3 py-2 text-left text-sm transition-colors duration-200`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{link.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  )
}
