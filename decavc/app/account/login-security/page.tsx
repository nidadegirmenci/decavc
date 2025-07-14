"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, AlertTriangle, CheckCircle } from "lucide-react"

export default function LoginSecurityPage() {
  const [userData, setUserData] = useState<any>(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Email form state
  const [emailForm, setEmailForm] = useState({
    newEmail: "",
    password: "",
  })

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // Phone form state
  const [phoneForm, setPhoneForm] = useState({
    newPhone: "",
    password: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    // Load user data
    const user = localStorage.getItem("user")
    if (user) {
      setUserData(JSON.parse(user))
    }
  }, [])

  const resetForms = () => {
    setEmailForm({ newEmail: "", password: "" })
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setPhoneForm({ newPhone: "", password: "" })
    setErrors({})
    setSuccessMessage("")
  }

  const handleEmailUpdate = async () => {
    setIsLoading(true)
    setErrors({})

    try {
      // Validate form
      const newErrors: Record<string, string> = {}

      if (!emailForm.newEmail) {
        newErrors.newEmail = "Yeni e-posta adresi gereklidir"
      } else if (!/\S+@\S+\.\S+/.test(emailForm.newEmail)) {
        newErrors.newEmail = "Geçerli bir e-posta adresi girin"
      }

      if (!emailForm.password) {
        newErrors.password = "Mevcut şifre gereklidir"
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user data
      const updatedUser = {
        ...userData,
        email: emailForm.newEmail,
        emailVerified: false, // Reset verification status
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUserData(updatedUser)
      setSuccessMessage("E-posta adresi başarıyla güncellendi")
      setIsEmailModalOpen(false)
      resetForms()
    } catch (error) {
      setErrors({ general: "E-posta güncellenirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    setIsLoading(true)
    setErrors({})

    try {
      // Validate form
      const newErrors: Record<string, string> = {}

      if (!passwordForm.currentPassword) {
        newErrors.currentPassword = "Mevcut şifre gereklidir"
      }

      if (!passwordForm.newPassword) {
        newErrors.newPassword = "Yeni şifre gereklidir"
      } else if (passwordForm.newPassword.length < 6) {
        newErrors.newPassword = "Şifre en az 6 karakter olmalıdır"
      }

      if (!passwordForm.confirmPassword) {
        newErrors.confirmPassword = "Şifre onayı gereklidir"
      } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        newErrors.confirmPassword = "Şifreler eşleşmiyor"
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccessMessage("Şifre başarıyla güncellendi")
      setIsPasswordModalOpen(false)
      resetForms()
    } catch (error) {
      setErrors({ general: "Şifre güncellenirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneUpdate = async () => {
    setIsLoading(true)
    setErrors({})

    try {
      // Validate form
      const newErrors: Record<string, string> = {}

      if (!phoneForm.newPhone) {
        newErrors.newPhone = "Yeni telefon numarası gereklidir"
      }

      if (!phoneForm.password) {
        newErrors.password = "Mevcut şifre gereklidir"
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user data
      const updatedUser = {
        ...userData,
        phoneNumber: phoneForm.newPhone,
        phoneVerified: false, // Reset verification status
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUserData(updatedUser)
      setSuccessMessage("Telefon numarası başarıyla güncellendi")
      setIsPhoneModalOpen(false)
      resetForms()
    } catch (error) {
      setErrors({ general: "Telefon numarası güncellenirken hata oluştu" })
    } finally {
      setIsLoading(false)
    }
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Login & Security</h1>
        <p className="text-gray-600">Giriş ve güvenlik ayarlarınızı yönetin</p>
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
        <CardContent className="p-6 space-y-6">
          {/* Email Section */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium w-20">Email</span>
              {!userData.emailVerified && (
                <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Please verify
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-900">{userData.email}</span>
              <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-teal-600 hover:text-teal-700 p-0">
                    Update
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>E-posta Adresini Güncelle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newEmail">Yeni E-posta Adresi</Label>
                      <Input
                        id="newEmail"
                        type="email"
                        value={emailForm.newEmail}
                        onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                        placeholder="yeni@email.com"
                        className={errors.newEmail ? "border-red-500" : ""}
                      />
                      {errors.newEmail && <p className="text-red-500 text-sm">{errors.newEmail}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailPassword">Mevcut Şifre</Label>
                      <Input
                        id="emailPassword"
                        type="password"
                        value={emailForm.password}
                        onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                        placeholder="Mevcut şifreniz"
                        className={errors.password ? "border-red-500" : ""}
                      />
                      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>
                        İptal
                      </Button>
                      <Button onClick={handleEmailUpdate} disabled={isLoading}>
                        {isLoading ? "Güncelleniyor..." : "Güncelle"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Password Section */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium w-20">Password</span>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-teal-600 hover:text-teal-700 p-0">
                    Reset
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Şifreyi Sıfırla</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          placeholder="Mevcut şifreniz"
                          className={errors.currentPassword ? "border-red-500" : ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        >
                          {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Yeni Şifre</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          placeholder="Yeni şifreniz"
                          className={errors.newPassword ? "border-red-500" : ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        >
                          {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Yeni Şifre Onayı</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          placeholder="Yeni şifrenizi tekrar girin"
                          className={errors.confirmPassword ? "border-red-500" : ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        >
                          {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsPasswordModalOpen(false)}>
                        İptal
                      </Button>
                      <Button onClick={handlePasswordReset} disabled={isLoading}>
                        {isLoading ? "Güncelleniyor..." : "Güncelle"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Phone Section */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium w-20">Phone</span>
              {!userData.phoneVerified && (
                <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Please verify
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-900">{userData.phoneNumber || "Telefon numarası eklenmemiş"}</span>
              <Dialog open={isPhoneModalOpen} onOpenChange={setIsPhoneModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-teal-600 hover:text-teal-700 p-0">
                    Update
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Telefon Numarasını Güncelle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPhone">Yeni Telefon Numarası</Label>
                      <Input
                        id="newPhone"
                        type="tel"
                        value={phoneForm.newPhone}
                        onChange={(e) => setPhoneForm({ ...phoneForm, newPhone: e.target.value })}
                        placeholder="+90 555 123 45 67"
                        className={errors.newPhone ? "border-red-500" : ""}
                      />
                      {errors.newPhone && <p className="text-red-500 text-sm">{errors.newPhone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phonePassword">Mevcut Şifre</Label>
                      <Input
                        id="phonePassword"
                        type="password"
                        value={phoneForm.password}
                        onChange={(e) => setPhoneForm({ ...phoneForm, password: e.target.value })}
                        placeholder="Mevcut şifreniz"
                        className={errors.password ? "border-red-500" : ""}
                      />
                      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsPhoneModalOpen(false)}>
                        İptal
                      </Button>
                      <Button onClick={handlePhoneUpdate} disabled={isLoading}>
                        {isLoading ? "Güncelleniyor..." : "Güncelle"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
