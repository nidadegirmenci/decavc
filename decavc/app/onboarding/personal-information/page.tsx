"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, User, Calendar, MapPin, Hash } from "lucide-react"

export default function PersonalInformationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    legalName: "",
    birthday: "",
    country: "",
    city: "",
    district: "",
    address: "",
    postalCode: "",
    taxId: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const countries = [
    { value: "TR", label: "Türkiye" },
    { value: "US", label: "Amerika Birleşik Devletleri" },
    { value: "GB", label: "Birleşik Krallık" },
    { value: "DE", label: "Almanya" },
    { value: "FR", label: "Fransa" },
    { value: "IT", label: "İtalya" },
    { value: "ES", label: "İspanya" },
    { value: "NL", label: "Hollanda" },
    { value: "CA", label: "Kanada" },
    { value: "AU", label: "Avustralya" },
  ]

  const turkishCities = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkâri",
    "Hatay",
    "Isparta",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük",
    "Kilis",
    "Osmaniye",
    "Düzce",
  ]

  useEffect(() => {
    // Load existing data if available
    const user = localStorage.getItem("user")
    if (user) {
      const parsedUser = JSON.parse(user)
      if (parsedUser.onboardingData?.personalInformation) {
        setFormData(parsedUser.onboardingData.personalInformation)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.legalName.trim()) {
      newErrors.legalName = "Yasal ad soyad gereklidir"
    }

    if (!formData.birthday) {
      newErrors.birthday = "Doğum tarihi gereklidir"
    } else {
      const birthDate = new Date(formData.birthday)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 18) {
        newErrors.birthday = "18 yaşından küçük olamazsınız"
      }
    }

    if (!formData.country) {
      newErrors.country = "Ülke seçimi gereklidir"
    }

    if (!formData.city.trim()) {
      newErrors.city = "Şehir gereklidir"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Adres gereklidir"
    }

    if (formData.country === "TR" && formData.taxId) {
      if (formData.taxId.length !== 11) {
        newErrors.taxId = "TC Kimlik No 11 haneli olmalıdır"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage
      const user = localStorage.getItem("user")
      if (user) {
        const parsedUser = JSON.parse(user)
        const updatedUser = {
          ...parsedUser,
          onboardingData: {
            ...parsedUser.onboardingData,
            personalInformation: formData,
          },
        }
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }

      router.push("/onboarding/phone-verification")
    } catch (error) {
      console.error("Error saving personal information:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/signup")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Kişisel Bilgiler</CardTitle>
          <CardDescription>Yatırım hesabınız için kişisel bilgilerinizi girin</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              <div className="w-8 h-2 bg-purple-600 rounded-full"></div>
              <div className="w-8 h-2 bg-purple-600 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legal Name */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="legalName" className="text-gray-700">
                Yasal Ad Soyad *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="legalName"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleInputChange}
                  className={`pl-10 bg-white border-gray-300 ${errors.legalName ? "border-red-500" : ""}`}
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              {errors.legalName && <p className="text-red-500 text-sm">{errors.legalName}</p>}
            </div>

            {/* Birthday */}
            <div className="space-y-2">
              <Label htmlFor="birthday" className="text-gray-700">
                Doğum Tarihi *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className={`pl-10 bg-white border-gray-300 ${errors.birthday ? "border-red-500" : ""}`}
                />
              </div>
              {errors.birthday && <p className="text-red-500 text-sm">{errors.birthday}</p>}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label className="text-gray-700">Ülke *</Label>
              <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                <SelectTrigger className={`bg-white border-gray-300 ${errors.country ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Ülke seçin" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label className="text-gray-700">Şehir *</Label>
              {formData.country === "TR" ? (
                <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)}>
                  <SelectTrigger className={`bg-white border-gray-300 ${errors.city ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Şehir seçin" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {turkishCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`bg-white border-gray-300 ${errors.city ? "border-red-500" : ""}`}
                  placeholder="Şehir adı"
                />
              )}
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            {/* District */}
            <div className="space-y-2">
              <Label htmlFor="district" className="text-gray-700">
                İlçe
              </Label>
              <Input
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="bg-white border-gray-300"
                placeholder="İlçe adı"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="address" className="text-gray-700">
                Adres *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`pl-10 bg-white border-gray-300 ${errors.address ? "border-red-500" : ""}`}
                  placeholder="Mahalle, sokak, bina no"
                />
              </div>
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            {/* Postal Code */}
            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-gray-700">
                Posta Kodu
              </Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="bg-white border-gray-300"
                placeholder="34000"
              />
            </div>

            {/* Tax ID */}
            <div className="space-y-2">
              <Label htmlFor="taxId" className="text-gray-700">
                {formData.country === "TR" ? "TC Kimlik No" : "Vergi Kimlik No"}
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  className={`pl-10 bg-white border-gray-300 ${errors.taxId ? "border-red-500" : ""}`}
                  placeholder={formData.country === "TR" ? "12345678901" : "Vergi kimlik numarası"}
                  maxLength={formData.country === "TR" ? 11 : undefined}
                />
              </div>
              {errors.taxId && <p className="text-red-500 text-sm">{errors.taxId}</p>}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button onClick={handleBack} variant="outline" className="flex items-center bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 flex items-center"
            >
              {isLoading ? "Kaydediliyor..." : "Devam Et"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
