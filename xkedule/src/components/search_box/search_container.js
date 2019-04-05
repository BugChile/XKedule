import React from "react"
import SearchBar from "./search_bar"
import { searchOnGoogle } from '../../js_helpers/helpers'

export default class SearchContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            current_search:"",
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(){
        if (this.state.current_search){
            return searchOnGoogle(this.state.current_search);
        }else{
            alert(1);
        }
    }
    onChange(event){
        this.setState({current_search:event.target.value});
    }


    render() {

        return (
         <div className="search_container">
             
            <SearchBar onSubmit={this.onSubmit} onChange={this.onChange}/>

         </div>   
        )
  }
}
