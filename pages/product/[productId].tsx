import Head from 'next/head'
import  { useRouter } from 'next/router'
import { getOneProduct } from "../../firebase/customerActions"
import { useEffect, useState } from 'react'
import { logout } from '../../firebase/auth'
import Link from 'next/link'


export default function Home() {
  const [productName, setProductName] = useState("")
  const [productImage, setProductImage] = useState("")
  const [productPrice, setProductPrice] = useState(0)
  const [reviews, setReviews] = useState<any[]>([])
  const [rating, setRating] = useState(0.0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const router = useRouter()
  

  const toggleLogout = () => {
    logout()
    setIsLoggedIn(false)
  }

  useEffect(() => {
    let productUid;
    if(router.isReady){
      const { productId } = router.query
      productUid = productId
      getOneProduct(productUid).then((res) => {
       
        setProductName(res?.productName)
        setProductImage(res?.productImage)
        setProductPrice(res?.productPrice)
        setReviews(res?.reviews)
        
      })
    }
  }, [])

  return (
    <div>
      <Head>
        <title>KeyBoard Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className = "nav">
        <div className = "navTitle">
          The Keyboard Shop
        </div>
        <div className = "navOptions">
        {!isLoggedIn ? <Link href = {{pathname: "/auth/login"}}><p>Login/Sign Up</p></Link> : <p onClick = {toggleLogout}>Logout</p>}
          <p>Cart</p>
          
          <p>Home</p>
        </div>
      </div>

      
      <div className = "flex flex-col gap-[9] lg:flex-row mt-[100px] place-items-center">
        <div className = "text-center  lg:place-items-center">
          <img className = "lg:ml-[100px]" src = {productImage}></img>
        </div>
        <div className = "flex flex-col gap-12 text-center lg:ml-[25%]">
          <div className = "">
            <h1 className = "text-5xl lg:text-7xl mb-5">{productName}</h1>
            <h1 className = "text-3xl lg:text-5xl">${productPrice}</h1>
          </div> 
          <div className = "flex flex-col place-items-center">
            <button className = "bg-black text-white w-[70%] h-[50px] sm:w-[100%] sm:h-[70px] lg:w-[482px] lg:h-[81px] rounded-lg mb-[3%]">Add To Cart</button>
            <button className = "bg-green-500 text-white w-[70%] h-[50px] sm:w-[100%] sm:h-[70px] lg:w-[482px] lg:h-[81px] rounded-lg mb-[10%]">Buy Now</button>
            {reviews.length === 0 ? "No reviews" : "Reviews"}
          </div>
        </div>    
      </div>
    </div>
    
  )
}


export async function getServerSideProps(context: any){
  console.log(context.params)
  return {props: {"hello": "world"}}
}
