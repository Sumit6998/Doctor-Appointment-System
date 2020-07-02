import React, { Component } from "react";
import NavigationBar from "../navigationbar";
import firebase from "../../config/configuration";
import Edit from "./Editclinic";

class Profileclinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: "",
      age: "",
      area: "",
      blood_group: "",
      city: "",
      email: "",
      gender: "",
      phone: "",
      street: "",
      pincode: "",
      slot_time: "Required to set  Ex: 15  for 15 minites",
      breaktime: "Required to set  Ex:     12:00 to 13:00,14:00 to 20:01",
      workingtime: "",
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
      // console.log('i am in profile '+snapshot.val().name);
      console.log(this.props.id + " props id");
      this.setState({
        doctor: snapshot.val().doctor,
        clinicname: snapshot.val().clinicname,
        clinicfees: snapshot.val().clinicfees,
        degree: snapshot.val().degree,
        specialist: snapshot.val().specialist,
        age: snapshot.val().age,

        area: snapshot.val().area,
        // blood_group:snapshot.val().blood_group,
        city: snapshot.val().city,
        // email:snapshot.val().email,
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
        // name:filledform.name,
        email: filledform.email,
        password: filledform.password,
        doctor: filledform.doctor,
        clinicname: filledform.clinicname,
        clinicfees: filledform.clinicfees,
        degree: filledform.degree,
        specialist: filledform.specialist,
        age: filledform.age,
        phone: filledform.phone,
        street: filledform.street,
        area: filledform.area,
        city: filledform.city,
        pincode: filledform.pincode,
        gender: filledform.gender,

        // blood_group:filledform.blood_group,
        workingtime: filledform.workingtime,
        breaktime: filledform.breaktime,

        slot_time: filledform.slot_time,
      });
  };

  render() {
    const { key } = this.props;
    // console.log('i am in profile '+this.props.id.name);
    //  console.log(typeof this.state.workingtime);
    // console.log(this.state.workingtime);
    console.log("i am in profile of clinic");
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
                        <td> {this.state.doctor} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Age </strong>
                        </td>
                        <td> {this.state.age} </td>
                      </tr>

                      <tr>
                        <td>
                          {" "}
                          <strong>Clinic Name </strong>
                        </td>
                        <td> {this.state.clinicname} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Dgree </strong>
                        </td>
                        <td> {this.state.degree} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Specialist </strong>
                        </td>
                        <td> {this.state.specialist} </td>
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
                          <strong>Visit Fee </strong>
                        </td>
                        <td> {this.state.clinicfees} </td>
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
                          <strong>Avarage one patient visit time </strong>
                        </td>
                        <td> {this.state.slot_time} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Working time of a day </strong>
                        </td>
                        <td> {this.state.workingtime} </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <strong>Brake time during working hours </strong>
                        </td>
                        <td> {this.state.breaktime} </td>
                      </tr>

                      {/* <button  onClick={this.openedit} >EDIT</button> */}
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
        <div className="d-flex justify-content-center">
          <div
            className="d-flex justify-content-center"
            style={{ marginBottom: "10%" }}
          >
            <button
              className="btn btn"
              onClick={this.Openedit}
              style={{
                color: "white",
                borderRadius: "5%",
                height: "90%",
                borderEndStartRadius: "5%",
                backgroundColor: "#5680E9",
                marginBottom: "3%",
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

export default Profileclinic;
