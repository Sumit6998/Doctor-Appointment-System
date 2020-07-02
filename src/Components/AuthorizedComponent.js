import React from 'react';
import {Redirect} from 'react-router-dom';
const AuthorizedComponent =({component:Component,permission , ...rest})=>(
    // permission ? (
    //     <Component {...rest}/>
    //     )
    //    : ''
    
      
            permission ?
                <Component {...rest} /> :
                ''
        
);

export default AuthorizedComponent;