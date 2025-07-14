"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Plus, Minus, CreditCard, ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react"

// Mock cash data
const cashData = {
  availableBalance: 45000,
  totalDeposited: 150000,
  totalWithdrawn: 25000,
  pendingTransactions: 2,
  transactions: [
    {
      id: 1,
      type: "deposit",
      amount: 10000,
      description: "Banka Havalesi",
      date: "2023-10-15",
      status: "completed",
      method: "bank_transfer",
    },
    {
      id: 2,
      type: "investment",
      amount: -25000,
      description: "TechFlow AI'ya Yatırım",
      date: "2023-10-12",
      status: "completed",
      method: "investment",
    },
    {
      id: 3,
      type: "deposit",
      amount: 15000,
      description: "Kredi Kartı",
      date: "2023-10-10",
      status: "completed",
      method: "credit_card",
    },
    {
      id: 4,
      type: "withdrawal",
      amount: -5000,
      description: "Banka Hesabına Çekim",
      date: "2023-10-08",
      status: "pending",
      method: "bank_transfer",
    },
    {
      id: 5,
      type: "investment",
      amount: -20000,
      description: "EcoGreen Solutions'a Yatırım",
      date: "2023-10-05",
      status: "completed",
      method: "investment",
    },
  ],
}

export default function CashPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-600" />
      case "investment":
        return <ArrowUpRight className="w-4 h-4 text-purple-600" />
      default:
        return <Wallet className="w-4 h-4 text-gray-600" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "text-green-600"
      case "withdrawal":
        return "text-red-600"
      case "investment":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı"
      case "pending":
        return "Beklemede"
      case "failed":
        return "Başarısız"
      default:
        return "Bilinmiyor"
    }
  }

  const getMethodLabel = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return "Banka Havalesi"
      case "credit_card":
        return "Kredi Kartı"
      case "investment":
        return "Yatırım"
      default:
        return "Diğer"
    }
  }

  const handleDeposit = () => {
    console.log("Opening deposit modal")
    // Burada para yatırma modalı açılacak
  }

  const handleWithdraw = () => {
    console.log("Opening withdrawal modal")
    // Burada para çekme modalı açılacak
  }

  return (
    <div className="space-y-6">
      {/* Cash Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Kullanılabilir Bakiye</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(cashData.availableBalance)}</p>
              </div>
              <Wallet className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Toplam Yatırılan</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(cashData.totalDeposited)}</p>
              </div>
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Toplam Çekilen</p>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(cashData.totalWithdrawn)}</p>
              </div>
              <Minus className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Bekleyen İşlemler</p>
                <p className="text-2xl font-bold text-orange-900">{cashData.pendingTransactions}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              onClick={handleDeposit}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white border-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              Para Yatır
            </Button>
            <Button onClick={handleWithdraw} variant="outline" className="bg-white border-gray-300">
              <Minus className="w-4 h-4 mr-2" />
              Para Çek
            </Button>
            <Button variant="outline" className="bg-white border-gray-300">
              <CreditCard className="w-4 h-4 mr-2" />
              Kart Ekle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="w-5 h-5" />
            <span>İşlem Geçmişi</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cashData.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600">{getMethodLabel(transaction.method)}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-semibold text-lg ${getTransactionColor(transaction.type)}`}>
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </div>
                  <Badge className={getStatusColor(transaction.status)}>{getStatusLabel(transaction.status)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
