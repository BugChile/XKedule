import React from "react"
import HeaderDate from './headerDate'
import MonthlyCardCell from './monthlyCardCell'
import MonthlyTaskCard from './monthlyTaskCard'

export default class MonthlyCard extends React.Component {

    generateTaskCards(day, events, current_time){
        // day is a Date object
        var task_cards = []
        const day_events = events[day.toLocaleDateString()];
        if (day_events) {
            day_events.forEach((event) => {
                task_cards.push(
                    <MonthlyTaskCard event={event}
                    clickEvent={this.props.clickEvent}/>
                )
            })
        }

        return task_cards
    }



    generateDayCells(current_time, events){
        var day_cells = [];
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        var day_date = new Date(current_time.getFullYear(), current_time.getMonth(), 1); //first day of month
        day_date.setDate(day_date.getDate() - (day_date.getDay() + 6) % 7) //first month's week monday date

        var i = 0;
        var day_info = [];
        var day_tasks;
        var cell_class_list = "day_cell_monthly";
        var cell_number_class_list = "day_cell_number";

        while (day_date.getDay() !== 1 || day_date.getMonth() !== (current_time.getMonth() + 1) % 12) {
            //define cell style
            if (day_date.getMonth() === current_time.getMonth()) {
                cell_class_list += " month_day" //day of the current month showing
                if (day_date.getDate() === current_time.getDate()) {
                    cell_number_class_list += " current_day color_text" //current day
                }
            }

            //create day info
            if (i < 7) {
                day_info.push(<div className="day_cell_name">
                                  {days[i]}
                              </div>)
            }
            day_info.push(<div className={cell_number_class_list}>
                              {day_date.getDate()}
                          </div>)

            day_tasks = this.generateTaskCards(day_date, events, current_time);
            day_cells[i] = <MonthlyCardCell day_tasks={day_tasks}
                                            cell_key={"monthly_cell"+day_date.getTime()}
                                            day_info={day_info}
                                            cell_tasks={[]}
                                            cell_class_list={cell_class_list}
                                            cell_numer_class_list={cell_number_class_list}/>
            day_info = []
            cell_class_list = "day_cell_monthly";
            cell_number_class_list = "day_cell_number";
            i += 1;

            //set day_date to next day
            day_date.setDate(day_date.getDate() + 1);

        }
        return day_cells;
    }

    getHeaderDate(current_time){
        var main_text = current_time.toLocaleString('en-GB', {month:"long"})
        var sub_text = current_time.toLocaleString('en-GB', {year:"numeric"})
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
                    this is <strong>your</strong> month
                </div>
                <HeaderDate date={this.getHeaderDate(this.props.current_time)}/>
            </div>
            <div className="content" id="content">
                 <div className="monthly_schedule">
                     {this.generateDayCells(this.props.current_time,
                                            this.props.events)}

                 </div>
            </div>
            </div>
        )
    }
  }
