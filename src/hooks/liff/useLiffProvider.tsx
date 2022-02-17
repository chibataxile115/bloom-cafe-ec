import React, { createContext, useContext, useEffect, useState } from 'react'
import type Liff from '@line/liff'

type UseLiff = {
  idToken?: string
  initialized: boolean
  isInClient: boolean
  loggedIn: boolean
  closeWindow?: () => void
  isExpire: () => boolean
  login?: () => void
  logout?: () => void
}

export const LiffContext = createContext<typeof Liff>(undefined)

export const LiffProvider: React.FC = ({ children }) => {
  const [liff, setLiff] = useState<typeof Liff>(undefined)

  useEffect(() => {
    ;(async () => {
      const liff = (await import('@line/liff')).default
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
      setLiff(liff)
    })()
  }, [liff])

  return <LiffContext.Provider value={liff}>{children}</LiffContext.Provider>
}

export const useLiff = (): UseLiff => {
  const liff = useContext(LiffContext)
  if (!liff) {
    return {
      initialized: false,
      isInClient: false,
      loggedIn: false,
      isExpire: () => false,
    }
  }

  const isExpire = (): boolean => {
    if (!liff.isLoggedIn()) {
      return false
    }

    const expirationTime = liff.getDecodedIDToken().exp
    return expirationTime < Date.now() / 1000
  }

  return {
    idToken: liff.getIDToken(),
    initialized: true,
    isInClient: liff.isInClient(),
    loggedIn: liff.isLoggedIn(),
    // closeWindow: liff.closeWindow,
    isExpire: isExpire,
    login: liff.login,
    logout: liff.logout,
  }
}
