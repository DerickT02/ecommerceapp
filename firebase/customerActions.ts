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
export async function getOneProduct(id: any){
    let selectedProduct = doc(db, "products", id)
    let returnObject: any = {}
    let selectedProductRef = await getDoc(selectedProduct);
    returnObject["productName"] = selectedProductRef.data()?.productName
    returnObject["productImage"] = selectedProductRef.data()?.productImage
    returnObject["productPrice"] = selectedProductRef.data()?.productPrice
    returnObject["reviews"] = selectedProductRef.data()?.reviews
    returnObject["rating"] = selectedProductRef.data()?.rating
   
    return returnObject
}
export async function buyProduct(id: string, quantity: number){
    let selectedProduct = doc(db, "products", id)
    let selectedProductRef = await getDoc(selectedProduct)
    let currStock = selectedProductRef.data()?.stock
    let currSales = selectedProductRef.data()?.sales
    let newStock = currStock - quantity
    let newSales = currSales + quantity;

    await updateDoc(selectedProduct, {
        sales: newSales,
        stock: newStock,
    }).then(() => {
        return "successfully bought product"
    })
    return "successfully bought product"
}
export async function addToCart(customerID: string, productObject: object, productID: any){
    let currentCustomer = doc(db, "users", customerID)
    let currentCustomerRef = await getDoc(currentCustomer)
    let cart = currentCustomerRef.data()?.cart
    let itemInCart = cart.find((item: any) => item.id == productID)
    if(itemInCart){
        alert("Item Already In cart")
        return
    }
    else{
        cart.push(productObject)
        let newCart = cart
        await updateDoc(currentCustomer, {
            cart: newCart
        })
    }
    return "successfully added product to cart"
}
export async function writeProductReview(id: any, rating: number, review: object){
    let selectedProduct = doc(db, "products", id)
    let selectedProductRef = await getDoc(selectedProduct)
    let reviews = selectedProductRef.data()?.reviews
    let currRating  = +selectedProductRef.data()?.rating
    console.log(currRating) 
    currRating = (currRating + +rating) / reviews.length
    
    reviews.push(review)
    let newReviews = reviews
    await updateDoc(selectedProduct, {
        reviews: newReviews,
        rating: currRating
    })
    return "successfully wrote review"
}


export async function getCart(customerID: string){
    let currentCustomer = doc(db, "users", customerID)
    let currentCustomerRef = await getDoc(currentCustomer)
    let cart = currentCustomerRef.data()?.cart
    let result = cart;
    console.log("result", result)
    return result
}

