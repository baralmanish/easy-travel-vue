// https://on.cypress.io/api

import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils'

import categoriesRes from '../fixtures/categories.json'
import productsRes from '../fixtures/products.json'

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (hasOperationName(req, 'Categories')) {
        req.alias = `gqlCategoriesQuery`
        req.on('response', (res) => {
          res.body.data = categoriesRes
        })
      }
      if (hasOperationName(req, 'Products')) {
        req.alias = `gqlProductsQuery`
        req.on('response', (res) => {
          res.body.data = productsRes
        })
      }
    })
  })

  it('visits the app root url', () => {
    cy.get('nav').should('be.visible')
    cy.get('nav').contains('Easy Travel')
  })

  it('renders hero section', () => {
    cy.get('[data-test="hero-section"]').should('exist')
    cy.get('[data-test="hero-section"]').contains('h1', 'Easy Travel')
    cy.get('[data-test="hero-section"]').contains('p', 'Discover the real value of travel')
  })

  it('renders api responses for categories and products', () => {
    cy.get('[data-test="categories-section"]').should('exist')
    cy.get('[data-test="categories-section"]')
      .find('[data-test="card-component-with-link"]')
      .should('exist')
    cy.get('[data-test="categories-section"]')
      .find('[data-test="card-component-with-link"]')
      .should('have.length', categoriesRes.categories.length)
    cy.get('[data-test="categories-section"]')
      .find('[data-test="card-component-with-link"]')
      .first()
      .contains(categoriesRes.categories[0].name)

    cy.get('[data-test="products-section"]').should('exist')
    cy.get('[data-test="products-section"]')
      .find('[data-test="card-component-without-link"]')
      .should('exist')
    cy.get('[data-test="products-section"]')
      .find('[data-test="card-component-without-link"]')
      .should('have.length', productsRes.products.length)
    cy.get('[data-test="products-section"]')
      .find('[data-test="card-component-without-link"]')
      .first()
      .contains(productsRes.products[0].name)
  })
})
