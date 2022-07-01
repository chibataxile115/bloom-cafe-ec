import React, { createContext, useContext, useEffect, useState } from 'react'
import type Liff from '@line/liff'

type UseLiff = {
  idToken?: string
  initialized: boolean
  isInClient: boolean
  loggedIn: boolean
  getNameWithLiffOpen?: () => string
  sendMessage?: (message: string) => void
  closeWindow?: () => void
  isExpire: () => boolean
  login?: () => void
  logout?: () => void
}
interface Props {
  children: React.ReactNode
}

export const LiffContext = createContext<typeof Liff>(undefined)

export const LiffProvider: React.FC<Props> = ({ children }) => {
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

  const getNameWithLiffOpen = () => {
    const liffOpenName = liff.getDecodedIDToken().name

    return liffOpenName
  }

  const sendMessage = (message: string) => {
    liff
      .sendMessages([
        {
          // メッセージを送信する
          type: 'text',
          text: message,
        },
      ])
      .then(() => {
        window.alert('注文を受け付けました。')
      })
      .catch((error) => {
        window.alert('送信に失敗しました: ' + error)
      })
  }

  return {
    idToken: liff.getIDToken(),
    initialized: true,
    isInClient: liff.isInClient(),
    loggedIn: liff.isLoggedIn(),
    getNameWithLiffOpen: getNameWithLiffOpen,
    sendMessage: sendMessage,
    closeWindow: liff.closeWindow,
    isExpire: isExpire,
    login: liff.login,
    logout: liff.logout,
  }
}
