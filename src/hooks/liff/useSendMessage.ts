import liff from '@line/liff' // 追加

export const useSendMessage = () => {
  liff
    // .init({ liffId: process.env.REACT_APP_LIFF_ID as string }) // LIFF IDをセットする
    .init({ liffId: process.env.REACT_APP_LIFF_ID as string }) // LIFF IDをセットする
    .then(() => {
      if (!liff.isLoggedIn()) {
        // ログインしていなければ最初にログインする
        liff.login({})
      } else if (liff.isInClient()) {
        // LIFFので動いているのであれば
        liff
          .sendMessages([
            {
              // メッセージを送信する
              type: 'text',
              text: "You've successfully sent a message! Hooray!",
            },
          ])
          .then(function () {
            window.alert('Message sent')
          })
          .catch(function (error) {
            window.alert('Error sending message: ' + error)
          })
      }
    })
}
