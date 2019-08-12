import React from "react"
import { connect } from 'react-redux';
import HeaderDate from './headerDate'
import WeekCardDayHeaders from './weekCardDayHeaders'
import WeeklyTaskCard from './weeklyTaskCard'
import BackToToday from './backToToday'
import { checkTodayFunction, eventsFromHashed } from '../../js_helpers/helpers'


class WeeklyCard extends React.Component {
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

  generateTaskCards(day, events, hashed_events, max_task_container_height, i){
      // day is a Date object
      var task_cards = []
      const day_events = eventsFromHashed(events, hashed_events, day.toLocaleDateString());
      var day_number = day.getDay();
      if (day_number === 0) {
          day_number = 7;
      }

      if (day_events) {
          day_events.forEach((event, index) => {
              task_cards.push(
                  <WeeklyTaskCard key={index} event={event} clickEvent={this.props.clickEvent}/>
              )
          })
      }

      return (<div key={`container${i}`} className="day_task_container_wrapper" style={{"gridColumn": {day_number},
                                                                  maxHeight:max_task_container_height}}>
                  <div className="day_task_container" >
                    {task_cards}
                  </div>
              </div>)
  }


  generateDayCells(events, hashed_events, max_task_container_height){
      const {  currentTime, auxTime } = this.props;
      var day_name_cells = [];
      var week_tasks = [];
      var day_cell_class;
      var day_date = new Date(auxTime); //current day
      day_date.setDate(auxTime.getDate() - (auxTime.getDay() + 6) % 7); //week monday
      const day_names = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      for (var i = 0; i < 7; i++) {
          day_cell_class = "day_name_cell_weekly";
          var isToday = checkTodayFunction( currentTime, day_date);
          if (isToday && day_date.getDate() ===  currentTime.getDate()){
            day_cell_class += " color_text";
          }

          day_name_cells[i] = <WeekCardDayHeaders day_cell_class = {day_cell_class}
                                             day_name = {day_names[i]}
                                             key={i}
                                             day = {new Date(day_date)}
                                             day_date = {day_date.toLocaleDateString('en-GB',
                                                         {day:"2-digit", month:"2-digit", year:"numeric"})}
                                             card_key = {"week_card_day_header"+i}
                                             onClickDay={this.props.onClickDay}/>

          week_tasks.push(this.generateTaskCards(day_date, events, hashed_events, max_task_container_height, i));

          day_date.setDate(day_date.getDate() + 1);
      }
      const all_elements = day_name_cells.concat(week_tasks);
      return all_elements;
  }

  getHeaderDate(){
      const { auxTime } = this.props;
      var monday_date = new Date(auxTime);
      var sunday_date = new Date(auxTime);
      monday_date.setDate(auxTime.getDate() - (auxTime.getDay() + 6) % 7);
      sunday_date.setDate(auxTime.getDate() + (7 - auxTime.getDay()) % 7);

      var main_text = "";
      var sub_text = "";

      main_text += monday_date.toLocaleString('en-GB', {month:"long"});
      main_text += " " + monday_date.toLocaleString('en-GB', {day:"numeric"}) + " -";
      if (sunday_date.getMonth() !== monday_date.getMonth()) {
          main_text += " " + sunday_date.toLocaleString('en-GB', {month:"long"})
      }
      main_text += " " + sunday_date.toLocaleString('en-GB', {day:"numeric"});


      sub_text += auxTime.toLocaleString('en-GB', {year:"numeric"})
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
      const { currentTime, auxTime } = this.props;
      return(
         <div className="content_card" id="content_card">
         <div className="content_header">
         {(() => {

            var isToday = false
            var day_date = new Date(auxTime); //current day
            day_date.setDate(auxTime.getDate() - (auxTime.getDay() + 6) % 7);
            for (var i = 0; i < 7; i++) {

               isToday = checkTodayFunction(currentTime, day_date);

               if (isToday) {
                       return <div id="this_is_you_line" className="text_15" key="this_is_you_line">
                       this is <strong>your</strong> week
                       </div>

               }
               day_date.setDate(day_date.getDate() + 1);
           }

               return <BackToToday type={"week"} onClickReturn={this.props.onClickReturn}/>

            })()}
             <HeaderDate date={this.getHeaderDate()} clickEventDate={this.props.clickEventDate}/>
         </div>
         <div className="content" id="content">
              <div className="weekly_schedule">
                  {this.generateDayCells(this.props.events,
                                         this.props.hashed_events,
                                         this.state.max_task_container_height)}

              </div>
         </div>
         </div>
    )
  }
  }

const mapStateToProps = (state) => {
    const { currentTime, auxTime } = state.appState;
    return {
        currentTime,
        auxTime,
    }
}

export default connect(mapStateToProps, null)(WeeklyCard)
