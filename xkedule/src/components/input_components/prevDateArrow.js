import React from "react"

export default class PrevDateArrow extends React.Component {
    render() {

        return  (
            <span  onClick={()=> this.props.clickEventDate(this.props.length, "prev")} className="arrow-left"></span>
            )
          
        
            

  }

}
