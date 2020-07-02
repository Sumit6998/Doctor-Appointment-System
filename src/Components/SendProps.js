import React, { PureComponent } from "react";
import SlotBooking from "./SlotBooking";
import TempPage from "./TempPage";
import firebase from "../config/configuration";

class SendProps extends PureComponent {
  constructor(props) {
    super(props);
    console.log("I am in SendProps " + this.props.searchDate);
    this.getDateString();
    this.state = {
      isData1Available: true,
      isData2Available: true,
    };

    let patients = firebase
      .database()
      .ref("/clinic")
      .child("navkar12 gmail com");
    patients.on("value", (snapshot) => {
      const val = snapshot.val();
      this.workingtime = val.working_time;
      this.slotInterval = val.slot_time;
      this.breaktime = val.breaktime;
      this.setState({
        isData1Available: false,
      });
    });
    console.log(this.dateString);
    patients = firebase
      .database()
      .ref("/clinic")
      .child("navkar12 gmail com")
      .child("date")
      .child(this.dateString);
    patients.on("value", (snapshot) => {
      const val = snapshot.val();
      this.patient_booking = val.patient_booking;
      this.slotsDatabase = val.slot_string;
      this.setState({
        isData2Available: false,
      });
    });
  }

  getDateString = () => {
    var str = this.props.searchDate.toDateString();
    str = str.split(" ");
    console.log(str);
    this.dateString =
      str[2] + "-" + (this.props.searchDate.getMonth() + 1) + "-" + str[3];
    this.offsetTime =
      this.props.searchDate.getHours() * 60 +
      this.props.searchDate.getMinutes();
    console.log(this.offsetTime);
  };

  //pass dateString and offsetTime to SlotBooking
  render() {
    /*console.log('returning');
    console.log('state is '+this.state.isDataAvailable);
    console.log(this.slotsDatabase);
     console.log(this.workingtime);
     console.log(this.slotInterval);
     console.log(this.breaktime);*/
    if (!this.state.isData1Available && !this.state.isData2Available) {
      console.log("returning");
      console.log(
        "state is " +
          this.state.isData1Available +
          " " +
          this.state.isData2Available
      );
      console.log(this.patient_booking);
      console.log(this.slotsDatabase);
      console.log(this.workingtime);
      console.log(this.slotInterval);
      console.log(this.breaktime);
    }
    return (
      !this.state.isData1Available &&
      !this.state.isData2Available && (
        <div>
          <SlotBooking
            doctorName={this.props.doctorName}
            slotsDatabase={this.slotsDatabase}
            workingtime={this.workingtime}
            slotInterval={this.slotInterval}
            breaktime={this.breaktime}
            patient_booking={this.patient_booking}
            patientId={this.props.patientId}
            dateString={this.dateString}
            offsetTime={this.offsetTime}
          />
        </div>
      )
    );
  }
}

export default SendProps;
