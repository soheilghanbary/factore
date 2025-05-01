'use client'
import { signIn } from '@/lib/api'
import { useState } from 'react'
import { GitHubIcon, GoogleIcon } from '../icons/socials'
import { Button } from '../ui/button'

type Props = {
  callbackURL?: string
}

export const OAuthButtons = ({ callbackURL }: Props) => {
  const [loading, setLoading] = useState({
    github: false,
    google: false,
  })

  const handleSignIn = async (provider: 'google' | 'github') => {
    setLoading((prev) => ({ ...prev, [provider]: true }))
    await signIn.social({ provider, callbackURL })
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="outline"
        disabled={loading.google}
        onClick={() => handleSignIn('google')}
      >
        <GoogleIcon />
        <span>Google</span>
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={loading.github}
        onClick={() => handleSignIn('github')}
      >
        <GitHubIcon />
        <span>GitHub</span>
      </Button>
    </div>
  )
}
