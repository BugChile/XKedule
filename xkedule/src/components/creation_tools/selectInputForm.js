import React from "react"
import InputForm from "./inputForm";
export default class SelectInputForm extends InputForm {
  constructor(props){
      super(props)
    }


  render() {
      var repeatValue = this.props.defaultValue;
      this.props.iterValues.forEach(value=>{
            if (value){
                if (repeatValue === this.props.defaultValue){
                    repeatValue = value;
                }else{
                repeatValue = repeatValue.concat(" - ".concat(value))
                }
            }
          })

      return(
              <div
                className={this.state.actualCss}
                onClick={this.props.onClick}
              >
              <span class="caret"></span>
              {repeatValue}
              </div>

    )
  }
  }
