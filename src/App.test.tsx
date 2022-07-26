import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("app header renders properly", () => {
  render(<App />);
  const linkElement = screen.getByText(/TODOS/i);
  expect(linkElement).toBeInTheDocument();
});
