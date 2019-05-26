import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
axios.defaults.withCredentials = true;
class App extends Component {
  state = {
    userId: ''
  }
  _onChoose = (e) => {
    this.props.setRoom(this.props.room.name);
  }
  _Xem = (e) => {
    this.props.setRoom(this.props.room.name);
  }
  _Chien = (e) => {
    this.props.setRoom(this.props.room.name);
    if (this.state.userId != '') {
      axios.put(`http://localhost:1998/api/music/${this.props.room._id}`, {
        status: "play",
        player2: this.state.userId
      })
        .then(console.log("success"))
        .catch(err => console.error(err));
    }
  }
  componentDidMount() {
    if(this.props.nameSignIn){
    axios.get(`http://localhost:1998/api/user/name/${this.props.nameSignIn}`)
      .then(res => {
        // console.log(res);
        this.setState({
          userId: res.data.UserFound._id
        })
        })}
        
  }
  render() {
    return (
       <div className="DatailRoom">
        <div className="">
        <img style={{width:"150px"}} src="https://previews.123rf.com/images/leberus/leberus1709/leberus170900015/85171939-versus-%C3%A9cran-vs-lettres-match-de-comp%C3%A9tition-vs-match-bataille-martiale-vs-sport-.jpg" onClick={this._onChoose} className="img-detail"></img>
        {/* Edit final */} 
        <span className="name-detail"><h4 className="name-room-title">Tên Phòng:</h4><p className="room-name-custom">{this.props.room.name}</p></span>
        <span className="song-detail"><h4 className="name-room-title">Tên Bài Hát: </h4> <p className="room-name-custom " style={{left: "157px",
    top: "-35px"}}>{this.props.room.nameSong}</p></span><br></br>
        {/* end */}
        <Link to={`InRoom/${this.props.room.name}/User`}>
          <button onClick={this._Xem} className="btn btn-warning btn-detail">Xem</button>
        </Link>
        {this.props.room.status == "Wait" ? <Link to={`InRoom/${this.props.room.name}/MainUser2`}>
          <button onClick={this._Chien} className="btn btn-danger btn-detail">Chiến</button>
        </Link> : ''}

        <hr/>
      </div>
      </div>
//       <div className="DatailRoom">
//         <div className="">
//         <img style={{width:"150px"}} src="https://previews.123rf.com/images/leberus/leberus1709/leberus170900015/85171939-versus-%C3%A9cran-vs-lettres-match-de-comp%C3%A9tition-vs-match-bataille-martiale-vs-sport-.jpg" onClick={this._onChoose} className="img-detail"></img>
//         <span className="name-detail">{this.props.room.name}</span>
//         <span className="song-detail"> {this.props.room.nameSong}</span><br></br>
//         <Link to={`InRoom/${this.props.room.name}/User`}>
//           <button onClick={this._Xem} className="btn btn-warning btn-detail">Xem</button>
//         </Link>
//         {this.props.room.status == "Wait" ? <Link to={`InRoom/${this.props.room.name}/MainUser2`}>
//           <button onClick={this._Chien} className="btn btn-danger btn-detail">Chien</button>
//         </Link> : ''}
//       </div>
//       </div>
    );
  }
}

export default App;
