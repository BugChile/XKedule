import React from "react"

export default class BackToToday extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClickReturn} id="this_is_you_line" className="text_15 hover" key="this_is_you_line">
            return to <strong>your</strong> {this.props.type}
            </div> 
        )
  }
}
