import React, { PureComponent } from 'react'
import SlotBooking from './slotbooking';
import TempPage from './TempPage'
import firebase from '../../config/configuration'
import { Spinner } from 'reactstrap';
import { isNull } from 'util';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

 class SendProps extends PureComponent {
    constructor(props) {
      super(props)
      console.log('I am in SendProps '+this.props.searchDate);
      this.getDateString();
      this.dayObject={'Mon':0,'Tue':1,'Wed':2,'Thu':3,'Fri':4,'Sat':5,'Sun':6};
      this.willWork=true;
      this.timeGone=this.props.timeGone;
      console.log("time gone is "+this.timeGone)
      this.state= {
          isData1Available:true,
          isData2Available:true,
      };
    }

  componentDidMount=()=>{

    let patients=firebase.database().ref('/clinic').child(this.props.doctorName+"");
    patients.on("value",snapshot=>{
        const val=snapshot.val();
        console.log(val);
        this.workingtime=val.workingtime;
        console.log('working time:::::::'+this.workingtime);
        this.workingdays=val.workingdays;
        this.willWork=(this.workingdays.charAt(this.dayObject[this.day],1)=='1')?true:false;
        console.log(this.workingdays.substring(this.dayObject[this.day],1)+ "  this will work on "+this.willWork);
        this.slotInterval=val.slot_time;
        this.breaktime=val.breaktime;
        this.description=val.description;
        this.setState(
            {
                isData1Available:false
            });
        });
      console.log(this.dateString);

      //check here if child is NULL, make new child else update itand pass
      patients=firebase.database().ref('/clinic').child(this.props.doctorName+"").child("date").child(this.dateString);
      //  console.log('patient is null '+ isNull(patients));
        console.log(patients);
      patients.once("value").then(snapshot=>{
        const val=snapshot.val();
        if(isNull(val) && !this.timeGone && this.willWork)
        {
          this.patient_booking=[];
          this.temptime=(this.workingtime);
          console.log(this.workingtime+"  "+typeof this.workingtime);
          this.temparr=this.temptime.split(' ');
          console.log(this.temparr+"  temparr");
          //starttime is temparr[0] and endtime is temparr[2]
          this.startminutes=0;
          this.endminutes=0;
          this.startingtime=this.temparr[0].split(':');
          this.endingtime=this.temparr[2].split(':');
          console.log(this.startingtime+"  printing "+this.endingtime);
          this.startminutes=parseInt(this.startingtime[0],10)*60+parseInt(this.startingtime[1],10);
          this.endminutes=parseInt(this.endingtime[0],10)*60+parseInt(this.endingtime[1],10);
          console.log(this.startminutes+"   "+this.endminutes+"  minutes  ");
          this.length=Math.ceil(Math.floor(this.endminutes-this.startminutes)/this.slotInterval);

          this.slotsDatabase="";
          for(var xx=0;xx<this.length;xx++)
          {
            this.slotsDatabase=this.slotsDatabase+"0";
          }
          let val=firebase.database().ref('/clinic').child(this.props.doctorName).child("date").child(this.dateString);
          this.arr=[];

          let d = new Date();
          d.setTime(d.getTime() + (5 * 60 * 1000));
          let expires1 = d;
          console.log(this.props);
          cookie.save('doctorName', this.props.doctorName, { path: '/', expires: expires1 })
          cookie.save('slotsDatabase', this.slotsDatabase, { path: '/', expires: expires1 })
          cookie.save('workingtime', this.workingtime, { path: '/', expires: expires1 })
          cookie.save('slotInterval', this.slotInterval, { path: '/', expires: expires1 })
          cookie.save('breaktime', (this.breaktime), { path: '/', expires: expires1 })
          cookie.save('patient_booking',JSON.stringify( this.patient_booking), { path: '/', expires: expires1 })
          cookie.save('patientId', cookie.load('uid'), { path: '/', expires: expires1 })
          cookie.save('dateString', this.dateString, { path: '/', expires: expires1 })
          cookie.save('offsetTime', this.offsetTime, { path: '/', expires: expires1 })
          cookie.save('description', this.description, { path: '/', expires: expires1 })
          cookie.save('doctor', this.props.doctor, { path: '/', expires: expires1 })
          cookie.save('clinicfees', this.props.clinicfees, { path: '/', expires: expires1 })
          cookie.save('clinicname', this.props.clinicname, { path: '/', expires: expires1 })

          val.set({slot_string:this.slotsDatabase});
          this.setState(
            {
                isData2Available:false
            },()=>{

              


            });
          
          // doctorName: this.props.doctorName,
          //   slotsDatabase: this.slotsDatabase,
          //     workingtime: this.workingtime,
          //       slotInterval: this.slotInterval,
          //         breaktime: this.breaktime,
          //           patient_booking: this.patient_booking,
          //             patientId: cookie.load('uid'),
          //               dateString: this.dateString,
          //                 offsetTime: this.offsetTime,
          //                   description: this.description,
          //                     doctor: this.props.doctor,
          //                       clinicfees: this.props.clinicfees,
          //                         clinicname: this.props.clinicname,
          
          // cookie.save('doctorName', this.props.doctorName, { path: '/', expires: expires1 })
          // cookie.save('slotsDatabase',this.slotsDatabase,{path:'/',expires:expires1})
          // cookie.save('workingtime', this.workingtime, { path: '/', expires: expires1 })
          // cookie.save('slotInterval', this.slotInterval, { path: '/', expires: expires1 })
          // cookie.save('breaktime', this.breaktime, { path: '/', expires: expires1 })
          // cookie.save('patient_booking',this.patient_booking,{path:'/',expires:expires1})
          // cookie.save('patientId',this.cookie.load('uid'),{path:'/',expires:expires1})
          // cookie.save('dateString', this.dateString, { path: '/', expires: expires1 })
          // cookie.save('offsetTime', this.offsetTime, { path: '/', expires: expires1 })
          // cookie.save('description', this.description, { path: '/', expires: expires1 })
          // cookie.save('doctor', this.doctor, { path: '/', expires: expires1 })
          // cookie.save('clinicfees', this.clinicfees, { path: '/', expires: expires1 })
          // cookie.save('clinicname', this.clinicname, { path: '/', expires: expires1 })
        

        }
        else if(!this.timeGone && this.willWork)
        {
        this.patient_booking=val.patient_booking;
        this.slotsDatabase=val.slot_string;

          let d = new Date();
          d.setTime(d.getTime() + (5 * 60 * 1000));
          let expires1 = d;
          console.log(this.props);
          cookie.save('doctorName', this.props.doctorName, { path: '/', expires: expires1 })
          cookie.save('slotsDatabase', this.slotsDatabase, { path: '/', expires: expires1 })
          cookie.save('workingtime', this.workingtime, { path: '/', expires: expires1 })
          cookie.save('slotInterval', this.slotInterval, { path: '/', expires: expires1 })
          cookie.save('breaktime', (this.breaktime), { path: '/', expires: expires1 })
          cookie.save('patient_booking', JSON.stringify(this.patient_booking), { path: '/', expires: expires1 })
          cookie.save('patientId', cookie.load('uid'), { path: '/', expires: expires1 })
          cookie.save('dateString', this.dateString, { path: '/', expires: expires1 })
          cookie.save('offsetTime', this.offsetTime, { path: '/', expires: expires1 })
          cookie.save('description', this.description, { path: '/', expires: expires1 })
          cookie.save('doctor', this.props.doctor, { path: '/', expires: expires1 })
          cookie.save('clinicfees', this.props.clinicfees, { path: '/', expires: expires1 })
          cookie.save('clinicname', this.props.clinicname, { path: '/', expires: expires1 })

        this.setState(
          {
              isData2Available:false
          });
        }
        else
        {
          this.setState(
            {
                isData2Available:false
            });
        }
    });
  }
     
   getDateString = ()=>{
      var str=this.props.searchDate.toDateString();
    console.log("original string is "+str);
      str=str.split(" ");
      console.log("datestring is "+str);
      this.day=str[0];
      this.dateString=str[2]+'-'+(this.props.searchDate.getMonth()+1)+'-'+str[3];
      this.offsetTime=this.props.searchDate.getHours()*60+this.props.searchDate.getMinutes();
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
     if(!this.state.isData1Available && !this.state.isData2Available)
     {
       //will work only if all data is available
       console.log('returning');
      console.log('state is '+this.state.isData1Available+" "+this.state.isData2Available);
      console.log(this.patient_booking);
     console.log(this.slotsDatabase);
        console.log(this.workingtime);
      console.log(this.slotInterval);
      console.log(this.breaktime);
      if(this.willWork && !this.timeGone)
      {
        return (
          <div>
          <h1>Hello</h1>
          <Redirect push to={{
              // pathname: `/slotbook2/${this.props.patientId}`,
              pathname:'/slotbook2',
              state: { 
                doctorName: this.props.doctorName,
                    slotsDatabase: this.slotsDatabase,
                    workingtime:this.workingtime,
                    slotInterval:this.slotInterval,
                    breaktime:this.breaktime,
                    patient_booking:this.patient_booking,
                    patientId:cookie.load('uid'),
                    dateString:this.dateString,
                    offsetTime:this.offsetTime,
                    description:this.description,
                    doctor:this.props.doctor,
                    clinicfees:this.props.clinicfees,
                    clinicname:this.props.clinicname,
               }
          }} />
  
            {/* <SlotBooking doctorName={this.props.doctorName} slotsDatabase={this.slotsDatabase} 
                workingtime={this.workingtime} slotInterval={this.slotInterval} 
                breaktime={this.breaktime} patient_booking={this.patient_booking} 
                patientId={this.props.patientId} 
                dateString={this.dateString} offsetTime={this.offsetTime} description={this.description} */}
  
          </div>
        )
      }
      else
      {
        if(!this.willWork && this.timeGone)
        {
         // console.log("working as expected ........................");
          return(
            <div>
            <h1>Doctor is Having Holiday on {this.day}day, Please try booking on other days</h1>
            <h1>Current day has gone,Please select appropriate day</h1>
            </div>
          )
        }
        else if(!this.willWork)
        {
          return (
            <div>
            <h1>Doctor is Having Holiday on {this.day}day, Please try booking on other days</h1>
            </div>
          )
        }
        else
        {
          return (
            <div>
            <h1>Current day has gone,Please select appropriate day</h1>
            </div>
          )
        }

        
      }
    }
    else
    {
      return (
      <div> 
      <Spinner color="primary" />
       </div>
      )
    }
  }
}

export default SendProps