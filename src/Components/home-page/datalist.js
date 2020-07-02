import React,{Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import Slotbook from '../slots/jeettmp';
import Gotoslot from '../slots/Gotoslot';
import AuthorizedComponent from '../AuthorizedComponent';
import AuthorizedRoute from '../AuthorizedRoute';
import { withRouter } from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
//1import { MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import cookie from 'react-cookies';
class Datalist extends  React.PureComponent{
    constructor(props){
        super(props);
        console.log('in printing'+this.props.data);
        this.state={
            temp:false
        }
        
    }


//    var Gotoslotbook=(
//         <div className={'d-flex justify-content-end mt-5'}>
//                 <Link to={'/slotbook'}>
//                     <button className="btn btn-outline-dark btn-lg">
//                         <span className="mr-2">Go To Cart</span>
//                         <i className="fa fa-angle-right"></i>
//                     </button>
//                 </Link>
//             </div>
//         )

    // componentDidUpdate=(props)=>{
    //     let refresh=this.props.refresh;
    //     if(refresh!=props.refresh)
    //     {
    //         this.setState({temp:!this.state.temp})
    //     }

    // }

    setcookie=(event)=>{
        let d = new Date();
        d.setTime(d.getTime() + (5 * 60 * 1000));
        let expires1 = d;
        console.log('in setcookie'+event.target.dataset.name);
        cookie.save('clinicid',event.target.dataset.name,{path:'/',expires:expires1});
        this.props.history.push({
            pathname: "/slotbook"
        });

    }


redirect(data){
    this.props.history.push({
        pathname: "/slotbook"
     });
   //  console.log('i am inn datalist'+data);
}

    render(){
       // console.log(this.props.data);
        const {data,user}=this.props;
        // console.log('i am in data list '+ user);
        // co console.log('i am in data list '+ user);
        // console.log('datalist'+this.props.data);
      //  console.log(data[0].link);
        //var link='https://www.google.com/maps/place/Nidhi+Multispeciality+Hospital/@23.0401044,72.5592146,17z/data=!3m1!4b1!4m15!1m7!3m6!1s0x395e84f521640d4b:0x6853ee97a9a2996b!2sNavrangpura,+Ahmedabad,+Gujarat!3b1!8m2!3d23.0365437!4d72.5611395!3m6!1s0x395e848c996426c3:0x915350ab1da7fe78!8m2!3d23.0400999!4d72.5614035!9m1!1b1'

        return(
            
            <div>
                <div className='list-group'>
                    {
                        data.length !==0
                        ? _.map(data,(data,i)=>{
                            //console.log(data);
                            return(
                                <div className="d-flex justify-content-center">
                                <div  style={{width:'50%'}}>
                                <form style={{border:"3px solid grey",marginTop:'1%',borderRadius:'4%',padding:'0.5%',backgroundColor:'#254e58',borderBottomLeftRadius:'4%' }}>
                                <div className='list-group' key={data.key} style={{border:"3px solid grey"}}>
                                <div className='list-group-item' style={{backgroundColor:'#f1f1f1'}}>
                                <h2 style={{textAlign:"center"}}>{data.clinicname}</h2>

                               <h4 style={{fontSize:'14px'}}><b>Doctor Name: </b>{data.doctor}</h4> 
                                <h4 style={{fontSize:'14px'}}><b>Specialist: </b>{data.specialist}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Degree: </b>{data.degree}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Gender: </b>{data.gender}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Age: </b>{data.age}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Phone: </b>{data.phone}</h4>                                
                                <h4 style={{fontSize:'14px'}}><b>Clinicfees: </b>{data.clinicfees}</h4>
                                <h4 style={{fontSize:'14px'}}><b>Street: </b>{data.street} </h4>
                                <h4 style={{fontSize:'14px'}}><b>Area: </b>{data.area} </h4>
                                <h4 style={{fontSize:'14px'}}><b>City: </b>{data.city}</h4>
                                {/* <AuthorizedRoute permission={this.state.user === 'patient' ? true : false }  path="/slotbook" exact strict 
                                 component={Slotbook} patientId={this.state.key}  />  */}
                                {/* <AuthorizedComponent
                                    component={Gotoslot} permission={true}  />                                */}
                                 {/* <Link to="/slotbook/john" >go to sloot book</Link>    */}
                                <div className="d-flex justify-content-between" style={{marginTop:'2%'}}>
                                <div className="d-flex justify-content-start">
                                <form action={data.link} method='get'  target="_blank">
                                 <button className="btn btn" style={{color:'white',borderRadius:'5%',height:"70%",borderEndStartRadius:'5%',backgroundColor:"#3aafa9"}}   >Locate<i style={{marginLeft:'10%'}} className={'fas fa-map-marker-alt'} color="green"/></button>
                                </form>
                                 </div>
                                

                                 <div className="d-flex justify-content-end">

                                 {/* <Link to={'/slotbook'}  > */}
                                    <button className="btn btn" data-name={data.doctorkey} style={{color:'white',borderRadius:'5%',height:"70%",borderEndStartRadius:'5%',backgroundColor:"#5680E9"}} onClick={this.setcookie}>Book an appointment</button>
                                 {/* </Link> */}

                                 </div>

                                 

                                 </div>
                                
                                </div>                                
                                </div>
                                </form>
                                </div>
                                </div>
                            )
                        })
                        : ''
                    }
                </div>
            </div>

        )
    }
}

export default withRouter(Datalist);