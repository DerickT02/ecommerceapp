import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '../firebase/config'
import Nav from '../components/nav'
import { useState, useEffect } from 'react'
import { getAllProducts } from '../firebase/customerActions'
import { logout } from '../firebase/auth'


export default function Home() {
  const [productsList, setProductsList] = useState<any[]>([])

  useEffect(() => {
    getAllProducts().then((res) => {
      setProductsList(res)
    })
  }, [])
  
  console.log(productsList)
  return (
    <>
    <Nav />
      <Head>
        <title>KeyBoard Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    {/*Picture and Selling point*/}
    <div className="mt-[150px] lg:mt-[250px]">
      <div className = "flex flex-col justify-center text-center margin-auto sm:text-center">
        <div className = "flex flex-col-reverse text-center justify-center lg:flex-row ">
          <div>
          <h1 className = "text-center text-8xl mb-12 lg:mb-10">Find All Your Keyboard needs here</h1>
          <button className = "bg-black text-white sm:text-center sm: w-[385px] sm: h-[100px] sm: mt-3">Shop now</button>
          </div>

        <img
        className = "max-w-[500px] h-auto rotate-45 z-0 mb-[100px] text-center"
        alt="Green Keyboard" 
        src = "https://firebasestorage.googleapis.com/v0/b/ecommerceproject-416fd.appspot.com/o/My%20project-2.png?alt=media&token=f40dd23a-ff06-4dc9-9caa-8a218040f16a"
        />

        </div>
        
        
      </div>

    {/**/}
      <div className = "grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-3 lg:gap-10 mt-[100px] place-items-center">
        {productsList.map((product) => {
          return(
            <div className = "w-[80%] pt-1 pb-1 pl-9 pr-9 lg:pt-[85px] lg:pb-[85px] lg:w-[479px] lg:h-[382px] shadow-[0px_0px_60px_0px_rgba(0,0,0,0.3)]">
            <Link href = {{
              pathname: "/product/[productId]",
              query:{productId: product.id}
            }}>
              <div className = "flex grow flex-col place-items-center">
                <img className = "w-[200px] h-[200px] lg:w-[200px] lg:h-[200px]"  src = {product.productImage} ></img>
                <h2>{product.productName}</h2>
                <h3>${product.productPrice}</h3>
              </div>
            </Link>
            </div>
            
          )
        })}
        
      </div>

      
    
      
    </div>
    </>
  )
}
