import React from "react"

export default class DailyTaskCard extends React.Component {
  getGridPlacement(event){
     var grid_start = Math.floor((event.date_start.getHours()*60 + event.date_start.getMinutes())/2)+1
     var grid_end = Math.floor((event.date_end.getHours()*60 + event.date_end.getMinutes())/2)+1
     return {"gridRow": grid_start+"/"+grid_end}
  }

  render() {
      return(
          <a className="task_card daily_task_card"
             key={this.props.event.id}
             href={this.props.event.link}
             style={this.getGridPlacement(this.props.event)}>
              <div className="task_title">
                  {this.props.event.title}
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
