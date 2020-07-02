import React from 'react';
import NavigationBar from '../navigationbar';
import  List from './List';
import firebase from '../../config/configuration';
import _ from 'lodash';
import Datalist from './datalist';
import Slotbook from '../slots/jeettmp';
import {BrowserRouter as Router, Redirect, Route, Switch,Link} from "react-router-dom";
import AuthorizedComponent from '../AuthorizedComponent';
import Clinicdate from './ClinicDate';
import { CLIENT_RENEG_LIMIT } from 'tls';


//1import { MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import cookie from 'react-cookies';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cliniclist:[],
            iscurrappoitmentopen :false,
            isrevisappoitmentopen :false,
            isloading:false,
            refresh:false

        }
        this.opencurrapp = this.opencurrapp.bind(this);
    }
    componentDidMount(){
        this.getclinic();
    }

    getclinic=()=>{
        this.setState({isloading:false,refresh:!this.state.refresh});
        let clinicsref=firebase.database().ref('/clinic').orderByKey();
        // clinicsref.once("value").then(snapshot=>{
           
        //     this.setState({
        //         cliniclist : snapshot.val()
        //     },()=>{
        //      //   console.log(this.state);
        //     })
                     
        // })  
        clinicsref.once("value").then(snapshot=>{
           // console.log('hiiiiiiiiiiiiiiiiiii');
            snapshot.forEach(child1=>{
              //  console.log('child key '+child1.key);
              //  let l2=firebase.database().ref('/clinic').child(child1.key).once("value").then(snapshot1=>{
                 //   console.log()
                 let snapshot1=child1;
                    let currentcliniclist=this.state.cliniclist;
                    //currentcliniclist.push(snapshot1.val());
               //     console.log('parent key'+snapshot1.key)
                    currentcliniclist.push({
                        clinicname:snapshot1.val().clinicname,
                        doctor:snapshot1.val().doctor,
                        age:snapshot1.val().age,
                        doctorkey:snapshot1.key,
                        degree:snapshot1.val().degree,
                        specialist: snapshot1.val().specialist,
                        gender: snapshot1.val().gender,
                        phone: snapshot1.val().phone,
                        clinicfees: snapshot1.val().clinicfees,
                        street: snapshot1.val().street,
                        city: snapshot1.val().city,
                        area: snapshot1.val().area,
                       link:snapshot1.val().link

                    })
                 //   console.log(currentcliniclist[currentcliniclist.length-1].age)
                    this.setState({
                        cliniclist : currentcliniclist,
                        refresh:!this.state.refresh
                    })
                })
            })
        
    }
    opencurrapp=()=>{
        console.log('open currappoitment ');
        this.setState({
            iscurrappoitmentopen: !this.state.iscurrappoitmentopen
        });
    }
    openrevisapp=()=>{
        console.log('open currappoitment ');
        this.setState({
            isrevisappoitmentopen: !this.state.isrevisappoitmentopen
        });
    }
    componentWillMount=()=>{
       // cookie.remove('clinicid',{path:'/'});
    }
    render(){
        if(this.state.isloading)
        {
            return (<div>loading</div>)
        }
        const {user}=this.props;
    //    console.log('home-page i am '+user);
        return(

            <React.Fragment >
                <NavigationBar/>
                
                {                   
                    this.props.user==='patient' ?
                    <div >
                


                    {/* <div className="h-100 d-inline-block">
                    
                    <MDBNav className="nav-pills" color="black">
                        <MDBNavItem>
                            <MDBNavLink active to="#!"><i className={"fa fa-home"} style={{marginRight:'5px'}}/>Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink  to={'/MyProfile'}><i className={"fa fa-user"} style={{marginRight:'5px'}}/>Profile</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to={'/prescription'}><i className={"fa fa-cog"} style={{marginRight:'5px'}}/>Prescription</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink disabled to="#!"><i className={"fa fa-logout"} style={{marginRight:'5px'}}/>Logout</MDBNavLink>
                        </MDBNavItem>
                        </MDBNav>                
                    </div> */}
                    
                <div className="d-flex justify-content-center" >
                    <div className="d-flex justify-content-center" style={{width:'30%'}}>
                    <Link to={'/currappoitment'} style={{marginRight:"3%",marginTop:"2%"}} >
                    <button className="btn btn-outline-dark btn-lg" style={{backgroundColor:'#116466',marginRight:'5%'}}>
                        <span className="mr-2" >Current Appointment</span>
                        <i className="fa fa-angle-right"></i>
                    </button>
                      </Link>
                     {/* <Link to={'/reviappoitment'} style={{marginTop:"2%"}}>
                    <button className="btn btn-outline-dark btn-lg" style={{color:'white'}} >
                        <span className="mr-2">Revisit Appointment</span>
                        <i className="fa fa-angle-right"></i>
                    </button>
                     </Link>  */}
                     </div>
                     </div>
                     
                     <AuthorizedComponent   data={this.state.cliniclist}  refresh={this.state.refresh}
                     permission={(this.props.user === 'patient') ? true : false }
                    component={Datalist}  user={this.props.user} id={this.props.id}  /> 
                     </div> 
                     
                 : <div>
                     <AuthorizedComponent    permission={(this.props.user === 'clinic') ? true : false }
                    component={Clinicdate}  user={this.props.user} id={this.props.id} /> 
                     
                 </div>
                    
                }
               
                
                {/* <buttton className='btn btn-outline-dark btn-lg' type='button' onClick={this.opencurrapp}>
                {this.state.iscurrappoitmentopen ? 'close current appointment' : 'open current appointment '}</buttton>
                <buttton className='btn btn-outline-dark btn-lg' type='button' onClick={this.openrevisapp}>
                {this.state.isrevisappoitmentopen ? 'close revisit appointment' : 'open revisit appointment '}</buttton>
                    {
                        this.state.iscurrappoitmentopen === true ?
                    <div className='jumbotron text -center'> 
                        <div className='container'>
                        <h2 className='page-header'>
                        print current appoitment 
                        </h2>
                    </div> 
                   </div>
                    : ''
                }

            
                {
                    this.state.isrevisappoitmentopen === true ?
                   <div className='jumbotron text -center'> 
                    <div className='container'>
                    <h2 className='page-header'>
                    print revisit appoitment 
                    </h2>
                    </div> 
                   </div>
                    : ''
                } */}
                
                    
                             

            </React.Fragment>

           


        )
    }
}

export default Home;