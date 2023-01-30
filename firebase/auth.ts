import { auth, db } from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"
import { resolve } from "path";


export async function signUp(email: string, password: string){
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
export async function signIn(email: string, password: string){
    signInWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
        resolve("Success")
        
    })
    .catch((error) => {
        console.log(error)
        alert(error.message)
    })
}
export function logout(){
    return false
}