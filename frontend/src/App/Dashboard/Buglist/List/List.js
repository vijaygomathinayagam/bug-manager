import React from "react";
import Item from "./Item/Item";

class List extends React.Component {
    render() {
        const { bugArr } = this.props;
        const bugListItemDomArr = bugArr.map(bug => (<Item key={bug.bugID} bug={bug} />));
        return (<div>{bugListItemDomArr}</div>);
    }
}

export default List;