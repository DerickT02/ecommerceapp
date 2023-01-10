import { describe } from "mocha"

describe('non-user visits page for the first time', () => {
  it('goes to the homepage', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('non-user clicks on a product', () => {
  it('goes to a product page', () => {
    cy.visit('http://localhost:3000/')

    cy.contains("Green Keyboard").click()

    cy.url().should('include', '/product/*')

  })
})



describe('user logs in', () => {
  it("logs in a user", () => {
    cy.visit('http://localhost:3000/')
    cy.contains('login').click()
    cy.url().should("include", "/login")
    cy.get('input').select('login').type("testcustomer@gmail.com")
    cy.get('input').select('password').type("testcustomer")
    cy.contains('login').click()
    cy.url().should('eq', "http://localhost:3000/")
  })
})

describe('user signs up for the first time', () => {
  it("logs in a user", () => {
    cy.visit('http://localhost:3000/')
    cy.contains('signup').click()
    cy.url().should("include", "/signup")
    cy.get('input').select('login').type("testcustomer@gmail.com")
    cy.get('input').select('password').type("testcustomer")
    cy.get('input').select('confirm-password').type("testcustomer")
    cy.contains('signup').click()
    cy.url().should('eq', "http://localhost:3000/")
  })
})

