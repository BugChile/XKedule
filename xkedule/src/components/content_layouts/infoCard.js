import React from "react"
import { connect } from 'react-redux';
import ButtonFunction from '../buttonFunction'
import { isEmpty } from '../../js_helpers/helpers'
import InfoCardLinks from './infoCardLinks'
class InfoCard extends React.Component {
  constructor(props){
      super(props)
      this.generateLinkComponent = this.generateLinkComponent.bind(this);


  };
  generateLinkComponent(linkComponent){
    const { event } = this.props;
    if (linkComponent){
        return (
            <InfoCardLinks links={event.links} />
        )
    }return (
        <div></div>
    )
}
    render() {
      const { event } = this.props;
        return (
             (() => {
          switch (event) {
          case null:   return (<div></div>) ;
          default:  return (
            <div value='1' className={''.concat(this.props.classesInfoCard).concat(' ').concat(this.props.topValue)}
            style={{left: this.props.left, top: this.props.top}}
            >
            <div className="button-container">
            <ButtonFunction function={() => {this.props.functionDelete(event);this.props.functionClose()}} cssClass="trash" cssIcon="glyphicon glyphicon-trash"/>

            <ButtonFunction function={this.props.functionClose} cssClass="exit" cssIcon="glyphicon glyphicon-remove"/>
            {
              (
                (() => {
             switch (isEmpty(event.links)) {
              case true: return (<div></div>) ;
             default:  return (
            <ButtonFunction function={this.props.functionLink} cssClass="link" cssIcon="glyphicon glyphicon-link"/>
             );
             }
         })())
            }
            <ButtonFunction function={() => {this.props.functionEdit(event);this.props.functionClose()}} cssClass="edit" cssIcon="glyphicon glyphicon-edit"/>


            </div>
            <h3 className="title_event">Event: {event.title}</h3>
            <p className="description_event">{event.description}</p>
            <h5>{event.date_start.toDateString()},</h5>
            <h4> {event.date_start.toLocaleTimeString('en-GB', {hour: "2-digit", minute: "2-digit"})}<span>  -  </span> {event.date_end.toLocaleTimeString('en-GB', {hour: "2-digit", minute: "2-digit"})}</h4>
            {this.generateLinkComponent(this.props.links)}

            </div>
          );
          }
      })()
    )
  }

}

const mapStateToProps = (state) => ({
  event: state.appState.infoDailyEvent
})


export default connect(mapStateToProps, null)(InfoCard)
