import { curry } from "cypress/types/lodash"
import { db } from  "./config"
import { getDocs, collection, doc, getDoc, updateDoc } from "firebase/firestore"


export async function getAllProducts(){
    let productsSnapshot = await getDocs(collection(db, "products"))
    let result: any[] = []
 
    productsSnapshot.forEach((doc) => {
        let price = doc.data().productPrice
        let name = doc.data().productName
        let img = doc.data().productImage
        let product = {productPrice: price, productName: name, id: doc.id, productImage: img}
        result = [...result, product]
    })
    console.log(result)
    return result
}
export async function getOneProduct(id: string){
    
    let selectedProduct = doc(db, "products", id)
    let selectedProductRef = await getDoc(selectedProduct)
    console.log(selectedProductRef.data())
    return selectedProductRef.data()
}
export async function buyProduct(id: string){
    let selectedProduct = doc(db, "products", id)
    let selectedProductRef = await getDoc(selectedProduct)
    let currStock = selectedProductRef.data()?.stock
    let currSales = selectedProductRef.data()?.sales
    let newStock = currStock - 1
    let newSales = currSales + 1

    await updateDoc(selectedProduct, {
        sales: newSales,
        stock: newStock,
    }).then(() => {
        return "successfully bought product"
    })
    return "successfully bought product"
}
export async function addToCart(customerID: string, productID: string){
    let currentCustomer = doc(db, "users", customerID)
    let currentCustomerRef = await getDoc(currentCustomer)
    let cart = currentCustomerRef.data()?.cart
    cart.push(productID)
    let newCart = cart
    await updateDoc(currentCustomer, {
        cart: newCart
    })
    return "successfully added product to cart"
}
export async function writeReview(id: any, review: string){
    let selectedProduct = doc(db, "products", id)
    let selectedProductRef = await getDoc(selectedProduct)
    let reviews = selectedProductRef.data()?.reviews
    reviews.push(review)
    let newReviews = reviews
    await updateDoc(selectedProduct, {
        reviews: newReviews
    })
    return "successfully wrote review"
}
