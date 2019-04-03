import React from "react"
import ButtonFunction from '../buttonFunction'
import { isEmpty } from '../../js_helpers/helpers' 
import InfoCardLinks from './infoCardLinks'

export default class InfoCard extends React.Component {
  constructor(props){
      super(props)
      this.generateLinkComponent = this.generateLinkComponent.bind(this);


  };
  generateLinkComponent(linkComponent){
    if (linkComponent){
        return (
            <InfoCardLinks links={this.props.event.links} />
        )
    }return (
        <div></div>
    )
}
    render() {
        return (
             (() => {
          switch (this.props.event) {
          case null:   return (<div></div>) ;
          default:  return (
            <div value='1' className={''.concat(this.props.classesInfoCard).concat(' ').concat(this.props.topValue)}
            style={{left: this.props.left, top: this.props.top}}
            >
            <div className="button-container">
            <ButtonFunction function={this.props.functionClose} cssClass="trash" cssIcon="glyphicon glyphicon-trash"/>

            <ButtonFunction function={this.props.functionClose} cssClass="exit" cssIcon="glyphicon glyphicon-remove"/>
            {
              (
                (() => {
             switch (isEmpty(this.props.event.links)) {
              case true: return (<div></div>) ;
             default:  return (
            <ButtonFunction function={this.props.functionLink} cssClass="link" cssIcon="glyphicon glyphicon-link"/>
             );
             }
         })())
            }
            <ButtonFunction function={this.props.functionClose} cssClass="edit" cssIcon="glyphicon glyphicon-edit"/>
            

            </div>
            <h3>Event: {this.props.event.title}</h3>
            <h5>{this.props.event.date_start.toDateString()},</h5>
            <h4> {this.props.event.date_start.toLocaleTimeString('en-GB', {hour: "2-digit", minute: "2-digit"})}<span>  -  </span> {this.props.event.date_end.toLocaleTimeString('en-GB', {hour: "2-digit", minute: "2-digit"})}</h4>
            {this.generateLinkComponent(this.props.links)}

            </div>
          );
          }
      })()
    )
  }

}
