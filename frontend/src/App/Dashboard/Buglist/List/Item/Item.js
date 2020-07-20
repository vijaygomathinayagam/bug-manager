import React from "react";

class Item extends React.Component {
  render() {
    const { bugID, title, assignedTo, reportedBy } = this.props.bug;
    return (
      <div>
        <div id="bugid-title-container">
          <h3 data-testid="bugid-h3">{bugID}</h3>
          <p data-testid="bugtitle-para">{title}</p>
        </div>
        <div id="ownership-container">
          <h4 data-testid="assignedto-h4">Assigned to</h4>
          <p data-testid="assignedto-para">{assignedTo}</p>
          <h4 data-testid="reportedby-h4">Reported by</h4>
          <p data-testid="reportedby-para">{reportedBy}</p>
        </div>
      </div>
    );
  }
}

export default Item;
