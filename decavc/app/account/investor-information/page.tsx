"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Edit,
  Save,
  X,
  User,
  Calendar,
  MapPin,
  Phone,
  Hash,
  FileText,
  Building,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export default function InvestorInformationPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [formData, setFormData] = useState({
    legalName: "",
    birthday: "",
    country: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    taxId: "",
    phoneNumber: "",
  })

  // Identity verification modal state
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false)
  const [identityForm, setIdentityForm] = useState({
    taxId: "",
    passportNumber: "",
    passportExpiry: "",
    passportCountry: "",
    documentType: "passport",
  })

  // Company information modal state
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    companyTaxId: "",
    companyAddress: "",
    companyCity: "",
    companyCountry: "",
    companyPhone: "",
    companyEmail: "",
    companyWebsite: "",
    companyType: "",
    foundedYear: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")

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

  const companyTypes = [
    { value: "limited", label: "Limited Şirket" },
    { value: "anonim", label: "Anonim Şirket" },
    { value: "kollektif", label: "Kollektif Şirket" },
    { value: "komandit", label: "Komandit Şirket" },
    { value: "cooperative", label: "Kooperatif" },
    { value: "other", label: "Diğer" },
  ]

  useEffect(() => {
    // Load user data
    const user = localStorage.getItem("user")
    if (user) {
      const parsedUser = JSON.parse(user)
      setUserData(parsedUser)

      // Populate form with existing data
      const personalInfo = parsedUser.personalInformation || parsedUser.onboardingData?.personalInformation || {}
      setFormData({
        legalName: personalInfo.legalName || "",
        birthday: personalInfo.birthday || "",
        country: personalInfo.country || "",
        address: personalInfo.address || "",
        city: personalInfo.city || "",
        district: personalInfo.district || "",
        postalCode: personalInfo.postalCode || "",
        taxId: personalInfo.taxId || "",
        phoneNumber: parsedUser.phoneNumber || "",
      })

      // Populate identity form
      if (parsedUser.identityVerification) {
        setIdentityForm(parsedUser.identityVerification)
      }

      // Populate company form
      if (parsedUser.companyInformation) {
        setCompanyForm(parsedUser.companyInformation)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user data in localStorage
      const updatedUser = {
        ...userData,
        personalInformation: {
          legalName: formData.legalName,
          birthday: formData.birthday,
          country: formData.country,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          postalCode: formData.postalCode,
          taxId: formData.taxId,
        },
        phoneNumber: formData.phoneNumber,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUserData(updatedUser)
      setIsEditing(false)
      setSuccessMessage("Bilgiler başarıyla güncellendi")
    } catch (error) {
      console.error("Error saving investor information:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form data
    const personalInfo = userData?.personalInformation || userData?.onboardingData?.personalInformation || {}
    setFormData({
      legalName: personalInfo.legalName || "",
      birthday: personalInfo.birthday || "",
      country: personalInfo.country || "",
      address: personalInfo.address || "",
      city: personalInfo.city || "",
      district: personalInfo.district || "",
      postalCode: personalInfo.postalCode || "",
      taxId: personalInfo.taxId || "",
      phoneNumber: userData?.phoneNumber || "",
    })
    setIsEditing(false)
  }

  const handleIdentitySubmit = async () => {
    setIsLoading(true)
    setErrors({})

    try {
      // Validate form
      const newErrors: Record<string, string> = {}

      if (!identityForm.taxId) {
        newErrors.taxId = "Vergi kimlik numarası gereklidir"
      }

      if (!identityForm.passportNumber) {
        newErrors.passportNumber = "Pasaport/Kimlik numarası gereklidir"
      }

      if (!identityForm.passportExpiry) {
        newErrors.passportExpiry = "Son kullanma tarihi gereklidir"
      }

      if (!identityForm.passportCountry) {
        newErrors.passportCountry = "Düzenleyen ülke gereklidir"
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user data
      const updatedUser = {
        ...userData,
        identityVerification: identityForm,
        identityVerified: true,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUserData(updatedUser)
      setSuccessMessage("Kimlik bilgileri başarıyla kaydedildi")
      setIsIdentityModalOpen(false)
    } catch (error) {
      setErrors({ general: "Kimlik bilgileri kaydedilirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompanySubmit = async () => {
    setIsLoading(true)
    setErrors({})

    try {
      // Validate form
      const newErrors: Record<string, string> = {}

      if (!companyForm.companyName) {
        newErrors.companyName = "Şirket adı gereklidir"
      }

      if (!companyForm.companyTaxId) {
        newErrors.companyTaxId = "Şirket vergi numarası gereklidir"
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user data
      const updatedUser = {
        ...userData,
        companyInformation: companyForm,
        hasCompany: true,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUserData(updatedUser)
      setSuccessMessage("Şirket bilgileri başarıyla kaydedildi")
      setIsCompanyModalOpen(false)
    } catch (error) {
      setErrors({ general: "Şirket bilgileri kaydedilirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR")
  }

  const getCountryLabel = (countryCode: string) => {
    const country = countries.find((c) => c.value === countryCode)
    return country ? country.label : countryCode
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
          <h1 className="text-2xl font-bold text-gray-900">Yatırımcı Bilgileri</h1>
          <p className="text-gray-600">Kişisel ve iletişim bilgilerinizi görüntüleyin ve düzenleyin</p>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Kişisel Bilgiler
          </CardTitle>
          <CardDescription>Yasal ve kimlik bilgileriniz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legal Name */}
            <div className="space-y-2">
              <Label className="text-gray-700">Yasal Ad Soyad</Label>
              {isEditing ? (
                <Input
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleInputChange}
                  className="bg-white border-gray-300"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.legalName || "-"}</p>
              )}
            </div>

            {/* Birthday */}
            <div className="space-y-2">
              <Label className="text-gray-700">Doğum Tarihi</Label>
              {isEditing ? (
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className="pl-10 bg-white border-gray-300"
                  />
                </div>
              ) : (
                <p className="text-gray-900 font-medium">{formatDate(formData.birthday)}</p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label className="text-gray-700">Ülke</Label>
              {isEditing ? (
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger className="bg-white border-gray-300">
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
              ) : (
                <p className="text-gray-900 font-medium">{getCountryLabel(formData.country)}</p>
              )}
            </div>

            {/* Tax ID */}
            <div className="space-y-2">
              <Label className="text-gray-700">{formData.country === "TR" ? "TC Kimlik No" : "Vergi Kimlik No"}</Label>
              {isEditing ? (
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    className="pl-10 bg-white border-gray-300"
                    maxLength={formData.country === "TR" ? 11 : undefined}
                  />
                </div>
              ) : (
                <p className="text-gray-900 font-medium">{formData.taxId || "-"}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Adres Bilgileri
          </CardTitle>
          <CardDescription>İkamet adresiniz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Address */}
            <div className="space-y-2">
              <Label className="text-gray-700">Adres</Label>
              {isEditing ? (
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="pl-10 bg-white border-gray-300"
                    placeholder="Mahalle, sokak, bina no"
                  />
                </div>
              ) : (
                <p className="text-gray-900 font-medium">{formData.address || "-"}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* City */}
              <div className="space-y-2">
                <Label className="text-gray-700">Şehir</Label>
                {isEditing ? (
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="bg-white border-gray-300"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.city || "-"}</p>
                )}
              </div>

              {/* District */}
              <div className="space-y-2">
                <Label className="text-gray-700">İlçe</Label>
                {isEditing ? (
                  <Input
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="bg-white border-gray-300"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.district || "-"}</p>
                )}
              </div>

              {/* Postal Code */}
              <div className="space-y-2">
                <Label className="text-gray-700">Posta Kodu</Label>
                {isEditing ? (
                  <Input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="bg-white border-gray-300"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.postalCode || "-"}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            İletişim Bilgileri
          </CardTitle>
          <CardDescription>Telefon ve e-posta bilgileriniz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div className="space-y-2">
              <Label className="text-gray-700">Telefon Numarası</Label>
              {isEditing ? (
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="pl-10 bg-white border-gray-300"
                  />
                </div>
              ) : (
                <p className="text-gray-900 font-medium">{formData.phoneNumber || "-"}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-gray-700">E-posta</Label>
              <p className="text-gray-900 font-medium">{userData.email}</p>
              <p className="text-xs text-gray-500">E-posta adresi değiştirilemez</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identity Verification Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Kimlik Doğrulama
              </CardTitle>
              <CardDescription>Kimlik belgelerinizi doğrulayın</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {userData.identityVerified ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Doğrulandı
                </Badge>
              ) : (
                <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Doğrulanmadı
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {userData.identityVerified
                ? "Kimlik bilgileriniz doğrulanmıştır."
                : "Yatırım yapabilmek için kimlik doğrulaması gereklidir."}
            </p>
            <Dialog open={isIdentityModalOpen} onOpenChange={setIsIdentityModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">{userData.identityVerified ? "Güncelle" : "Doğrula"}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Kimlik Doğrulama</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="space-y-2">
                    <Label>Vergi Kimlik No</Label>
                    <Input
                      value={identityForm.taxId}
                      onChange={(e) => setIdentityForm({ ...identityForm, taxId: e.target.value })}
                      placeholder="*encrypted*"
                      className={errors.taxId ? "border-red-500" : ""}
                    />
                    {errors.taxId && <p className="text-red-500 text-sm">{errors.taxId}</p>}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Pasaport / Kimlik</h3>

                    <div className="space-y-2">
                      <Label>Pasaport / Kimlik Numarası</Label>
                      <Input
                        value={identityForm.passportNumber}
                        onChange={(e) => setIdentityForm({ ...identityForm, passportNumber: e.target.value })}
                        placeholder="xxxxxxxx"
                        className={errors.passportNumber ? "border-red-500" : ""}
                      />
                      {errors.passportNumber && <p className="text-red-500 text-sm">{errors.passportNumber}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Son Kullanma Tarihi</Label>
                      <Input
                        type="date"
                        value={identityForm.passportExpiry}
                        onChange={(e) => setIdentityForm({ ...identityForm, passportExpiry: e.target.value })}
                        className={errors.passportExpiry ? "border-red-500" : ""}
                      />
                      {errors.passportExpiry && <p className="text-red-500 text-sm">{errors.passportExpiry}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Düzenleyen Ülke</Label>
                      <Select
                        value={identityForm.passportCountry}
                        onValueChange={(value) => setIdentityForm({ ...identityForm, passportCountry: value })}
                      >
                        <SelectTrigger className={errors.passportCountry ? "border-red-500" : ""}>
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
                      {errors.passportCountry && <p className="text-red-500 text-sm">{errors.passportCountry}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Belge Türü</Label>
                      <Select
                        value={identityForm.documentType}
                        onValueChange={(value) => setIdentityForm({ ...identityForm, documentType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="passport">Pasaport</SelectItem>
                          <SelectItem value="id">Kimlik Kartı</SelectItem>
                          <SelectItem value="driver">Ehliyet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsIdentityModalOpen(false)}>
                    CANCEL
                  </Button>
                  <Button onClick={handleIdentitySubmit} disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
                    {isLoading ? "Kaydediliyor..." : "SAVE"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Company Information Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Şirket Bilgileri
              </CardTitle>
              <CardDescription>Şirket bilgilerinizi ekleyin (isteğe bağlı)</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {userData.hasCompany ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Eklendi
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200">
                  Eklenmedi
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {userData.hasCompany
                ? "Şirket bilgileriniz sisteme eklenmiştir."
                : "Şirket adına yatırım yapmak istiyorsanız şirket bilgilerinizi ekleyebilirsiniz."}
            </p>
            <Dialog open={isCompanyModalOpen} onOpenChange={setIsCompanyModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">{userData.hasCompany ? "Güncelle" : "Ekle"}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Şirket Bilgileri</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Şirket Adı *</Label>
                      <Input
                        value={companyForm.companyName}
                        onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                        placeholder="ABC Teknoloji Ltd. Şti."
                        className={errors.companyName ? "border-red-500" : ""}
                      />
                      {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Vergi Numarası *</Label>
                      <Input
                        value={companyForm.companyTaxId}
                        onChange={(e) => setCompanyForm({ ...companyForm, companyTaxId: e.target.value })}
                        placeholder="1234567890"
                        className={errors.companyTaxId ? "border-red-500" : ""}
                      />
                      {errors.companyTaxId && <p className="text-red-500 text-sm">{errors.companyTaxId}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Şirket Türü</Label>
                      <Select
                        value={companyForm.companyType}
                        onValueChange={(value) => setCompanyForm({ ...companyForm, companyType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Şirket türü seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {companyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Kuruluş Yılı</Label>
                      <Input
                        type="number"
                        value={companyForm.foundedYear}
                        onChange={(e) => setCompanyForm({ ...companyForm, foundedYear: e.target.value })}
                        placeholder="2020"
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label>Şirket Adresi</Label>
                      <Input
                        value={companyForm.companyAddress}
                        onChange={(e) => setCompanyForm({ ...companyForm, companyAddress: e.target.value })}
                        placeholder="Şirket merkez adresi"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Şehir</Label>
                      <Input
                        value={companyForm.companyCity}
                        onChange={(e) => setCompanyForm({ ...companyForm, companyCity: e.target.value })}
                        placeholder="İstanbul"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Ülke</Label>
                      <Select
                        value={companyForm.companyCountry}
                        onValueChange={(value) => setCompanyForm({ ...companyForm, companyCountry: value })}
                      >
                        <SelectTrigger>
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
                    </div>

                    <div className="space-y-2">
                      <Label>Şirket Telefonu</Label>
                      <Input
                        value={companyForm.companyPhone}
                        onChange={(e) => setCompanyForm({ ...companyForm, companyPhone: e.target.value })}
                        placeholder="+90 212 123 45 67"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Şirket E-postası</Label>
                      <Input
                        type="email"
                        value={companyForm.companyEmail}
                        onChange={(e) => setCompanyForm({ ...companyForm, companyEmail: e.target.value })}
                        placeholder="info@sirket.com"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label>Web Sitesi</Label>
                      <Input
                        value={companyForm.companyWebsite}
                        onChange={(e) => setCompanyForm({ ...companyForm, companyWebsite: e.target.value })}
                        placeholder="https://www.sirket.com"
                      />
                    </div>
                  </div>

                  {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsCompanyModalOpen(false)}>
                      İptal
                    </Button>
                    <Button
                      onClick={handleCompanySubmit}
                      disabled={isLoading}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isLoading ? "Kaydediliyor..." : "Kaydet"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

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
