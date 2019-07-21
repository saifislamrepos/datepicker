import React, { Component } from 'react';
import appcss from './app.scss';
const DatePicker = React.lazy(() => import('../datepicker/datepicker.js'));
class App extends Component{
   constructor(props){
      super(props)
      this.state ={
         show:false
      }
   }
   setdate(...arg){
      
   }
   showddp() {
      this.setState(prevState => ({
         ...prevState,
         show:!prevState.show
      }))
   }
   render(){
      const selecteddate = "July,19 2019";
      const enddate = "July,27 2019";
      const firstactivedate = "July,10 2019";
      const maxdate = "September,10 2019";
      const config = {
         heading:"Month Calendar",
         callback: this.setdate.bind(this),
         range: true,
         showdesctext: false,
         firstactivedate:firstactivedate,
         maxdate:maxdate,
         selecteddate:selecteddate,
         enddate:enddate,
         showmonths:2
      }
      return(
         <div>
            <div onClick={this.showddp.bind(this)}>showdp</div>
            {this.state.show && <div>
               <React.Suspense fallback={<div>Loading...</div>}>
                 <DatePicker pluginconfig={config}/>
               </React.Suspense>
            </div>}
            
         </div>
      );
   }
}
export default App;