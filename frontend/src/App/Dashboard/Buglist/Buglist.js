import React from "react";
import Filter from "./Filter/Filter";
import List from "./List/List"
import { GET_ALL_BUGS_API_URL } from "../../../_common/constants";

class Buglist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: "assigned-to-me",
      isLoading: true,
    }
  }

  handleFilterChange(selectedFilter) {
    this.setState({
      selectedFilter: selectedFilter,
    });
    this.refreshBugList();
  }

  getFilter() {
    // TODO make these variables
    const { selectedFilter } = this.state;
    if (selectedFilter === "assigned-to-me") {
      return {};
    }
    if(selectedFilter === "reported-by-me") {
      return {};
    }
    return {};
  }

  componentDidMount() {
    this.refreshBugList();
  }

  refreshBugList() {
    fetch(`${GET_ALL_BUGS_API_URL}?filter=${JSON.stringify(this.getFilter())}`)
    .then(res => res.json())
    .then(result => {
      this.setState({
        bugArr: result.bugs,
        isLoading: false,
      });
    });
  }

  render() {
    const { selectedFilter, isLoading, bugArr } = this.state;
    let bugList;

    if (isLoading) {
      bugList = <p>Loading...</p>;
    } else {
      bugList = <List bugArr={bugArr} />;
    }
    return (
      <div>
        <h1 data-testid="bugs-heading-h1">BUGS</h1>
        <Filter
          handleFilterChange={this.handleFilterChange.bind(this)}
          selectedFilter={selectedFilter}
        />
        {bugList}
      </div>
    );
  }
}

export default Buglist;
