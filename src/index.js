import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';


// Just for MDB react UI library
//import "@fortawesome/fontawesome-free/css/all.min.css";
//import "bootstrap-css-only/css/bootstrap.min.css";
 
//1import "mdbreact/dist/css/mdb.css";
  

ReactDOM.render(<App />, document.getElementById('root'));    
   
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister(); 
 