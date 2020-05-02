import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button.js";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

//clean up dom after test renders
afterEach(cleanup);

it("renders correctly", () => {
  const { asFragment } = render(<Button />);
  expect(asFragment()).toMatchSnapshot();
});

//check element text contents
it("correct header", () => {
  //variables names for getting parts of rendered element
  const { getByTestId } = render(<Button />);
  expect(getByTestId("h1tag").textContent).toEqual("thing");
});
