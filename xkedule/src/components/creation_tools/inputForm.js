import React from "react"

export default class InputForm extends React.PureComponent {
  constructor(props){
      super(props)
      this.blurCss = this.props.classesCss
      this.focusCss = this.props.classesCss.concat(' focus_input')
      this.state = {
        actualCss: this.props.classesCss,
        value: this.props.value,
    }

    this.onFocusInput = this.onFocusInput.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);

  };

  onFocusInput(){
    this.setState({actualCss: this.focusCss})
}
  onBlurInput(){
      this.setState({actualCss: this.blurCss})
  }
  render() {
      return(
              <input 
                className={this.state.actualCss} 
                value={this.props.value} 
                onFocus={this.onFocusInput} 
                onBlur={this.onBlurInput} 
                onChange={(event)=>{this.props.onChange(event, this.props.type)}}
                required={true}
              >
              </input>
           
    )
  }
  }
