import React, { Component } from "react";
import firebase from "../../config/configuration";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
} from "reactstrap";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
//1import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 's';

import Stylee from "./Stylee.css";
export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
      age: "",
      city: "",
      area: "",
      blood_group: "",
      gender: "",
      phone: "",
      pincode: "",
      street: "",
    };
  }

  getKeyFromEmail = (email) => {
    var flag = 0,
      str = email;
    var pos = email.lastIndexOf(".");
    str = str.substring(0, pos) + " " + str.substring(pos + 1);
    var pos = email.lastIndexOf("@");
    str = str.substring(0, pos) + " " + str.substring(pos + 1);
    return str;
  };

  Signup = (event) => {
    event.preventDefault();
    var flag = 1;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        flag = 0;
        alert(errorMessage);
        // ...
      })
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            flag = 0;
            // alert(errorMessage);
            // ...
          });
      })
      .then(() => {
        if (flag) {
          const user = firebase.auth().currentUser.uid;
          const newChild = this.getKeyFromEmail(this.state.email);
          console.log(newChild);
          firebase.database().ref("patient").child(user).set({
            name: this.state.name,
            email: this.state.email,
            age: this.state.age,
            phone: this.state.phone,
            password: this.state.password,
            city: this.state.city,
            area: this.state.area,
            blood_group: this.state.blood_group,
            gender: this.state.gender,
            pincode: this.state.pincode,
            street: this.state.street,
            label: "patient",
          });

          firebase
            .database()
            .ref("blood group")
            .child(this.state.blood_group)
            .child(user)
            .set({
              num: 0,
            });
          firebase.database().ref("list").child(user).set({
            type: "patient",
          });
          alert("Signup completed");
          this.props.history.push("/");
        }
      });
  };

  handleChage = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => {
      prevState = JSON.parse(JSON.stringify(this.state));
      prevState[name] = value;
      //console.log(prevState);
      return prevState;
    });
  };

  render() {
    return (
      <div className="BACK">
        <form onSubmit={this.Signup} className="container">
          {/* <div className="Container" color="red" > */}
          <div>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <FormGroup row>
              <Label htmlFor="email" sm={1}>
                <b>Email:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  onChange={this.handleChage}
                  value={this.state.email}
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label htmlFor="psw" sm={1}>
                <b>Password:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={this.handleChage}
                  value={this.state.password}
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label htmlFor="name" sm={1}>
                <b>Name:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={this.handleChage}
                  value={this.state.name}
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label htmlFor="age" sm={1}>
                <b>Age:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="age"
                  onChange={this.handleChage}
                  value={this.state.age}
                  placeholder="age"
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label htmlFor="area" sm={1}>
                <b>Area:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  placeholder="Enter Area"
                  name="area"
                  onChange={this.handleChage}
                  value={this.state.area}
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label htmlFor="blood_group" sm={1}>
                <b>Blood Group:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  placeholder="Enter Blood group"
                  name="blood_group"
                  onChange={this.handleChage}
                  value={this.state.blood_group}
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label htmlFor="city" sm={1}>
                <b>City:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  onChange={this.handleChage}
                  value={this.state.city}
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label htmlFor="gender" sm={1}>
                <b>Gender:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  placeholder="Enter Gender"
                  name="gender"
                  onChange={this.handleChage}
                  value={this.state.gender}
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label htmlFor="phone" sm={1}>
                <b>Phone:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  placeholder="Enter Phone Number"
                  name="phone"
                  onChange={this.handleChage}
                  value={this.state.phone}
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label htmlFor="pincode" sm={1}>
                <b>Pincode:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  placeholder="Enter Pincode"
                  name="pincode"
                  onChange={this.handleChage}
                  value={this.state.pincode}
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label htmlFor="street" sm={1}>
                <b>Street:</b>
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  placeholder="Enter Street"
                  name="street"
                  onChange={this.handleChage}
                  value={this.state.street}
                  required
                />
                <hr />
              </Col>
            </FormGroup>

            {/* <div className="clearfix">
            {/* <button type="button" class="cancelbtn">Cancel</button> */}
            <Button type="submit" className="btn55" color="primary">
              Sign Up
            </Button>
            <br />
            <br />
            <br />
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
