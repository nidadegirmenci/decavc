"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, PieChart, Briefcase } from "lucide-react"

// Mock portfolio data
const portfolioData = {
  totalValue: 125000,
  totalInvested: 100000,
  totalReturn: 25000,
  returnPercentage: 25,
  investments: [
    {
      id: 1,
      companyName: "TechFlow AI",
      investedAmount: 25000,
      currentValue: 32000,
      shares: 250,
      investmentDate: "2023-06-15",
      status: "active",
      logo: "🤖",
    },
    {
      id: 2,
      companyName: "EcoGreen Solutions",
      investedAmount: 30000,
      currentValue: 35000,
      shares: 300,
      investmentDate: "2023-08-20",
      status: "active",
      logo: "🌱",
    },
    {
      id: 3,
      companyName: "HealthTech Pro",
      investedAmount: 20000,
      currentValue: 28000,
      shares: 200,
      investmentDate: "2023-09-10",
      status: "active",
      logo: "🏥",
    },
    {
      id: 4,
      companyName: "FinanceFlow",
      investedAmount: 25000,
      currentValue: 30000,
      shares: 250,
      investmentDate: "2023-10-05",
      status: "active",
      logo: "💳",
    },
  ],
}

export default function PortfolioPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Toplam Değer</p>
                <p className="text-2xl font-bold text-purple-900">{formatCurrency(portfolioData.totalValue)}</p>
              </div>
              <PieChart className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Yatırılan Tutar</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(portfolioData.totalInvested)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Toplam Getiri</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(portfolioData.totalReturn)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Getiri Oranı</p>
                <p className="text-2xl font-bold text-orange-900">%{portfolioData.returnPercentage}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5" />
            <span>Yatırımlarım</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioData.investments.map((investment) => {
              const returnAmount = investment.currentValue - investment.investedAmount
              const returnPercentage = ((returnAmount / investment.investedAmount) * 100).toFixed(1)
              const isPositive = returnAmount > 0

              return (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-purple-pink rounded-lg flex items-center justify-center text-xl">
                      {investment.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{investment.companyName}</h3>
                      <p className="text-sm text-gray-600">
                        {investment.shares} hisse • {formatDate(investment.investmentDate)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm text-gray-600">Yatırılan</p>
                        <p className="font-semibold">{formatCurrency(investment.investedAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Mevcut Değer</p>
                        <p className="font-semibold">{formatCurrency(investment.currentValue)}</p>
                      </div>
                      <div>
                        <Badge
                          variant={isPositive ? "default" : "destructive"}
                          className={`${
                            isPositive
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {isPositive ? "+" : ""}
                          {formatCurrency(returnAmount)} ({returnPercentage}%)
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
