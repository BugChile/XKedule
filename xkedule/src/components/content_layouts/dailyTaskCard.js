import React from "react"

export default class DailyTaskCard extends React.Component {
  getGridPlacement(event, span){
     var grid_start = Math.floor((event.date_start.getHours()*60 + event.date_start.getMinutes())/2)+1
     var grid_end = Math.floor((event.date_end.getHours()*60 + event.date_end.getMinutes())/2)+1
     return {"gridRow": grid_start+"/"+grid_end, "gridColumn": "span "+span}
  }

  render() {
      const card_id = this.props.event.id.concat("_event_daily_card")
      return(
          <a className="task_card daily_task_card"
             key={card_id}
             id={card_id}
             style={this.getGridPlacement(this.props.event, this.props.column_span)}
             title={this.props.event.title}
             onClick={()=> this.props.clickEvent(this.props.event, card_id)}>
              <div className="task_title">
              <div className="centered_container">
              {this.props.event.title}
              </div>
              </div>
              <div className="task_date">
                  {this.props.event.date_start.toLocaleTimeString('en-GB', {hour: "2-digit", minute: "2-digit"})}
                  <span>  -  </span>
                  {this.props.event.date_end.toLocaleTimeString('en-GB', {hour: "2-digit", minute: "2-digit"})}
              </div>
          </a>
    )
  }
  }
