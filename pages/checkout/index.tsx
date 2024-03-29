import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { auth } from '../../firebase/config'
import Router from 'next/router'
import Nav from '../../components/nav'
import { onAuthStateChanged } from 'firebase/auth'
import { getCart, getOneProduct, buyProduct } from '../../firebase/customerActions'


type quantityType = {
  [key: string]: number
}

export default function Home() {
  const [cart, setCart] = useState<any[]>([])
  const [total, setTotal] = useState(0.0)
  const [itemQuantity, setItemQuantity] = useState<quantityType>({})






  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
           getCart(user.uid).then((res) => {
            console.log(res)
            setCart(res)
            for(let item in res){
              setTotal(prev => prev + res[item].productPrice)
              console.log(res[item])
              setItemQuantity(prev => ({
                ...prev,
                [res[item].id]: 1,
              }))
              
            }
          })
      }
      else{
        Router.push("/auth/login")
      }
    })
  }, [])

  console.log(itemQuantity)

  const addOneProduct = (price: number, objectKey: string) => {
    let quantityCopy : quantityType
    quantityCopy = itemQuantity
    quantityCopy[objectKey]++
    setItemQuantity(quantityCopy)
    setTotal(prev => prev + price)
    
    
  }
  const removeOneProduct = (price: number, objectKey: string) => {
    if(itemQuantity[objectKey] == 0){
      return;
    }
    let quantityCopy : quantityType
    quantityCopy = itemQuantity
    quantityCopy[objectKey]--
    setItemQuantity(quantityCopy)
    setTotal(prev => prev - price)
    
    
  }

  const checkout = () => {
    for(let item in itemQuantity){
      buyProduct(item, itemQuantity[item])
    }
  }
  




  return (
    <div>
      
      <Head>
        <title>KeyBoard Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
     <div className = "mt-20 flex flex-col lg:gap-[10%] lg:flex-row">
      {/*Checkout Products*/}
      <div className = "lg:ml-48">
        <h1 className = "text-5xl lg:text-left text-center">Checkout</h1>
       
        <div className = "hidden lg:flex flex-col lg:flex-row gap-x-56 mt-7">
          <p>Product</p>
          <p className = "ml-4">Quantity</p>
          <p>Total Price</p>
          
          </div>
          <hr className = "hidden lg:block"/> 
          <div/>
          {cart.map((item, index) => {
            console.log(index)
            return(
              <div key={index} className = "grid lg:grid-cols-4 place-items-center">
                <div className = "flex lg:gap-4 flex-col lg:flex-row lg:place-items-center">
                  <img alt = "" className = "lg:w-[100px] lg:h-[100px] w-[200px] h-[200px]" src = {item.productImage}></img>
                  <p className = "text-center text-2xl lg:text-base">{item.productName}</p>
              </div>
              <div className = "text-2xl lg:text-lg border-[1px] border-black rounded-2xl pl-2 pr-2">
                <button className = "mr-4" onClick = {() => {addOneProduct(item.productPrice, item.id)}}>+</button>
                {itemQuantity[item.id]}
                <button className = "ml-4" onClick = {() => {removeOneProduct(item.productPrice, item.id)}}>-</button>
              </div>
                <div className = "lg:ml-[120px]">
                  ${item.productPrice * itemQuantity[item.id]}
                </div>
              
              </div>
                 
            )
          })}
          <div>
        </div>
        <h2 className = "mt-10 lg:text-left text-center">Total</h2>
        ${total}
      </div>
      {/*Checkout Information*/}
      
      <div className = "flex flex-col place-content-center mb-7 text-center text-white bg-black lg:pl-10 lg:pr-10 ">
        <h1 className = "lg:text-3xl text-lg mt-3">Payment Info</h1>
          <input placeholder = "First And Last Name" className = "mt-10 indent-1 text-white bg-black pt-1 pb-1 border-[1px] border-solid border-white rounded-2xl"></input>
          <input placeholder = "Shipping Address" className = "mt-10 indent-1 text-white bg-black pt-1 pb-1 border-[1px] border-solid border-white rounded-2xl"></input>
          <input placeholder = "Name On Card" className = "mt-10 indent-1 text-white bg-black pt-1 pb-1 border-[1px] border-solid border-white rounded-2xl"></input>
          <input placeholder = "Card Number" className = "mt-10 indent-1 text-white bg-black pt-1 pb-1 border-[1px] border-solid border-white rounded-2xl"></input>
        <div className = "mt-10 flex flex-row place-content-center">
          <input placeholder='MM' className = "indent-1 ml-1 lg:ml-2 w-[100px] text-white bg-black border-[1px] border-solid border-white rounded-2xl"></input>
          <input placeholder = "YY" className = "indent-1 ml-1 lg:ml-2 w-[100px] text-white bg-black border-[1px] border-solid border-white rounded-2xl"></input>
          <input placeholder='XXX' className = "indent-1 ml-1 lg:ml-2 w-[100px] text-white bg-black border-[1px] border-solid border-white rounded-2xl"></input>
        </div>
        <div>
        <button className = "mt-4 w-[60%] lg:w-[50%] bg-sky-500 mb-4 pb-3 pt-3 rounded-2xl" onClick = {checkout}>Checkout</button>
        </div>
        
      </div>  
     </div>
      
    
      
    </div>
  )
}


