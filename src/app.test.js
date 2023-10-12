import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { StatusDiv } from "./Components/StatusDiv";
import "@testing-library/jest-dom";

describe("Tests hacia mi componente StatusDiv dentro de la tabla de Bookings", () => {
  afterEach(cleanup);

  test("StatusDiv existe en el DOM", () => {
    render(
      <div>
        <StatusDiv />
      </div>
    );
    const statusDivElement = screen.getByTestId("bookingStatusDiv");

    expect(statusDivElement).toBeInTheDocument() ;

  });
  test("StatusDiv tiene un color y un background específico si no le pasas data", () => {
    render(
      <div>
        <StatusDiv data={""} />
      </div>
    );
    const statusDivElement = screen.getByTestId("bookingStatusDiv");

    expect(statusDivElement).toHaveStyle("color: #E2B308");
    expect(statusDivElement).toHaveStyle("background-color: #FEFFC2");
  });
  test("StatusDiv tiene un color y un background específico si le pasas 'Check In' como data", () => {
    render(
      <div>
        <StatusDiv data={{status: "Check In"}} />
      </div>
    );
    const statusDivElement = screen.getByTestId("bookingStatusDiv");

    expect(statusDivElement).toHaveStyle("color: #5ad07a");
    expect(statusDivElement).toHaveStyle("background-color: #e8ffee");
  });
  test("StatusDiv tiene un color y un background específico si le pasas 'Check Out' como data", () => {
    render(
      <div>
        <StatusDiv data={{status: "Check Out"}} />
      </div>
    );
    const statusDivElement = screen.getByTestId("bookingStatusDiv");

    expect(statusDivElement).toHaveStyle("color: #E23428");
    expect(statusDivElement).toHaveStyle("background-color: #FFEDEC");
  });
});
