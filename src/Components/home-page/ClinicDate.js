import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { MenuElementKind } from 'react-navbar'
import { Collapse, NavbarToggler, NavbarBrand } from 'react-bootstrap'; 
import { NavDropdown, Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Spinner, Col, Button, Form, FormGroup, h3, Input, FormText, Container } from 'reactstrap';
//import './Clin.css'
import { CardBody, Card } from 'reactstrap';
import firebase from './../../config/configuration';
import FlipMove from "react-flip-move";
import Clinic from './Clinic';
import DatePicker from "react-custom-date-picker";
import NavigationBar from './../navigationbar';
import {Redirect} from 'react-router-dom'; 

//1import "react-datepicker/dist/react-datepicker.css";
import cookie from 'react-cookies';

//hello2

class ClinicDate extends Component {

    constructor(props) {
        super(props)
        this.state = {
          date: new Date(),
          actualdate: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
          refresher:true,
          clinicname:'',
          redirect:false,
          bld:'select'
        };
    }


    handleChange=(date)=> {
        var actualdate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        this.setState({
            startDate: date,
            actualdate:actualdate,
            refresher:!this.state.refresher
        });
        
    }

    handler=(event)=>{
      this.setState({
        bld:event.target.value
      })
    }

    submithandler=(event)=>{
      event.preventDefault();
      if(this.state.bld=='select')
      {
        alert('enter blood group');
      }
      else
      {
          this.setState({
            redirect:true
          })
      }
     
    }

    componentDidMount=()=>{
      firebase.database().ref('clinic').child(cookie.load('uid')).once('value').then(snapshot=>{
        this.setState({
          clinicname:snapshot.val().clinicname
        })
      })
    }
    
    
    render() {
      let propdate = this.state.actualdate;
      if(this.state.redirect==true)
      {
        return (
        <Redirect push
          to={{
            pathname: "/BloodGroup",
            state: { bloodgroup: this.state.bld }
          }}
        />
        )
      }

        return (
          <div>
      
      <div className="d-flex justify-content-end" >
                <div className="d-flex justify-content-end" style={{backgroundColor:'#f1f1f1',marginTop:'0.5%',marginBottom:'2%',marginRight:'4%'}}>
            
            <form className="form-inline" onSubmit={this.submithandler} >
            <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center" style={{marginRight:'2%'}}>
           
              <select value={this.state.bld} onChange={this.handler} required className="form-control" style={{height:'120%',fontSize:'120%'}}>
                <option value="select">Select a blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>

              </div>
              </div>
              </form>
              

              <button className="btn btn" type="submit" style={{color:'white',borderRadius:'5%',backgroundColor:'green',height:'89%',fontSize:'89%'}} onClick={this.submithandler}>Search</button>


              
            
            </div>
            </div>



                <div className="d-flex justify-content-center">

                <div className="d-flex justify-content-start" style={{marginBottom:'0%'}}>
                <h3><button className="btn btn" style={{color:'white',backgroundColor:'#116466',height:'70%',marginBottom:'10%',fontSize:'70%',padding:'1%'}}><b>List Of Appointments</b></button></h3>

                </div>
                </div>
           
              
                <div className="d-flex justify-content-center" >
                <div className="d-flex justify-content-center">

                  <form style={{height:'100%'}}>
                  <h4><b style={{fontSize:'20px'}}>Date: </b><DatePicker date={this.state.startDate}
                        handleDateChange={this.handleChange} inputStyle={{height:'30px',backgroundColor:'white'}}/></h4>
                  

                  </form>
                </div>
                
                
                </div>
              
              
              
              {/* <h3>
                <b>DATE: </b>
              </h3>
            <DatePicker selected={this.state.startDate}
                        onChange={this.handleChange}/> */}
             
          

            <Clinic date={propdate} clinic={this.props.id} clinicname={this.state.clinicname} refresh={this.state.refresher} style={{marginTop:'2%'}}></Clinic> 
          </div>
        );
    }
}

export default ClinicDate;