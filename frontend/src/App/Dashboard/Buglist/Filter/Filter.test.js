import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Filter from "./Filter";

test("renders Filter component", () => {
  const mockHandleFilterChange = jest.fn((arg) => console.log(arg));
  const { getByTestId } = render(
    <Filter
      selectedFilter="all-bugs"
      handleFilterChange={mockHandleFilterChange}
    />
  );
  const tabUlElement = getByTestId("filter-ul");
  const assignedToMeLiElement = getByTestId("filter-ul-assignedtome-li");
  const reportedByMeLiElement = getByTestId("filter-ul-reportedbyme-li");
  const allLiElement = getByTestId("filter-ul-all-li");

  expect(tabUlElement).toBeInTheDocument();
  expect(assignedToMeLiElement).toBeInTheDocument();
  expect(reportedByMeLiElement).toBeInTheDocument();
  expect(allLiElement).toBeInTheDocument();
  expect(assignedToMeLiElement).toHaveTextContent("Assigned to me");
  expect(reportedByMeLiElement).toHaveTextContent("Reported by me");
  expect(allLiElement).toHaveTextContent("All bugs");
  expect(tabUlElement).toContainElement(assignedToMeLiElement);
  expect(tabUlElement).toContainElement(reportedByMeLiElement);
  expect(tabUlElement).toContainElement(allLiElement);

  fireEvent.click(assignedToMeLiElement);
  fireEvent.click(reportedByMeLiElement);

  expect(mockHandleFilterChange.mock.calls[0][0]).toBe("assigned-to-me");
  expect(mockHandleFilterChange.mock.calls[1][0]).toBe("reported-by-me");
});
