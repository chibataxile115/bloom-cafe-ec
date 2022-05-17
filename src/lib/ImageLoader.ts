const ImageLoader = (src?: string, width?: number, quality?: number) => {
  const url = `${src}?w=${width}&q=${quality || 75}`
  return url
}

export default ImageLoader
