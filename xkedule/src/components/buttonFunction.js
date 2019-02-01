import React from "react"

export default class ButtonFunction extends React.Component {
    render() {
        return (
         <span className='button_min' onClick={this.props.function}>{this.props.text}</span>   
        )
  }
}