import React from "react";
import { render } from "@testing-library/react";
import BugDetails from "./BugDetails";

test("renders bugdetails component", () => {
    // TODO refactor to take from one place
    // const fakeBug = {
    //     bugID: "fakeid",
    //     title: "fake bug title",
    //     assignedTo: "assignedEmail@gmail.com",
    //     reportedBy: "reportedByEmail@gmail.com",
    //     actualBehaviour : "actual behaviour 0",
    //     expectedBehaviour : "expected behaviour 0",
    //     stepsToReproduce : "steps to reproduce 0",
    // };
    // const { getByTestId } = render(<BugDetails bug={fakeBug} />);
    // const bugTitleH2Element = getByTestId('bugtitle-h2');
    // const assignedToLabelElement = getByTestId('assignedto-label');
    // const assignedToSelectElement = getByTestId('assignedto-select');
    // const reportedbyLabelElement = getByTestId('reportedby-label');
    // const reportedBySelectElement = getByTestId('reportedby-select');
    // const actualbehaviourLabelElement = getByTestId('actualbehaviour-label');
    // const actualbehaviourTextareaElement = getByTestId('actualbehaviour-textarea');
    // const expectedbehaviourLabelElement = getByTestId('expectedbehaviour-label');
    // const expectedbehaviourTextareaElement = getByTestId('expectedbehaviour-textarea');
    // const stepstoreproduceLabelElement = getByTestId('stepstoreproduce-label');
    // const stepstoreproduceTextareaElement = getByTestId('stepstoreproduce-textarea');

    // expect(bugTitleH2Element).toBeInTheDocument();
    // expect(bugTitleH2Element).toHaveTextContent(`${fakeBug.bugID} - ${fakeBug.title}`);
    // expect(assignedToLabelElement).toBeInTheDocument();
    // expect(assignedToLabelElement).toHaveTextContent('Assigned to:');
    // expect(assignedToSelectElement).toBeInTheDocument();
    // expect(assignedToSelectElement).toHaveValue(fakeBug.assignedTo);
    // expect(reportedbyLabelElement).toBeInTheDocument();
    // expect(reportedbyLabelElement).toHaveTextContent('Reported by:');
    // expect(reportedBySelectElement).toBeInTheDocument();
    // expect(reportedBySelectElement).toHaveTextContent(fakeBug.reportedBy);
    // expect(actualbehaviourLabelElement).toBeInTheDocument();
    // expect(actualbehaviourLabelElement).toHaveTextContent('Actual behaviour:');
    // expect(actualbehaviourTextareaElement).toHaveTextContent(fakeBug.actualBehaviour);
    // expect(expectedbehaviourLabelElement).toBeInTheDocument();
    // expect(expectedbehaviourLabelElement).toHaveTextContent('Expected behaviour:');
    // expect(expectedbehaviourTextareaElement).toBeInTheDocument();
    // expect(expectedbehaviourTextareaElement).toHaveTextContent(fakeBug.expectedBehaviour);
    // expect(stepstoreproduceLabelElement).toBeInTheDocument();
    // expect(stepstoreproduceLabelElement).toHaveTextContent('Steps to reproduce');
    // expect(stepstoreproduceTextareaElement).toBeInTheDocument();
    // expect(stepstoreproduceTextareaElement).toHaveTextContent(fakeBug.stepsToReproduce);
});