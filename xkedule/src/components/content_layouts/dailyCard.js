import React from "react"
import DailyTaskCard from './dailyTaskCard'
import HeaderDate from './headerDate'

export default class DailyCard extends React.Component {

  hourTicks(){
        return (
        <div className="hour-tick-subgrid" key="hour_tick_subgrid">
            <div className="hour-tick" key="daily_hour_tick_00">00:00</div>
            <div className="hour-tick" key="daily_hour_tick_01">01:00</div>
            <div className="hour-tick" key="daily_hour_tick_02">02:00</div>
            <div className="hour-tick" key="daily_hour_tick_03">03:00</div>
            <div className="hour-tick" key="daily_hour_tick_04">04:00</div>
            <div className="hour-tick" key="daily_hour_tick_05">05:00</div>
            <div className="hour-tick" key="daily_hour_tick_06">06:00</div>
            <div className="hour-tick" key="daily_hour_tick_07">07:00</div>
            <div className="hour-tick" key="daily_hour_tick_08">08:00</div>
            <div className="hour-tick" key="daily_hour_tick_09">09:00</div>
            <div className="hour-tick" key="daily_hour_tick_10">10:00</div>
            <div className="hour-tick" key="daily_hour_tick_11">11:00</div>
            <div className="hour-tick" key="daily_hour_tick_12">12:00</div>
            <div className="hour-tick" key="daily_hour_tick_13">13:00</div>
            <div className="hour-tick" key="daily_hour_tick_14">14:00</div>
            <div className="hour-tick" key="daily_hour_tick_15">15:00</div>
            <div className="hour-tick" key="daily_hour_tick_16">16:00</div>
            <div className="hour-tick" key="daily_hour_tick_17">17:00</div>
            <div className="hour-tick" key="daily_hour_tick_18">18:00</div>
            <div className="hour-tick" key="daily_hour_tick_19">19:00</div>
            <div className="hour-tick" key="daily_hour_tick_20">20:00</div>
            <div className="hour-tick" key="daily_hour_tick_21">21:00</div>
            <div className="hour-tick" key="daily_hour_tick_22">22:00</div>
            <div className="hour-tick" key="daily_hour_tick_23">23:00</div>
        </div> )
    }

    lines(){
        return (
            <div className="line-subgrid" key="line_subgrid">
                <div className="line" key="daily_hour_line_00"></div>
                <div className="line" key="daily_hour_line_01"></div>
                <div className="line" key="daily_hour_line_02"></div>
                <div className="line" key="daily_hour_line_03"></div>
                <div className="line" key="daily_hour_line_04"></div>
                <div className="line" key="daily_hour_line_05"></div>
                <div className="line" key="daily_hour_line_06"></div>
                <div className="line" key="daily_hour_line_07"></div>
                <div className="line" key="daily_hour_line_08"></div>
                <div className="line" key="daily_hour_line_09"></div>
                <div className="line" key="daily_hour_line_10"></div>
                <div className="line" key="daily_hour_line_11"></div>
                <div className="line" key="daily_hour_line_12"></div>
                <div className="line" key="daily_hour_line_13"></div>
                <div className="line" key="daily_hour_line_14"></div>
                <div className="line" key="daily_hour_line_15"></div>
                <div className="line" key="daily_hour_line_16"></div>
                <div className="line" key="daily_hour_line_17"></div>
                <div className="line" key="daily_hour_line_18"></div>
                <div className="line" key="daily_hour_line_19"></div>
                <div className="line" key="daily_hour_line_20"></div>
                <div className="line" key="daily_hour_line_21"></div>
                <div className="line" key="daily_hour_line_22"></div>
                <div className="line" key="daily_hour_line_23"></div>

            </div>
        )
    }

    getHeaderDate(date){
        var date_dict = {};
        return {"main": "Monday 14th", "sub": "January, 2019"}
    }

    generateEvents(events){
        var generated = []
        for (var key in events) {
            generated.push(
                <DailyTaskCard event={events[key]} key={events[key].id}/>
                )
            }
        return generated;
    }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.events === nextProps.events) {
      return false;
    } else {
      return true;
    }
  }
  componentDidMount(){
    this.props.scrollDailyEvent();
  }

  render() {
      return(
         <div className="content_card">
         <div className="content_header" key="content_header">
             <div id="this_is_you_line" className="text_15" key="this_is_you_line">
                 this is <strong>your</strong> day
             </div>
             <HeaderDate date={this.getHeaderDate(this.props.current_time)}/>
         </div>
         <div className="content" key="content" id='content' onScroll={this.props.scrollEvent}>
             <div className="daily_tasks" key="daily_tasks">
                 {this.hourTicks()}
                 {this.lines()}
                 <div className="tasks_container" key="tasks_container">
                    {this.generateEvents(this.props.events)}
                 </div>
             </div>
         </div>
         </div>
    )
  }
  }
