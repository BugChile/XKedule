import React from "react"

export default class SwitchWeekMonth extends React.Component {
  render() {
      return(
          <div id="switch_week_month" className="switch_week_month" onClick={this.props.switchWeekMonthCB}>
              <div id="switch_week_month_background" className="switch_week_month_background">
              </div>
              <div id="switch_week_month_button" className="switch_week_month_button">
              </div>
              <div id="switch_to_week" className="switch_to_week">
                  week
              </div>
              <div id="switch_to_month" className="switch_to_month">
                  month
              </div>
          </div>
    )
  }
  }
