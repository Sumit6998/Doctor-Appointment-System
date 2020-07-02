import React, { Component } from "react";
import Publicpage from "./public-page/PublicPage";
import Login from "./public-page/Login";
import Signup from "./public-page/SignUp";
import firebase from "../config/configuration";
// import SendProps from './SendProps';
// import SlotBooking from './SlotBooking';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AuthorizedRoute from "./AuthorizedRoute";
import Home from "./home-page/homepage";
import Slotbook from "./slots/jeettmp";
import Currappo from "./appoitment-page/currappo";
import Reviappo from "./appoitment-page/reviappo";
import Profilepatient from "./profile/Profilepatient";
import Profileclinic from "./profile/Profileclinic";
import { CLIENT_RENEG_LIMIT } from "tls";
import Signuppagedoc from "./public-page/Signupdoc";
import Signuppagepat from "./public-page/SignUp";
import Clinicdate from "./home-page/ClinicDate";
import TempPage from "./slots/TempPage";
import Precripation from "./Precripaton/History";
import ExeRedirect from "./profile/ExeRedirect";
import PatientDisplayFromBloodGroup from "./slots/PatientDisplayFromBloodGroup";
import ErrorPage from "./public-page/ErrorPage";
import SlotBooking from "./slots/slotbooking";
import cookie from "react-cookies";

export const Context = React.createContext();

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: cookie.load("isAuthenticated"),
      user: cookie.load("user"),
      // patient or clinic
      key: cookie.load("uid"),
      email: "",
      password: "",
    };
    this.handleChage = this.handleChage.bind(this);
    this.submitHandler = this.submitHandler.bind(this);

    //user: patient or clinic
  }

  handleChage = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => {
      prevState = JSON.parse(JSON.stringify(this.state));
      prevState[name] = value;
      //console.log(prevState);
      return prevState;
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    var flag = 1;
    // console.log('hii');
    //console.log(this.state);
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage + "\n" + "please try again");
        flag = 0;
      })
      .then(() => {
        //1

        if (flag) {
          var user = firebase.auth().currentUser.uid;
          //1
          firebase
            .database()
            .ref("list")
            .child(user)
            .on("value", (snapshot) => {
              console.log(this);
              //0
              if (snapshot.val().type == "patient") {
                console.log("patient");
                console.log("i am in logi " + snapshot.key);
                let d = new Date();
                d.setTime(d.getTime() + 5 * 60 * 1000);
                let expires1 = d;
                cookie.save("uid", firebase.auth().currentUser.uid, {
                  path: "/",
                  expires: expires1,
                });
                cookie.save("user", "patient", {
                  path: "/",
                  expires: expires1,
                });
                cookie.save("isAuthenticated", true, {
                  path: "/",
                  expires: expires1,
                });
                console.log("hiii:  " + cookie.load("uid") + "    ");
                console.log(user);

                this.setState({
                  user: "patient",
                  isAuthenticated: true,
                  key: snapshot.key,
                });
              } else {
                console.log("i am in logi doctor");
                let d = new Date();
                d.setTime(d.getTime() + 5 * 60 * 1000);
                let expires1 = d;
                cookie.save("uid", firebase.auth().currentUser.uid, {
                  path: "/",
                  expires: expires1,
                });
                cookie.save("user", "clinic", { path: "/", expires: expires1 });
                cookie.save("isAuthenticated", true, {
                  path: "/",
                  expires: expires1,
                });
                console.log("hiii:  " + cookie.load("uid") + "    ");
                console.log();

                // console.log('i am in logi '+snapshot.key);
                //console.log(this.state);
                this.setState({
                  user: "clinic",
                  isAuthenticated: true,
                  key: snapshot.key,
                });
              }
            });
        }
      });
  };
  componentDidMount = () => {
    console.log("componetnt mounted");
    //   firebase.auth().onAuthStateChanged(user=>{
    //       console.log('state is changed')
    //       if(user)
    //       {
    //         //   let d = new Date();
    //         //   d.setTime(d.getTime() + ( 5* 60 * 1000));
    //         //   let expires1=d ;
    //         // cookie.save('uid',user.uid,{path:'/',expires:expires1});
    //         //   cookie.save('user', 'patient', { path: '/', expires: expires1});
    //         //   cookie.save('isAuthenticated', true, { path: '/', expires: expires1});
    //         //   console.log('hiii:  '+cookie.load('uid')+'    ');
    //         //   console.log(user);
    //       }
    //       else
    //       {
    //           cookie.remove('uid', { path: '/' })
    //           cookie.remove('user', { path: '/' })
    //           cookie.remove('isAuthenticated', { path: '/' })
    //           console.log('user logout');
    //           this.setState({
    //               isAuthenticated:false,
    //               user:'',
    //               key:''
    //           })
    //       }
    //   })
  };

  logout = () => {
    console.log("in logout");
    firebase
      .auth()
      .signOut()
      .then(() => {
        cookie.remove("uid", { path: "/" });
        cookie.remove("user", { path: "/" });
        cookie.remove("isAuthenticated", { path: "/" });
        console.log("user logout");
        this.setState({
          isAuthenticated: false,
          user: "",
          key: "",
        });
        cookie.remove("doctorName", { path: "/" });
        cookie.remove("slotsDatabase", { path: "/" });
        cookie.remove("workingtime", { path: "/" });
        cookie.remove("slotInterval", { path: "/" });
        cookie.remove("breaktime", { path: "/" });
        cookie.remove("patient_booking", { path: "/" });
        cookie.remove("patientId", { path: "/" });
        cookie.remove("dateString", { path: "/" });
        cookie.remove("offsetTime", { path: "/" });
        cookie.remove("description", { path: "/" });
        cookie.remove("doctor", { path: "/" });
        cookie.remove("clinicfees", { path: "/" });
        cookie.remove("clinicname", { path: "/" });
      });
  };

  render() {
    //     const {isAuthenticated}=this.state;
    // console.log('i am in render isauthancated '+this.state.isAuthenticated);
    // console.log('i am in render user '+this.state.user);
    // console.log('i am in render key '+this.state.key);
    // console.log('i am in render '+this.state.key);
    // console.log('i am in render user '+this.state.user);
    if (this.state.isAuthenticated) {
      document.body.style.background = "#ffffff";
    } else {
      // var urlString = 'url(' + require('../images/publicpage2.jpg') + ')';
      // //urlString.style.width=100;
      // document.body.style.background = urlString;
      // document.body.style.backgroundSize = "cover";
      // document.body.style.backgroundPositionY= "-50px";
      // document.body.style.backgroundRepeat = "no-repeat";

      document.body.style.backgroundImage =
        "linear-gradient(toright, rgba(83, 76, 97, 0.322), rgb(46, 50, 65))";
      document.body.style.backgroundSize = "cover";

      /* Control the height of the image */

      // console.log('hi i am here'+this.state.isAuthenticated);
      /* Center and scale the image nicely */
      document.body.style.opacity = "1";
    }

    return (
      <Context.Provider
        value={{
          user: this.state.user,
          id: this.state.key,
          logout: this.logout,
        }}
      >
        <Router>
          <React.Fragment>
            <Switch>
              {/* <Publicpage />  */}
              <AuthorizedRoute
                permission={true}
                path="/"
                exact
                strict
                component={this.state.isAuthenticated ? Home : Login}
                user={this.state.user}
                email={this.state.email}
                password={this.state.password}
                submitHandler={this.submitHandler}
                handleChage={this.handleChage}
                email={this.state.email}
                password={this.state.password}
                id={this.state.key}
              />

              <AuthorizedRoute
                permission={true}
                path="/signupclinic"
                exact
                strict
                component={Signuppagedoc}
              />
              <AuthorizedRoute
                permission={true}
                path="/signuppatient"
                exact
                strict
                component={Signuppagepat}
              />

              {!this.state.isAuthenticated ? <Redirect to="/"></Redirect> : ""}

              {this.state.user === "patient" ? (
                <AuthorizedRoute
                  permission={this.state.user === "patient" ? true : false}
                  path="/currappoitment"
                  exact
                  strict
                  component={Currappo}
                  patientid={this.state.key}
                />
              ) : (
                " "
              )}
              {this.state.user === "patient" ? (
                <AuthorizedRoute
                  permission={this.state.user === "patient" ? true : false}
                  path="/prescription"
                  exact
                  strict
                  component={Precripation}
                  patientid={this.state.key}
                  user={this.state.user}
                />
              ) : (
                ""
              )}
              {this.state.user === "clinic" ? (
                <AuthorizedRoute
                  permission={this.state.user === "clinic" ? true : false}
                  path={"/prescription/:id"}
                  exact
                  strict
                  component={Precripation}
                  user={this.state.user}
                />
              ) : (
                ""
              )}
              {this.state.user === "patient" ? (
                <AuthorizedRoute
                  permission={this.state.user === "patient" ? true : false}
                  path={"/slotbook"}
                  exact
                  strict
                  component={TempPage}
                  patientId={this.state.key}
                />
              ) : (
                ""
              )}
              {this.state.user === "patient" ? (
                <AuthorizedRoute
                  permission={this.state.user === "patient" ? true : false}
                  path="/Myprofilep"
                  exact
                  strict
                  component={Profilepatient}
                  user={this.state.user}
                  id={this.state.key}
                />
              ) : (
                ""
              )}
              {this.state.user === "clinic" ? (
                <AuthorizedRoute
                  permission={this.state.user === "clinic" ? true : false}
                  path="/Myprofilec"
                  exact
                  strict
                  component={Profileclinic}
                  user={this.state.user}
                  id={this.state.key}
                />
              ) : (
                ""
              )}
              {this.state.user === "clinic" ? (
                <AuthorizedRoute
                  permission={this.state.user == "clinic"}
                  path="/BloodGroup"
                  exact
                  strict
                  component={PatientDisplayFromBloodGroup}
                  user={this.state.user}
                  id={this.state.key}
                />
              ) : (
                ""
              )}
              {this.state.user === "patient" ? (
                <AuthorizedRoute
                  permission={this.state.user === "patient" ? true : false}
                  path={"/slotbook2"}
                  exact
                  strict
                  component={SlotBooking}
                />
              ) : (
                ""
              )}
              <Route component={ErrorPage} />
              {/* <Route render={() => <Redirect to='/'/>}/>                   
                    <Route render={() => <Redirect to='/'/>}/> */}
            </Switch>
          </React.Fragment>
        </Router>
      </Context.Provider>

      //<SendProps doctorName="Parth Patel"/>
    );
  }
}

export default App;
