"use client"

import type React from "react"
import { Button } from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import FacebookIcon from "@mui/icons-material/Facebook"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

interface SocialLoginSectionProps {
  onGoogleLogin: () => void
  onFacebookLogin: () => void
  onLinkedInLogin: () => void
}

const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({ onGoogleLogin, onFacebookLogin, onLinkedInLogin }) => {
  return (
    <div>
      <Button variant="outlined" startIcon={<GoogleIcon />} onClick={onGoogleLogin} fullWidth sx={{ mb: 1 }}>
        Continue with Google
      </Button>
      <Button variant="outlined" startIcon={<FacebookIcon />} onClick={onFacebookLogin} fullWidth sx={{ mb: 1 }}>
        Continue with Facebook
      </Button>
      <Button variant="outlined" startIcon={<LinkedInIcon />} onClick={onLinkedInLogin} fullWidth sx={{ mb: 1 }}>
        Continue with LinkedIn
      </Button>
    </div>
  )
}

export default SocialLoginSection
