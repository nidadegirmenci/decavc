"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Default olarak portfolio'ya yönlendir
    router.replace("/dashboard/portfolio")
  }, [router])

  return null
}
