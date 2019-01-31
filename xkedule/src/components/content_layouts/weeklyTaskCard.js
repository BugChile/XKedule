import React from "react"

export default class WeeklyTaskCard extends React.Component {
  render() {
      return(
          <a className="task_card weekly_task_card"
             key={this.props.event.id}>
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
