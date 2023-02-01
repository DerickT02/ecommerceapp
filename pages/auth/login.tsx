import { useState } from "react"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { auth, db } from "../../firebase/config"
import Link from "next/link"
import Router from "next/router"
import { resolve } from "path"


export default function Login(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedInAuth, setIsLoggedInAuth] = useState(false)
    const [loginStatus, setLoginStatus] = useState("")
    

    const toggleLoggedIn = () => {
        setIsLoggedIn((prev) => !prev)
    }

    

    const signUp = async (email: string, password: string) => {
        let credential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(credential)
        await setDoc(doc(db, "users", credential.user.uid), {
            email: email,
            role: "customer",
            cart: []
        }).then(() => {
            return "successfully created customer"
        }).catch(err => {
            alert(err.message)
        })
    }

    const handleAuthEvents = async () => {
        if(isLoggedIn){
            await signInWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
                setLoginStatus("Success")
                Router.push("/")
            })
            .catch((error) => {
                switch(error.code){
                    case "auth/invalid-email":
                        setLoginStatus("Invalid Email");
                        break;
                    case "auth/wrong-password":
                        setLoginStatus("Incorrect Password")
                        break;
                    default:
                        setLoginStatus(error.code);
                        break;
                    

                }
                
            })
        }
        else{
            signUp(email, password).then((res) => {
                console.log(res)
            })
           
        }
    }

    console.log(email)
    console.log(password)
    return (
        <div className = "flex flex-col place-items-center">
            <div className = "nav">
                    <div className = "navTitle">
                    The Keyboard Shop
                    </div>
                    <div className = "navOptions">
                    <Link href = {{pathname: "/auth/login"}}><p>Login/Sign Up</p></Link>
                    <p>Cart</p>
                    
                    <p>Home</p>
                    </div>
            </div>

            <div className = "flex flex-col place-items-center bg-black text-white pt-5 pb-10 pl-3 mt-[100px]  w-[90%] lg:w-[45%] outline-1 outline-slate-600">
                <h1 className = "text-6xl">{isLoggedIn ? "Login" : "Sign Up"}</h1>
                <input className = "mt-9 w-[70%] h-[70px] pl-4  bg-neutral-700 rounded-sm" placeholder="Email" onChange = {(e) => {setEmail((e.target as HTMLInputElement).value)}}></input>
                <input type = "password" className = "mt-3 w-[70%] h-[70px] pl-4 bg-neutral-700 rounded-sm" placeholder="Password" onChange = {(e) => {setPassword((e.target as HTMLInputElement).value)}}></input>
                <button className = "mt-6 w-[70%] h-[70px] border border-solid border-white rounded-sm hover:bg-white hover:text-black hover:transition" onClick = {handleAuthEvents}>{!isLoggedIn ? "Sign Up" : "Log In"}</button>
                <p className="mt-3">{isLoggedIn ? "Don't Have An Account? " : "Have an Account? "}<span className = "text-slate-500 hover:text-white hover:transition"onClick = {toggleLoggedIn}>{isLoggedIn ? "Sign Up" : "Log In"}</span></p>
            </div>

            {loginStatus}
        </div>
    )
}