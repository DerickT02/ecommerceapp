import { useState } from "react"


export default function Login(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const toggleLoggedIn = () => {
        setIsLoggedIn((prev) => !prev)
    }
    return (
        <div>
            <h1>{isLoggedIn ? "Login" : "Sign Up"}</h1>
            <input placeholder="email"></input>
            <input placeholder="password"></input>
            <button>{!isLoggedIn ? "Sign Up" : "Log In"}</button>
            <p>{isLoggedIn ? "Don't Have An Account?" : "Have an Account? "}<span onClick = {toggleLoggedIn}>{isLoggedIn ? "Sign Up" : "Log In"}</span></p>
        </div>
    )
}