import React from "react";
import { connect } from 'react-redux';
import HeaderDate from './headerDate';
import MonthlyCardCell from './monthlyCardCell';
import MonthlyTaskCard from './monthlyTaskCard';
import BackToToday from './backToToday';
import DayMonth from './dayMonth';
import { get_day_occurrence } from '../../js_helpers/rrule_helpers';
import { dateToWritenDate } from '../../js_helpers/parsers';
import { checkTodayFunction, eventsFromHashed } from '../../js_helpers/helpers';

class MonthlyCard extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            tasks_per_cell: this.calculateMaxTasks(),
            expanded_tasks: [],
            expanded_class: "expanded_month_cell hidden",
            expanded_top: 0,
            expanded_left: 0,
            expanded_day: null,
        }

        this.generateTaskCards = this.generateTaskCards.bind(this);
        this.generateDayCells = this.generateDayCells.bind(this);
        this.getHeaderDate = this.getHeaderDate.bind(this);
        this.seeMore = this.seeMore.bind(this);
        this.closeSeeMore = this.closeSeeMore.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.calculateMaxTasks = this.calculateMaxTasks.bind(this);
        this.onResize = this.onResize.bind(this);
    };

    generateTaskCards(day, events, hashed_events, tasks_per_cell, day_id){
        // day is a string dd/mm/yyyy
        var task_cards = []
        const day_string = day.toLocaleDateString();
        const day_events = eventsFromHashed(events, hashed_events, day_string);
        if (day_events) {
            day_events.forEach((event, index) => {
                    task_cards.push(
                            <MonthlyTaskCard key={`MonthlyTaskCard${index}`} event={event}
                            clickEvent={this.props.clickEvent}/>
                        );
                })
            if (tasks_per_cell && task_cards.length > tasks_per_cell) { // add "see more"
                const not_shown_count = task_cards.length - tasks_per_cell + 1; // +1 because see more uses 1 space
                task_cards = task_cards.slice(0, tasks_per_cell - 1);
                task_cards.push(<MonthlyTaskCard key={`MonthlyTaskCard2${day_id}`} event={{id: "see_more_"+day_string,
                                                         day: new Date(day),
                                                         title: `See ${not_shown_count} more`}}
                                                 clickEvent={(card, id) =>
                                                                    {this.seeMore(card,
                                                                                  events,
                                                                                  hashed_events,
                                                                                  day_id)}}
                                                 className="see_more_card"/>);
            }
        }



        return task_cards
    }

    calculateMaxTasks(){
        const next_month = this.props.aux_view_time.getMonth() === 11 ? 0 : this.props.aux_view_time.getMonth() + 1;
        const week_count = get_day_occurrence(new Date(this.props.aux_view_time.getFullYear(),
                                                       next_month,
                                                       0)); //number of weeks on this month
        const cell_height = (document.getElementById("content").clientHeight / week_count) - 40;
        return Math.floor(cell_height / 20);
    }



    generateDayCells(aux_view_time, events, hashed_events, tasks_per_cell){
        const { currentTime } = this.props;
        var day_cells = [];
        // var aux_view_time = new Date();
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        var day_date = new Date(aux_view_time.getFullYear(), aux_view_time.getMonth(), 1); //first day of month
        day_date.setDate(day_date.getDate() - (day_date.getDay() + 6) % 7) //first month's week monday date

        var i = 0;
        var day_id = "";
        var day_info = [];
        var day_tasks;
        var cell_class_list = "day_cell_monthly";
        var cell_number_class_list = "day_cell_number hover";

        while (day_date.getDay() !== 1 || day_date.getMonth() !== (aux_view_time.getMonth() + 1) % 12) {
            //define cell style
            if (day_date.getMonth() === aux_view_time.getMonth()) {
                cell_class_list += " month_day" //day of the current month showing
                    var isToday = checkTodayFunction(currentTime, day_date);
                    if (isToday && day_date.getDate() === currentTime.getDate()){
                    cell_number_class_list += " current_day" //current day
                }
            }

            //create day info
            if (i < 7) {
                day_info.push(<div key={`dayweek${i}`} className="day_cell_name">
                                  {days[i]}
                              </div>)
            }
            day_info.push(<DayMonth key={`daymonth${day_date.getDay()}${i}`} onClickDay={this.props.onClickDay} classCss={cell_number_class_list} day={new Date(day_date)}/>);

            day_id = "monthly_cell"+day_date.getTime()
            day_tasks = this.generateTaskCards(day_date,
                                               events,
                                               hashed_events,
                                               tasks_per_cell,
                                               day_id);
            day_cells[i] = <MonthlyCardCell key={`monthlycardcell${day_date.getDay()}${i}`}
                                            day_tasks={day_tasks}
                                            cell_key={day_id}
                                            day_info={day_info}
                                            cell_class_list={cell_class_list}/>
            day_info = []
            cell_class_list = "day_cell_monthly";
            cell_number_class_list = "day_cell_number hover";
            i += 1;

            //set day_date to next day
            day_date.setDate(day_date.getDate() + 1);

        }
        return day_cells;
    }

    getHeaderDate(aux_view_time){
        var main_text = aux_view_time.toLocaleString('en-GB', {month:"long"})
        var sub_text = aux_view_time.toLocaleString('en-GB', {year:"numeric"})
        return {"main": main_text, "sub": sub_text};
    }

    seeMore(see_more_card, events, hashed_events, day_id){
        const expanded_tasks = this.generateTaskCards(see_more_card.day, events, hashed_events);
        const expanded_day = dateToWritenDate(see_more_card.day);
        const expanded_class = "expanded_month_cell visible"
        const expanded = document.getElementById("monthly_cell_expanded");
        const day_cell_props = document.getElementById(day_id).getBoundingClientRect();
        const content_props = document.getElementById("content").getBoundingClientRect();

        expanded.style.top = Math.min(day_cell_props.top - 10,
                                      content_props.height + 30 - 22 * expanded_tasks.length) + "px";
        expanded.style.left = Math.max(day_cell_props.left - 4, 30) + "px";
        expanded.style.width = day_cell_props.width + 12 + "px";
        expanded.style.opacity = 1;

        this.setState({expanded_tasks, expanded_class, expanded_day});

    }

    closeSeeMore(){
        const expanded_tasks = [];
        const expanded_class = "expanded_month_cell hidden"
        this.setState({expanded_tasks, expanded_class});
    }


  onResize(){
      const tasks_per_cell = this.calculateMaxTasks();
      if (tasks_per_cell !== this.state.tasks_per_cell) {
          this.setState({tasks_per_cell});
          this.forceUpdate();
      }
  }

    componentDidMount(){
        window.addEventListener("resize", this.onResize);
    }


    render() {
        const { currentTime } = this.props;
        return(
            <div className="content_card" id="content_card">
            <div className="content_header">
                
         {(() => {
             
             var day_date = new Date(this.props.aux_view_time.getFullYear(), this.props.aux_view_time.getMonth(), 1); 
             while (day_date.getDay() !== 1 || day_date.getMonth() !== (this.props.aux_view_time.getMonth() + 1) % 12) {
                var isToday = checkTodayFunction(currentTime, day_date);
                if (isToday){
                    return <div id="this_is_you_line" className="text_15" key="this_is_you_line">
                    this is <strong>your</strong> month
                    </div>
                }
                day_date.setDate(day_date.getDate() + 1);
            }
            return <BackToToday type={"month"} onClickReturn={this.props.onClickReturn}/>
             
             
             })()}
                <HeaderDate date={this.getHeaderDate(this.props.aux_view_time)} clickEventDate={this.props.clickEventDate}/>
            </div>
            <div className="content" id="content">
                {<MonthlyCardCell day_tasks={this.state.expanded_tasks}
                                  cell_key={"monthly_cell_expanded"}
                                  day_info={this.state.expanded_day}
                                  cell_class_list={this.state.expanded_class}
                                  closeEvent={this.closeSeeMore}/>}

                 <div className="monthly_schedule">
                     {this.generateDayCells(this.props.aux_view_time,
                                            this.props.events,
                                            this.props.hashed_events,
                                            this.state.tasks_per_cell)}

                 </div>




            </div>
            </div>
        )
    }
  }

const mapStateToProps = (state) => {
    const { currentTime } = state.appState;
    return {
        currentTime,
    }
}

export default connect(mapStateToProps, null)(MonthlyCard)
