import React from "react"
import HeaderDate from './headerDate'

export default class WeeklyCard extends React.Component {


  generateDayCells(current_time){
      var day_cells = [];
      var day_cell_class;
      var day_date = new Date(current_time);
      day_date.setDate(current_time.getDate() - (current_time.getDay() + 6) % 7);
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      for (var i = 0; i < 7; i++) {
          if (current_time.getDate() === day_date.getDate()) {
              day_cell_class = "day_name_cell_weekly color_text"
          } else {
              day_cell_class = "day_name_cell_weekly"
          }
          day_cells[i] = <div className={day_cell_class} key={i}>
                             <div className="day_name">
                                 {days[i]}
                             </div>
                             <div className="day_date">
                                 {day_date.toLocaleDateString('en-GB', {day:"2-digit", month:"2-digit", year:"numeric"})}
                             </div>
                         </div>
            day_date.setDate(day_date.getDate() + 1);
      }
      return day_cells;
  }

  getHeaderDate(current_time){
      var monday_date = new Date(current_time);
      var sunday_date = new Date(current_time);
      monday_date.setDate(current_time.getDate() - (current_time.getDay() + 6) % 7);
      sunday_date.setDate(current_time.getDate() + (7 - current_time.getDay()) % 7);

      var main_text = "";
      var sub_text = "";

      main_text += monday_date.toLocaleString('en-GB', {month:"long"});
      main_text += " " + monday_date.toLocaleString('en-GB', {day:"numeric"}) + " -";
      if (sunday_date.getMonth() != monday_date.getMonth()) {
          main_text += " " + sunday_date.toLocaleString('en-GB', {month:"long"})
      }
      main_text += " " + sunday_date.toLocaleString('en-GB', {day:"numeric"});


      sub_text += current_time.toLocaleString('en-GB', {year:"numeric"})
      return {"main": main_text, "sub": sub_text};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.events === nextProps.events &&
        this.props.current_time.getDay() === nextProps.current_time.getDay()) {
      return false;
    } else {
      return true;
    }
  }

  render() {
      return(
         <div className="content_card">
         <div className="content_header">
             <div id="this_is_you_line" className="text_15">
                 this is <strong>your</strong> week
             </div>
             <HeaderDate date={this.getHeaderDate(this.props.current_time)}/>
         </div>
         <div className="content">
              <div className="weekly_schedule">
                  {this.generateDayCells(this.props.current_time)}

              </div>
         </div>
         </div>
    )
  }
  }
