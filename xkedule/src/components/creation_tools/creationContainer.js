import React from "react"

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

  render() {
      return(
          <div id = "creation_container" className="creation_container" key="creation_container">
              <div className="small_creation_card">
                  <div className="creation_header">
                      <span> {this.generateHeader(this.props.creation_mode)} </span>
                  </div>
                  <div className="creation_content">
                  </div>
              </div>
          </div>
    )
  }
  }
