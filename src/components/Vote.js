import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
axios.defaults.withCredentials = true;
class App extends Component {
  state = {

  }
  componentDidMount() {
    axios.put(`http://localhost:1998/api/music/name/${this.props.match.params.Room}`,{status:"end"})
    .then(res=>{
      
    })
    axios.get(`http://localhost:1998/api/music/name/${this.props.match.params.Room}`)
      .then(res => {
        console.log("re",res);
        let battle = res.data.battleFound;
        this.setState({
          vote1: battle.vote1,
          user1: battle.player1._id,
          user1name: battle.player1.username,
          NameDisplay1:battle.player1.nameDisplay,
          NameDisplay2:battle.player2 ? battle.player2.nameDisplay : "", 
          vote2: battle.vote2,
          user2name: battle.player2 ? battle.player2.username : "",
          user2: battle.player2 ? battle.player2._id : ""
        })
        setTimeout(() => {
          if (this.props.nameSignIn) {

            if (this.state.vote1 > this.state.vote2) {
              if (this.props.nameSignIn === this.state.user1name) {
                console.log("user1 Win")
                axios.put(`http://localhost:1998/api/user/${this.state.user1}`, { allPoint: 5 });
              }
            }
            else {
              if (this.state.vote1 < this.state.vote2) {
                if (this.props.nameSignIn === this.state.user2name) {
                  console.log("user1 Win")
                  axios.put(`http://localhost:1998/api/user/${this.state.user2}`, { allPoint: 5 });
                }
              }
            }
          }
        })
      })

  }
  render() {
    return (
      <div className="container-fluid">
        <h1 className="text-center text-danger"><strong>Result</strong></h1><br></br>
        <div className="alert alert-info text-center" style={{fontSize:"50px"}}>
          <strong> {this.state.NameDisplay1 ? this.state.NameDisplay1:"Vote1" } : </strong><span>{this.state.vote1 ? this.state.vote1 : 0}</span> - <strong> {this.state.NameDisplay2 ? this.state.NameDisplay2:"Vote2" } : </strong><span>{this.state.vote2 ? this.state.vote2 : 0}</span>
        </div>
        <a href="/Mainpage">
        <button type="button" className="Vote-MainPage btn btn-success">Mainpage</button>
        </a>
      </div>
    );
  }
}

export default App;