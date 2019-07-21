/*  pluginconfig = {
      heading: "calender",
      range: true,
      showdesctext: false,
      selecteddate: "July,19 2019",
      enddate: "July,19 2019",
      deesctext: [{
         text: "das",
         tipsy: "asd"
      }],
      firstactivedate: "July,19 2019",
      maxdate: "July,19 2019"
   }
    returns callback(startselecteddate,endselecteddate)
    in "July,19 2019" format 
    */

import React, { Component } from 'react';
import dpcss from './datepicker.scss';
import axios from 'axios';
class DatePicker extends Component {
   constructor(props) {
      super(props);
      this.state = {
         show:true,
         dpval: false,
         calenderdata: {
            calender: [],
            month: new Date().getMonth(),
            year: new Date().getFullYear()
         },
         enddpval: false,
         pluginconfig: {
            range: false,
            showdesctext: false
         },
         dateconfig: {
            month: [{
                  sname: "Jan",
                  lname: "January"
               }, {
                  sname: "Feb",
                  lname: "February"
               }, {
                  sname: "Mar",
                  lname: "March"
               },
               {
                  sname: "Apr",
                  lname: "April"
               }, {
                  sname: "May",
                  lname: "May"
               }, {
                  sname: "Jun",
                  lname: "june"
               },
               {
                  sname: "Jul",
                  lname: "July"
               }, {
                  sname: "Aug",
                  lname: "August"
               }, {
                  sname: "Sep",
                  lname: "September"
               },
               {
                  sname: "Oct",
                  lname: "October"
               }, {
                  sname: "Nov",
                  lname: "November"
               }, {
                  sname: "Dec",
                  lname: "December"
               }
            ],
            days: [{
                  sname: "Sun",
                  lname: "Sunday"
               }, {
                  sname: "Mon",
                  lname: "Monday"
               }, {
                  sname: "Tue",
                  lname: "Tuesday"
               },
               {
                  sname: "Wed",
                  lname: "Wednesday"
               }, {
                  sname: "Thu",
                  lname: "Thursday"
               }, {
                  sname: "Fri",
                  lname: "Friday"
               },
               {
                  sname: "Sat",
                  lname: "Saturday"
               }
            ]
         }
      }
   }
   componentDidMount() {

      let month = this.state.calenderdata.month;
      let year = this.state.calenderdata.year;
      let selecteddate = false
      if (this.props.pluginconfig.selecteddate) {
         month = new Date(this.props.pluginconfig.selecteddate).getMonth();
         year = new Date(this.props.pluginconfig.selecteddate).getFullYear();
         selecteddate = new Date(this.props.pluginconfig.selecteddate)
      }
      if(this.props.pluginconfig.firstactivedate) {
         month = new Date(this.props.pluginconfig.firstactivedate).getMonth();
         year = new Date(this.props.pluginconfig.firstactivedate).getFullYear();
      }
      if(selecteddate && selecteddate.getTime()<new Date(this.props.pluginconfig.firstactivedate).getTime()){
         this.setState(prevState => ({
            ...prevState,
            show:false
         }))
      }
      const endate = this.props.pluginconfig.enddate ? new Date(this.props.pluginconfig.enddate) : false
      const calender = this.getcalender(month, year, selecteddate, endate, endate)
      this.setState(prevState => ({
         ...prevState,
         dpval: this.props.pluginconfig.selecteddate,
         enddpval: this.props.pluginconfig.enddate,
         calenderdata: {
            ...prevState.calenderdata,
            calender: calender,
            month: month,
            year: year
         }
      }))
   }
   dateClick(dateobj) {
      const date = dateobj.val;
      const datetext = this.state.dateconfig.month[date.getMonth()].lname + "," + date.getDate() + " " + date.getFullYear();
      let dpval = this.state.dpval;
      let enddpval = this.state.enddpval;
      if (this.props.pluginconfig.range && this.state.dpval) {
         enddpval = datetext
         if (date.getTime() < new Date(dpval).getTime()) {
            return;
         }
      } else {
         dpval = datetext;
      }
      const endate = enddpval ? new Date(enddpval) : false;
      const newmonth = (date.getMonth()-this.state.calenderdata.month)>=(this.props.pluginconfig.showmonths || 1)?date.getMonth():this.state.calenderdata.month;
      const newyear = (date.getFullYear()-this.state.calenderdata.year)>=(this.props.pluginconfig.showmonths || 1)?date.getFullYear():this.state.calenderdata.year;
      const calender = this.getcalender(newmonth, newyear, new Date(dpval), date, enddpval);
      this.setState(prevState => ({
         ...prevState,
         dpval: dpval,
         enddpval: enddpval,
         calenderdata: {
            ...prevState.calenderdata,
            month: newmonth,
            year: newyear,
            calender: calender
         }
      }));
      if (this.props.pluginconfig.callback) {
         this.props.pluginconfig.callback(dpval, enddpval);
      }

   }
   getcalender(month, year, selecteddate, hovereddate, endate) {
      const firstactive = new Date(this.props.pluginconfig.firstactivedate);
      const maxdate = new Date(this.props.pluginconfig.maxdate);
      let date = new Date(year, month, 1);
      const datestext = [];
      const calender = [];
      let week = [];
      let formateddpval = "";
      let formatedendval = "";
      let hovereddateval = false;
      let selecteddateobj = date;
      let endateobj = endate ? new Date(endate) : endate;
      if (endateobj && this.props.pluginconfig.range) {
         formatedendval = endateobj.getDate() + "/" + (endateobj.getMonth() + 1) + "/" + endateobj.getFullYear();
      }
      if (hovereddate && this.props.pluginconfig.range) {
         hovereddateval = hovereddate.getTime();
      }
      Array((this.props.pluginconfig.showmonths || 1)).fill(1).forEach((elem, i) => {
         date = new Date(year, month+i, 1);
         month = month+i
         let day = date.getDay();
         selecteddateobj = date;
         if (selecteddate) {
            selecteddateobj = selecteddate
            formateddpval = selecteddate.getDate() + "/" + (selecteddate.getMonth() + 1) + "/" + selecteddate.getFullYear();
         }
         let noofdays = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
         const monthcal = []
         Array(noofdays + day).fill(1).forEach((elem, i) => {
            let datetext = ""
            let tipsy = ""
            let dateval = ""
            if (i - day + 1 > 0) {
               dateval = i - day + 1 + "/" + (month + 1) + "/" + year;
               if (datestext[dateval] && this.props.pluginconfig.showdesctext) {
                  datetext = datestext[dateval].text;
                  tipsy = datestext[dateval].tipsy;
               }
   
            }
            const dateobj = new Date(year, month, i - day + 1);
            const hovered = this.props.pluginconfig.range && dateobj.getTime() > selecteddateobj.getTime() && dateobj.getTime() <= hovereddateval;
            week.push({
               selected: dateval == formateddpval || (formatedendval == dateval),
               show: i - day + 1 > 0,
               disabled: dateobj.getTime() < firstactive.getTime() || dateobj.getTime() > maxdate.getTime(),
               date: i - day + 1,
               val: dateobj,
               desc: {
                  text: datetext,
                  tipsy: tipsy
               },
               newweek: i % 7 == 0,
               hovered: hovered
            })
            if (((i + 1) % 7 == 0 && i > 0) || i == noofdays + day - 1) {
               monthcal.push(week);
               week = [];
            }
         })
         calender.push(monthcal);
      })
      return calender
   }
   changemonth(direction) {
      const firstactive = new Date(this.props.pluginconfig.firstactivedate);
      const maxdate = new Date(this.props.pluginconfig.maxdate);
      const month = this.state.calenderdata.month;
      const year = this.state.calenderdata.year;
      const date = new Date(year, month, 1);
      const selecteddate = new Date(this.state.dpval)
      const endate = this.state.enddpval ? new Date(this.state.enddpval) : false
      let newmonth = 0;
      let newyear = 0;
      if (direction == "next") {
         date.setMonth(date.getMonth() + (this.props.pluginconfig.showmonths || 1));
         newmonth = date.getMonth();
         newyear = date.getFullYear()
      } else {
         date.setMonth(date.getMonth() - (this.props.pluginconfig.showmonths || 1));
         newmonth = date.getMonth();
         newyear = date.getFullYear()
      }
      if((newmonth < firstactive.getMonth() && newyear <= firstactive.getFullYear()) || (newyear>=maxdate.getFullYear() && newmonth > maxdate.getMonth())){
         return;
      }
      const calender = this.getcalender(newmonth, newyear, selecteddate, endate, endate);
      this.setState(prevState => ({
         ...prevState,
         calenderdata: {
            ...prevState.calenderdata,
            month: newmonth,
            year: newyear,
            calender: calender
         }
      }))

   }
   enterdate(dateobj) {
      if (this.props.pluginconfig.range) {
         const date = dateobj.val;
         if (this.state.dpval) {
            const selected = new Date(this.state.dpval);
            const endate = this.state.enddpval && date.getTime() < selected.getTime() ? new Date(this.state.enddpval) : false;
            const hovereddate = date.getTime() < selected.getTime() ? new Date(this.state.enddpval) : date;
            const calender = this.getcalender(this.state.calenderdata.month, this.state.calenderdata.year, selected, hovereddate, endate);
            this.setState(prevState => ({
               ...prevState,
               calenderdata: {
                  ...prevState.calenderdata,
                  calender: calender
               }
            }))
         }
      }

   }
   leavedate() {
      if (this.props.pluginconfig.range && this.state.dpval) {
         const date = new Date(this.state.dpval);
         const month = this.state.calenderdata.month;
         const year = this.state.calenderdata.year;
         const endate = this.state.enddpval ? new Date(this.state.enddpval) : false
         const calender = this.getcalender(month, year, date, endate, endate)
         this.setState(prevState => ({
            ...prevState,
            calenderdata: {
               ...prevState.calenderdata,
               month: month,
               year: year,
               calender: calender
            }
         }))
      }
   }
   render(){
      const dateconfig = this.state.dateconfig;
      const calenderdata = this.state.calenderdata;
      if(!this.state.show) {
         return (
         <div className="wrapper">
            configuration issue
         </div>
         )
      }
      return(
         <div className="wrapper">
            <div className="dpval"> Date :
               <span className="text">{this.state.dpval}</span>
            </div>
            {this.props.pluginconfig.range &&
         <div className="dpval">end Date : 
               <span className="text">{this.state.enddpval}</span>
         </div>}
         <div className="datepicker">
               <div className ="header">
                  {this.props.pluginconfig.heading}
               </div>
               <div className="dp-container">
                  <div className="visible-cal">
                     <div className="prev" onClick = {this.changemonth.bind(this,"prev")}>
                        <span>{"<"}</span>
                     </div>
                     {calenderdata.calender.map((calender,i) => (
                     <div className="month-cal">
                        <div className="selected-cal">
                           <span className="mnth">{dateconfig.month[(calenderdata.month+i>11?calenderdata.month+i-12:calenderdata.month+i)].sname}</span>
                           <span className="year">{calenderdata.year}</span>
                        </div>
                        <div className="next" onClick = {this.changemonth.bind(this,"next")}>
                           <span>{">"}</span>
                        </div>
                        <table onMouseLeave={this.leavedate.bind(this)}>
                           <thead className="week">
                              <tr>
                                 <th>Sun</th>
                                 <th>Mon</th>
                                 <th>Tue</th>
                                 <th>Wed</th>
                                 <th>Thu</th>
                                 <th>Fri</th>
                                 <th>Sat</th>
                              </tr>
                           </thead>
                           <tbody>
                           {calender.map((week,i)=>(
                              <tr key={i} className={"week week-"+(i+1)}>
                                 {week.map(day => (
                                 <td key={day.date} onClick={this.dateClick.bind(this,day)} className ={(day.show?" shown":" not-shown")+(day.date==1?" first":"")+(day.selected?" selected":"")+(day.hovered?" hovered":"")+(day.disabled?" disabled":"")}    onMouseEnter={this.enterdate.bind(this,day)}>
                                    {day.show && <div>
                                       {day.date}
                                    </div>}
                                 </td>
                                 ))}
                              </tr>
                           ))}
                           </tbody>
                        </table>
                     </div>
                     ))}
                  </div>

               </div>
            </div>
         </div>
      );
   }
}
 export default DatePicker;