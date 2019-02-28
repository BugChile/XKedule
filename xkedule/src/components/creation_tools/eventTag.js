import React from "react"

export default class EventTag extends React.PureComponent {
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

  getTagOptions(){
      if (this.props.canDelete) {
          return <i className='fas fa-times'></i>
      }
  }
  render() {
      return(
              <div
                className={this.state.actualCss}
                onFocus={this.onFocusInput}
                onBlur={this.onBlurInput}
              >
                <span>
                    {this.props.tag_name}
                </span>
                {this.getTagOptions()}

              </div>

    )
  }
  }
