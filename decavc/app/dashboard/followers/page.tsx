"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, MessageCircle } from "lucide-react"

// Mock followers data
const followersData = {
  totalFollowers: 127,
  totalFollowing: 89,
  followers: [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      username: "@ahmetyilmaz",
      avatar: "https://i.pinimg.com/736x/1f/8e/0d/1f8e0d5f2a3a2a3b661c6eb2c470d0f4.jpg",
      followedDate: "2023-10-15",
      mutualConnections: 12,
      isFollowingBack: true,
    },
    {
      id: 2,
      name: "Zeynep Kaya",
      username: "@zeynepkaya",
      avatar: "https://i.pinimg.com/736x/0b/ec/6d/0bec6d810ecb85e8a81eb6bb2ba6ce63.jpg",
      followedDate: "2023-10-12",
      mutualConnections: 8,
      isFollowingBack: false,
    },
    {
      id: 3,
      name: "Mehmet Demir",
      username: "@mehmetdemir",
      avatar: "https://i.pinimg.com/736x/65/05/f5/6505f5357c55b9314cb74ae29f26d707.jpg",
      followedDate: "2023-10-10",
      mutualConnections: 15,
      isFollowingBack: true,
    },
    {
      id: 4,
      name: "Ayşe Özkan",
      username: "@ayseozkan",
      avatar: "https://i.pinimg.com/736x/89/73/02/89730203a385183fba17f44131a712ac.jpg",
      followedDate: "2023-10-08",
      mutualConnections: 6,
      isFollowingBack: false,
    },
    {
      id: 5,
      name: "Can Arslan",
      username: "@canarslan",
      avatar: "https://i.pinimg.com/736x/8e/59/9f/8e599f42152913f87c6f42c0f8883dad.jpg",
      followedDate: "2023-10-05",
      mutualConnections: 20,
      isFollowingBack: true,
    },
  ],
}

export default function FollowersPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const handleFollowBack = (userId: number) => {
    console.log(`Following back user ${userId}`)
    // Burada follow back işlemi yapılacak
  }

  const handleMessage = (userId: number) => {
    console.log(`Messaging user ${userId}`)
    // Burada mesaj gönderme işlemi yapılacak
  }

  return (
    <div className="space-y-6">
      {/* Followers Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Takipçiler</p>
                <p className="text-3xl font-bold text-blue-900">{followersData.totalFollowers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Takip Edilenler</p>
                <p className="text-3xl font-bold text-purple-900">{followersData.totalFollowing}</p>
              </div>
              <UserPlus className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Followers List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Takipçilerim</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {followersData.followers.map((follower) => (
              <div
                key={follower.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={follower.avatar || "/placeholder.svg"} alt={follower.name} />
                    <AvatarFallback className="bg-gradient-purple-pink text-white">
                      {follower.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{follower.name}</h3>
                    <p className="text-sm text-gray-600">{follower.username}</p>
                    <p className="text-xs text-gray-500">
                      {follower.mutualConnections} ortak bağlantı • {formatDate(follower.followedDate)} tarihinde takip
                      etti
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!follower.isFollowingBack && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFollowBack(follower.id)}
                      className="bg-white border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Takip Et
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMessage(follower.id)}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
