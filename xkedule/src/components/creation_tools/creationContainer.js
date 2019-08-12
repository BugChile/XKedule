import React from "react"
import EventForm from './eventForm'

export default class CreationContainer extends React.Component {

  generateHeader(creation_mode){
      switch (creation_mode) {
          case "create_event":
              return "Create event";
          case "edit_event":
              return "Edit event";
          case "schedule":
              return "Manage schedule"
          default:
              return <div></div>
      }
  }

  generateContent(creation_mode, events, user_tags, editing_event_id){
      switch (creation_mode) {
          case "create_event":
              return <EventForm user_tags={this.props.user_tags}
                                key={"create_form_event"}
                                close_event_form={this.props.close_event_form}
                                set_new_event_callback={this.props.set_new_event_callback}
                                save_tag_callback={this.props.save_tag_callback}
                                delete_tag_callback={this.props.delete_tag_callback}
                                aux_view_time={this.props.aux_view_time}/>;
          case "edit_event":
              const editing_event = events[editing_event_id];
              return <EventForm event={editing_event}
                                key={"edit_form_event_"+editing_event.id}
                                user_tags={this.props.user_tags}
                                close_event_form={this.props.close_event_form}
                                set_new_event_callback={this.props.set_new_event_callback}
                                save_tag_callback={this.props.save_tag_callback}
                                delete_tag_callback={this.props.delete_tag_callback}
                                aux_view_time={this.props.aux_view_time}/>;
          case "schedule":
              return "Manage schedule"
          default:
              return <div></div>
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
                      {this.generateContent(this.props.creation_mode,
                                            this.props.events,
                                            this.props.user_tags,
                                            this.props.editing_event_id)}
                  </div>
              </div>
          </div>
    )
  }
  }
