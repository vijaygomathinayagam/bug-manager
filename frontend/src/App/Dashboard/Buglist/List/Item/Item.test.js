import React from "react";
import { render } from "@testing-library/react";
import Item from "./Item";

test("renders list item of list", () => {
  const fakeBug = {
    bugID: "fakeid",
    title: "fake bug title",
    assignedTo: "assignedEmail@gmail.com",
    reportedBy: "reportedByEmail@gmail.com",
  };
  const { getByTestId } = render(<Item bug={fakeBug} />);

  const bugIDH3Element = getByTestId("bugid-h3");
  const bugTitleParaElement = getByTestId("bugtitle-para");
  const assignedToH4Element = getByTestId("assignedto-h4");
  const assignedToParaElement = getByTestId("assignedto-para");
  const reportedByH4Element = getByTestId("reportedby-h4");
  const reportedByParaElement = getByTestId("reportedby-para");

  expect(bugIDH3Element).toBeInTheDocument();
  expect(bugIDH3Element).toHaveTextContent(fakeBug.bugID);
  expect(bugTitleParaElement).toBeInTheDocument();
  expect(bugTitleParaElement).toHaveTextContent(fakeBug.title);
  expect(assignedToH4Element).toBeInTheDocument();
  expect(assignedToH4Element).toHaveTextContent("Assigned to");
  expect(assignedToParaElement).toBeInTheDocument();
  expect(assignedToParaElement).toHaveTextContent(fakeBug.assignedTo);
  expect(reportedByH4Element).toBeInTheDocument();
  expect(reportedByH4Element).toHaveTextContent("Reported by");
  expect(reportedByParaElement).toBeInTheDocument();
  expect(reportedByParaElement).toHaveTextContent(fakeBug.reportedBy);
});
