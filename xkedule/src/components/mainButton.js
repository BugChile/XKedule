import React from "react";

export default class MainButton extends React.PureComponent {
  getIcon(icon_mode) {
    switch (icon_mode) {
      case "expand":
        return (
          <svg
            id="expand_arrow"
            className="expand_arrow"
            width="50"
            height="44"
            viewBox="0 0 52 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.36675 18.0007L3.28714 18.0181H37.414L26.6858 7.2662C26.1604 6.74128 25.8723 6.03018 25.8723 5.28384C25.8723 4.5375 26.1604 3.83137 26.6858 3.3052L28.3551 1.63506C28.88 1.11013 29.5795 0.819885 30.3254 0.819885C31.0718 0.819885 31.7717 1.10806 32.2966 1.63298L50.6869 20.0216C51.2139 20.5486 51.502 21.2506 51.5 21.9973C51.502 22.7482 51.2139 23.4506 50.6869 23.9768L32.2966 42.3671C31.7717 42.8916 31.0722 43.1802 30.3254 43.1802C29.5795 43.1802 28.88 42.8912 28.3551 42.3671L26.6858 40.6969C26.1604 40.1728 25.8723 39.4729 25.8723 38.7266C25.8723 37.9806 26.1604 37.3176 26.6858 36.7931L37.5351 25.9811H3.3286C1.79155 25.9811 0.499969 24.6564 0.499969 23.1202V20.758C0.499969 19.2218 1.8297 18.0007 3.36675 18.0007Z" />
          </svg>
        );
      case "save":
        return (
          <svg
            id="expand_arrow"
            className="expand_arrow"
            width="53"
            height="41"
            viewBox="0 0 53 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.611538 22.55C0.203846 22.14 0 21.525 0 21.115C0 20.705 0.203846 20.09 0.611538 19.68L3.46538 16.81C4.28077 15.99 5.50385 15.99 6.31923 16.81L6.52308 17.015L17.7346 29.11C18.1423 29.52 18.7538 29.52 19.1615 29.11L46.4769 0.615H46.6808C47.4962 -0.205 48.7192 -0.205 49.5346 0.615L52.3885 3.485C53.2038 4.305 53.2038 5.535 52.3885 6.355L19.7731 40.385C19.3654 40.795 18.9577 41 18.3462 41C17.7346 41 17.3269 40.795 16.9192 40.385L1.01923 23.165L0.611538 22.55Z"
              fill="white"
            />
          </svg>
        );
      default:
        let error = {
          code: 300,
          message: "Warning: should not enter in this case"
        };
        throw error;
    }
  }

  render() {
    return (
      <div
        id="main_button_container"
        className="main_button_container"
        onClick={this.props.function}
      >
        <div id="main_button" className="main_button linear_grad"></div>
        {this.getIcon(this.props.icon_mode)}
      </div>
    );
  }
}
