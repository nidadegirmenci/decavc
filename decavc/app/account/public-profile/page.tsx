"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Edit,
  Save,
  X,
  User,
  Briefcase,
  TrendingUp,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  Upload,
  Globe,
  Linkedin,
} from "lucide-react"

interface Investment {
  id: string
  companyName: string
  amount: number
  date: string
  sector: string
  status: "active" | "exited" | "failed"
  description?: string
}

export default function PublicProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    linkedinUrl: "",
    websiteUrl: "",
    profileImage: null as File | null,
    location: "",
    profession: "",
    company: "",
    investmentStrategy: "",
    investmentFocus: [] as string[],
    isPublic: true,
    showInvestments: false,
  })

  const [investments, setInvestments] = useState<Investment[]>([])
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false)
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null)
  const [investmentForm, setInvestmentForm] = useState({
    companyName: "",
    amount: "",
    date: "",
    sector: "",
    status: "active" as "active" | "exited" | "failed",
    description: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")

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

  const investmentStatuses = [
    { value: "active", label: "Aktif", color: "bg-blue-100 text-blue-800" },
    { value: "exited", label: "Çıkış Yapıldı", color: "bg-green-100 text-green-800" },
    { value: "failed", label: "Başarısız", color: "bg-red-100 text-red-800" },
  ]

  useEffect(() => {
    // Load user data
    const user = localStorage.getItem("user")
    if (user) {
      const parsedUser = JSON.parse(user)
      setUserData(parsedUser)

      // Load profile data from onboarding or existing profile
      const profile = parsedUser.publicProfile || {}
      const profileSetup = parsedUser.onboardingData?.profileSetup || {}

      setFormData({
        displayName: profile.displayName || profileSetup.displayName || parsedUser.fullName || "",
        bio: profile.bio || profileSetup.bio || "",
        linkedinUrl: profile.linkedinUrl || profileSetup.linkedinUrl || "",
        websiteUrl: profile.websiteUrl || profileSetup.websiteUrl || "",
        profileImage: null,
        location: profile.location || profileSetup.location || "",
        profession: profile.profession || profileSetup.profession || "",
        company: profile.company || profileSetup.company || "",
        investmentStrategy: profile.investmentStrategy || "",
        investmentFocus: profile.investmentFocus || [],
        isPublic: profile.isPublic !== undefined ? profile.isPublic : true,
        showInvestments: profile.showInvestments || false,
      })

      if (profile.profileImage || profileSetup.profileImage) {
        setImagePreview(profile.profileImage || profileSetup.profileImage)
      }

      // Load investments
      if (parsedUser.investments) {
        setInvestments(parsedUser.investments)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocusToggle = (focus: string) => {
    setFormData((prev) => ({
      ...prev,
      investmentFocus: prev.investmentFocus.includes(focus)
        ? prev.investmentFocus.filter((f) => f !== focus)
        : [...prev.investmentFocus, focus],
    }))
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

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Görünen ad gereklidir"
    }

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

  const handleSave = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user data in localStorage
      const updatedUser = {
        ...userData,
        publicProfile: {
          ...formData,
          profileImage: imagePreview, // Store base64 for demo purposes
        },
        investments,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUserData(updatedUser)
      setIsEditing(false)
      setSuccessMessage("Profil başarıyla güncellendi")
    } catch (error) {
      console.error("Error saving profile:", error)
      setErrors({ general: "Profil kaydedilirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form data
    const profile = userData?.publicProfile || {}
    const profileSetup = userData?.onboardingData?.profileSetup || {}

    setFormData({
      displayName: profile.displayName || profileSetup.displayName || userData?.fullName || "",
      bio: profile.bio || profileSetup.bio || "",
      linkedinUrl: profile.linkedinUrl || profileSetup.linkedinUrl || "",
      websiteUrl: profile.websiteUrl || profileSetup.websiteUrl || "",
      profileImage: null,
      location: profile.location || profileSetup.location || "",
      profession: profile.profession || profileSetup.profession || "",
      company: profile.company || profileSetup.company || "",
      investmentStrategy: profile.investmentStrategy || "",
      investmentFocus: profile.investmentFocus || [],
      isPublic: profile.isPublic !== undefined ? profile.isPublic : true,
      showInvestments: profile.showInvestments || false,
    })
    setImagePreview(profile.profileImage || profileSetup.profileImage || null)
    setIsEditing(false)
    setErrors({})
  }

  const handleAddInvestment = () => {
    setEditingInvestment(null)
    setInvestmentForm({
      companyName: "",
      amount: "",
      date: "",
      sector: "",
      status: "active",
      description: "",
    })
    setIsInvestmentModalOpen(true)
  }

  const handleEditInvestment = (investment: Investment) => {
    setEditingInvestment(investment)
    setInvestmentForm({
      companyName: investment.companyName,
      amount: investment.amount.toString(),
      date: investment.date,
      sector: investment.sector,
      status: investment.status,
      description: investment.description || "",
    })
    setIsInvestmentModalOpen(true)
  }

  const handleSaveInvestment = () => {
    if (!investmentForm.companyName || !investmentForm.amount || !investmentForm.date) {
      setErrors({ investment: "Şirket adı, miktar ve tarih gereklidir" })
      return
    }

    const investmentData: Investment = {
      id: editingInvestment?.id || Date.now().toString(),
      companyName: investmentForm.companyName,
      amount: Number.parseInt(investmentForm.amount),
      date: investmentForm.date,
      sector: investmentForm.sector,
      status: investmentForm.status,
      description: investmentForm.description,
    }

    if (editingInvestment) {
      setInvestments((prev) => prev.map((inv) => (inv.id === editingInvestment.id ? investmentData : inv)))
    } else {
      setInvestments((prev) => [...prev, investmentData])
    }

    setIsInvestmentModalOpen(false)
    setErrors({})
  }

  const handleDeleteInvestment = (id: string) => {
    setInvestments((prev) => prev.filter((inv) => inv.id !== id))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const statusInfo = investmentStatuses.find((s) => s.value === status)
    return statusInfo ? <Badge className={statusInfo.color}>{statusInfo.label}</Badge> : null
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
          <h1 className="text-2xl font-bold text-gray-900">Genel Profil</h1>
          <p className="text-gray-600">Herkese açık profil bilgilerinizi yönetin</p>
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

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profil Bilgileri
          </CardTitle>
          <CardDescription>Herkese görünecek temel bilgileriniz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image and Display Name */}
          <div className="flex items-start space-x-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
              {isEditing && (
                <div>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="profileImage"
                    className="cursor-pointer inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="w-3 h-3 mr-1" />
                    Değiştir
                  </Label>
                </div>
              )}
              {errors.profileImage && <p className="text-red-500 text-xs">{errors.profileImage}</p>}
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700">Görünen Ad *</Label>
                  {isEditing ? (
                    <Input
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className={`bg-white border-gray-300 ${errors.displayName ? "border-red-500" : ""}`}
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.displayName || "-"}</p>
                  )}
                  {errors.displayName && <p className="text-red-500 text-sm">{errors.displayName}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Konum</Label>
                  {isEditing ? (
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      placeholder="İstanbul, Türkiye"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.location || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Meslek</Label>
                  {isEditing ? (
                    <Input
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      placeholder="Yazılım Geliştirici"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.profession || "-"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Şirket</Label>
                  {isEditing ? (
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-white border-gray-300"
                      placeholder="ABC Teknoloji"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.company || "-"}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Biyografi</Label>
                {isEditing ? (
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="bg-white border-gray-300 min-h-[80px]"
                    placeholder="Kendinizi kısaca tanıtın..."
                    maxLength={500}
                  />
                ) : (
                  <p className="text-gray-900">{formData.bio || "-"}</p>
                )}
                {isEditing && <div className="text-right text-xs text-gray-500">{formData.bio.length}/500</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700">LinkedIn</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        className={`pl-10 bg-white border-gray-300 ${errors.linkedinUrl ? "border-red-500" : ""}`}
                        placeholder="https://linkedin.com/in/kullaniciadi"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {formData.linkedinUrl ? (
                        <a
                          href={formData.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          LinkedIn Profili
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                  )}
                  {errors.linkedinUrl && <p className="text-red-500 text-sm">{errors.linkedinUrl}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Website</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                        className={`pl-10 bg-white border-gray-300 ${errors.websiteUrl ? "border-red-500" : ""}`}
                        placeholder="https://website.com"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {formData.websiteUrl ? (
                        <a
                          href={formData.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          Website
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                  )}
                  {errors.websiteUrl && <p className="text-red-500 text-sm">{errors.websiteUrl}</p>}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Yatırım Stratejisi
          </CardTitle>
          <CardDescription>Yatırım yaklaşımınızı ve odak alanlarınızı belirtin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-gray-700">Yatırım Stratejisi</Label>
            {isEditing ? (
              <Textarea
                name="investmentStrategy"
                value={formData.investmentStrategy}
                onChange={handleInputChange}
                className="bg-white border-gray-300 min-h-[100px]"
                placeholder="Yatırım stratejinizi, yaklaşımınızı ve kriterlerinizi açıklayın..."
                maxLength={1000}
              />
            ) : (
              <p className="text-gray-900">{formData.investmentStrategy || "-"}</p>
            )}
            {isEditing && (
              <div className="text-right text-xs text-gray-500">{formData.investmentStrategy.length}/1000</div>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700">Odak Alanları</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {sectors.map((sector) => (
                <div
                  key={sector}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors text-center ${
                    formData.investmentFocus.includes(sector)
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-gray-300"
                  } ${!isEditing ? "cursor-default" : ""}`}
                  onClick={() => isEditing && handleFocusToggle(sector)}
                >
                  <p className="text-sm font-medium">{sector}</p>
                  {formData.investmentFocus.includes(sector) && (
                    <CheckCircle className="w-4 h-4 mx-auto mt-1 text-purple-600" />
                  )}
                </div>
              ))}
            </div>
            {formData.investmentFocus.length === 0 && !isEditing && (
              <p className="text-gray-500 text-center py-4">Henüz odak alanı seçimi yapılmamış</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Previous Investments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Önceki Yatırımlar
              </CardTitle>
              <CardDescription>Daha önce yaptığınız yatırımları ekleyin</CardDescription>
            </div>
            <Button onClick={handleAddInvestment} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Yatırım Ekle
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {investments.length > 0 ? (
            <div className="space-y-4">
              {investments.map((investment) => (
                <div key={investment.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{investment.companyName}</h3>
                        {getStatusBadge(investment.status)}
                        <Badge variant="secondary">{investment.sector}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span>{formatCurrency(investment.amount)}</span>
                        <span>{new Date(investment.date).toLocaleDateString("tr-TR")}</span>
                      </div>
                      {investment.description && <p className="text-sm text-gray-700">{investment.description}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button onClick={() => handleEditInvestment(investment)} variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteInvestment(investment.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Henüz yatırım eklenmemiş</p>
          )}
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Gizlilik Ayarları</CardTitle>
          <CardDescription>Profil görünürlük ayarlarınızı yönetin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Profili Herkese Açık Yap</p>
              <p className="text-sm text-gray-600">Profiliniz diğer yatırımcılar tarafından görülebilir</p>
            </div>
            {isEditing ? (
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleInputChange}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            ) : (
              <Badge className={formData.isPublic ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {formData.isPublic ? "Açık" : "Kapalı"}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Yatırımları Göster</p>
              <p className="text-sm text-gray-600">Önceki yatırımlarınız profilinizde görüntülensin</p>
            </div>
            {isEditing ? (
              <input
                type="checkbox"
                name="showInvestments"
                checked={formData.showInvestments}
                onChange={handleInputChange}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            ) : (
              <Badge className={formData.showInvestments ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                {formData.showInvestments ? "Gösteriliyor" : "Gizli"}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Investment Modal */}
      <Dialog open={isInvestmentModalOpen} onOpenChange={setIsInvestmentModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingInvestment ? "Yatırımı Düzenle" : "Yeni Yatırım Ekle"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Şirket Adı *</Label>
                <Input
                  value={investmentForm.companyName}
                  onChange={(e) => setInvestmentForm({ ...investmentForm, companyName: e.target.value })}
                  placeholder="Startup adı"
                />
              </div>

              <div className="space-y-2">
                <Label>Yatırım Miktarı (TL) *</Label>
                <Input
                  type="number"
                  value={investmentForm.amount}
                  onChange={(e) => setInvestmentForm({ ...investmentForm, amount: e.target.value })}
                  placeholder="50000"
                />
              </div>

              <div className="space-y-2">
                <Label>Yatırım Tarihi *</Label>
                <Input
                  type="date"
                  value={investmentForm.date}
                  onChange={(e) => setInvestmentForm({ ...investmentForm, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Sektör</Label>
                <Select
                  value={investmentForm.sector}
                  onValueChange={(value) => setInvestmentForm({ ...investmentForm, sector: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sektör seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Durum</Label>
                <Select
                  value={investmentForm.status}
                  onValueChange={(value: "active" | "exited" | "failed") =>
                    setInvestmentForm({ ...investmentForm, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {investmentStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Açıklama (Opsiyonel)</Label>
                <Textarea
                  value={investmentForm.description}
                  onChange={(e) => setInvestmentForm({ ...investmentForm, description: e.target.value })}
                  placeholder="Yatırım hakkında kısa açıklama..."
                  className="min-h-[80px]"
                />
              </div>
            </div>

            {errors.investment && <p className="text-red-500 text-sm">{errors.investment}</p>}

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsInvestmentModalOpen(false)}>
                İptal
              </Button>
              <Button onClick={handleSaveInvestment} className="bg-purple-600 hover:bg-purple-700">
                {editingInvestment ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{errors.general}</p>
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
