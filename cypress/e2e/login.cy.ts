describe("Pruebas de logeo en la aplicacion", () => {

  beforeEach(() => {

    cy.visit("http://localhost:5173/login");
  });

  it("Si se introducen los datos correctos me lleva a la pagina principal", () => {
    cy.get('[data-cy="usernameInput"]').type("marcocamaradiaz@gmail.com");
    cy.get('[data-cy="passwordInput"]').type("Marco");
    cy.get('[data-cy="loginButton"]').click();
    cy.location("pathname").should("not.include", "/login");
  });

  it("Si se introducen los datos incorrectos me salta un modal de error y no me deja entrar a la pagina principal", () => {
    cy.get('[data-cy="usernameInput"]').type("hola@gmail.com");
    cy.get('[data-cy="passwordInput"]').type("mundo");
    cy.get('[data-cy="loginButton"]').click();
    cy.location("pathname").should("include", "/login");
    cy.contains("em", "Please check hint before logging.");
  });

  it("Si no se ha realizado el logeo, no se puede navegar a ninguna otra pagina", () => {
    cy.visit("http://localhost:5173/");
    cy.location("pathname").should("include", "login");
    cy.visit("http://localhost:5173/bookings");
    cy.location("pathname").should("include", "login");
  });

  it("Una vez logeado, no se puede volver a /login", () => {
    cy.get('[data-cy="usernameInput"]').type("marcocamaradiaz@gmail.com");
    cy.get('[data-cy="passwordInput"]').type("Marco");
    cy.get('[data-cy="loginButton"]').click();
    cy.visit("http://localhost:5173/login");
    cy.location("pathname").should("not.include", "login");
  });

  it("Una vez logeado, se puede ir a otras paginas", () => {
    cy.get('[data-cy="usernameInput"]').type("marcocamaradiaz@gmail.com");
    cy.get('[data-cy="passwordInput"]').type("Marco");
    cy.get('[data-cy="loginButton"]').click();
    cy.visit("http://localhost:5173/rooms");
    cy.location("pathname").should("include", "rooms");
  });
});