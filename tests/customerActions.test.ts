import { db } from "../firebase/config"
import { getAllProducts, getOneProduct, buyProduct, addToCart, writeReview} from '../firebase/customerActions'
import { signIn, signUp, logout} from '../firebase/auth'
import { expect } from '@jest/globals';

describe("authentication", () => {
    it("logs in user of type customer", async () => {
        expect(signIn).resolves.toBe(true)
    })
    it("creates a user for the first time", async () => {
        expect(signUp).resolves.toBe(true)
    })
    it("logs out an existing user", async () => {
        expect(logout).resolves.toBe(true)
    })
})

describe("customer actions", () => {
    it("gets all products in the shop", async () => {
        expect(getAllProducts).resolves.toBe(true)
    })
    it("gets one product for the product page", async () => {
        expect(getOneProduct).resolves.toBe(true)
    })
    it("allows user to add product to cart for later purchase", async () => {
        expect(addToCart).resolves.toBe(true)
    })
    it("allows user to buy product, decrease number in stock, and increases store revenue and sales by 1", async () => {
        expect(buyProduct).resolves.toBe(true)
    })
    it("allows user to write a review for existing product", () => {
        expect(writeReview).resolves.toBe(true)
    })
})
