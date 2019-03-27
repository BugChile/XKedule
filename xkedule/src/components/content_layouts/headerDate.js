import React from "react"
import NextDateArrow from '../../components/input_components/nextDateArrow'
import PrevDateArrow from '../../components/input_components/prevDateArrow'


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
          <PrevDateArrow clickEventDate={this.props.clickEventDate} length={this.props.date["main"].split(" ").length} />
              {this.props.date["main"]} 
              <NextDateArrow clickEventDate={this.props.clickEventDate} length={this.props.date["main"].split(" ").length} />
          </div>,
          <div className="text_30" key="date_indicator2">
              {this.props.date["sub"]}
          </div>]

    )
  }
  }
