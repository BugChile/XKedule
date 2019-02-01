import React from "react"

export default class EventForm extends React.PureComponent {
  constructor(props){
      super(props)
      this.state = {
          title: "",
      }

      this.setTitle = this.setTitle.bind(this);

  };

  setTitle(event){
      this.setState({title: event.target.value})
  }

  render() {
      return(
          <div id = "event_form" className="event_form" key="event_form">
              <span> title: </span>

              <input className="input big_input" value={this.state.title} onChange={this.setTitle}></input>

              <span> date: </span>

              <input className="input big_input"></input>

              <span> from: </span>

              <input className="input small_input"></input>

              <span> to: </span>

              <input className="input small_input"></input>

              <span> repeat: </span>

              <input className="input big_input"></input>

              <span> tag: </span>

              <input className="input big_input"></input>



          </div>
    )
  }
  }
