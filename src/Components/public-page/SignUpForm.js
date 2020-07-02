import React,{Component} from 'react';
import  Modal from "react-bootstrap4-modal";

class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        //let {data} =props;
        this.state ={
            name:'',
            email:'',
            password:'',
            age:'21',
            phone:'',
            city:'unjha',
            pincode:'384170',
           // state:'gujarat',
           // country:'india',
            area:'rusat',
            blood_group:'o',
            gender:'m',
            street:'103'

           
        }

    }

    getdetail=()=>{
        const filledform={
            name : this.state.name,
            email :this.state.email,
            password:this.state.password,
            age:this.state.age,
            phone:this.state.phone,
            
            city:this.state.city,
            pincode:this.state.pincode,
           // state:'gujarat',
           // country:'india',
            area:this.state.area,
            blood_group:this.state.blood_group,
            gender:this.state.gender,
            street:this.state.street
        };
        console.log('getdetail');
        return filledform;
    };
    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    };

    handlesubmit=(e)=>{
        e.preventDefault();
        this.props.submitsignup(this.getdetail());
        
    }


    render(){
        return(
           <Modal visible={this.props.open} >
           <form onSubmit={this.handlesubmit}>
            <div className={'modal-body'} style={{color: 'black'}}>
            <div className={'form-group'} >
                <label>Name:</label>
                <input name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'}>
                <label>Email: </label>
                <input name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        required='true'
                        className={'form-control'} type={'email'}/>
            </div>
            <div className={'form-group'}>
                <label>Password:</label>
                <input   name='password'
                 value={this.state.password}
                 onChange={this.handleChange} 
                 required='true'
                 className={'form-control'}
                type={'password'}           
                            
               ></input>
            </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={this.props.close}>Close</button>
                <button type="submit" className="btn btn-primary">Submit
                 </button>
             </div>
           </form>
           </Modal>
        );
    }
}
export default SignUpForm

