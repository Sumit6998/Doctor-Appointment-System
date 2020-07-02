import React, { Component } from "react";
//import "./DoctorDescription.css";
//import "./todaytomorrow.css";
//import "./TempPage.scss";
import PropTypes from "prop-types";
import firebase from '../../config/configuration'
import Calendar from 'react-calendar';
import Button from 'react-bootstrap/Button'
import SlotBooking from "./jeettmp";
import SendProps from "./SendProps";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../navigationbar'
import DatePicker from 'react-custom-date-picker'
import {Spinner} from 'reactstrap'
import { CLIENT_RENEG_LIMIT } from "tls"; 
import cookie from 'react-cookies';
////// WARNING : PASS ALL THE PROPS RECEIVED IN THIS COMPONENT TO SLOT BOOKING PAGE OTHERWISE IT WILL NOT WORK/////

class TempPage extends Component {
 
    constructor(props) {
    super(props);
    this.state = ({
        date:new Date(),
        bookSlot:false,
        dataAvailable:false,
    });
    this.timeGone=false;

    }

    componentDidMount=()=>{
        console.log('in temppage'+cookie.load('clinicid'));
        let doctor=firebase.database().ref('/clinic').child(cookie.load('clinicid'));
        
        doctor.once("value").then(snapshot=>{
            const val =snapshot.val();
            this.clinicname=val.clinicname;
            this.doctor=val.doctor;
            this.specialist=val.specialist;
            this.degree=val.degree;
            this.age=val.age;
            this.phone=val.phone;
            this.clinicfees=val.clinicfees;
            this.street=val.street;
            this.area=val.area;
            this.city=val.city;
            this.link=val.link;
            console.log("data received is "+this.clinicname);
            this.setState({
                dataAvailable:true
            })
        })
    }

    onChange = (date) =>{
        this.timeGone=date < new Date();
        this.setState({
            date:date,
            
        },()=>{
            if(this.state.date.toDateString()==new Date().toDateString())
            {
                this.setState({
                    date:new Date()
                });
                this.timeGone=false;
            }
            console.log('new state is '+this.state.date);
        });
    };

    onTodayClick = ()=>{
        var today=new Date();
        this.setState({
            date:today
        },()=>{
            console.log('todays date is '+this.state.date);
        });
    }

    onTomorrowClick = ()=>{
        var tomorrow=new Date();
        tomorrow.setDate(tomorrow.getDate()+1);
        tomorrow.setHours(0,0,0,0);
        this.setState({
            date:tomorrow
        },()=>{
            console.log('tomorrow date is '+this.state.date);
        });
    }

    bookSlot = ()=>
    {
        this.setState({
            bookSlot:true,
        });
    }


  render() {
      console.log(this.state.dataAvailable+"   statedataavilable ");
     // console.log(' in temp page doctor key '+  this.props.computedMatch.params.id);
     // console.log('in temppage patient key '+this.props.patientId);
      var link='https://www.google.com/maps/place/Nidhi+Multispeciality+Hospital/@23.0401044,72.5592146,17z/data=!3m1!4b1!4m15!1m7!3m6!1s0x395e84f521440d4b:0x6853ee97a9a2996b!2sNavrangpura,+Ahmedabad,+Gujarat!3b1!8m2!3d23.0365437!4d72.5611395!3m6!1s0x395e848c996426c3:0x915350ab1da7fe78!8m2!3d23.0400999!4d72.5614035!9m1!1b1'
    /*  Props of doctorName and other doctor details  will be send by Parent Page */

    if(this.state.bookSlot){

        return(
            // <SendProps doctorName={this.props.computedMatch.params.id} patientId={this.props.patientId} searchDate={this.state.date}

            //  doctor={this.doctor} clinicfees={this.clinicfees} clinicname={this.clinicname} timeGone={this.timeGone}/>

            <SendProps doctorName={cookie.load('clinicid')} patientId={cookie.load('uid')} searchDate={this.state.date}

                doctor={this.doctor} clinicfees={this.clinicfees} clinicname={this.clinicname} timeGone={this.timeGone} />
        )
    }
    else if(this.state.dataAvailable){

        return(
            <div>
                <React.Fragment>
            <NavigationBar/>

            
            <div className="d-flex justify-content-center">
                <div  className="d-flex justify-content-center">

                <h3><button className="btn btn" style={{color:'white',backgroundColor:'#116466',height:'70%',marginBottom:'10%',fontSize:'70%',padding:'1%'}}><b>Book a Slot</b></button></h3>

                </div>
            </div>



            <div className="d-flex justify-content-center" style={{marginTop:'3%',marginBottom:'2%'}}>
                                <div className="d-flex justify-content-start">
                                  <form style={{height:'100%'}}>
                                  <h4><b style={{fontSize:'20px'}}>Date: </b><DatePicker date={this.state.date}
                                            handleDateChange={this.onChange} inputStyle={{height:'30px',backgroundColor:'white'}}/></h4>
                                </form>
                                </div>
                                <div className="d-flex justify-content-center" style={{marginLeft:'1%'}}>
                                    <button className="btn btn-primary" style={{height:'100%',fontSize:'100%',borderRadius:'5%'}} onClick={this.bookSlot}>Proceed to Slots</button>
                                </div>
                                
            </div>
            


            
            <div className="d-flex justify-content-center">                

                <div className="d-flex justify-content-center" style={{width:'50%'}}>



                <form style={{border:"3px solid grey",marginTop:'1%',borderRadius:'4%',padding:'0.5%',backgroundColor:'#254e58',borderBottomLeftRadius:'4%',width:'80%' }}>

                <div className='list-group' style={{border:"3px solid grey"}}>
                <div className='list-group-item' style={{backgroundColor:'#f1f1f1'}}>
                <h2 style={{textAlign:"center"}}>Clinic Details</h2>
                <h4 style={{fontSize:'14px',marginTop:'1%'}}><b>Clinic Name: </b>{this.clinicname}</h4> 
                                <h4 style={{fontSize:'14px'}}><b>Doctor Name: </b>{this.doctor}</h4> 
                                <h4 style={{fontSize:'14px'}}><b>Specialist: </b>{this.specialist}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Degree: </b>{this.degree}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Age: </b>{this.age}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Phone: </b>{this.phone}</h4>                                
                                <h4 style={{fontSize:'14px'}}><b>Clinicfees: </b>{this.clinicfees}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Street: </b>{this.street} </h4>
                                <h4 style={{fontSize:'14px'}}><b>Area: </b>{this.area} </h4>
                                <h4 style={{fontSize:'14px'}}><b>City: </b>{this.city}</h4>
                                {/* <AuthorizedRoute permission={this.state.user === 'patient' ? true : false }  path="/slotbook" exact strict 
                                 component={Slotbook} patientId={this.state.key}  />  */}
                                {/* <AuthorizedComponent
                                    component={Gotoslot} permission={true}  />                                */}
                                 {/* <Link to="/slotbook/john" >go to sloot book</Link>    */}
                                <div className="d-flex justify-content-between" style={{marginTop:'2%'}}>
                                <div className="d-flex justify-content-start">
                                <form action={this.link} method="get" target="_blank">
                                 <button className="btn btn" style={{color:'white',borderRadius:'5%',height:"70%",borderEndStartRadius:'5%',backgroundColor:"#3aafa9",fontSize:'70%'}}   >Locate<i style={{marginLeft:'10%'}} className={'fas fa-map-marker-alt'} color="green"/></button>
                                </form>
                                 </div>
                                </div>

                                
                </div>
                </div>        
                </form>
                
               
                </div>
            </div>
                                        
        </React.Fragment>     
            
            </div>

        )
    }
    else{
       
       return(<div>
            <Spinner color='primary'></Spinner>
        </div>)

    }

    


  }
}

export default TempPage;