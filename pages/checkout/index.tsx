import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { auth } from '../../firebase/config'
import Router from 'next/router'
import Nav from '../../components/nav'
import { onAuthStateChanged } from 'firebase/auth'
import { getCart, getOneProduct } from '../../firebase/customerActions'

export default function Home() {
  const [cart, setCart] = useState<any[]>([])





  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
           getCart(user.uid).then((res) => {
            console.log(res)
            setCart(res)
          })
      }
      else{
        Router.push("/auth/login")
      }
    })
  }, [])







  return (
    <div>
      
      <Head>
        <title>KeyBoard Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
     <div className = "mt-20 flex flex-col lg:gap-[25%] lg:flex-row">
      {/*Checkout Products*/}
      <div className = "lg:ml-48">
        <h1 className = "text-5xl lg:text-left text-center">Checkout</h1>
       
        <div className = "hidden lg:flex flex-col lg:flex-row gap-x-56 mt-7">
          <p>Product</p>
          <p>Quantity</p>
          <p>Total Price</p>
          
          </div>
          <hr className = "hidden lg:block"/> 
          <div/>
          {cart.map((item) => {
            return(
              <div className = "grid lg:grid-cols-4 place-items-center">
                <div className = "flex lg:gap-4 flex-col lg:flex-row lg:place-items-center">
                  <img className = "lg:w-[100px] lg:h-[100px] w-[200px] h-[200px]" src = {item.productImage}></img>
                  <p className = "text-center text-2xl lg:text-base">{item.productName}</p>
              </div>
              <div className = "text-2xl lg:text-lg">
                <button>+</button>
                1
                <button>-</button>
              </div>
                <div className = "lg:ml-[120px]">
                  ${item.productPrice}
                </div>
              
              </div>
              
            )
          })}
          <div>
        </div>
        <h2 className = "mt-10 lg:text-left text-center">Total</h2>
      </div>
      {/*Checkout Information*/}
      
      <div className = "text-center">
        <h1 className = "text-5xl">Payment Info</h1>
      </div>
     </div>
      
    
      
    </div>
  )
}


