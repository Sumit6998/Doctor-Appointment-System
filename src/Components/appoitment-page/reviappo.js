import React,{Component} from 'react';
import NavigationBar from '../navigationbar';
import firebase from '../../config/configuration';

class Reviapp extends Component{
    constructor(props){
        super(props);
        this.state={
           clinickey:'',
           clinicname:''
        }

    }
    componentDidMount(){
        // this.getrevisitappo();
        // this.getclinic();
    }

    render(){
        return(
            <div>
                <h1>i am in revisit appo</h1>
            </div>
        )
    }
}

export default (Reviapp);