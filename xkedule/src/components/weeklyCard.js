import React from "react"

export default class WeeklyCard extends React.Component {


  generateDayCells(){
      var day_cells = [];
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      for (var i = 0; i < 7; i++) {
          day_cells[i] = <div className="day_name_cell_weekly" key={i}>
                             <div className="day_name">
                                 {days[i]}
                             </div>
                             <div className="day_date">
                                 14/10/2020
                             </div>
                         </div>
      }
      return day_cells;
  }
  render() {
      return(
         <div className="content_card">
         <div className="content_header">
             <div id="this_is_you_line" className="text_15">
                 this is <strong>your</strong> week
             </div>
             <div className="text_bold_title">
                 January 14th - 20th
             </div>
             <div className="text_30">
                 2019
             </div>
         </div>
         <div className="content">
              <div className="weekly_schedule">
                  {this.generateDayCells()}

              </div>
         </div>
         </div>
    )
  }
  }
