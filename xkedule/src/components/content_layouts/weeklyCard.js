import React from "react"
import HeaderDate from './headerDate'
import WeekCardDayHeaders from './weekCardDayHeaders'
import WeeklyTaskCard from './weeklyTaskCard'
import BackToToday from './backToToday'
import { checkTodayFunction } from '../../js_helpers/helpers'


export default class WeeklyCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            max_task_container_height: this.calculateMaxContainerHeight(),
        }

        this.calculateMaxContainerHeight = this.calculateMaxContainerHeight.bind(this);
        this.onResize = this.onResize.bind(this);

    };

    calculateMaxContainerHeight(){
        return document.getElementById("content").clientHeight - 80;
    }

  generateTaskCards(day, events, aux_view_time, max_task_container_height){
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

      return (<div className="day_task_container_wrapper" style={{"gridColumn": {day_number},
                                                                  maxHeight:max_task_container_height}}>
                  <div className="day_task_container" >
                    {task_cards}
                  </div>
              </div>)
  }


  generateDayCells(aux_view_time, current_time, events, max_task_container_height){
      var day_name_cells = [];
      var week_tasks = [];
      var day_cell_class;
    //   var aux_view_time = new Date();
      var day_date = new Date(aux_view_time); //current day
      day_date.setDate(aux_view_time.getDate() - (aux_view_time.getDay() + 6) % 7); //week monday
      const day_names = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      for (var i = 0; i < 7; i++) {
          day_cell_class = "day_name_cell_weekly";
          var isToday = checkTodayFunction(current_time, day_date);
          if (isToday && day_date.getDate() === current_time.getDate()){
            day_cell_class += " color_text";
          }

          day_name_cells[i] = <WeekCardDayHeaders day_cell_class = {day_cell_class}
                                             day_name = {day_names[i]}
                                             day_date = {day_date.toLocaleDateString('en-GB',
                                                         {day:"2-digit", month:"2-digit", year:"numeric"})}
                                             card_key = {"week_card_day_header"+i} />

          week_tasks.push(this.generateTaskCards(day_date, events, aux_view_time, max_task_container_height));

          day_date.setDate(day_date.getDate() + 1);
      }
      const all_elements = day_name_cells.concat(week_tasks);
      return all_elements;
  }

  getHeaderDate(aux_view_time){
      var monday_date = new Date(aux_view_time);
      var sunday_date = new Date(aux_view_time);
      monday_date.setDate(aux_view_time.getDate() - (aux_view_time.getDay() + 6) % 7);
      sunday_date.setDate(aux_view_time.getDate() + (7 - aux_view_time.getDay()) % 7);

      var main_text = "";
      var sub_text = "";

      main_text += monday_date.toLocaleString('en-GB', {month:"long"});
      main_text += " " + monday_date.toLocaleString('en-GB', {day:"numeric"}) + " -";
      if (sunday_date.getMonth() !== monday_date.getMonth()) {
          main_text += " " + sunday_date.toLocaleString('en-GB', {month:"long"})
      }
      main_text += " " + sunday_date.toLocaleString('en-GB', {day:"numeric"});


      sub_text += aux_view_time.toLocaleString('en-GB', {year:"numeric"})
      return {"main": main_text, "sub": sub_text};
  }


  onResize(){
      const max_task_container_height = this.calculateMaxContainerHeight();
      if (max_task_container_height !== this.state.max_task_container_height) {
          this.setState({max_task_container_height});
          this.forceUpdate();
      }
  }

    componentDidMount(){
        window.addEventListener("resize", this.onResize);
    }

  render() {
      return(
         <div className="content_card" id="content_card">
         <div className="content_header">
         {(() => {
            
            var isToday = false
            var day_date = new Date(this.props.aux_view_time); //current day
            day_date.setDate(this.props.aux_view_time.getDate() - (this.props.aux_view_time.getDay() + 6) % 7);
            for (var i = 0; i < 7; i++) {
                
               isToday = checkTodayFunction(this.props.current_time, day_date);
            
               if (isToday) {
                       return <div id="this_is_you_line" className="text_15" key="this_is_you_line">
                       this is <strong>your</strong> week
                       </div>
               
               }
               day_date.setDate(day_date.getDate() + 1);
           }
           
               return <BackToToday type={"week"} onClickReturn={this.props.onClickReturn}/>
        
            })()}
             <HeaderDate date={this.getHeaderDate(this.props.aux_view_time)} clickEventDate={this.props.clickEventDate}/>
         </div>
         <div className="content" id="content">
              <div className="weekly_schedule">
                  {this.generateDayCells(this.props.aux_view_time,
                                         this.props.current_time,
                                         this.props.events,
                                         this.state.max_task_container_height)}

              </div>
         </div>
         </div>
    )
  }
  }
