
import Link from "next/link"
import { logout } from "../firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "../firebase/config"
import Router from "next/router"
import { onAuthStateChanged } from "firebase/auth"


export default function Nav(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const toggleLogout = () => {
        logout()
        setIsLoggedIn(false)
      }

    const goHome = () => {
        Router.push("/")
    }

    const goToCart = () => {
        Router.push("/checkout")
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setIsLoggedIn(true)
            }
            else{
                setIsLoggedIn(false)
            }
        })
    })

    return (
        <div className = "nav">
        <div className = "navTitle" onClick={goHome}>
          The Keyboard Shop
        </div>
        <div className = "navOptions">
        {!isLoggedIn ? <Link href = {{pathname: "/auth/login"}}><p>Login/Sign Up</p></Link> : <p onClick = {toggleLogout}>Logout</p>}
          <p onClick={goToCart}>Cart</p>
          
          <p onClick = {goHome}>Home</p>
        </div>
      </div>
    )
}