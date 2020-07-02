import React ,{PureComponent} from 'react';
//import SignupPage from './SignUpPage';
import '../../Style/PublicPage.css';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl'
import SignUpForm from './SignUpForm'
import firebase from '../../config/configuration';


class PublicPage extends PureComponent{
    constructor(){
        super();
        this.state={
            isSignUpPageOpen: false
        }

    }

    getKeyFromEmail=(email)=>{
      var flag=0,str=email;
      var pos = email.lastIndexOf('.');
      str = str.substring(0,pos) +' '+ str.substring(pos+1)
      var pos = email.lastIndexOf('@');
      str = str.substring(0,pos) +' '+ str.substring(pos+1)
      return str;

    }
    postsignup=(filledform)=>{
        console.log('going to push it on firebase');
        this.setState({
            isSignUpPageOpen:false
        })
        console.log(filledform.name);
        console.log(filledform.email);
        console.log(filledform.password);
        var flag=1;
        firebase.auth().createUserWithEmailAndPassword(filledform.email, filledform.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          flag=0;
          alert(errorMessage);
          // ...
        }).then(
        firebase.auth().signInWithEmailAndPassword(filledform.email, filledform.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
         // alert(errorMessage);
          // ...
        })).then(()=>{
        const user=firebase.auth().currentUser.uid;
        const newChild=this.getKeyFromEmail(filledform.email);
        console.log(newChild);
        firebase.database().ref('patient').child(user).set({
            name:filledform.name,
            email:filledform.email,
             age:filledform.age,
             phone:filledform.phone,
             password:filledform.password,
             city:filledform.city,
             area:filledform.area,
             blood_group:filledform.blood_group,
             gender:filledform.gender,
             pincode:filledform.pincode,
             street:filledform.street

        })
      }
        )


    }

    OpensignUpPage = () => {
        this.setState({
            isSignUpPageOpen: true
        })
        console.log('i am in signup page'+this.state.isSignUpPageOpen);
    }
    CloseSignUpPage=()=>{
        this.setState({
            isSignUpPageOpen: false
        })
        console.log('i am in close signup page'+this.state.isSignUpPageOpen);
    }
    render(){       

        return(
           <React.Fragment>
            <div className="loginbox">
                <div className="logo">
                <strong><p>Login /sign up </p></strong>
                </div>
                <div className="userid">
                  <div className="title">  <i className="fa fa-user-circle"></i> User ID </div>
                     <div className="input-group mb-3">
                       <input type="text" className="form-control"
                            placeholder="User/Email ID"
                            aria-label="username"
                            name="userId"
                            aria-describedby="basic-addon"/>
                    </div>
                </div>
                <div className="password">
                  <div className="title">  <i className="fa fa-lock"></i> Password</div>
                  <div className="input-group mb-3">
                  <input className="form-control" type="password" 
                  name="password" />
                  </div>
                </div>
                <div className="enterbutton"><input type="submit" value="ENTER"/></div>
                <div className="notregistred">
                <span className="title">Not Registred??</span>
                <input type="button" className="signup"
                           value="Sign Up"
                           onClick={this.OpensignUpPage}
                />
                </div>
                </div>
                {
                    this.state.isSignUpPageOpen
                    ? <SignUpForm open={this.state.isSignUpPageOpen} close={this.CloseSignUpPage}
                    submitsignup={this.postsignup} />
                    :""
                }
            
           </React.Fragment>
        );
    }   
}

export default PublicPage;