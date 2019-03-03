import React from "react"
import Calendar from 'react-calendar';

export default class MyCalendar extends React.Component {
  constructor(props){
      super(props)


  };

  render() {
      return(
          <div id={this.props.id}>
                  <Calendar
                  value={this.props.value}
                  onChange={this.props.onChange}
                  minDate	={this.props.minDate}
                  className={this.props.className}
              />
          </div>

    )
  }
  }
