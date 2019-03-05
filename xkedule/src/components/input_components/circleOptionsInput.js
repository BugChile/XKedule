import React from "react"

// Circle option input

export default class CircleOptionsInput extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            selected_options: [],
        }

        this.updatedSelectedOptions = [];

        this.selectOption = this.selectOption.bind(this);
        this.undoSelect = this.undoSelect.bind(this);
        this.getComponentDivs = this.getComponentDivs.bind(this);
    };

    selectOption(option){
        if (!(this.state.selected_options.includes(option))) {
            this.updatedSelectedOptions.push(option);
            this.setState({selected_options: this.updatedSelectedOptions});
            this.forceUpdate(); //due to array deep comparison. other solution is to override componentShouldUpdate
        }
    }

    undoSelect(option){
        if (this.state.selected_options.includes(option)) {
            const option_index = this.state.selected_options.indexOf(option);
            this.updatedSelectedOptions.splice(option_index, 1);
            this.setState({selected_options: this.updatedSelectedOptions});
            this.forceUpdate(); //due to array deep comparison. other solution is to override componentShouldUpdate
        }
    }

    getComponentDivs(selected, options){
        var divs = [];
        var className;
        var onClick;
        options.forEach((option) => {
            className = "circle_option"
            if (selected.includes(option)) {
                className += " selected_circle_option"
                onClick = () => {this.undoSelect(option)};
            } else {
                onClick = () => {this.selectOption(option)};
            }
            divs.push(<div className={className}
                           onClick={onClick}>
                        <div>
                            {option}
                        </div>
                      </div>)
        });
        return divs;
    }


   render() {
        return(
            <div className={"circle_options_container "+this.props.className}>
                {this.getComponentDivs(this.state.selected_options, this.props.options)}
            </div>
        )
    }
}
