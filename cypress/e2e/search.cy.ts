describe('search products', () => {

    it('should be able to search for products', () => {
        cy.searchByQuery("moletom")

        cy.location("pathname").should("include", "/search")
        cy.location("search").should("include", "q=moletom")

        cy.get("a[href^='/products']").should('exist')

    })

    it('should not be able to visit search page without a search queryParams', () => {
        cy.on("uncaught:exception", () => {
            return false
        })
        cy.visit('/search')

        cy.location("pathname").should("equal", "/")

    })
})