import React from "react"

export default class ButtonFunction extends React.Component {
    render() {
        return (
         <span className={'button_min '.concat(this.props.cssClass)} onClick={this.props.function}>
         <i className={"glyphicon glyphicon-".concat(this.props.cssIcon)}>{this.props.text}</i>
         </span>   
        )
  }
}