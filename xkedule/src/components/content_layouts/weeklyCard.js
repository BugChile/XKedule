import React from "react"
import HeaderDate from './headerDate'
import WeekCardDayHeaders from './weekCardDayHeaders'
import WeeklyTaskCard from './weeklyTaskCard'

export default class WeeklyCard extends React.Component {

  generateTaskCards(day, events, current_time){
      // day is a Date object
      var task_cards = []
      const day_events = events[day.toLocaleDateString()];
      var day_number = day.getDay();
      if (day_number === 0) {
          day_number = 7;
      }

      if (day_events) {
          day_events.forEach((event) => {
              task_cards.push(
                  <WeeklyTaskCard event={event} clickEvent={this.props.clickEvent}/>
              )
          })
      }

      return (<div className="day_task_container" style={{"gridColumn": {day_number}}}>
                  {task_cards}
              </div>)
  }


  generateDayCells(current_time, events){
      var day_name_cells = [];
      var week_tasks = [];
      var day_cell_class;
      var day_date = new Date(current_time); //current day
      day_date.setDate(current_time.getDate() - (current_time.getDay() + 6) % 7); //week monday
      const day_names = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      for (var i = 0; i < 7; i++) {
          day_cell_class = "day_name_cell_weekly"
          if (current_time.getDate() === day_date.getDate()) {
              day_cell_class += " color_text"
          }

          day_name_cells[i] = <WeekCardDayHeaders day_cell_class = {day_cell_class}
                                             day_name = {day_names[i]}
                                             day_date = {day_date.toLocaleDateString('en-GB',
                                                         {day:"2-digit", month:"2-digit", year:"numeric"})}
                                             card_key = {"week_card_day_header"+i} />

          week_tasks.push(this.generateTaskCards(day_date, events, current_time));

          day_date.setDate(day_date.getDate() + 1);
      }
      const all_elements = day_name_cells.concat(week_tasks);
      console.log(all_elements);
      return all_elements;
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
      if (sunday_date.getMonth() !== monday_date.getMonth()) {
          main_text += " " + sunday_date.toLocaleString('en-GB', {month:"long"})
      }
      main_text += " " + sunday_date.toLocaleString('en-GB', {day:"numeric"});


      sub_text += current_time.toLocaleString('en-GB', {year:"numeric"})
      return {"main": main_text, "sub": sub_text};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.events === nextProps.events &&
        this.props.current_time.toLocaleDateString() === nextProps.current_time.toLocaleDateString()) {
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
                  {this.generateDayCells(this.props.current_time, this.props.events)}

              </div>
         </div>
         </div>
    )
  }
  }
