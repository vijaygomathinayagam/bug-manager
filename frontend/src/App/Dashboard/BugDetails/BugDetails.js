import React from "react";
import { GET_BUG_API_URL } from "../../../_common/constants";

class BugDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        fetch(GET_BUG_API_URL.replace(':bugID', this.props.bugID))
        .then(res => res.json())
        .then(result => {
            this.setState({
                bug: result.bug,
                isLoading: false,
            });
        });
    }

    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return (
                <p>Loading...</p>
            );
        }

        const { bug } = this.state;
        return (
            <div>
            <h2 data-testid="bugtitle-h2">{bug.bugID} - {bug.title}</h2>
            <label data-testid="assignedto-label">Assigned to:</label>
            <select defaultValue={bug.assignedTo} data-testid="assignedto-select">
                <option value={bug.assignedTo}>{bug.assignedTo}</option>
            </select>
            <label data-testid="reportedby-label">Reported by:</label>
            <select defaultValue={bug.reportedBy} data-testid="reportedby-select">
                <option value={bug.reportedBy}>{bug.reportedBy}</option>
            </select>
            <label data-testid="actualbehaviour-label">Actual behaviour:</label>
            <textarea defaultValue={bug.actualBehaviour} data-testid="actualbehaviour-textarea"/>
            <label data-testid="expectedbehaviour-label">Expected behaviour:</label>
            <textarea defaultValue={bug.expectedBehaviour} data-testid="expectedbehaviour-textarea"/>
            <label data-testid="stepstoreproduce-label">Steps to reproduce:</label>
            <textarea defaultValue={bug.stepsToReproduce} data-testid="stepstoreproduce-textarea"/>
        </div>
        );
    }
}

export default BugDetails;