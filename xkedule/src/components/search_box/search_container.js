import React from "react"
import SearchBar from "./search_bar"
import { searchOnGoogle } from '../../js_helpers/helpers'

export default class SearchContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            current_search:"",
        }

        this.onChange = this.onChange.bind(this);
    }
    onChange(event){
        this.setState({current_search:event.target.value});
    }


    render() {

        return (
         <div className="search_container">
             
            <SearchBar onChange={this.onChange} search={this.state.current_search}/>

         </div>   
        )
  }
}
