import React, { Component } from "react";
import NavigationBar from "../navigationbar";
import firebase from "../../config/configuration";
class Currappo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinickey: "",
      clinicname: "",
      area: "",
      city: "",
      flag: false,
      appointmentlist: [],
      clinicdetail: [],
    };
  }
  componentDidMount() {
    this.getcurrentappo();
    //this.getclinics();
  }
  componentWillMount() {
    // this.getclinic();
  }
  getcurrentappo = () => {
    console.log("in curr apoo" + this.props.patientid);
    let clinicsref = firebase
      .database()
      .ref("/patient")
      .child(this.props.patientid)
      .child("current_appointment");
    clinicsref
      .once("value")
      .then((snapshot) => {
        //  if(!snapshot.val().max) {

        snapshot.forEach((child1) => {
          let arr = this.state.appointmentlist;
          if (child1.key != "max") {
            let obj = {
              clinic: child1.val().clinic,
              date: child1.val().date,
              slot_time: child1.val().slot_time,
            };
            arr.push(obj);
            this.setState({
              appointmentlist: arr,
            });
          } else {
            // console.log('dsdsdd  '+child1.key);
            // console.log('dsdsdd  '+child1.val());
          }
        });

        // console.log(arr);
      })
      .then(() => {
        this.getclinics();

        console.log(this.state.appointmentlist);
      });
    console.log(this.state.appointmentlist);
  };
  getclinics = () => {
    let clinicsref = firebase.database().ref("/clinic");
    console.log("appointment" + this.state.appointmentlist.length);
    this.state.appointmentlist.map((obj1) => {
      // console.log(obj1);
      //  console.log(obj1['clinic']);
      let key = obj1.clinic;
      console.log("key " + key);
      let a1 = clinicsref.child(key).on("value", (snapshot) => {
        const val = snapshot.val();
        let arr = this.state.clinicdetail;
        let obj = {
          clinicname: val.name,
          slot_time: obj1.slot_time,
          date: obj1.date,
          doname: val.doctor,
          phone: val.phone,
          area: val.area,
          city: val.city,
          link: val.link,
        };
        arr.push(obj);
        this.setState({
          clinicdetail: arr,
          flag: true,
        });
      });

      console.log(this.state.clinicdetail);
    });
  };
  // console.log('in curr apoo'+clinicsref);
  // clinicsref.on("value",snapshot=>{
  //     const val=snapshot.val();
  //     console.log(snapshot.val());
  //     this.setState({
  //         clinickey : val.clinic

  //     },()=>{
  //         console.log('callback key  ' +this.state.clinickey) ;
  //         let clinicdetail=firebase.database().ref('/clinic').child(this.state.clinickey);
  //         clinicdetail.on("value",snapshot=>{
  //             const val2=snapshot.val();
  //              this.setState({
  //                 clinicname : val2.name ,
  //                 flag : true
  //             })

  //         })
  //     })

  // })

  render() {
    var link =
      "https://www.google.com/maps/place/Nidhi+Multispeciality+Hospital/@23.0401044,72.5592146,17z/data=!3m1!4b1!4m15!1m7!3m6!1s0x395e84f521640d4b:0x6853ee97a9a2996b!2sNavrangpura,+Ahmedabad,+Gujarat!3b1!8m2!3d23.0365437!4d72.5611395!3m6!1s0x395e848c996426c3:0x915350ab1da7fe78!8m2!3d23.0400999!4d72.5614035!9m1!1b1";
    let print = this.state.clinicdetail.map((obj1) => {
      return (
        <div
          className="d-flex justify-content-center"
          style={{ margintop: "5%", width: "100%" }}
        >
          <div
            className="d-flex justify-content-center"
            style={{ marginLeft: "2%", width: "40%" }}
          >
            <form
              style={{
                border: "3px solid grey",
                marginTop: "1%",
                borderRadius: "4%",
                padding: "0.5%",
                backgroundColor: "#254e58",
                borderBottomLeftRadius: "4%",
                width: "100%",
              }}
            >
              <div className="list-group" style={{ border: "3px solid grey" }}>
                <div
                  className="list-group-item"
                  style={{ backgroundColor: "#f1f1f1" }}
                >
                  <h3 style={{ textAlign: "center" }}>
                    <b>{obj1.clinicname}</b>
                  </h3>
                  <h4 style={{ fontSize: "14px" }}>
                    <b>Doctor's Name: </b>
                    {obj1.doname}
                  </h4>
                  <h4 style={{ fontSize: "14px" }}>
                    <b>Phone number: </b>
                    {obj1.phone}
                  </h4>
                  <h4 style={{ fontSize: "14px" }}>
                    <b>Area: </b>
                    {obj1.area}
                  </h4>
                  <h4 style={{ fontSize: "14px" }}>
                    <b>Date: </b>
                    {obj1.date}
                  </h4>
                  <h4 style={{ fontSize: "14px" }}>
                    <b>Slot Time: </b>
                    {obj1.slot_time}
                  </h4>
                  <div
                    className="d-flex justify-content-start"
                    style={{ marginTop: "3%" }}
                  >
                    <div className="d-flex justify-content-start">
                      <form action={obj1.link} method="get" target="_blank">
                        <button
                          className="btn btn"
                          style={{
                            color: "white",
                            borderRadius: "5%",
                            height: "70%",
                            borderEndStartRadius: "5%",
                            backgroundColor: "#3aafa9",
                            fontSize: "70%",
                          }}
                        >
                          Locate
                          <i
                            style={{ marginLeft: "10%" }}
                            className={"fas fa-map-marker-alt"}
                            color="green"
                          />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        // {/* // <div>
        // // <h2>{obj1.clinicname}</h2>
        // // <h2>{obj1.doname}</h2>
        // // <h2>{obj1.phone}</h2>
        // // <h2>{obj1.area}</h2>
        // // <h2>{obj1.date}</h2>
        // // <h2>{obj1.slot_time}</h2>

        // // <br></br>
        // // </div> */}
      );
    });

    console.log("currappo key  " + this.state.clinickey);
    console.log("currappo name length " + this.state.clinicname.length);
    console.log("currappo name  " + this.state.clinicname);
    // console.log(`${this.state.clinickey}`);
    return (
      <div>
        <NavigationBar />
        <div className="d-flex justify-content-center">
          <div
            className="d-flex justify-content-start"
            style={{ marginBottom: "1%" }}
          >
            <h3>
              <button
                className="btn btn"
                style={{
                  color: "white",
                  backgroundColor: "#116466",
                  height: "70%",
                  width: "70%",
                  marginBottom: "10%",
                  fontSize: "70%",
                  padding: "1%",
                }}
              >
                <b>Current Appointments</b>
              </button>
            </h3>
          </div>
        </div>
        <div style={{ marginBottom: "3%" }}>{print}</div>

        {/*  <h1>current appoitment{this.state.clinickey} </h1>
                 <h1>current appoitment clinic name   {this.state.clinicname} </h1> */}
      </div>
    );
  }
}
export default Currappo;
