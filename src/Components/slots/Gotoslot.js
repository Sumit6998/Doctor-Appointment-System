import React from 'react'
import { Link } from "react-router-dom";

class Gotoslot extends React.PureComponent {
    constructor(props){
        super(props);

    }
    render() {
        // console.log('i am in gotoslot');
        // console.log('goto slot '+this.props);
         console.log('goto slot '+this.props.doctorName);
         console.log('goto slot '+this.props.patientkey);   
        
        return (
            <div className={'d-flex justify-content-end mt-5'}>
                <Link to={"/slotbook"}>
                    <button className="btn btn-outline-dark btn-lg">
                        <span className="mr-2">Go To Slot</span>
                        <i className="fa fa-angle-right"></i>
                    </button>
                </Link>
            </div>
        )
    }
}

export default  Gotoslot;
