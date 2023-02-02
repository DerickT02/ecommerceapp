
import Link from "next/link"
import { logout } from "../firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "../firebase/config"

export default function Nav(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const toggleLogout = () => {
        logout()
        setIsLoggedIn(false)
      }

    useEffect(() => {
        if(auth.currentUser != undefined){
            setIsLoggedIn(true)
          }
    })

    return (
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
    )
}