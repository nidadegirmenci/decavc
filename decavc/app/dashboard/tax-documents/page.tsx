"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, Eye, AlertCircle } from "lucide-react"

// Mock tax documents data
const taxDocumentsData = {
  totalDocuments: 8,
  pendingDocuments: 2,
  documents: [
    {
      id: 1,
      title: "2023 Yıllık Vergi Beyannamesi",
      type: "annual_tax_return",
      year: 2023,
      date: "2024-01-15",
      status: "available",
      size: "2.4 MB",
      format: "PDF",
      description: "2023 yılı yatırım gelirleri ve vergi kesintileri",
    },
    {
      id: 2,
      title: "Q3 2023 Çeyreklik Rapor",
      type: "quarterly_report",
      year: 2023,
      date: "2023-10-01",
      status: "available",
      size: "1.8 MB",
      format: "PDF",
      description: "Üçüncü çeyrek yatırım gelirleri raporu",
    },
    {
      id: 3,
      title: "TechFlow AI - Temettü Belgesi",
      type: "dividend_certificate",
      year: 2023,
      date: "2023-09-15",
      status: "available",
      size: "0.5 MB",
      format: "PDF",
      description: "TechFlow AI'dan alınan temettü belgesi",
    },
    {
      id: 4,
      title: "Q2 2023 Çeyreklik Rapor",
      type: "quarterly_report",
      year: 2023,
      date: "2023-07-01",
      status: "available",
      size: "1.6 MB",
      format: "PDF",
      description: "İkinci çeyrek yatırım gelirleri raporu",
    },
    {
      id: 5,
      title: "EcoGreen Solutions - Yatırım Sertifikası",
      type: "investment_certificate",
      year: 2023,
      date: "2023-06-20",
      status: "available",
      size: "0.8 MB",
      format: "PDF",
      description: "EcoGreen Solutions yatırım sertifikası",
    },
    {
      id: 6,
      title: "Q4 2023 Çeyreklik Rapor",
      type: "quarterly_report",
      year: 2023,
      date: "2024-01-01",
      status: "processing",
      size: "-",
      format: "PDF",
      description: "Dördüncü çeyrek raporu hazırlanıyor",
    },
    {
      id: 7,
      title: "2024 Ara Dönem Raporu",
      type: "interim_report",
      year: 2024,
      date: "2024-06-01",
      status: "pending",
      size: "-",
      format: "PDF",
      description: "2024 ara dönem raporu bekleniyor",
    },
  ],
}

export default function TaxDocumentsPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case "annual_tax_return":
        return "Yıllık Vergi Beyannamesi"
      case "quarterly_report":
        return "Çeyreklik Rapor"
      case "dividend_certificate":
        return "Temettü Belgesi"
      case "investment_certificate":
        return "Yatırım Sertifikası"
      case "interim_report":
        return "Ara Dönem Raporu"
      default:
        return "Belge"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Hazır"
      case "processing":
        return "İşleniyor"
      case "pending":
        return "Bekleniyor"
      default:
        return "Bilinmiyor"
    }
  }

  const handleDownload = (documentId: number) => {
    console.log(`Downloading document ${documentId}`)
    // Burada belge indirme işlemi yapılacak
  }

  const handlePreview = (documentId: number) => {
    console.log(`Previewing document ${documentId}`)
    // Burada belge önizleme işlemi yapılacak
  }

  const availableDocuments = taxDocumentsData.documents.filter((doc) => doc.status === "available")
  const processingDocuments = taxDocumentsData.documents.filter((doc) => doc.status === "processing")
  const pendingDocuments = taxDocumentsData.documents.filter((doc) => doc.status === "pending")

  return (
    <div className="space-y-6">
      {/* Tax Documents Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Toplam Belge</p>
                <p className="text-3xl font-bold text-blue-900">{taxDocumentsData.totalDocuments}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">İndirilebilir</p>
                <p className="text-3xl font-bold text-green-900">{availableDocuments.length}</p>
              </div>
              <Download className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">İşleniyor</p>
                <p className="text-3xl font-bold text-yellow-900">{processingDocuments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Bekleniyor</p>
                <p className="text-3xl font-bold text-orange-900">{pendingDocuments.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Önemli Bilgilendir</h3>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Vergi belgeleriniz otomatik olarak oluşturulmaktadır. Çeyreklik raporlar her çeyrek sonunda, yıllık
                beyannameler ise yıl sonunda hazırlanır. Belgelerinizi vergi dairesine sunmadan önce muhasebeci veya
                vergi danışmanınızla görüşmenizi öneririz.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Vergi Belgeleri</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxDocumentsData.documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{document.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{document.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{getDocumentTypeLabel(document.type)}</span>
                      <span>•</span>
                      <span>{formatDate(document.date)}</span>
                      {document.size !== "-" && (
                        <>
                          <span>•</span>
                          <span>{document.size}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(document.status)}>{getStatusLabel(document.status)}</Badge>
                  {document.status === "available" && (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreview(document.id)}
                        className="text-gray-600 hover:text-purple-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(document.id)}
                        className="bg-white border-gray-300 hover:bg-gray-50"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        İndir
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
