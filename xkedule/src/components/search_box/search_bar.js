import React from "react"

export default class SearchBar extends React.Component {
    render() {
        return (
                <form className="search_bar_container" onSubmit={this.props.onSubmit}>
                 <input type="text" className="search_bar" placeholder="Search on Google..." onChange={this.props.onChange}/>
                 {/* POSIBLE AGREGAR LOGO */}
                 {/* <button type="submit" className="search_button"><span className="glyphicon glyphicon-search"></span></button> */}
                 </form>
        )
  }
}
