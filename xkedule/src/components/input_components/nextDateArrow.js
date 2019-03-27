import React from "react"

export default class NextDateArrow extends React.Component {
    render() {

        return  ( 
            <span  onClick={()=> this.props.clickEventDate(this.props.length, "next")} className={"arrow-right"}></span>
            )
          
        
            

  }

}
