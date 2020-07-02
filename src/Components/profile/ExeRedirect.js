import React, { Component } from "react";

 class Redirect extends Component {
  constructor( props ){
    super();
   // this.state = { ...props };
  }
  componentWillMount(){
    //  console.log(this.state);
    console.log(this.props.loc);
    window.location.replace(this.props.loc);
  }
  render(){
    return (<section>Redirecting...</section>);
  }
}

export default Redirect;