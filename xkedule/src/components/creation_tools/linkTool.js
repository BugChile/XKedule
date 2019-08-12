import React from "react"
import TextLineInput from "../input_components/textLineInput";



export default class LinkTool extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          new_link_name: "",
          new_link_href: "",

      }
      this.setNewLinkName = this.setNewLinkName.bind(this);
      this.setNewLinkHref = this.setNewLinkHref.bind(this);
      this.saveLink = this.saveLink.bind(this);
    }

    setNewLinkName(new_link_name){
        this.setState({new_link_name});
    }

    setNewLinkHref(new_link_href){
        this.setState({new_link_href});
    }

    saveLink(){
        var href;

        // add https if not already there
        if (this.state.new_link_href.indexOf("https://") !== 0 || this.state.new_link_href.indexOf("http://") !== 0) {
            href = "https://" + this.state.new_link_href;
        } else {
            href = this.state.new_link_href
        }
        const link_object = {name: this.state.new_link_name,
                             href};
        this.props.onChange(link_object);
        this.setNewLinkName("");
        this.setNewLinkHref("");

    }

  render() {
      return(
              <div className={this.props.className} >
                  <div className="horizontal_flex label_input_combo">
                      <div className="input_label">
                        Link name
                      </div>
                      <TextLineInput value={this.state.new_link_name}
                                     onChange={this.setNewLinkName}/>
                  </div>
                  <div className="horizontal_flex label_input_combo">
                      <div className="input_label">
                        Link url
                      </div>
                      <TextLineInput value={this.state.new_link_href}
                                     onChange={this.setNewLinkHref}/>
                  </div>
                  <div className="horizontal_flex shrink_row">
                      <div className="button" onClick={this.saveLink}>
                          Save link
                      </div>
                      <a className="clickable_anchor"
                           onClick={this.props.doneEditing}>
                          Cancel
                      </a>
                  </div>
              </div>
    )
  }
  }
