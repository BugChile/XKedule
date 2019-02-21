import React from "react"
import InputForm from "./inputForm";
export default class TimeInputForm extends InputForm {
  constructor(props){
      super(props)
    }


  render() {
    var actualCss;
    if(this.props.isDisabled){
      actualCss = this.state.actualCss.concat(" disabled")
    }else{
      actualCss = this.state.actualCss
    }
      return(
              <input 
                type="time"  
                className={actualCss} 
                value={this.props.value} 
                onFocus={this.onFocusInput} 
                onBlur={()=>{
                  this.onBlurInput();
                  this.props.functionCheck(this.props.value)
                }} 
                onChange={(event)=>{this.props.onChange(event, this.props.type)}}
                min={this.props.min} max="23:59" 
                disabled={this.props.isDisabled}
              >
              </input>
           
    )
  }
  }
