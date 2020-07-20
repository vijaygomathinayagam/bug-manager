import React from "react";
import { render } from "@testing-library/react";
import Buglist from "./Buglist";

test("renders dashboard component", () => {
  const { getByTestId } = render(<Buglist />);
  const bugsHeadingH1Element = getByTestId("bugs-heading-h1");

  expect(bugsHeadingH1Element).toBeInTheDocument();
  expect(bugsHeadingH1Element).toHaveTextContent("BUGS");
});
