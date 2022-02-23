import Link from 'next/link';


const ImageGallery= () => {
  return(
    <div className="text-center text-black flex flex-wrap">
      <Link href="/cart"> 
        <div className="mr-14">  
          <img src="/blt-sand.jpg"width="100"></img>
          bltサンド1
        </div>
      </Link> 
      <Link href="/cart"> 
        <div className="ml-12">
          <img src="/blt-sand.jpg"width="100"height="100"></img>
          bltサンド2
        </div>
      </Link>  
      <Link href="/cart"> 
        <div className="mr-14">
          <img src="/blt-sand.jpg"width="100" ></img>
          bltサンド3
        </div>
      </Link>
      <Link href="/cart">   
        <div className="ml-12">
          <img src="/blt-sand.jpg"width="100" ></img>
          bltサンド4
        </div>
      </Link>
      </div>
  )
}

export default ImageGallery

//  mt-3 flex w-full justify-start pt-3