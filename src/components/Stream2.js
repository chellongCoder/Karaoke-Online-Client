import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Peer from 'peerjs';
import openSocket from 'socket.io-client';


import {Input} from 'reactstrap'
import axios from 'axios'
axios.defaults.withCredentials = true;
class App extends Component {
    state = {
        Time: 10,
        UserInfor: {
            UserName: this.props.UserName,
            PeerId: "",
            Room: this.props.Room,
            Role: ""
        },
        Comment: [],
        NamePlayer1: "",
        NamePlayer2: "",
        vote:0,
        nowChatText:'',
        ChatValue:""
    }
    _openStream() {

        const config = { audio: true, video: false };
        return navigator.mediaDevices.getUserMedia(config);
    }
    _playstream(idVideoTag, stream) {
        const video = document.getElementById(idVideoTag)
        video.srcObject = stream;
        video.play();
    }
    _onStartLiveStream = (e) => {
        this._openStream()
            .then(stream => {
                this._playstream('localStream2', stream);
                this.setState({
                    stream: stream
                })
            })
    }
    _onInputChange = (event) => {
        this.setState({
            ChatValue: event.target.value,
            nowChatText: event.target.value
        })
    }
    _onSendChatText = (event) => {
        if(this.state.ChatValue!=""){
            this.state.socket.emit("Send-Chat-Content", this.state.ChatValue);
                this.setState({
                    nowChatText: "",
                    ChatValue:""
                })
            }
    }
    Vote1=(e)=>{
        var RoomName = this.props.Room
        
        if(this.state.vote === 0){
            console.log(RoomName);
            axios.put(`http://localhost:1998/api/music/name/${RoomName}`,{vote1:1})
            this.setState({
                vote:1
            })
        }
    }
    Vote2=(e)=>{
        var RoomName = this.props.Room;
        if(this.state.vote === 0){
            console.log(this.props.Room);
            axios.put(`http://localhost:1998/api/music/name/${RoomName}`,{vote2:1})
            this.setState({
                vote:1
            })
        }
    }
    Votepage = ()=> {
       this.props.history.push('vote');  
    }
    componentDidMount() {
        axios.get(`http://localhost:1998/api/music/name/${this.props.Room}`)
            .then(res => {
                console.log(res)
                if (res.data.battleFound.status === "play") {
                    this.setState({
                        NamePlayer1: res.data.battleFound.player1.nameDisplay,
                        NamePlayer2: res.data.battleFound.player2.nameDisplay
                    })
                }
                else if (res.data.battleFound.status === "Wait") {
                    this.setState({
                        NamePlayer1: res.data.battleFound.player1.nameDisplay,
                    })
                }
            });
        var i = 1;
        this.setState({
            // peer: new Peer({ key: 'tkv5g2acaree9udi' })
            peer : new Peer({ key: 'peerjs',host:'mypeer1998.herokuapp.com',secure:true,port:443 })
        })
        this.setState({
            socket: openSocket('http://localhost:1998')
        })
        setTimeout(() => {
            this.state.peer.on('open', id => {
                var PreUserData = this.state.UserInfor;
                PreUserData.PeerId = id
                PreUserData.Role = "user"
                this.setState({
                    UserInfor: PreUserData
                })
                console.log(PreUserData);
                this.state.socket.emit('User-Info', PreUserData);
            })

            this.state.socket.on('Player 2 Join', (data) => {
                if (this.state.NamePlayer2 === '') {
                    this.setState({
                        NamePlayer2: data
                    })
                }
            })
            this.state.socket.on("Server send Start Game",(data)=>{
                if(data===0){
                  this.Votepage();
                }
                this.setState({
                    Time:data
                })
            })
            this.state.peer.on('call', call => {
                console.log("i: " + i);
                if (i === 1) {
                    this._openStream()
                        .then(stream => {
                            call.answer(stream);
                            call.on('stream', remoteStream => this._playstream('localStream1', remoteStream));
                            i++;
                        })
                }
                else {
                    this._openStream()
                        .then(stream => {
                            call.answer(stream);
                            call.on('stream', remoteStream => this._playstream('localStream2', remoteStream));
                        })
                }
            })
            this.state.socket.on("Sever-send-chat-data", (data) => {
                var PreComment = this.state.Comment;
                PreComment.push(data);
                this.setState({
                    Comment: PreComment
                })

            });
        })


    }
    renderChat = () => {
        var arr1 = []
        for (let i = 0; i < this.state.Comment.length; i++) {
            if (this.state.Comment[i].UserName === this.props.UserName) {
                // Owner Chat
               arr1[i] = <h6 style={{ color: "#fff" ,fontSize:'15px',marginBottom:"20px"  }}>{this.state.Comment[i].UserName ? this.state.Comment[i].UserName :"User Name" }:<span style={{backgroundColor:"red",padding:"6px 11px", borderRadius:"19px 14px 12px"}}>{this.state.Comment[i].content}</span></h6>
           }
           else {

               // Viewer
               arr1[i] = <h6 style={{ color: "#fff" ,fontSize:'15px',marginBottom:"20px"  }} >{this.state.Comment[i].UserName}:<span style={{backgroundColor:"green",padding:"6px 11px", borderRadius:"19px 14px 12px"}}>{this.state.Comment[i].content}</span></h6>
          }
        }
        return arr1;
    }
    render() {
        return (
                    
            <div className="container-fluid bg_img_stream">
            <div className="row">
          
                <div className="video-area col-8"> 
                    <p className="room-now" >   {this.props.Room ? this.props.Room : 'Name of Room'} </p>
                   
                    <div className="row">
                    <div className="col-6 video-1">
                    <div id="Player1">
                        <video id="localStream1" height="300px" width="450px" controls></video>
                        <p className="name-user">{this.state.NamePlayer1 ? this.state.NamePlayer1 : 'User 1'}</p>
                        <button  className="btn btn-warning vote-click" style={{position: "relative",left: "120px"}} onClick={this.Vote1} > Vote Player 1 </button>
                    </div>
                    </div>
                <div className="col-6 video-2">

                    <div id="Player2">
                        <video id="localStream2" height="300px" width="450px" controls></video>
                        <p className="name-user">{this.state.NamePlayer2 ? this.state.NamePlayer2 : 'User 2'}</p>
                        <button className="btn btn-warning vote-click" style={{position: "relative",left: "120px"}} onClick={this.Vote2} > Vote Player 2 </button>
                    </div>

                </div>
                <p className=" time-remain" > Time remain: {this.state.Time} </p>  
                </div>
                    {/* <button onClick={this._onStartLiveStream} className="" >Start Livestream</button> */}
                    {/* <button className="btn btn_custom_1 btn_round start-btn" id="start" onClick={this._startGame}>START</button> */}
                </div>
                <div className="col-4">
                <div className="chat">
                    <div className="chat-content">
                        {this.renderChat()}
                    </div>
                    <div className="chat-area">
                        <Input className="type-chat" type="text" onChange={this._onInputChange} value={this.state.nowChatText} />
                        <button className="btn btn-custom" onClick={this._onSendChatText} >Send</button>
                    </div>
                </div>
                </div>
              </div>  
            </div>
            
            
//             <div className="container-fluid bg_img_stream">
//             <div className="row">
          
//                 <div className="video-area col-8"> 
//                     <p className="room-now" >   {this.props.Room ? this.props.Room : 'Name of Room'} </p>
                   
//                     <div className="row">
//                     <div className="col-6 video-1">
//                     <div id="Player1">
//                         <video id="localStream1" height="300px" width="450px" controls></video>
//                         <p className="name-user">{this.props.UserName ? this.props.UserName : 'User 1'}</p>
//                         <button  className="btn btn-warning vote-click" style={{position: "relative",left: "120px"}} onClick={this.Vote1} > Vote Player 1 </button>
//                     </div>
//                     </div>
//                 <div className="col-6 video-2">

//                     <div id="Player2">
//                         <video id="localStream2" height="300px" width="450px" controls></video>
//                         <p className="name-user">{this.state.NamePlayer2 ? this.state.NamePlayer2 : 'User 2'}</p>
//                         <button className="btn btn-warning vote-click" style={{position: "relative",left: "120px"}} onClick={this.Vote2} > Vote Player 2 </button>
//                     </div>

//                 </div>
//                 <p className=" time-remain" > Time remain: {this.state.Time} </p>  
//                 </div>
                   
//                 </div>
//                 <div className="col-4">
//                 <div className="chat">
//                     <div className="chat-content">
//                         {this.renderChat()}
//                     </div>
//                     <div className="chat-area">
//                         <Input className="type-chat" type="text" onChange={this._onInputChange} value={this.state.nowChatText} />
//                         <button className="btn btn-custom" onClick={this._onSendChatText} >Send</button>
//                     </div>
//                 </div>
//                 </div>
//               </div>  
//             </div>
       
        );
    }
}

export default App;
