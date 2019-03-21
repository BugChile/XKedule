import React from "react"

export default class HeaderDate extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
      if (this.props.date === nextProps.date) {
        return false;
      } else {
        return true;
      }

  }

  render() {
      return(
          [<div className="text_bold_title color_text" key="date_indicator1">
              {this.props.date["main"]}
          </div>,
          <div className="text_30" key="date_indicator2">
              {this.props.date["sub"]}
          </div>]

    )
  }
  }
