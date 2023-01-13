import { auth, db } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"


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
        console.log(err)
    })
}
export function signIn(){
    return false
}
export function logout(){
    return false
}