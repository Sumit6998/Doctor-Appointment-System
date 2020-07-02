import React,{PureComponent} from 'react';
import {Context} from "./App";
import {Link,withRouter} from 'react-router-dom';
import AuthorizedComponent from './AuthorizedComponent';
import './nav_stylr.css'
import firebase from '../config/configuration'
import {Form, FormControl, Button} from 'react-bootstrap'


function NavLink ({path,text,onClick,className,currPath,icon}){
    // console.log('currPath'+currPath);
    if(currPath){
        currPath="./"+currPath.split('/')[1];
    }
    // console.log('currPath second '+currPath);    
    return(
        <li className={"nav-item"+(currPath==path ? "active" : " ")+" "+className}>
            <Link className="nav-link" onClick={onClick} to={{
                pathname: path, 
            }}>
            <i className={"fa fa-"+icon} style={{marginRight:"5px"}}/>
            {text}
            </Link>
        </li>
    )
}

class Navigationbar extends PureComponent{
    
    logout=()=>{
        console.log('in logout');
        firebase.auth().signOut();

    }

    render(){
        return(
            <Context.Consumer>{

                value=>{
                    return(
                        <div>
                            
                        <nav ref={(input) => {
                                this.input = input
                        }} className="navbar navbar-expand-lg navbar-dark" color='green' style={{position:'-moz-initial',height:'70%'}}>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                            data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                                            aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul  className="navbar-nav ml-3 mr-3">
                                <NavLink path={'/'}
                                                 text={"Home"}
                                                 icon='home'
                                                 currPath={this.props.location.pathname}
                                                 id="home1" style={{marginRight:'50%'}}/>
                                  {/* <NavLink path={'/myappointment'}
                                                 text={'My Appointment'}
                                                 icon={'medkit'}
                                                 currPath={this.props.location.pathname}/>
                                     <NavLink text={(value.user=='isdoctor') ? "My Slot" : "My App"}
                                                 icon={(value.user=='isdoctor') ? 'list-ul' : 'shopping-basket'}
                                                 path={'/order'}
                                                 currPath={this.props.location.pathname}/> */}
                                    <AuthorizedComponent permission={(value.user=='patient') ? true : false}
                                                 path={'./Myprofilep'} 
                                                text={'Profile'} 
                                                component={NavLink} 
                                                icon={'user'} 
                                                currPath={this.props.location.pathname} />
                                    <AuthorizedComponent permission={(value.user=='clinic') ? true : false}
                                                 path={'./Myprofilec'} 
                                                text={'Profile'}  
                                                component={NavLink}
                                                icon={'user'} 
                                                currPath={this.props.location.pathname} />
                                    <AuthorizedComponent permission={(value.user=='patient') ? true : false}
                                                             path={'/prescription'}
                                                             currPath={this.props.location.pathname}
                                                             component={NavLink}
                                                             icon={'cog'}
                                                             text={"prescription"}/>
                                    
                                     
                                          <NavLink text={'Logout'}
                                                 icon={'sign-out'}
                                                 path={this.props.location.pathname}
                                                 currPath={""}  
                                                 onClick={value.logout}/>                                 

                            </ul>

                            </div>

                        </nav>       
                        </div>    
                    );
                }
            }
            </Context.Consumer>
        )
    }

}

export default  withRouter(Navigationbar);
