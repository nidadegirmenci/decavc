"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AccountPage() {
  const router = useRouter()

  useEffect(() => {
    // Default olarak login & security'ye yönlendir
    router.replace("/account/login-security")
  }, [router])

  return null
}
