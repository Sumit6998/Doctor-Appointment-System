import React, { Component } from "react";
import NavigationBar from "../navigationbar";
import firebase from "../../config/configuration";
import Edit from "./Editpatient";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      area: "",
      blood_group: "",
      city: "",
      email: "",
      gender: "",
      phone: "",
      street: "",
      pincode: "",
      slot_time: "",
      iseditopen: false,
      alldata: "",
      flag: false,
    };
  }
  componentDidMount() {
    this.getuserdetail();
  }
  getuserdetail = () => {
    console.log(this.props.id);
    console.log(this.props.user);
    // id=5ccmc79IJkhutQkKVxlCiQWmeFg1 for nayan parmar patient
    console.log(typeof this.props.user);
    let userdetail = firebase
      .database()
      .ref(this.props.user)
      .child(this.props.id);
    userdetail.on("value", (snapshot) => {
      console.log("i am in profile " + snapshot.val().name);
      this.setState({
        name: snapshot.val().name,
        age: snapshot.val().age,
        area: snapshot.val().area,
        blood_group: snapshot.val().blood_group,
        city: snapshot.val().city,
        email: snapshot.val().email,
        gender: snapshot.val().gender,
        street: snapshot.val().street,
        pincode: snapshot.val().pincode,
        phone: snapshot.val().phone,
        slot_time: snapshot.val().slot_time,
        workingtime: snapshot.val().workingtime,
        breaktime: snapshot.val().breaktime,
        alldata: snapshot.val(),
        flag: true,
      });
    });
  };
  Openedit = () => {
    console.log("openedit " + this.state.iseditopen);
    this.setState({
      iseditopen: true,
    });
    console.log("openedit " + this.state.iseditopen);
  };
  closeedit = () => {
    this.setState({
      iseditopen: false,
    });
    console.log("cloaseedit " + this.state.iseditopen);
  };
  postedit = (filledform) => {
    this.setState({
      iseditopen: false,
    });
    console.log("name" + filledform.name);
    console.log("name" + filledform.email);
    console.log("name" + filledform.password);
    let updateprofile = firebase
      .database()
      .ref(this.props.user)
      .child(this.props.id)
      .update({
        name: filledform.name,
        email: filledform.email,
        password: filledform.password,
        age: filledform.age,
        phone: filledform.phone,
        city: filledform.city,
        pincode: filledform.pincode,
        area: filledform.area,
        blood_group: filledform.blood_group,
        street: filledform.street,
      });
  };

  render() {
    const { key } = this.props;
    console.log("i am in profile " + this.props.id.name);
    console.log(typeof this.state.workingtime);
    console.log(this.state.workingtime);
    console.log(this.state);
    return (
      <React.Fragment>
        <NavigationBar />
        <form className="container">
          {this.state.flag == true ? (
            <div className="container">
              <div className="parent">
                {/* <div className="quick-view" id="avatar_position">
                    <Avatar color={getcolor()} round={true} size={120}
                        name={userInfo.user_first_name + (userInfo.user_last_name ? " " + userInfo.user_last_name : "")} />
                    <div className="name-style">{userInfo.user_first_name} {userInfo.user_last_name}</div>
                </div> */}
                <div className="info-table">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td>
                          {" "}
                          <strong>Name</strong>
                        </td>
                        <td> {this.state.name} </td>
                      </tr>

                      <tr>
                        <td>
                          {" "}
                          <strong>Primary Email</strong>
                        </td>
                        <td> {this.state.email} </td>
                      </tr>

                      <tr>
                        <td>
                          {" "}
                          <strong>Gender</strong>
                        </td>
                        <td> {this.state.gender} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Age</strong>
                        </td>
                        <td> {this.state.age} </td>
                      </tr>

                      <tr>
                        <td>
                          {" "}
                          <strong>Blood group</strong>
                        </td>
                        <td> {this.state.blood_group} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Contact No</strong>
                        </td>
                        <td> {this.state.phone} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Street</strong>
                        </td>
                        <td> {this.state.street} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Area</strong>
                        </td>
                        <td> {this.state.area} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>City</strong>
                        </td>
                        <td> {this.state.city} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Pincode</strong>
                        </td>
                        <td> {this.state.pincode} </td>
                      </tr>
                    </tbody>
                  </table>

                  {this.state.iseditopen === true ? (
                    <Edit
                      open={this.state.iseditopen}
                      close={this.closeedit}
                      submitedit={this.postedit}
                      alldata={this.state.alldata}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </form>

        {/* <div className="d-flex justify-content-sm-end" style={{marginTop:'5%'}}> */}
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center">
            <button
              className="btn btn"
              onClick={this.Openedit}
              style={{
                color: "white",
                borderRadius: "5%",
                height: "90%",
                borderEndStartRadius: "5%",
                backgroundColor: "#5680E9",
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
