// https://on.cypress.io/api

import { hasOperationName, aliasQuery } from '../utils/graphql-test-utils'

import categoriesRes from '../fixtures/categories.json'
import productsRes from '../fixtures/products.json'

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/admin')

    window.localStorage.clear()
  })

  it('redirects to login', () => {
    cy.url().should('include', '/admin/login')
  })

  it('should not login on invalid credentials', () => {
    cy.get('form').get('input[name="username').type('username')
    cy.get('form').get('input[name="password').type('password')
    cy.get('form').contains('button', 'Login')
    cy.get('form').get('button').click()
    cy.get('form').contains('button', 'Please Wait...')

    cy.wait(3000)

    cy.get('form').contains('button', 'Login')
    cy.get('form').contains('Incorrect credentials')
  })

  it('should login on correct credentials', () => {
    cy.get('form').get('input[name="username').type('admin')
    cy.get('form').get('input[name="password').type('admin')
    cy.get('form').get('button').click()

    cy.wait(3000)

    cy.url().should('not.contain', '/admin/login')

    cy.wait(1000)

    cy.get('nav').contains('Dashboard')
  })
})
