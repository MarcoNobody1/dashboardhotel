describe("Pruebas de logeo en mi aplicacion", () => {
  it("Si meto los datos correctos me lleva a la pagina principal", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('[data-cy="usernameInput"]').type("marcocamaradiaz@gmail.com");
    cy.get('[data-cy="passwordInput"]').type("Marco");
    cy.get('[data-cy="loginButton"]').click();
    cy.location("pathname").should("not.include", "/login");
  });

  it("Si meto los datos incorrectos me salta un modal de error y no me deja entrar a la pagina principal", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('[data-cy="usernameInput"]').type("hola@gmail.com");
    cy.get('[data-cy="passwordInput"]').type("mundo");
    cy.get('[data-cy="loginButton"]').click();
    cy.location("pathname").should("include", "/login");
    cy.contains("em", "Please check hint before logging.");
  });

  it("Si no me he logeado, no puedo navegar a ninguna otra pagina", () => {
    cy.visit("http://localhost:3000/");
    cy.location("pathname").should("include", "login");
    cy.visit("http://localhost:3000/bookings");
    cy.location("pathname").should("include", "login");
  });

  it("Una vez logeado, no puedo volver a /login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('[data-cy="usernameInput"]').type("marcocamaradiaz@gmail.com");
    cy.get('[data-cy="passwordInput"]').type("Marco");
    cy.get('[data-cy="loginButton"]').click();
    cy.visit("http://localhost:3000/login");
    cy.location("pathname").should("not.include", "login");
  });
});
