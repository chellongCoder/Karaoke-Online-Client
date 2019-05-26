import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
axios.defaults.withCredentials = true;
class App extends Component {
    state = {

    }
    
    _onChangeInput=(e)=>{
        console.log("aaaaaaa")
        this.props.setRoom(e.target.value);
        this.setState({
            Room:e.target.value
        })
    }
       
    
    render() {
        return (
            <div>
                <input onChange={this._onChangeInput} ></input>

                <Link to={`/InRoom/${this.state.Room}/MainUser2`}>
                    <button onClick={this._onSubmit}> Join </button>
                </Link>
            </div>

        );
    }
}

export default App;
