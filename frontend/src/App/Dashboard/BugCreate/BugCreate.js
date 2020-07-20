import React from "react";

class BugCreate extends React.Component {
    render() {
        return (
            <div>
                <label htmlFor="bug-create-title-id" data-testid="bugtitle-label">Title</label>
                <input type="text" name="title" id="bug-create-title-id" data-testid="bugtitle-input"/>
                <label htmlFor="bug-create-assignedto-id" data-testid="assignedto-label">Assigned to:</label>
                <select name="assignedTo" id="bug-create-assignedto-id" data-testid="assignedto-select"></select>
                <label htmlFor="bug-create-reportedby-id" data-testid="reportedby-label">Reported by:</label>
                <select name="reportedBy" id="bug-create-reportedby-id" data-testid="reportedby-select"></select>
                <label htmlFor="bug-create-actualbehaviour-id" data-testid="actualbehaviour-label">Actual behaviour:</label>
                <textarea name="actualBehaviour" id="bug-create-actualbehaviour-id" cols="30" rows="5"
                data-testid="actualbehaviour-textarea"></textarea>
                <label htmlFor="bug-create-expectedbehaviour-id" data-testid="expectedbehaviour-label">Expected behaviour:</label>
                <textarea name="expectedBehaviour" id="bug-create-expectedbehaviour-id" cols="30" rows="5"
                data-testid="expectedbehaviour-textarea"></textarea>
                <label htmlFor="bug-create-stepstoreproduce-id" data-testid="stepstoreproduce-label">Steps to reproduce:</label>
                <textarea name="stespToReproduce" id="bug-create-stepstoreproduce-id" cols="30" rows="5"
                data-testid="stepstoreproduce-textarea"></textarea>
            </div>
        );
    }
}

export default BugCreate;