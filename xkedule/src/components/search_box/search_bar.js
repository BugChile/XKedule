import React from "react"

export default class SearchBar extends React.Component {
    render() {
        return (
                <form action=
                {`https://www.google.com/webhp?tab=ww&ei=m8UiU9OUI8T7oATGiIDYBQ&ved=0CBcQ1S4#q=${this.props.search.replace(" ", "+")}`} className="search_bar_container" >
                 <input type="text" className="search_bar" placeholder="Search on Google..." onChange={this.props.onChange}/>
                 {/* POSIBLE AGREGAR LOGO */}
                 {/* <button type="submit" className="search_button"><span className="glyphicon glyphicon-search"></span></button> */}
                 </form>
        )
  }
}
