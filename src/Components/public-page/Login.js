import React, { Component } from 'react'
import firebase from '../../config/configuration';
import { Col,Button, Form, FormGroup, Label, Input, FormText ,Container} from 'reactstrap';
import {Link}  from 'react-router-dom';
import './Login_style.css'

import Stylee from './Stylee.css'


 class Login extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         email:"",
         password:""
      }
    }
    
   


  render() {

    return (

      // <div>
      // <input type="text" name="username" hint="email" onChange={this.props.handleChage} />
      // <input type="password" name="password" hint="password" onChange={this.props.handleChage} />
      // <button  name="submit" onClick={this.props.submitHandler}> Submit</button></div>





      <body className="BACK" style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
         


      <form  onSubmit={this.props.submitHandler}  className='container' style={{width:700}}>
          <h1 className="t1">Login</h1>
              <br/>
          <div style={{marginLeft:80}}>
           <FormGroup row>
           <Label className="email" sm={3}><b>Email:</b></Label> 
           <Col sm={5}  >
           <Input type="text" placeholder="Enter Email" name="email" onChange={this.props.handleChage}
            value={this.props.email} required   style={{backgroundColor:'white',marginLeft:1}}/><hr/>
            </Col>
           </FormGroup> 
           

           <FormGroup row>
           <Label className="psw"  sm={3}><b>Password:</b></Label>
           <Col sm={5}>
           <Input type="password" placeholder="Enter Password" name="password" onChange={this.props.handleChage}
            value={this.props.password}  required style={{backgroundColor:'white',marginLeft:3,border: 3 }}/><hr/>
            </Col>
           </FormGroup>
           </div>
           
           
           <div className="clearfix" style={{textAlign: 'center'}}>
            {/* <button type="button" class="cancelbtn">Cancel</button> */}
            <Button   color='primary'   style={{width: 100,borderRadius:5}}  >Login</Button>
            <br/><br/><br/>
            </div>
            <div style={{marginLeft:60}}>
            <h5 ><b>Are you Doctor?     </b> <Link to="/signupclinic"> click here</Link> </h5>
           <h5><b>Are you Patient?</b>  <Link to="/signuppatient"> click here</Link></h5>
           </div>                                 
                  {/* <Link to={'/signup'}>
                    <button className="btn btn-outline-dark btn-lg">
                        <span className="mr-2">signup</span>
                        <i className="fa fa-angle-right"></i>
                    </button>
                </Link> */}

           </form>          
           
           </body>
           
    )
  }
}

export default Login;


