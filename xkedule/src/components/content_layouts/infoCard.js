import React from "react"
import ButtonFunction from '../buttonFunction'

export default class InfoCard extends React.Component {
    render() {
        return (
             (() => {
          switch (this.props.event) {
          case null:   return (<div>asd</div>) ;
          default:  return (
            <div value='1' className={''.concat(this.props.classesInfoCard).concat(' ').concat(this.props.topValue)}>
            <div className="button-container">
            <ButtonFunction function={this.props.functionClose} cssClass="trash" cssIcon="glyphicon glyphicon-trash"/>

            <ButtonFunction function={this.props.functionClose} cssClass="exit" cssIcon="glyphicon glyphicon-remove"/>
            {
              (
                (() => {
             switch (this.props.event.link) {
              case null: case "":   case false: case undefined:   return (<div></div>) ;
             default:  return (
            <ButtonFunction function={this.props.functionClose} cssClass="link" cssIcon="glyphicon glyphicon-link"/>
             );
             }
         })())
            }
            <ButtonFunction function={this.props.functionClose} cssClass="edit" cssIcon="glyphicon glyphicon-edit"/>

            </div>
            <h3>Event: {this.props.event.title}</h3>
            <h5>{this.props.event.date_start.toDateString()},</h5>
            <h4> {this.props.event.date_start.toLocaleTimeString('en-GB', {hour: "2-digit", minute: "2-digit"})}<span>  -  </span> {this.props.event.date_end.toLocaleTimeString('en-GB', {hour: "2-digit", minute: "2-digit"})}</h4>
            </div>
          );
          }
      })()
    )
  }

}
