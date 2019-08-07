import React from "react"
import DailyTaskCard from './dailyTaskCard'
import HeaderDate from './headerDate'
import BackToToday from './backToToday'
import { checkDateOverlap, onlyUnique, multiplyReducer, increasingFunctionCompare, checkTodayFunction} from "../../js_helpers/helpers"

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

  getHeaderDate(aux_view_time){
        var date_dict = {};
        date_dict["main"] = aux_view_time.toLocaleString('en-GB', {weekday:"long", day: "numeric"});
        date_dict["sub"] = aux_view_time.toLocaleString('en-GB', {month:"long", year: "numeric"});
        return date_dict;
    }

    groupOverlaps(events){
        var grouped = [];
        var already_found = false;
        events.forEach((_event) => {

            // look for already grouped events colliding
            grouped.forEach((group) => {
                if (!already_found &&
                    checkDateOverlap(_event.date_start, _event.date_end,
                                     group.overlap_start, group.overlap_end)) {
                        already_found = true;
                        if (_event.date_start < group.events[group.compare_index].date_end) {
                            group.length += 1;
                        } else {
                            group.compare_index += 1;
                        }

                        if (_event.date_start < group.overlap_start) {
                            group.overlap_start = _event.date_start
                        }

                        if (_event.date_end > group.overlap_end) {
                            group.overlap_end = _event.date_end
                        }
                        
                        group.events.push(_event);


                }
            });

            // no colliding, new group
            if (!already_found) {
                grouped.push({overlap_start: _event.date_start,
                              overlap_end: _event.date_end,
                              compare_index: 0,
                              length: 1,
                              events: [_event]});
            }
            already_found = false;
        });
        return grouped;
    }

  generateEvents(events, aux_view_time){
        const day_events = events[aux_view_time.toLocaleDateString()]
        var col_number = 1;
        if (day_events) {
            var tasks = [];
            const sorted_events = day_events.sort(
                                    (a, b) =>
                                        increasingFunctionCompare(a.date_start.getTime(),
                                                                  b.date_start.getTime()));
            const grouped_events = this.groupOverlaps(sorted_events);
            col_number = grouped_events.map(x => x.events.length).filter(onlyUnique).reduce(multiplyReducer, 1);
            col_number = 40;
            var span = 1;
            grouped_events.forEach((group) => {
                span = Math.floor(col_number / group.length);
                group.events.forEach((_event) => {
                    tasks.push(
                        <DailyTaskCard event={_event}
                                       key={_event.id}
                                       clickEvent={this.props.clickEvent}
                                       column_span={span}/>
                        )
                });
            })
        }
        return <div className="tasks_container"
                    key="tasks_container"
                    style={{"gridTemplateColumns": `repeat(${col_number}, 1fr)`}}>
                    {tasks}
               </div>;
    }


  componentDidMount(){
    this.props.scrollDailyEvent();
  }

  render() {
      return(
         <div className="content_card" id="content_card">
         <div className="content_header" key="content_header">

         {(() => {

             var isToday = checkTodayFunction(this.props.current_time, this.props.aux_view_time);

             if (isToday) {
                    return <div id="this_is_you_line" className="text_15" key="this_is_you_line">
                    this is <strong>your</strong> day
                    </div>

             }else{
                return <BackToToday type={"day"} onClickReturn={this.props.onClickReturn}/>
         }})()}

             <HeaderDate date={this.getHeaderDate(this.props.aux_view_time)} clickEventDate={this.props.clickEventDate}/>
         </div>
         <div className="content" key="content" id='content' onScroll={this.props.scrollEvent}>
             <div className="daily_tasks" key="daily_tasks">
                 {this.hourTicks()}
                 {this.lines()}
                 {this.generateEvents(this.props.events,
                                         this.props.aux_view_time)}
             </div>
         </div>
         </div>
    )
  }
  }
