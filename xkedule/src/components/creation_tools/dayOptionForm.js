import React from "react"

export default class OptionsInputForm extends React.Component {
  constructor(props){
      super(props)
    }


  render() {
      return(
              <div 
                className={this.props.classesCss} 
                onClick={()=>this.props.onClick(this.props.value)}
               >
               {this.props.value}

              </div>
           
    )
  }
  }
