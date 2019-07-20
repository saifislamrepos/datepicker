import React, { Component } from 'react';
import appcss from './app.scss';
import DatePicker from '../datepicker/datepicker.js'
class App extends Component{
   setdate(...arg){
      alert(...arg)
   }
   render(){
      const selecteddate = "July,19 2019";
      const endate = "July,27 2019"
      return(
         <div>
            <DatePicker pluginconfig={{callback:this.setdate.bind(this),range:true,showdesctext:false,selecteddate:selecteddate,enddate:endate}}/>
         </div>
      );
   }
}
export default App;