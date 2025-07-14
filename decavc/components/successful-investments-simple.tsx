"use client"

import { Card, CardContent } from "@/components/ui/card"

const investments = [
  { id: 1, name: "TechFlow AI", amount: "₺2,450,000", investors: 127 },
  { id: 2, name: "EcoGreen", amount: "₺1,890,000", investors: 89 },
  { id: 3, name: "HealthTech", amount: "₺3,200,000", investors: 156 },
]

export default function SuccessfulInvestments() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-50 rounded-lg">
      <div className="flex space-x-4 h-full p-4">
        {/* Sol Kolon */}
        <div className="flex-1 space-y-4">
          {investments.map((investment) => (
            <Card key={investment.id} className="bg-white shadow-md">
              <CardContent className="p-4">
                <h3 className="font-bold text-sm">{investment.name}</h3>
                <p className="text-lg font-bold text-green-600">{investment.amount}</p>
                <p className="text-xs text-gray-500">{investment.investors} investors</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sağ Kolon */}
        <div className="flex-1 space-y-4">
          {investments
            .slice()
            .reverse()
            .map((investment) => (
              <Card key={`right-${investment.id}`} className="bg-white shadow-md">
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm">{investment.name}</h3>
                  <p className="text-lg font-bold text-green-600">{investment.amount}</p>
                  <p className="text-xs text-gray-500">{investment.investors} investors</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
