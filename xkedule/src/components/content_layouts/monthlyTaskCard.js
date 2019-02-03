import React from "react"

export default class MonthlyTaskCard extends React.Component {
  render() {
      return(
          <a className="task_card monthly_task_card"
             key={this.props.event.id}>
              <div className="task_title">
                  {this.props.event.title}
              </div>
          </a>
    )
  }
  }
