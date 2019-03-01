import React from "react"
import InputForm from "./inputForm";



export default class LinkTool extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          new_link_name: "",
          new_link_href: "",

      }
      this.setNewTagName = this.setNewTagName.bind(this);
      this.setNewTagHref = this.setNewTagHref.bind(this);
      this.setValue = this.setValue.bind(this);
      this.saveLink = this.saveLink.bind(this);
    }

    setNewTagName(new_tag_name){
        this.setState({new_tag_name});
    }

    setNewTagHref(new_tag_href){
        this.setState({new_tag_href});
    }

    setValue(event, target){
        if(target ==="new_tag_name"){
          this.setNewTagName(event.target.value)
      } else if(target ==="new_tag_href"){
        this.setNewTagHref(event.target.value)
      }
    }

    saveLink(){
        const link_object = {name: this.state.new_tag_name,
                           href: this.state.new_tag_href};
        this.props.add_link_to_event_callback(link_object);
        this.props.close_callback();

    }

  render() {
      return(
              <div className={this.props.classesCss} >
                  <h3>
                      Create new link
                  </h3>
                  <InputForm
                    classesCss='input big_input'
                    value={this.state.new_tag_name}
                    onChange={this.setValue}
                    placeholder="Enter link name"
                    type="new_tag_name"
                  />
                  <InputForm
                    classesCss='input big_input'
                    value={this.state.new_tag_href}
                    onChange={this.setValue}
                    placeholder="Enter link url"
                    type="new_tag_href"
                  />
                  <a className="clickable_anchor"
                       onClick={this.saveLink}>
                      Accept
                  </a>
              </div>
    )
  }
  }
