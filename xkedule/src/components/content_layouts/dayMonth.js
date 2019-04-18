import React from "react"

export default class DayMonth extends React.Component {
  render() {
      return(
      <div className={this.props.classCss} onClick={()=> this.props.onClickDay(this.props.day)}>
        {this.props.day.getDate()}
    </div>
        
    )
  }
  }
