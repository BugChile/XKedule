import React from "react"
import HeaderDate from './headerDate'
import MonthlyCardCell from './monthlyCardCell'
import MonthlyTaskCard from './monthlyTaskCard'
import { get_day_occurrence } from '../../js_helpers/rrule_helpers'


export default class MonthlyCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            expanded_tasks: [],
            expanded_class: "expanded_month_cell hidden",
            expanded_top: 0,
            expanded_left: 0,
        }

        this.generateTaskCards = this.generateTaskCards.bind(this);
        this.generateDayCells = this.generateDayCells.bind(this);
        this.getHeaderDate = this.getHeaderDate.bind(this);
        this.seeMore = this.seeMore.bind(this);
    };

    generateTaskCards(day, events, tasks_per_cell, day_id){
        // day is a string dd/mm/yyyy
        var task_cards = []
        const day_events = events[day];
        if (day_events) {
            day_events.forEach((event) => {
                    task_cards.push(
                            <MonthlyTaskCard event={event}
                            clickEvent={this.props.clickEvent}/>
                        );
                })
            if (tasks_per_cell && task_cards.length > tasks_per_cell) { // add "see more"
                const not_shown_count = task_cards.length - tasks_per_cell + 1; // +1 because see more uses 1 space
                task_cards = task_cards.slice(0, tasks_per_cell - 1);
                task_cards.push(<MonthlyTaskCard event={{id: "see_more_"+day,
                                                         day: day,
                                                         title: `See ${not_shown_count} more`}}
                                                 clickEvent={(card, id) =>
                                                                    {this.seeMore(card,
                                                                                  events,
                                                                                  day_id)}}
                                                 className="see_more_card"/>);
            }
        }



        return task_cards
    }



    generateDayCells(current_time, events){
        var day_cells = [];
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        var day_date = new Date(current_time.getFullYear(), current_time.getMonth(), 1); //first day of month
        const next_month = current_time.getMonth() === 11 ? 0 : current_time.getMonth() + 1;
        const week_count = get_day_occurrence(new Date(current_time.getFullYear(),
                                                       next_month,
                                                       0)); //number of weeks on this month
        const cell_height = (document.getElementById("content").clientHeight / week_count) - 30;
        const tasks_per_cell = Math.floor(cell_height / 20);

        day_date.setDate(day_date.getDate() - (day_date.getDay() + 6) % 7) //first month's week monday date

        var i = 0;
        var day_id = "";
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

            day_id = "monthly_cell"+day_date.getTime()
            day_tasks = this.generateTaskCards(day_date.toLocaleDateString(),
                                               events,
                                               tasks_per_cell,
                                               day_id);
            day_cells[i] = <MonthlyCardCell day_tasks={day_tasks}
                                            cell_key={day_id}
                                            day_info={day_info}
                                            cell_class_list={cell_class_list}/>
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

    seeMore(see_more_card, events, day_id){
        const expanded_tasks = this.generateTaskCards(see_more_card.day, events);
        const expanded_class = "expanded_month_cell"
        const expanded = document.getElementById("monthly_cell_expanded");
        const day_cell = document.getElementById(day_id);
        console.log(day_cell, day_cell.getBoundingClientRect())
        expanded.style.top = day_cell.getBoundingClientRect().top + "px";
        expanded.style.left = day_cell.getBoundingClientRect().left + 2 + "px";
        this.setState({expanded_tasks, expanded_class: "expanded_month_cell"});
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (this.props.events === nextProps.events &&
          this.props.current_time.toLocaleDateString() === nextProps.current_time.toLocaleDateString() &&
          this.state.expanded_tasks === nextState.expanded_tasks &&
          this.state.expanded_top === nextState.expanded_top &&
          this.state.expanded_left === nextState.expanded_left) {
        return false;
      } else {
        return true;
      }
    }


    render() {
        return(
            <div className="content_card" id="content_card">
            <div className="content_header">
                <div id="this_is_you_line" className="text_15">
                    this is <strong>your</strong> month
                </div>
                <HeaderDate date={this.getHeaderDate(this.props.current_time)}/>
            </div>
            <div className="content" id="content">

                {<MonthlyCardCell day_tasks={this.state.expanded_tasks}
                                  cell_key={"monthly_cell_expanded"}
                                  day_info={"expanded"}
                                  cell_class_list={this.state.expanded_class}/>}
                 <div className="monthly_schedule">
                     {this.generateDayCells(this.props.current_time,
                                            this.props.events)}

                 </div>


            </div>
            </div>
        )
    }
  }
