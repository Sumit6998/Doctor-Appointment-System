import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Spinner } from "reactstrap";
//import "./Clin.css";
//1import FileUploader from "react-firebase-file-uploader";
import firebase from "../../config/configuration";
import FlipMove from "react-flip-move";
import ProgressBar from "react-bootstrap/ProgressBar";
import {Input} from "reactstrap";
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

class Clinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bld: "",
      appointments: [],
      isloading: false,
      progress: 0,
      current:''
    };
  }

  //calculates slot time from starting time
  calculateslottime = (starthour, startminit, slottime, slotnumber) => {
    let hour = parseInt(starthour);
    let minit = parseInt(startminit);
    let slttime = parseInt(slottime);
    let sltnumber = parseInt(slotnumber);
    let totalminit = parseInt(hour * 60 + minit + slttime * sltnumber);
    // console.log(typeof starthour+' '+typeof startminit+'z'+slttime+' '+sltnumber+typeof sltnumber);
    let newhour = parseInt(totalminit / 60);
    let newminit = parseInt(totalminit % 60);

    let ans = "";
    if (newhour < 10) ans = ans + "0";
    ans = ans + newhour;
    ans = ans + ":";
    if (newminit < 10) ans = ans + "0";
    ans = ans + newminit;
    // console.log(ans) ;
    return [ans, totalminit];
  };

  //file change handler
  fileChangedHandler = event => {
    const file1 = event.target.files[0];
    console.log(file1);
    let index = this.state.appointments.findIndex(function(element) {
      return element.id == event.target.id;
    });
    let temparr = this.state.appointments;
    temparr[index].file = file1;
    this.setState({
      appointments: temparr
    },()=>{console.log('filechangehandler'+this.state.appointments[index].file)});
  };

  //description handler
  descriptionhandler = event => {
    let index = this.state.appointments.findIndex(function(element) {
      return element.id == event.target.id;
    });
    const description1 = event.target.value;
    let temparr = this.state.appointments;
    temparr[index].description = description1;
    this.setState({
      appointments: temparr
    });
  };

  //start uploading file in firebase
  handleUploadStart = (filename, task) => {};

  //handle progress of file uploading
  handleProgress = snapshot => {
    let progress1 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    this.setState({
      progress: progress1
    });
    console.log('Upload is ' + progress1 + '% done');
  };

  //handle file upload error in file uploading
  handleUploadError = error => {
    let index = this.state.current;
    let temparr = this.state.appointments;
    temparr[index].showprogressbar = false;
    this.setState({
      appointment: temparr,
      current: '',
      progress: 0
    });
    alert(error);
    console.error(error);
  };

  //handle upload success in file uploading
  handleUploadSuccess = filename => {
    let index=this.state.current;
    let temparr=this.state.appointments;
    temparr[index].fileuploaded=true;
    temparr[index].showprogressbar=false;
    this.setState({
      appointments:temparr,
      current:'',
      progress: 0
    });
    console.log(temparr[index].file);
    alert("file succesfully uploaded");
  };

  //file is uploaded to firebase
  fileuploadhandler = (event) => {
    event.preventDefault();
    let index = this.state.appointments.findIndex(function (element) {
      return element.id == event.target.id;
    });
    if(this.state.appointments[index].file=='')
    {
      alert("Upload prescription file");
    }
    else
    {
    let temparr=this.state.appointments;
    temparr[index].showprogressbar=true;
    this.setState({
      progress:0,
      appointments:temparr,
      current:index
    })
    console.log('filename'+temparr[index].file);
    let uploadTask = firebase.storage().ref(event.target.id).child(temparr[index].file.name).put(temparr[index].file);
    uploadTask.on("state_changed",this.handleProgress,this.handleUploadError,this.handleUploadSuccess);
  }

  };

  //delete appointment from firebase
  deletehandler = (id,num) => {
    // console.log(event.target.name)
    let temparr=this.state.appointments;
    let index = this.state.appointments.findIndex(function (element) {
      return element.id == id;
    });
    let filename1 = (this.state.appointments[index].file).name;
    let description1 = this.state.appointments[index].description;
    console.log(this.state.appointments);
    temparr.splice(index, 1);
    this.setState(prevState => {
      prevState["appointments"] = temparr;
      return prevState;
    });
    this.uploadhandler(id,filename1,description1);
    this.deletefromfirebase(id,num);
    alert('patient succesfully checked out');

  };

  //redirect to prescription page
  historyhandler = () => {
    
  };

  deletefromfirebase=(id,num)=>{
    firebase.database().ref('patient').child(id).child('current_appointment').child(num).remove();
    firebase.database().ref('clinic').child(cookie.load('uid')).child('date').child(this.props.date).child('patient_booking')
    .once('value').then(snapshot=>{
      snapshot.forEach(child=>{
        if(child.val().id==id)
        {
          firebase.database().ref('clinic').child(cookie.load('uid')).child('date').child(this.props.date).child('patient_booking')
          .child(child.key).remove();
        }
      })
    })
   // firebase.database().ref('clinic').child(cookie.load('uid')).child('date').child(this.props.date).child(num).remove();
  }

  uploadhandler = (id,filename1,description1) => {
    //event.preventDefault();
    let clinic1 = this.props.clinicname;
    let patient = id;
    console.log('id:'+id+'  filename:'+filename1+'  description:'+description1+'  clinic:'+clinic1);
    firebase
      .database()
      .ref("storage")
      .child(patient)
      .once("value")
      .then(snapshot => {
        let max1 = snapshot.child("max").val();
        if (!max1) max1 = 0;
        max1 = parseInt(max1) + 1;
        firebase
          .database()
          .ref("storage")
          .child(patient)
          .child(max1)
          .set({
            clinic: clinic1,
            filename: filename1,
            description: description1
          });

        firebase
          .database()
          .ref("storage")
          .child(patient)
          .update({
            max: max1
          });
      });
   // alert("visit completed");
  };

  //state change handler
  handler = event => {
    const { name, value } = event.target;
    this.setState(prevState => {
      prevState = JSON.parse(JSON.stringify(this.state));
      prevState[name] = value;
      //console.log(prevState);
      return prevState;
    });
  };

  //fetch data from firebase
  fetchData = (date, clinic) => {
    
    this.setState(prevState => {
      prevState["isloading"] = true;
      return prevState;
    });
    var today = date;
    console.log(today);
    var arr1 = [],
      arr2 = [];
    var clinicname = clinic;
    var starthour, startminit, slottime;
    var flag = 0;

    let db=firebase
      .database()
      .ref("clinic")
      .child(clinicname);
    if(db)
    {
      db.once("value")
      .then(snapshot => {
        if(snapshot.val()==null)
        this.setState({isloading:false});
        var a = snapshot.val();
        var workingarray = a.workingtime.split(" ");
        var hourandminit = workingarray[0].split(":");
        starthour = hourandminit[0];
        startminit = hourandminit[1];
        slottime = a.slot_time;
      })
      .then(() => {
        let data = firebase
          .database()
          .ref("clinic")
          .child(clinicname)
          .child("date")
          .child(today)
          .child('patient_booking')
          .once("value")
          .then(snapshot => {
            //console.log(snapshot.val());
            if (snapshot.val() == null)
             {
               console.log('no values');
              this.setState({
                isloading: false
              });
            } 
            else
             {
              var a = snapshot.val();
              snapshot.forEach(child=>{
                console.log(child.key+'       '+child.val());
                let j1=child.key;
                let j2=child.val().id;
                let j3=child.val().num;
                console.log('id and num  '+ j1+"   "+j2);
                firebase
                  .database()
                  .ref("patient")
                  .child(j2)
                  .once("value")
                  .then(snapshot => {
                    var a = snapshot.val();
                    let arrayofslottime = this.calculateslottime(
                      starthour,
                      startminit,
                      slottime,
                      j1
                    );
                    let slotttime = arrayofslottime[0];
                    let totalminit = arrayofslottime[1];
                    let patientdata = this.state.appointments;
                    patientdata.push({
                      name: a.name,
                      slottime: slotttime,
                      totalminit: totalminit,
                      gender: a.gender,
                      age: a.age,
                      id: j2,
                      num:j3,
                      file: "",
                      fileuploaded: false,
                      showprogressbar: false,
                      description: ''
                    });
                    patientdata.sort(function (a, b) {
                      return a.totalminit - b.totalminit;
                    });

                    this.setState(prevState => {
                      prevState["appointments"] = patientdata;
                      prevState["isloading"] = false;
                      return prevState;
                    });
                  })
                
              })
            }
          });
      });
    }
    else
    {
      console.log('hiii i am in else')
      this.setState({isloading:false});
    }
  };

  //componentdid update for checking changed props in parent
  componentDidUpdate = props => {
    let refresh = this.props.refresh;
    let date = this.props.date;
    let clinic = this.props.clinic;

    if (refresh != props.refresh) {
      // console.log("did update  " + refresh + "  " + date);
      //console.log("appointments prev " + this.state.appointments.length)
      this.setState({ appointments: [] });
      this.fetchData(date, clinic);
    }
  };

  //component did mount
  componentDidMount = () => {
    // console.log("did mount:" + this.props.date + "  " + this.props.refresh);
    this.fetchData(this.props.date, this.props.clinic);
  };

  //checkout handler
  checkouthandler=(event)=>{
    event.preventDefault();
    let index = this.state.appointments.findIndex(function (element) {
      return element.id == event.target.id;
    });
    if(this.state.appointments[index].fileuploaded==false || this.state.appointments[index].description=='')
    {
      alert("please enter description and upload prescription file");
    }
    else
    {
        this.deletehandler(event.target.id,event.target.name);
    }
  }

  render() {
    let index=-1;
    var NewAppointment = this.state.appointments.map(appointment => {
      index++;
      let pbar = <div />;
      if(this.state.current===index)
      pbar = (<ProgressBar
        animated
        varient="success"
        label={this.state.progress}
        now={this.state.progress}
      />
      );

      return (

        <div className="d-flex justify-content-center" >
                <div className="d-flex justify-content-center" style={{width:'50%'}}>
                <form  style={{border:"3px solid grey",marginTop:'1%',borderRadius:'4%',padding:'0.5%',backgroundColor:'#254e58',borderBottomLeftRadius:'4%' }}>
                <div className='list-group'  style={{border:"3px solid grey"}}>
                <div className='list-group-item' style={{backgroundColor:'#f1f1f1'}}>
                
                <h4 style={{fontSize:'17px'}}><b>Patient's Name: </b>{appointment.name}</h4>
                <h4 style={{fontSize:'17px'}}><b>Slot Time: </b>{appointment.slottime}</h4>
                <h4 style={{fontSize:'17px'}}><b>Gender: </b>{appointment.gender}</h4>
                <h4 style={{fontSize:'17px'}}><b>Age: </b>{appointment.age}</h4>
                <h4 style={{fontSize:'17px'}}>
                  <b style={{marginRight:'2%'}}>Description: </b>
                  <Input
                    type="text"
                    placeholder="Description"
                    required
                    id={appointment.id}
                    onChange={this.descriptionhandler}
                    style={{backgroundColor:'white'}}
                    />
                </h4>
                <h4 style={{fontSize:'14px'}}>
                  <b>Prescription File:</b>
                  <form inline onSubmit={this.fileuploadhandler} id={appointment.id}>
                  <Input
                    type="file"
                    id={appointment.id}
                    required
                    onChange={this.fileChangedHandler}
                    style={{backgroundColor:'white'}}
                  />
                  <button className="upload" style={{marginTop:'1%',border:'3px solid black'}} disabled={this.state.current==''?false:true}>Upload</button>
                  </form>
                  {pbar}
                </h4>
                
                <div className="d-flex justify-content-between" style={{marginTop:"3%"}}>
                <div className="d-flex justify-content-start">
                    <Link to={`/prescription/${appointment.id}`}>
                      <button className="btn btn" style={{borderRadius:'5%',height:"90%",borderEndStartRadius:'5%',backgroundColor:"#3aafa9"}}>Check History</button>
                    </Link>
                               
                </div>
                <div className="d-flex justify-content-start">
                    
                      <button className="btn btn" id={appointment.id} name={appointment.num} onClick={this.checkouthandler} style={{borderRadius:'5%',height:"90%",borderEndStartRadius:'5%',backgroundColor:"#5680E9"}}>CheckOut</button>
                    
                               
                </div>

                </div>
                </div>
                </div>
                </form>
                </div>
                </div>



        //{/* // <form className="list-group-item " style={{marginTop:'2%'}}>
        //   <h4 className="list-group-item-heading"> {appointment.name} </h4>
        //   <p className="list-group-item-text">
        //     slottime: {appointment.slottime}
        //   </p>
        //   <p className="list-group-item-text"> gender: {appointment.gender} </p>
        //   <p className="list-group-item-text"> age: {appointment.age} </p>

        //   <label> Description: </label>
        //   <Input */}
       // {/* //     type="text"
        //     placeholder="Description"
        //     required
        //     id={appointment.id}
        //     onChange={this.descriptionhandler}
        //   />

        //   <label> Prescription File: &nbsp; &nbsp; &nbsp; </label>
        //   <form inline onSubmit={this.fileuploadhandler} id={appointment.id}>
        //     <input
        //       type="file"
        //       id={appointment.id}
        //       required
        //       onChange={this.fileChangedHandler}
        //     />
        //     <button className="upload" disabled={this.state.current==''?false:true}>Upload</button>
        //   </form>
        //   {pbar}
        //   <button className="delete" onClick={this.checkouthandler} id={appointment.id}>CheckOut</button>
        //   {/* <button className="history" onClick={this.historyhandler} id={appointment.id}> History </button> */}
       // {/* //    <Link to={`/prescription/${appointment.id}`} >
        //        <button className="btn btn" style={{borderRadius:'5%',height:"90%",borderEndStartRadius:'5%',backgroundColor:"#5680E9"}}>See History</button>
        //    </Link>
        // </form> */} */}
      );
      
    });

    if (this.state.isloading) {
      return (
        <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-center">
          <Spinner color="primary" />
        </div>
        </div>
      );
    }

    return (
      <div>
        <div className="list-group">
          <FlipMove duration={500} easing="cubic-bezier(0,0,1,1)">
            {NewAppointment}
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default Clinic;