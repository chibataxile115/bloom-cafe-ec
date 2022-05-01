export const useCreateUniqueStr = (
  beforeJoinStr: string,
  delimiter: '-' | '_'
) => {
  // この文字列の中からランダム生成する
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  // 生成する文字数
  const N = 16
  const randomStr = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join('')

  const uniqueStr = beforeJoinStr + delimiter + randomStr

  return uniqueStr
}
