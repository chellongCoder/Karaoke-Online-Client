import React, { Component } from 'react';
import DetailRoom from './DetailRoom';
import axios from 'axios'
axios.defaults.withCredentials = true;
class App extends Component {

  render() {
    
    const allRoom = this.props.Rooms.map(room=>(
        <div className="col-4" >
            <DetailRoom room={room} setRoom={this.props.setRoom} nameSignIn={this.props.nameSignIn} {...this.props} />
        </div>
    ))
    // console.log(this.props.Rooms)
    return (
      <div className="container-fluid" >
        <div className="row">
          { allRoom }
        </div>
      </div>
    );
  }
}

export default App;
