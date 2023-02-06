import { db } from "../firebase/config"
import { getAllProducts, getOneProduct, buyProduct, addToCart, writeReview} from '../firebase/customerActions'
import { signIn, signUp, logout} from '../firebase/auth'
import { expect } from '@jest/globals';



describe("customer actions", () => {
    it("gets all products in the shop", async () => {
        let res = await getAllProducts()
        expect(!!res &&  Array.isArray(res)).toBe(true)
    })
    it("gets one product for the product page", async () => {
        let res = await getOneProduct("testdoc")
        expect(res && typeof res === 'object').toBe(true)
    
    })
  
    it("allows user to buy product, decrease number in stock, and increases store revenue and sales by 1",  () => {
        expect(buyProduct("testdoc")).resolves.toBe("successfully bought product")
    })
    it("allows user to write a review for existing product", async () => {
        expect(writeReview("testdoc", "good product")).resolves.toBe("successfully wrote review")
    })
})
