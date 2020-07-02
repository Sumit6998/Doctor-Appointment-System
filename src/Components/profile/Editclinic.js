import React,{Component} from 'react';
import  Modal from "react-bootstrap4-modal";
class Edit extends Component {
    constructor(props){
        super(props);
        this.state ={
            doctor:this.props.alldata.doctor,
            email:this.props.alldata.email,
            password:this.props.alldata.password,
            clinicname:this.props.alldata.clinicname,
            clinicfees:this.props.alldata.clinicfees,
            degree:this.props.alldata.degree,
            specialist:this.props.alldata.specialist,
            age:this.props.alldata.age,
            gender:this.props.alldata.gender,
           
            phone:this.props.alldata.phone,
            city:this.props.alldata.city,
            pincode:this.props.alldata.pincode,
           // state:'gujarat',
           // country:'india',
            area:this.props.alldata.area,
            blood_group:this.props.alldata.blood_group,
           // gender:'m',
            street:this.props.alldata.street,
            workingtime:this.props.alldata.workingtime,
            breaktime:this.props.alldata.breaktime,
            slot_time:this.props.alldata.slot_time

           
        }
    }


    
    getdetail=()=>{
        const filledform={
            doctor : this.state.doctor,
             email :this.state.email,
             password:this.state.password,
             clinicname:this.state.clinicname,
             clinicfees:this.state.clinicfees,
             degree:this.state.degree,
             specialist:this.state.specialist,
             gender:this.state.gender,
            age:this.state.age,
          
            phone:this.state.phone,
            
            city:this.state.city,
            pincode:this.state.pincode,
           // state:'gujarat',
           // country:'india',
            area:this.state.area,
            blood_group:this.state.blood_group,
            //gender:this.state.gender,            
            workingtime:this.state.workingtime,
            breaktime:this.state.breaktime,
            street:this.state.street,
            slot_time:this.state.slot_time
        };
        console.log('getdetail');
        return filledform;
    };
    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
        console.log(target.name);
        console.log(target.value);
    };
    handlesubmit=(e)=>{
        e.preventDefault();
        this.props.submitedit(this.getdetail());
        
    }
    render(){
        console.log('i am in edit page');
        return(
            <Modal visible={this.props.open}>
            <form onSubmit={this.handlesubmit}>
            <div className={'modal-body'} style={{color: 'black'}}>
            <div className={'form-group'} >
                <label>Name:</label>
                <input name="doctor"
                        value={this.state.doctor}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Age:</label>
                <input name="age"
                        value={this.state.age}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>

            <div className={'form-group'} >
                <label>Clinic Name:</label>
                <input name="clinicname"
                        value={this.state.clinicname}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Dgree :</label>
                <input name="degree"
                        value={this.state.degree}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Speciality :</label>
                <input name="specialist"
                        value={this.state.specialist}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Gender:</label>
                <input name="gender"
                        value={this.state.gender}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Visit Fee:</label>
                <input name="clinicfees"
                        value={this.state.clinicfees}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
           
            <div className={'form-group'} >
                <label> :</label>
                <input name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Street:</label>
                <input name="street"
                        value={this.state.street}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Area:</label>
                <input name="area"
                        value={this.state.area}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>City:</label>
                <input name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Pincode:</label>
                <input name="pincode"
                        value={this.state.pincode}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Avarage one patient visit time :</label>
                <input name="slot_time"
                        value={this.state.slot_time}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Working time of a day :</label>
                <input name="workingtime"
                        value={this.state.workingtime}
                        onChange={this.handleChange}
                        
                        className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'} >
                <label>Brake time during working hours:</label>
                <input name="breaktime" 
                        value={this.state.breaktime}
                        onChange={this.handleChange}
                        //placeholder='write in formate 12:00 to 13:00,14:00 to 15:00'
                        className={'form-control'} type={'text'}/>
            </div>

                    
                        
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={this.props.close}>Close</button>
                <button type="submit" className="btn btn-primary">Submit
                 </button>
             </div>
           </form>          

            </Modal>
        )
    }
}

export default (Edit);