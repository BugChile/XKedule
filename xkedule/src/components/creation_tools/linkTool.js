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
        const link_object = {name: this.state.new_link_name,
                             href: this.state.new_link_href};
        this.props.onSubmit(link_object);

    }

  render() {
      return(
              <div className={this.props.className} >
                  <TextLineInput placeholder="Link name"
                                 value={this.state.new_link_name}
                                 onChange={this.setNewLinkName}/>
                  <TextLineInput placeholder="Link url"
                                 value={this.state.new_link_href}
                                 onChange={this.setNewLinkHref}/>
                  <div className="button" onClick={this.saveLink}>
                      Save link
                  </div>
              </div>
    )
  }
  }
