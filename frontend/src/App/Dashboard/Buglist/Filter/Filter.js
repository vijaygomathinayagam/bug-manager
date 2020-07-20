import React from "react";
import "./Filter.css";

class Filter extends React.Component {
  render() {
    const { selectedFilter } = this.props;
    return (
      <ul data-testid="filter-ul" className="filter">
        <li
          data-testid="filter-ul-assignedtome-li"
          onClick={() => this.props.handleFilterChange("assigned-to-me")}
          className={`filter-item ${
            selectedFilter === "assigned-to-me" ? "active" : ""
          }`}
        >
          Assigned to me
        </li>
        <li
          data-testid="filter-ul-reportedbyme-li"
          onClick={() => this.props.handleFilterChange("reported-by-me")}
          className={`filter-item ${
            selectedFilter === "reported-by-me" ? "active" : ""
          }`}
        >
          Reported by me
        </li>
        <li
          data-testid="filter-ul-all-li"
          onClick={() => this.props.handleFilterChange("all-bugs")}
          className={`filter-item ${
            selectedFilter === "all-bugs" ? "active" : ""
          }`}
        >
          All bugs
        </li>
      </ul>
    );
  }
}

export default Filter;
