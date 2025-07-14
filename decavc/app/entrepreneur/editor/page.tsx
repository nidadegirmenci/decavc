"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Upload, Plus, X, Linkedin, Instagram, Youtube, Facebook, Globe, Twitter } from "lucide-react"

const sectors = [
  "Teknoloji",
  "E-ticaret",
  "Fintech",
  "Sağlık",
  "Eğitim",
  "Oyun",
  "Medya",
  "Tarım",
  "Enerji",
  "Ulaşım",
  "Diğer",
]

const stages = [
  { value: "idea", label: "Fikir Aşaması" },
  { value: "prototype", label: "Prototip" },
  { value: "mvp", label: "MVP" },
  { value: "early-revenue", label: "Erken Gelir" },
  { value: "growth", label: "Büyüme" },
  { value: "expansion", label: "Genişleme" },
]

export default function CampaignEditorPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [campaign, setCampaign] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState("basics")

  // Form data
  const [formData, setFormData] = useState({
    // Basic Info
    companyName: "",
    tagline: "",
    description: "",
    sector: "",
    stage: "",
    fundingGoal: "",

    // Media
    mainImage: "",
    logo: "",
    videoUrl: "",

    // Company Details
    companyHQ: "",
    website: "",

    // Social Media
    linkedin: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    facebook: "",
    twitter: "",

    // Attachments
    attachments: [] as string[],
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser)

        // Load existing campaign or create new one
        if (parsedUser.campaign) {
          setCampaign(parsedUser.campaign)
          // Load campaign data into form
          setFormData({
            companyName: parsedUser.campaign.name || "",
            tagline: parsedUser.campaign.basics?.tagline || "",
            description: parsedUser.campaign.description || "",
            sector: parsedUser.campaign.sector || "",
            stage: parsedUser.campaign.stage || "",
            fundingGoal: parsedUser.campaign.fundingGoal?.toString() || "",

            // Media
            mainImage: parsedUser.campaign.basics?.mainImage || "",
            logo: parsedUser.campaign.basics?.logo || "",
            videoUrl: parsedUser.campaign.basics?.videoUrl || "",

            // Company Details
            companyHQ: parsedUser.campaign.basics?.companyHQ || "",
            website: parsedUser.campaign.basics?.website || "",

            // Social Media
            linkedin: parsedUser.campaign.basics?.linkedin || "",
            instagram: parsedUser.campaign.basics?.instagram || "",
            tiktok: parsedUser.campaign.basics?.tiktok || "",
            youtube: parsedUser.campaign.basics?.youtube || "",
            facebook: parsedUser.campaign.basics?.facebook || "",
            twitter: parsedUser.campaign.basics?.twitter || "",

            // Attachments
            attachments: parsedUser.campaign.basics?.attachments || [],
          })
        } else {
          // Create new campaign
          const newCampaign = {
            id: Date.now().toString(),
            name: "Yeni Kampanya",
            description: "",
            sector: "",
            stage: "",
            fundingGoal: 0,
            createdAt: new Date().toISOString(),
            published: false,
            status: "draft",
            basics: {},
          }
          setCampaign(newCampaign)
        }
      } else {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      const updatedCampaign = {
        ...campaign,
        name: formData.companyName || "Yeni Kampanya",
        description: formData.description,
        sector: formData.sector,
        stage: formData.stage,
        fundingGoal: Number.parseInt(formData.fundingGoal) || 0,
        basics: {
          tagline: formData.tagline,
          mainImage: formData.mainImage,
          logo: formData.logo,
          videoUrl: formData.videoUrl,
          companyHQ: formData.companyHQ,
          website: formData.website,
          linkedin: formData.linkedin,
          instagram: formData.instagram,
          tiktok: formData.tiktok,
          youtube: formData.youtube,
          facebook: formData.facebook,
          twitter: formData.twitter,
          attachments: formData.attachments,
        },
      }

      // Update user data
      const updatedUser = {
        ...user,
        campaign: updatedCampaign,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setCampaign(updatedCampaign)

      // Show success message (you could add a toast here)
      console.log("Campaign saved successfully")
    } catch (error) {
      console.error("Error saving campaign:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (type: "mainImage" | "logo" | "attachment") => {
    // Simulate file upload
    const fileUrl = `/placeholder.svg?height=200&width=300`

    if (type === "attachment") {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, fileUrl],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [type]: fileUrl,
      }))
    }
  }

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  if (!user || !campaign) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.push("/entrepreneur/overview")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Genel Bakışa Dön
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{formData.companyName || "Yeni Kampanya"} Düzenle</h1>
            <div className="flex items-center space-x-4 mt-1">
              <Button variant="outline" size="sm" disabled>
                Kampanyayı Görüntüle
              </Button>
              <span className="text-sm text-blue-600">İpuçları & Püf Noktaları</span>
            </div>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="bg-gray-600 hover:bg-gray-700">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Değişiklikleri Kaydet
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-6">
            {/* Part 1: The Pitch */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Bölüm 1: Sunum</h3>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSection("basics")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "basics" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Temel Bilgiler
                </button>
                <button
                  onClick={() => setActiveSection("highlights")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "highlights" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Öne Çıkanlar
                </button>
                <button
                  onClick={() => setActiveSection("team")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "team" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Takım
                </button>
                <button
                  onClick={() => setActiveSection("pitch")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "pitch" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Sunum
                </button>
                <button
                  onClick={() => setActiveSection("investors")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "investors" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Öne Çıkan Yatırımcılar
                </button>
              </nav>
            </div>

            {/* Part 2: The Terms */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Bölüm 2: Şartlar</h3>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSection("contract")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "contract" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Sözleşme
                </button>
                <button
                  onClick={() => setActiveSection("perks")}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "perks" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Avantajlar
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Basics Section */}
            {activeSection === "basics" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Temel Bilgiler</h2>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">Şirket Adı</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Şirketinizin adını girin"
                  />
                </div>

                {/* Tagline */}
                <div className="space-y-2">
                  <Label htmlFor="tagline">Slogan</Label>
                  <div className="relative">
                    <Textarea
                      id="tagline"
                      value={formData.tagline}
                      onChange={(e) => handleInputChange("tagline", e.target.value)}
                      placeholder="Şirketinizi özetleyen kısa bir slogan"
                      maxLength={100}
                      rows={2}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400">{formData.tagline.length}/100</div>
                  </div>
                </div>

                {/* Main Image */}
                <div className="space-y-2">
                  <Label>Ana Görsel</Label>
                  <p className="text-sm text-gray-600 mb-3">
                    Ürününüzü kullanıcılarınız veya kurucularınızla birlikte göstermenizi öneririz.{" "}
                    <span className="text-blue-600 cursor-pointer">ana görsel ipuçlarını</span> okuyun.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    {formData.mainImage ? (
                      <div className="space-y-4">
                        <img
                          src={formData.mainImage || "/placeholder.svg"}
                          alt="Ana görsel"
                          className="mx-auto max-h-48 rounded-lg"
                        />
                        <Button variant="outline" onClick={() => handleFileUpload("mainImage")}>
                          Görseli Değiştir
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-gray-500">
                          <Upload className="w-12 h-12 mx-auto mb-2" />
                          <p className="font-medium">Kapak fotoğrafı yükle</p>
                        </div>
                        <Button variant="outline" onClick={() => handleFileUpload("mainImage")}>
                          Dosyalara Gözat
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Video */}
                <div className="space-y-2">
                  <Label>Video</Label>
                  <p className="text-sm text-gray-600 mb-3">
                    Yatırımcılarla insan bağlantısı kurun, onlara canlı sunum yapıyormuş gibi davranın.{" "}
                    <span className="text-blue-600 cursor-pointer">video ipuçlarını</span> okuyun.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    {formData.videoUrl ? (
                      <div className="space-y-4">
                        <div className="bg-gray-100 rounded-lg p-4">
                          <p className="text-sm text-gray-600">Video yüklendi</p>
                        </div>
                        <Button variant="outline" onClick={() => handleFileUpload("mainImage")}>
                          Videoyu Değiştir
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-gray-500">
                          <Upload className="w-12 h-12 mx-auto mb-2" />
                          <p className="font-medium">Video yükle</p>
                          <p className="text-sm">.mp4 - Maksimum boyut 300MB</p>
                        </div>
                        <Button variant="outline" onClick={() => handleInputChange("videoUrl", "uploaded")}>
                          Dosyalara Gözat
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Logo */}
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    {formData.logo ? (
                      <div className="space-y-4">
                        <img src={formData.logo || "/placeholder.svg"} alt="Logo" className="mx-auto max-h-24" />
                        <Button variant="outline" onClick={() => handleFileUpload("logo")}>
                          Logoyu Değiştir
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-gray-500">
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <p className="font-medium">Logo yükle</p>
                        </div>
                        <Button variant="outline" onClick={() => handleFileUpload("logo")}>
                          Dosyalara Gözat
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Attachments */}
                <div className="space-y-2">
                  <Label>Ekler</Label>
                  <div className="space-y-3">
                    {formData.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <span className="text-sm text-gray-600">Dosya {index + 1}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => handleFileUpload("attachment")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Dosya Yükle
                    </Button>
                  </div>
                </div>

                {/* Company HQ */}
                <div className="space-y-2">
                  <Label>Şirket Merkezi</Label>
                  <Input
                    value={formData.companyHQ}
                    onChange={(e) => handleInputChange("companyHQ", e.target.value)}
                    placeholder="Şehir, Ülke"
                  />
                  <p className="text-sm text-orange-600">
                    Şu anda Türkiye'de kurulmuş şirketleri destekliyoruz. Profilinizi tamamlayın ve umarız yakında sizin
                    bölgenizdeki şirketleri de destekleyebiliriz!
                  </p>
                </div>

                {/* Links */}
                <div className="space-y-4">
                  <Label>Bağlantılar</Label>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm">
                      Website
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://sirketiniz.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="text-sm">
                      X (Eski Twitter)
                    </Label>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) => handleInputChange("twitter", e.target.value)}
                        placeholder="https://x.com/sirketiniz"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-sm">
                      LinkedIn
                    </Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                        placeholder="https://linkedin.com/company/sirketiniz"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-sm">
                      Instagram
                    </Label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) => handleInputChange("instagram", e.target.value)}
                        placeholder="https://instagram.com/sirketiniz"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="text-sm">
                      YouTube
                    </Label>
                    <div className="relative">
                      <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="youtube"
                        value={formData.youtube}
                        onChange={(e) => handleInputChange("youtube", e.target.value)}
                        placeholder="https://youtube.com/@sirketiniz"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="text-sm">
                      Facebook
                    </Label>
                    <div className="relative">
                      <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="facebook"
                        value={formData.facebook}
                        onChange={(e) => handleInputChange("facebook", e.target.value)}
                        placeholder="https://facebook.com/sirketiniz"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Basic Company Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sektör</Label>
                    <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
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

                  <div className="space-y-2">
                    <Label htmlFor="stage">Şirket Aşaması</Label>
                    <Select value={formData.stage} onValueChange={(value) => handleInputChange("stage", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Aşama seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {stages.map((stage) => (
                          <SelectItem key={stage.value} value={stage.value}>
                            {stage.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fundingGoal">Hedef Fon Miktarı (₺)</Label>
                  <Input
                    id="fundingGoal"
                    type="number"
                    value={formData.fundingGoal}
                    onChange={(e) => handleInputChange("fundingGoal", e.target.value)}
                    placeholder="500000"
                    min="50000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Şirket Açıklaması</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Şirketinizin ne yaptığını detaylı olarak açıklayın..."
                    rows={6}
                  />
                </div>
              </div>
            )}

            {/* Other sections placeholder */}
            {activeSection !== "basics" && (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {activeSection === "highlights" && "Öne Çıkanlar"}
                  {activeSection === "team" && "Takım"}
                  {activeSection === "pitch" && "Sunum"}
                  {activeSection === "investors" && "Öne Çıkan Yatırımcılar"}
                  {activeSection === "contract" && "Sözleşme"}
                  {activeSection === "perks" && "Avantajlar"}
                </h2>
                <p className="text-gray-600">Bu bölüm yakında eklenecek.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
