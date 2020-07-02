import React, { Component } from "react";

class Slotbook extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(" componutdid monut" + this.props.match.params.doctorid);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>i am in slotbook area {this.props.computedMatch.params.id}</h1>
      </div>
    );
  }
}

export default Slotbook;
