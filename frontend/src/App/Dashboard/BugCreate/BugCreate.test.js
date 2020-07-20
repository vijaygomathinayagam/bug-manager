import React from "react";
import { render } from "@testing-library/react";
import BugCreate from "./BugCreate";

it("renders bug create component", function() {
    const { getByTestId } = render(<BugCreate />);

    const bugTitleLabelElement = getByTestId('bugtitle-label');
    const bugTitleInputElement = getByTestId('bugtitle-input');
    const assignedToLabelElement = getByTestId('assignedto-label');
    const assignedToSelectElement = getByTestId('assignedto-select');
    const reportedbyLabelElement = getByTestId('reportedby-label');
    const reportedBySelectElement = getByTestId('reportedby-select');
    const actualbehaviourLabelElement = getByTestId('actualbehaviour-label');
    const actualbehaviourTextareaElement = getByTestId('actualbehaviour-textarea');
    const expectedbehaviourLabelElement = getByTestId('expectedbehaviour-label');
    const expectedbehaviourTextareaElement = getByTestId('expectedbehaviour-textarea');
    const stepstoreproduceLabelElement = getByTestId('stepstoreproduce-label');
    const stepstoreproduceTextareaElement = getByTestId('stepstoreproduce-textarea');

    expect(bugTitleLabelElement).toBeInTheDocument();
    expect(bugTitleLabelElement).toHaveTextContent('Title');
    expect(bugTitleInputElement).toBeInTheDocument();
    expect(assignedToLabelElement).toBeInTheDocument();
    expect(assignedToLabelElement).toHaveTextContent('Assigned to:');
    expect(assignedToSelectElement).toBeInTheDocument();
    expect(reportedbyLabelElement).toBeInTheDocument();
    expect(reportedbyLabelElement).toHaveTextContent('Reported by:');
    expect(reportedBySelectElement).toBeInTheDocument();
    expect(actualbehaviourLabelElement).toBeInTheDocument();
    expect(actualbehaviourLabelElement).toHaveTextContent('Actual behaviour:');
    expect(expectedbehaviourLabelElement).toBeInTheDocument();
    expect(actualbehaviourTextareaElement).toBeInTheDocument();
    expect(expectedbehaviourLabelElement).toHaveTextContent('Expected behaviour:');
    expect(expectedbehaviourTextareaElement).toBeInTheDocument();
    expect(stepstoreproduceLabelElement).toBeInTheDocument();
    expect(stepstoreproduceLabelElement).toHaveTextContent('Steps to reproduce');
    expect(stepstoreproduceTextareaElement).toBeInTheDocument();
});