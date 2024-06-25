import React, { Component } from "react";
import withNavigateandLocation from "./withNavigateandLocation";

class SearchInputComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleInputChange = (e) => {
    const searchTerm = e.target.value;
    this.props.onSearchChange(searchTerm);
  };

  render() {
    return (
      <input
        type="text"
        value={this.props.searchTerm}
        onChange={this.handleInputChange}
        placeholder="Search for opportunities by name or organisation"
        className="input input-bordered w-full max-w-xs"
      ></input>
    );
  }
}

export default withNavigateandLocation(SearchInputComponent);