import React from "react"
import DayOptionForm from "./dayOptionForm";
import SelectInputForm from "./selectInputForm";

export default class OptionsInputForm extends React.Component {
  constructor(props){
      super(props)
    }


  render() {
      return(
              <div className={this.props.classesCss} >
                
                <div className={"flex options_days"}>
               {/* DayOptionForm for each day */}
                {(() => {
                  var arrayRet = [];
                  Object.keys(this.props.dayIndex).forEach(key => {
                  arrayRet.push(<DayOptionForm 
                    value={key}
                    classesCss={"day_selected_".concat(this.props.repeat[this.props.dayIndex[key]])} 
                    onClick={this.props.onClickDay}/>)
                })
                return arrayRet
              })()}
              
                  
                </div>

                <SelectInputForm 
                  classesCss='input big_input div_input' 
                  iterValues={this.props.lastDayRepeat} 
                  defaultValue="Select Last Repetition Week"
                  onClick={this.props.onClickDate}
                  />

                <input type="submit" value="Done" onClick={this.props.onClick}/>
              </div>
           
    )
  }
  }
