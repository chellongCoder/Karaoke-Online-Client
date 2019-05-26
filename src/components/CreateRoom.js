import React, { Component } from 'react';
import axios from 'axios'
axios.defaults.withCredentials = true;
class App extends Component {

    state={
        name:"",
        nameSong:"",
        player1:this.props.User._id
    }
    _onChangeInput=(e)=>{
        this.setState({
            name:e.target.value
        })
        this.props.setRoom(e.target.value);
    }
    _onChangeSong=(e)=>{
        this.setState({
            nameSong:e.target.value
        })
    }
    _onSubmit = (e)=>{
       e.preventDefault()
       console.log("state: " + this.state.player1);
        axios.post("http://localhost:1998/api/music",this.state)
        .then(res=> this.props.history.push("InRoom/"+this.state.name+'/MainUser1'))
        .catch(err=>alert("Phòng Đã Tồn Tại. Mời Bạn Đặt Tên Khác"));
//         .catch(err=>console.error(err));
       
    }
    componentDidMount(){
        axios.get('http://localhost:1998/api/auth/login/check')
    .then(res=>{
      console.log(res);
      this.setState({
          player1:res.data.user._id
        // User:res.data.user,
        // // UserName:res.data.user.nameDisplay,
        // // nameSignIn:res.data.user.username
      })
     
    })
    }
    render() {
        
        return (
             <div className="container-fluid bg-secondary bg-create-room" style={{height:"690px"}}>
                <form className="center-input-custom">
                
                <input style={{width:"60%", marginBottom:"10px"}}  className="room-name bg-input form-control " type="text" onChange={this._onChangeInput} placeholder="Nhập Tên Phòng"></input>
                <input style={{width:"60%", marginBottom:"10px"}} className="nameSong  bg-input form-control " type="text" onChange={this._onChangeSong} placeholder="Nhập Tên Bài Hát"></input>
                </form>
                <button className="btn btn_custom_1 create-btn-room" onClick={this._onSubmit}>Create Room</button>
            </div>
//             <div className="container-fluid bg-secondary" style={{height:"690px"}}>
//                 <form>
//                 <input style={{width:"60%", marginBottom:"10px"}} className="room-name bg-input form-control" type="text" onChange={this._onChangeInput} placeholder="Name Room"></input>
//                 <input style={{width:"60%" , marginBottom:"10px"}} className="nameSong  bg-input form-control" type="text" onChange={this._onChangeSong} placeholder="Name Song"></input>
//                 </form>
//                 <button className="btn btn_custom_1 " onClick={this._onSubmit}>Create Room</button>
//             </div>
        );
    }
}

export default App;
