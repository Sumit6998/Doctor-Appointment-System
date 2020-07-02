import React, { Component } from "react";
//import "./DoctorDescription.css";
import PropTypes from "prop-types";
import firebase from '../../config/configuration'
//import firebase from './firebase'
//import "./SlotBooking.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '.././navigationbar'

import cookie from 'react-cookies'
import {Redirect} from 'react-router-dom';





class SlotBooking extends Component {

  
 
    constructor(props) {
    super(props);
    console.log('I am in SlotBooking')
   // console.log(this.props.location.state.workingtime);



      // cookie.load('doctorName')
      // cookie.load('slotsDatabase') 
      // cookie.load('workingtime') 
      // cookie.load('slotInterval')
      // cookie.load('breaktime') 
      // cookie.load('patient_booking') 
      // cookie.load('patientId')
      // cookie.load('dateString') 
      // cookie.load('offsetTime')
      // cookie.load('description') 
      // cookie.load('doctor')
      // cookie.load('clinicfees') 
      // cookie.load('clinicname')


      this.slotsDatabase = cookie.load('slotsDatabase') ;
      this.workingtime = cookie.load('workingtime') ;
      console.log('working time..........'+this.workingtime);
      this.slotInterval = cookie.load('slotInterval');
      this.breaktime = cookie.load('breaktime') ;
      this.patient_booking = cookie.load('patient_booking');
      this.patientId = cookie.load('patientId');
      this.dateString = cookie.load('dateString');
      this.offsetTime = cookie.load('offsetTime');
      this.description = cookie.load('description');
    
      this.doctor = cookie.load('doctor');
      this.clinicfees = cookie.load('clinicfees') ;
      this.clinicname = cookie.load('clinicname');
      //console.log(this.workingtime);
      if(this.workingtime)
      {
      this.slotInterval=parseInt(this.slotInterval,10);   
        var arrayWorkingtime = this.workingtime.split(" ");
        var startHour = arrayWorkingtime[0].split(":")[0];
        var startMinute = arrayWorkingtime[0].split(":")[1];
        var endHour = arrayWorkingtime[2].split(":")[0];
        var endMinute = arrayWorkingtime[2].split(":")[1];
        if(this.breaktime.length!=0)
        {
          this.breaktime=this.breaktime.split(",");
        }
          this.breakArray = [];
          this.buttonclick="";
          console.log(this.breaktime+'breaktime length')
        for (let i = 0; i < this.breaktime.length; i++) {
          let tempObj = this.breaktime[i].split(" ");
          this.breakArray.push({
            startHour: tempObj[0].split(":")[0],
            startMinute: tempObj[0].split(":")[1],
            endHour: tempObj[2].split(":")[0],
            endMinute: tempObj[2].split(":")[1]
          });
    }
    
     

    //rows is an Array which contains all the rows that are to be printed for slots
    this.rows = [];
    this.columns=[];
    var currentHour=parseInt(startHour,10);
    var currentMinute=parseInt(startMinute,10);
    let tempvar=0;
    let cnt=0;
    let temp=0;
    console.log("Slot db:",this.slotsDatabase.length);
    for (let i = 0; i < this.slotsDatabase.length; i++) {
        if(cnt==4){
          cnt=0;
          console.log("Hello slot ",temp)
          console.log("Hello slot: rows",this.rows.length);

          this.columns.push(this.rows);



          this.rows=[];
          temp++;
        }
        if(currentMinute>=60)
        {
            
            currentHour+=Math.floor(currentMinute/60);
            currentMinute=currentMinute%60;
        }
        var NextMoment=(parseInt(currentMinute,10)+60*parseInt(currentHour,10))+parseInt(this.slotInterval,10);
        var NextHour=Math.floor(NextMoment/60);
        var NextMinute=NextMoment%60;
        var isInBreak=this.checkIsInBreak(currentHour,currentMinute,NextHour,NextMinute);
        var alreadyBooked=(this.slotsDatabase[i]==1); //Check Here Might Cause Bug
        if(currentHour.toString().length<2)
        {
          currentHour='0'+currentHour.toString();
        }
        if(currentMinute.toString().length<2)
        {
          currentMinute='0'+currentMinute.toString();
        }
        if(NextHour.toString().length<2)
        {
          NextHour='0'+NextHour.toString();
        }
        if(NextMinute.toString().length<2)
        {
          NextMinute='0'+NextMinute.toString();
        }
        if(isInBreak || alreadyBooked)
        {
            //booked
            cnt++;
            this.rows.push(<button key={i} type="button" className="btn btn-outline-danger" style={{width:'23%',height:'10%',fontSize:'11px',paddingBottom:'5%'}} data-key={i} data-id="Booked" onClick={this.giveErrorPrompt}>{currentHour}:{currentMinute} - {NextHour}:{NextMinute}</button>);
            tempvar++;
            if(tempvar%4==0)
            {
              this.rows.push(<br></br>);
              //this.rows.push(<br></br>);
            }  
        }
        else
        {
            //not booked
            cnt++;
            this.rows.push(<button key={i} type="button" className="btn btn-outline-success" style={{width:'23%',height:'10%',fontSize:'11px',paddingBottom:'5%'}} data-key={i} data-id="notBooked" data-value={currentHour+":"+currentMinute +" "+ NextHour+":"+NextMinute} onClick={this.bookThisSlot}>{currentHour}:{currentMinute} - {NextHour}:{NextMinute}</button>);
            tempvar++;
            if(tempvar%4==0)
            {
              this.rows.push(<br></br>);
              //this.rows.push(<br></br>);
            }
        }
        currentHour=NextHour;
        currentMinute=NextMinute;
        currentHour=parseInt(currentHour,10);
        currentMinute=parseInt(currentMinute,10);
    }
    this.columns.push(this.rows);
    console.log("Hello slot: columns",this.columns.length);

    this.state = {
      slots:  this.slotsDatabase 
    };
  }
}

  /////// Function to give error prompt for selecting booked Slot ///////
  giveErrorPrompt = () =>
  {
    alert('You can\'t book this slot, It is not available for Booking');
  }

  static contextTypes = {
    router: PropTypes.object
}

  ////// Function to book the current slot selected By User///////
  bookThisSlot = (event)=>
  {
      //change color of button because it is clicked
      var target=event.target;
      var wantToBook=window.confirm('Are you Sure you want to book this appointment?');
      if(wantToBook)
      {
        this.buttonclick=event.target.dataset.value;
          var index=event.target.dataset.key;
          var timeofbook=event.target.dataset.value;
          console.log('hello world  time book is '+timeofbook)
          var newString=this.state.slots.substring(0,index)+'1'+this.state.slots.substring(parseInt(index,10)+1);
          console.log(this.patient_booking);
        //  this.patient_booking[index]=this.patientId;
          console.log(newString);
        cookie.save('slotsDatabase',newString,{path:'/'});
      this.setState({
        slots:newString
      },()=>{


        const clinic=firebase.database().ref('clinic').child(this.props.location.state.doctorName).child("date").child(this.dateString);

       // const clinic=firebase.database().ref('clinic').child(this.props.doctorName).child("date").child(this.dateString);

       clinic.update({slot_string:this.state.slots});
       //clinic.update({patient_booking:this.patient_booking}); //updates booking info
       //adding clinic details to patient's current appointment
        const patient=firebase.database().ref('patient').child(this.patientId).child("current_appointment");
        patient.once("value").then(snapshot=>{
        const val=snapshot.val();
          let max1=snapshot.child('max').val();
          if(!max1)
          max1=0;
          max1=parseInt(max1)+1;
          patient.child(max1).set({
            clinic:this.props.location.state.doctorName,
            date:this.dateString,
            slot_time:timeofbook,

          })
          patient.update({
            max:max1,
          })

          clinic.child('patient_booking').child(index).set({id:this.patientId,num:max1});

          cookie.remove('doctorName',{ path: '/'  })
          cookie.remove('slotsDatabase', { path: '/' })
          cookie.remove('workingtime',  { path: '/' })
          cookie.remove('slotInterval', { path: '/' })
          cookie.remove('breaktime',{ path: '/' })
          cookie.remove('patient_booking', { path: '/' })
          cookie.remove('patientId',{ path: '/'})
          cookie.remove('dateString', { path: '/' })
          cookie.remove('offsetTime', { path: '/' })
          cookie.remove('description', { path: '/' })
          cookie.remove('doctor', { path: '/' })
          cookie.remove('clinicfees', { path: '/' })
          cookie.remove('clinicname', { path: '/' })
          alert('succesfully booked ');
          this.props.history.push('/');

       /*  this.clinicforupdate=val.clinic;
        this.dateforupdate=val.date;
        this.slot_numberforupdate=val.slot_number;
        //promise in firebase to modify only after reading full data
        console.log(this.clinicforupdate+"  "+this.dateforupdate+"  "+this.slot_numberforupdate);
        this.clinicforupdate=this.clinicforupdate+this.props.location.state.doctorName;
        this.dateforupdate=this.dateforupdate+this.dateString;
        this.slot_numberforupdate=this.slot_numberforupdate+""+index;
        patient.update({clinic:this.clinicforupdate});
        patient.update({date:this.dateforupdate});
        patient.update({slot_number:this.slot_numberforupdate+""+index});
        console.log(this.clinicforupdate+"  "+this.dateforupdate+"  "+this.slot_numberforupdate);*/

        });
   
        


       // ROUTE TO NEXT PAGE FROM HERE
      })
      }
  }

  

    ///// Function to check if current time is in Break or not//////
   checkIsInBreak = (currentHour,currentMinute,NextHour,NextMinute) => {

    var currentHourGlobal=currentHour;
    var currentMinuteGlobal=currentMinute;
    var normalizetime=60*currentHour+currentMinute;
    if(normalizetime<=this.offsetTime)
    {
      return true;
    }
    for(let j=0;j<this.breakArray.length;j++)
    {
        currentHour=currentHourGlobal;
        currentMinute=currentMinuteGlobal;
        var breakStartHour=parseInt(this.breakArray[j].startHour,10);
        var breakStartMinute=parseInt(this.breakArray[j].startMinute,10);
        var breakEndHour=parseInt(this.breakArray[j].endHour,10);
        var breakEndMinute=parseInt(this.breakArray[j].endMinute,10); 
        var minutesOfBreakStart=parseInt(breakStartMinute,10)+60*parseInt(breakStartHour,10);
        var minutesOfBreakEnd=parseInt(breakEndMinute,10)+60*parseInt(breakEndHour,10);
        for(let i=0;i<this.slotInterval-1;i++)
        {
            if(currentHour>NextHour || (currentHour==NextHour && currentMinute>=NextMinute))
            break;
            if(currentMinute>=60)
            {
                currentHour+=Math.floor(currentMinute/60);
                currentMinute=currentMinute%60;
            }
            var minuteOfCurrentMinute=parseInt(currentMinute,10)+60*parseInt(currentHour,10);
            currentMinute++;
            if(minuteOfCurrentMinute>=minutesOfBreakStart && minuteOfCurrentMinute<minutesOfBreakEnd)
                return true;
        }
    }
    return false;

  }

  render() {


    console.log("printing in slotbooking "+this.clinicname);
      if(!this.dateString || !this.clinicname)
      {
        return (<Redirect  to='/'> </Redirect>)
      }


    var link='https://www.paytm.com'
    return (

      <React.Fragment>

        <NavigationBar/>
          <div className="d-flex justify-content-center" style={{marginTop:'1%'}}>
          <div  className="d-flex justify-content-center">
          <h3><button className="btn btn" style={{color:'white',backgroundColor:'#254e58',height:'70%',marginBottom:'10%',fontSize:'70%',padding:'1%'}}><b>Book a Slot</b></button></h3>
          </div>
          </div>
          <form  style={{marginLeft:'13%',marginTop:'3%',marginRight:'13%',paddingBottom:'1%'}}>
            <div className="d-flex justify-content-between"  style={{marginLeft:'2%',marginTop:'3%'}}>
              <div className="d-flex justify-content-start" style={{marginTop:'10%'}}>
              <form>
              
              <h4 style={{fontSize:'14px',marginTop:'3%'}}><b>Clinic's Name: </b></h4>
              <h4 style={{fontSize:'14px',marginTop:'3%'}}><b>Doctor's Name: </b></h4>
              <h4 style={{fontSize:'14px',marginTop:'3%'}}><b>Clinic Fees: </b></h4>
              <h4 style={{fontSize:'14px',marginTop:'3%'}}><b>Slot Time: </b></h4>
              </form>
              </div>
              
              <div className="d-flex justify-content-center" style={{marginTop:'10%'}}>
              <form>
             

              <h4 inline style={{fontSize:'14px',marginTop:'3%'}}>{this.clinicname}</h4>
              <h4 style={{fontSize:'14px',marginTop:'3%'}}>{this.doctor}</h4>
              <h4 style={{fontSize:'14px',marginTop:'3%'}}>{this.clinicfees}</h4>
              <h4 style={{fontSize:'14px',marginTop:'3%'}}>{this.buttonclick}</h4>

             
              
              
                
              </form>
              
              </div>
              <div className="d-flex justify-content-end">
              <div style={{width:'1px',backgroundColor:'grey',height:'80%'}}>
                </div>
                 <form style={{marginLeft:'2%'}}> 
                  {this.columns.map(columns=>columns)}
                  </form>
              </div>
              
              

            </div>

            <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center">
            <form action={link} method="get" target="_blank">


             <button className="btn btn" style={{color:'white',borderRadius:'5%',height:"90%",borderEndStartRadius:'5%',backgroundColor:"#5680E9",fontSize:'90%'}}>Confirm Booking</button>

   


            </form>
            </div>
            </div>

          </form>
      </React.Fragment>



      // <div> 
      //   {/*  Props of doctorName and other doctor details  will be send by Parent Page */}
      //   <div >

      //     <h2 align="center">{this.props.location.state.doctorName}</h2>

      //     <h2 align="center">{this.props.doctorName}</h2>

      //     <p> {this.description}</p>
      //   </div>
      //   <text className="datestring">Slots for {this.dateString} </text>
      //   <br></br>
      //   <br></br>
      //   <div>
      //   {
      //     this.columns.map(columns=>columns)
      //   }
      //   </div>
      //   <button type="button" className="btn btn-outline-success">Booked</button>
      //   <button type="button" className="btn btn-outline-danger">Not Booked</button>
      // </div>
    );
  }
}

export default SlotBooking;