"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, TrendingUp, Play, VideoOff, Flame, Sparkles, Clock, Target } from "lucide-react"

interface BadgeInfo {
  text: string
  type: "trending" | "new" | "almost-funded" | "featured" | "urgent" | "hot"
}

interface StartupCardProps {
  id: number
  name: string
  description: string
  category: string
  fundingGoal: number
  currentFunding: number
  investorCount: number
  image: string
  location: string
  featured?: boolean
  hasVideo?: boolean
  videoUrl?: string
  badge?: BadgeInfo
}

export default function StartupCard({
  id,
  name,
  description,
  category,
  fundingGoal,
  currentFunding,
  investorCount,
  image,
  location,
  featured = false,
  hasVideo = false,
  videoUrl,
  badge,
}: StartupCardProps) {
  const [isImageHovered, setIsImageHovered] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const fundingPercentage = (currentFunding / fundingGoal) * 100

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const truncateDescription = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  // Badge stillerini belirle
  const getBadgeStyles = (type: string) => {
    switch (type) {
      case "trending":
        return {
          className: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0",
          icon: <Flame className="w-3 h-3 mr-1" />,
        }
      case "new":
        return {
          className: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0",
          icon: <Sparkles className="w-3 h-3 mr-1" />,
        }
      case "almost-funded":
        return {
          className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0",
          icon: <Target className="w-3 h-3 mr-1" />,
        }
      case "featured":
        return {
          className: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0",
          icon: <Sparkles className="w-3 h-3 mr-1" />,
        }
      case "urgent":
        return {
          className: "bg-gradient-to-r from-red-600 to-pink-600 text-white border-0 animate-pulse",
          icon: <Clock className="w-3 h-3 mr-1" />,
        }
      case "hot":
        return {
          className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0",
          icon: <Flame className="w-3 h-3 mr-1" />,
        }
      default:
        return {
          className: "bg-gradient-purple-pink text-white border-0",
          icon: <Sparkles className="w-3 h-3 mr-1" />,
        }
    }
  }

  // YouTube URL'ini embed formatına çevir
  const getEmbedUrl = (url: string) => {
    if (!url) return ""

    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    if (videoIdMatch) {
      const videoId = videoIdMatch[1]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`
    }

    return url
  }

  const handleCardClick = () => {
    if (!isVideoPlaying) {
      window.location.href = `/startup/${id}`
    }
  }

  const handleImageHover = (isHovering: boolean) => {
    setIsImageHovered(isHovering)
    if (hasVideo && videoUrl) {
      setIsVideoPlaying(isHovering)
    }
  }

  const badgeStyles = badge ? getBadgeStyles(badge.type) : null

  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-500 bg-white border border-gray-200 overflow-hidden cursor-pointer h-[480px] flex flex-col relative"
      onClick={handleCardClick}
    >
      {/* Dynamic Badge */}
      {badge && (
        <div
          className={`text-xs font-medium px-3 py-1 text-center flex items-center justify-center ${badgeStyles?.className}`}
        >
          {badgeStyles?.icon}
          {badge.text}
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="relative h-full w-full bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center"
          onMouseEnter={() => handleImageHover(true)}
          onMouseLeave={() => handleImageHover(false)}
        >
          {/* Video Player - Hover durumunda göster */}
          {isVideoPlaying && hasVideo && videoUrl ? (
            <iframe
              src={getEmbedUrl(videoUrl)}
              className="absolute inset-0 w-full h-full object-cover z-20"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: "none" }}
            />
          ) : (
            // Normal görsel
            <>
              {image ? (
                <Image
                  src={image || "/placeholder.svg"}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              ) : (
                <div className="text-6xl text-gray-400">🚀</div>
              )}
            </>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 right-3 z-30">
            <Badge variant="secondary" className="bg-white/95 text-gray-700 border border-gray-200 shadow-sm">
              {category}
            </Badge>
          </div>

          {/* Video Indicator */}
          {isImageHovered && !isVideoPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 z-10">
              {hasVideo ? (
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              ) : (
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                  <VideoOff className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-0 flex-1 flex flex-col relative">
        {/* Main Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                {name}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Hedef</span>
                <span className="font-semibold">{formatCurrency(fundingGoal)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Toplanan</span>
                <span className="font-semibold text-green-600">{formatCurrency(currentFunding)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                {investorCount} yatırımcı
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />%{fundingPercentage.toFixed(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Sliding Description Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent p-4 transform transition-transform duration-500 ease-out ${
            isImageHovered ? "-translate-y-16" : "translate-y-full"
          }`}
        >
          <p className="text-white text-sm leading-relaxed font-medium">{truncateDescription(description)}</p>
          {hasVideo && (
            <div className="flex items-center text-xs text-blue-300 mt-2">
              <Play className="w-3 h-3 mr-1" />
              Tanıtım videosu mevcut
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
