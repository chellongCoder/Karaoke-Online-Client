import React, { Component } from 'react';
import Stream from './components/Stream'
import Stream2 from './components/Stream2'
import Stream3 from './components/Stream3'
import Login from './components/Login'
import CreateRoom from './components/CreateRoom';
import Main from './components/Main';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Vote from './components/Vote'
import ProfileUser from './components/ProfileUser'
import { BrowserRouter, Route } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;
class App extends Component {
  state = {
    Room:'',
    UserName:'',
    nameSignIn:'',
  }
  _setNameSigin=(data)=>{
    this.setState({
      nameSignIn:data
    })
    console.log(this.state.nameSignIn);
  }
  _setName = (data) => {
    this.setState({
      User:data,
      UserName:data.nameDisplay
    })
    setTimeout(()=>{
      console.log(this.state);
    })
  }
  _setRoom = (data) => {
    this.setState({
      Room:data
    })
    console.log(this.state);
  }
  componentDidMount(){
    
    axios.get('http://localhost:1998/api/auth/login/check')
    .then(res=>{
      console.log(res);
      this.setState({
        User:res.data.user,
        UserName:res.data.user.nameDisplay,
        nameSignIn:res.data.user.username
      })
     
    })
  }
  render() {
    return (
      <BrowserRouter >
        <div className="App">

          <Route exact path="/login" render={(props)=>{
            return <Login setName={this._setName} setNameSigin={this._setNameSigin} {...props}/>
          }}/>

          <Route exact path='/' render={(props)=>{
            return <HomePage {...props}/>
          }}/> 

          <Route exact path='/register' render={(props)=>{
            return <Register setName={this._setName} setNameSigin={this._setNameSigin} {...props} />  
          }}/>
           
          <Route exact path="/Mainpage" render={(props)=>{
            return <Main setRoom={this._setRoom} nameSignIn={this.state.nameSignIn} UserName={this.state.UserName} {...props} />
          }}/>
          
          <Route exact path="/profile" render={(props)=>{
            return <ProfileUser User={this.state.User} nameSignIn={this.state.nameSignIn} {...props}/>
          }}/>

          <Route exact path="/CreateRoom" render={(props)=>{
            return <CreateRoom setRoom={this._setRoom} {...props} User={this.state.User} UserName={this.state.UserName} />
          }}/>

         <Route exact path="/InRoom/:Room/MainUser1" render={(props)=>{
            return <Stream {...props} UserName={this.state.UserName} Room={this.state.Room}/>
          }}/>

          <Route exact path="/InRoom/:Room/MainUser2" render={(props)=>{
            return <Stream3 {...props} UserName={this.state.UserName} Room={this.state.Room}/>
          }}/>

          <Route exact path="/InRoom/:Room/User" render={(props)=>{
            return <Stream2 {...props} UserName={this.state.UserName} Room={this.state.Room}/>
          }}/>

          <Route exact path="/InRoom/:Room/Vote" render={(props)=>{
            return <Vote {...props} nameSignIn={this.state.nameSignIn}/>
          }}/>
          
          
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
