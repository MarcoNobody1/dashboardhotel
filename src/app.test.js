import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { StatusDiv } from "./Components/StatusDiv";
import "@testing-library/jest-dom";

describe("Tests hacia mi componente StatusDiv dentro de la tabla de Bookings", () => {
  afterEach(cleanup);

  test("StatusDiv tiene textAlign igual a center", () => {
    render(
      <div>
        <StatusDiv data={"Check In"} />
      </div>
    );
    const statusDivElement = screen.getByTestId("bookingStatusDiv");

    expect(statusDivElement).toHaveStyle("color: #E2B308");

  });
  test("StatusDiv existe en el DOM", () => {
    render(
      <div>
        <StatusDiv data={"Check In"} />
      </div>
    );
    const statusDivElement = screen.getByTestId("bookingStatusDiv");

    expect(statusDivElement).toBeInTheDocument() ;

  });
});
