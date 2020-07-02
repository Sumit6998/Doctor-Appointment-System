import React, { Component } from 'react'
import { Spinner } from 'reactstrap';
import firebase from "../../config/configuration";
import './PatientDisplay.css'
import NavigationBar from '../navigationbar';

class PatientDisplayFromBloodGroup extends Component {

    constructor(props) {
        super(props);
        this.patientkeys = [];
        this.state = {
            bloodgroup: this.props.location.state.bloodgroup,
            isDataAvailable: false,
            display: []
        }

    }

    componentDidMount() {
        if(this.state.bloodgroup)
        {
        let patient = firebase.database().ref('blood group').child(this.state.bloodgroup);
        patient.once("value", snapshot => {
            const val = snapshot.val();
            var keys = Object.keys(val);
            for (let i = 0; i < keys.length; i++) {
                this.patientkeys.push(keys[i]);
            }
            this.displayPatientdetails();
        });
        console.log('component mounted')
    }
    }

    displayPatientdetails = () => {
        let arr = [];

        console.log(this.patientkeys)
        if(!this.patientkeys)
        {
            this.setState({isDataAvailable:true});
        }
        //console.log('called')
        let patient = firebase.database().ref('patient');
        for (let i = 0; i < this.patientkeys.length; i++) {
            // console.log(typeof this.patientkeys[i]);
            let temppatient = patient.child(this.patientkeys[i]);
            //console.log(temppatient);
            var name, age, area, gender;
            temppatient.once("value").then(snapshot => {
                const val = snapshot.val();
                //console.log(val);
                name = val.name;
                age = val.age;
                area = val.area;
                gender = val.gender;
                console.log(name + " " + age + " " + area + " ");
                //console.log(this.display);
                // this.display.push(<button>hello</button>)
                arr.push({
                    'name': name,
                    'age': age,
                    'gender': gender,
                    'area': area
                })
                this.setState({
                    display: arr,
                    isDataAvailable: true
                })


            })

        }

    }


    render() {
        var link='https://www.google.com/maps/place/Nidhi+Multispeciality+Hospital/@23.0401044,72.5592146,17z/data=!3m1!4b1!4m15!1m7!3m6!1s0x395e84f521640d4b:0x6853ee97a9a2996b!2sNavrangpura,+Ahmedabad,+Gujarat!3b1!8m2!3d23.0365437!4d72.5611395!3m6!1s0x395e848c996426c3:0x915350ab1da7fe78!8m2!3d23.0400999!4d72.5614035!9m1!1b1';
        var patientdetails = this.state.display.map(name1 => {
            return (


                <div className="d-flex justify-content-center" >
                <div className="d-flex justify-content-center" style={{width:'40%'}} >
                <form  style={{border:"3px solid grey",marginTop:'1%',borderRadius:'4%',padding:'0.5%',backgroundColor:'#254e58',borderBottomLeftRadius:'4%',width:'100%' }}>
                <div className='list-group'  style={{border:"3px solid grey"}}>
                <div className='list-group-item' style={{backgroundColor:'#f1f1f1'}}>
                
                <h4 style={{fontSize:'14px'}}><b>Patient's Name: </b>{name1.name}</h4>
                <h4 style={{fontSize:'14px'}}><b>Gender: </b>{name1.gender}</h4>
                <h4 style={{fontSize:'14px'}}><b>Age: </b>{name1.age}</h4>
                <h4 style={{fontSize:'14px'}}><b>Area: </b>{name1.area}</h4>

                <div className="d-flex justify-content-between" style={{marginTop:'2%'}}>
                                <div className="d-flex justify-content-start">
                                <form action={link} method="get" target="_blank">
                                 <button className="btn btn" style={{color:'white',borderRadius:'5%',height:"70%",borderEndStartRadius:'5%',backgroundColor:"#3aafa9"}}   >Locate<i style={{marginLeft:'10%'}} className={'fas fa-map-marker-alt'} color="green"/></button>
                                </form>
                                 </div>
                                 </div>
                                
                </div>
                </div>
                </form>
                </div>
                </div>


                // <div className="list-group-item ">
                //     <p4 className="list-group-item-text">name:{name1.name}</p4>
                //     <p className="list-group-item-text">gender:{name1.gender}</p>
                //     <p className="list-group-item-text">age:{name1.age}</p>
                //     <p className="list-group-item-text">area:{name1.area}</p>
                // </div>
            );
        })


        return (
            

            (!this.state.isDataAvailable &&
                (<div>
                    <Spinner color="primary" />
                </div>)) ||

            (this.state.isDataAvailable &&
                (<div>
                    <NavigationBar/>

                    
                <div className="d-flex justify-content-center">

                <div className="d-flex justify-content-start" style={{marginBottom:'0%'}}>
                <h3><button className="btn btn" style={{color:'white',backgroundColor:'#116466',height:'70%',marginBottom:'10%',fontSize:'70%',padding:'1%'}}><b>Patients of Blood Group:   {this.props.location.state.bloodgroup} </b></button></h3>

                </div>
                </div>
           



                    {/* <h1>Display</h1> */}
                    <br></br>
                    {
                        patientdetails
                    }
                </div>
                ))
        )
    }
}

export default PatientDisplayFromBloodGroup;