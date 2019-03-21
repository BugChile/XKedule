import React from "react"

export default class WeekCardDayHeaders extends React.Component {

  render() {
      return(
          <div className={this.props.day_cell_class} key={this.props.card_key}>
                             <div className="day_name">
                                 {this.props.day_name}
                             </div>
                             <div className="day_date">
                                 {this.props.day_date}
                             </div>
           </div>

    )
  }
  }