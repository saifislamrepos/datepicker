/* pluginconfig = {
        range: true,
        showdesctext: false,
        selecteddate: "July,19 2019",
        enddate: "July,19 2019",
        deesctext:[{text:"das",tipsy:"asd"}]
    } 
    returns callback(startselecteddate,endselecteddate)
    in "July,19 2019" format
*/
import React, { Component } from 'react';
import dpcss from './datepicker.scss';
class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.    state = {
            dpval:false,
            calenderdata: {
               calender: [],
               month: new Date().getMonth(),
               year: new Date().getFullYear()
            },
            enddpval:false,
            pluginconfig : {
               range:false,
               showdesctext:false
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
        if(this.props.pluginconfig.selecteddate) {
            month = new Date(this.props.pluginconfig.selecteddate).getMonth();
            year = new Date(this.props.pluginconfig.selecteddate).getFullYear();
            selecteddate = new Date(this.props.pluginconfig.selecteddate)
        }
        const endate = this.props.pluginconfig.enddate ? new Date(this.props.pluginconfig.enddate):false
       const calender = this.getcalender(month, year,selecteddate,endate,endate)
       this.setState(prevState => ({
          ...prevState,
          dpval:this.props.pluginconfig.selecteddate,
          enddpval:this.props.pluginconfig.enddate,
          calenderdata: {
             ...prevState.calenderdata,
             calender: calender,
             month:month,
             year:year
          }
       }))
    }
    dateClick(dateobj) {
       const date = dateobj.val;
       const datetext = this.state.dateconfig.month[date.getMonth()].lname +"," +date.getDate() + " "+date.getFullYear();
       let dpval = this.state.dpval;
       let enddpval = this.state.enddpval;
       if(this.props.pluginconfig.range && this.state.dpval) {
           enddpval = datetext
           if(date.getTime() <= new Date(dpval).getTime()){
               return;
           }
       } else {
           dpval = datetext;
       }
       const endate = enddpval ? new Date(enddpval):false
       const calender = this.getcalender(date.getMonth(),date.getFullYear(),new Date(dpval),date,enddpval);
       this.setState(prevState => ({
          ...prevState,
          dpval:dpval,
          enddpval:enddpval,
          calenderdata: {
             ...prevState.calenderdata,
             month: date.getMonth(),
             year: date.getFullYear(),
             calender: calender
          }
       }));
       if(this.props.pluginconfig.callback){
            this.props.pluginconfig.callback(dpval,enddpval);
       }
       
    }
    getcalender(month, year,selecteddate,hovereddate,endate) {
       const date = new Date(year, month, 1);
       const day = date.getDay()
       const noofdays = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
       const datestext = [];
       const calender = [];
       let week = [];
       let formateddpval = "";
       let formatedendval = "";
       let hovereddateval = false;
       let selecteddateobj = date;
       let endateobj = endate ? new Date(endate):endate;
       if(selecteddate) {
          selecteddateobj = selecteddate
          formateddpval = selecteddate.getDate() +"/" + (selecteddate.getMonth()+1) + "/" + selecteddate.getFullYear();
       }
       if(endateobj && this.props.pluginconfig.range) {
        formatedendval = endateobj.getDate() +"/" + (endateobj.getMonth()+1) + "/" + endateobj.getFullYear();
       }
       if(hovereddate && this.props.pluginconfig.range) {
          hovereddateval = hovereddate.getTime();
       }
       
       Array(noofdays + day).fill(1).forEach((elem, i) => {
          let datetext = ""
          let tipsy = ""
          let dateval =""
          if (i - day + 1 > 0) {
             dateval = i - day + 1 + "/" + (month+1) + "/" + year;
             if (datestext[dateval] && this.props.pluginconfig.showdesctext) {
                datetext = datestext[dateval].text;
                tipsy = datestext[dateval].tipsy;
             }
 
          }
          const dateobj =new Date(year, month, i - day + 1);
          const hovered =  this.props.pluginconfig.range && dateobj.getTime()>selecteddateobj.getTime() && dateobj.getTime()<=hovereddateval;
          week.push({
             selected:dateval == formateddpval || (formatedendval == dateval),
             show: i - day + 1 > 0,
             disabled: false,
             date: i - day + 1,
             val: new Date(year, month, i - day + 1),
             desc: {
                text: datetext,
                tipsy: tipsy
             },
             newweek: i % 7 == 0,
             hovered: hovered
          })
          if (((i + 1) % 7 == 0 && i > 0) || i == noofdays + day - 1) {
             calender.push(week);
             week = [];
          }
       })
       return calender
    }
    changemonth(direction) {
       const month = this.state.calenderdata.month;
       const year = this.state.calenderdata.year;
       const date = new Date(year, month, 1);
       const selecteddate = new Date(this.state.dpval)
       const endate = this.state.enddpval ? new Date(this.state.enddpval):false
       let newmonth = 0;
       let newyear = 0;
       if (direction == "next") {
          date.setMonth(date.getMonth() + 1);
          newmonth = date.getMonth();
          newyear = date.getFullYear()
       } else {
          date.setMonth(date.getMonth() - 1);
          newmonth = date.getMonth();
          newyear = date.getFullYear()
       }
       const calender = this.getcalender(newmonth, newyear,selecteddate,endate,endate);
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
       if(this.props.pluginconfig.range) {
          const date = dateobj.val;
          if(this.state.dpval) {
             const selected = new Date(this.state.dpval);
             const endate = this.state.enddpval && date.getTime() < selected.getTime() ? new Date(this.state.enddpval):false;
             const hovereddate =date.getTime() < selected.getTime() ?new Date(this.state.enddpval):date;
             const calender = this.getcalender(date.getMonth(),date.getFullYear(),selected,hovereddate,endate);
             this.setState(prevState => ({
                ...prevState,
                calenderdata: {
                   ...prevState.calenderdata,
                   month: date.getMonth(),
                   year: date.getFullYear(),
                   calender: calender
                }
             }))
          }
       }
 
    }
    leavedate() {
       if(this.props.pluginconfig.range && this.state.dpval) {
          const date = new Date(this.state.dpval);
          const month = this.state.calenderdata.month;
          const year = this.state.calenderdata.year;
          const endate = this.state.enddpval ? new Date(this.state.enddpval):false
          const calender = this.getcalender(month,year,date,endate,endate)
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
       return(
          <div className="wrapper">
             <div className="dpval">Selected Date :
                <span className="text">{this.state.dpval}</span>
             </div>
             {this.props.pluginconfig.range &&
            <div className="dpval">end Date : 
                 <span className="text">{this.state.enddpval}</span>
            </div>}
            <div className="datepicker">
                <div className ="header">
                   Calender
                </div>
                <div className="dp-container">
                   <div className="visible-cal">
                      <div className="prev" onClick = {this.changemonth.bind(this,"prev")}>
                         <span>{"<"}</span>
                      </div>
                      <div className="selected-cal">
                         <span className="mnth">{dateconfig.month[calenderdata.month].sname}</span>
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
                         {calenderdata.calender.map((week,i)=>(
                            <tr key={i} className={"week week-"+(i+1)}>
                               {week.map(day => (
                               <td key={day.date} onClick={this.dateClick.bind(this,day)} className ={(day.show?" shown":" not-shown")+(day.date==1?" first":"")+(day.selected?" selected":"")+(day.hovered?" hovered":"")}    onMouseEnter={this.enterdate.bind(this,day)}>
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
 
                </div>
             </div>
          </div>
       );
    }
 }
 export default DatePicker;