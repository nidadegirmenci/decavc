"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EntrepreneurPage() {
  const router = useRouter()

  useEffect(() => {
    // Always redirect to overview - this is now the main page
    router.replace("/entrepreneur/overview")
  }, [router])

  return null
}
