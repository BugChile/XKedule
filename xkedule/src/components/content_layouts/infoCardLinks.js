import React from "react"

export default class InfoCardLinks extends React.Component {
    render() {

        return  <div className="infoCardLinksContainer">
            {
                
            Object.entries(this.props.links)
            .map( ([key, value]) => {
            return (
            <a className="linkInfo" key={key} href={value.href}>{value.name}</a> 
            )
        })
          
        
            }
        </div>

  }

}
