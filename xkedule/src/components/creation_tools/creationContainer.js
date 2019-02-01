import React from "react"
import EventForm from './eventForm'

export default class CreationContainer extends React.PureComponent {

  generateHeader(creation_mode){
      switch (creation_mode) {
          case "create_event":
              return "Create event";
          case "edit_event":
              return "Edit event";
          case "schedule":
              return "Manage schedule"
      }
  }

  generateContent(creation_mode){
      switch (creation_mode) {
          case "create_event":
              return <EventForm />;
          case "edit_event":
              return <EventForm />;
          case "schedule":
              return "Manage schedule"
      }
  }

  render() {
      return(
          <div id = "creation_container" className="creation_container" key="creation_container">
              <div className="small_creation_card">
                  <div className="creation_header">
                      <span> {this.generateHeader(this.props.creation_mode)} </span>
                  </div>
                  <div className="creation_content">
                      {this.generateContent(this.props.creation_mode)}
                  </div>
              </div>
          </div>
    )
  }
  }
