import React, { Component } from 'react';


import MainContent from './MainContent';
import Navbar from './Navbar';
import axios from 'axios'
axios.defaults.withCredentials = true;
class App extends Component {
    state = {
        Rooms:[],
        searchText:""
    }
    _setSearchText=(data)=>{
        this.setState({
            searchText:data
        })
        
    }
    _onChangeInput=(e)=>{
        this.setState({
            room:e.target.value
        })
        this.props.setRoom(e.target.value);
    }
    componentDidMount(){
        axios.get("http://localhost:1998/api/music")
        .then(res=>{
            this.setState({
                Rooms:res.data.battles
            })
        })
        // setTimeout(()=>{
        //     console.log(this.state.Rooms)
        // },0)
    }
    render() {
        const displayerRoom1=[];
        for(let i=0;i<this.state.Rooms.length;i++){
            if(this.state.Rooms[i].status !=="end" ){
                displayerRoom1.push(this.state.Rooms[i])
            }
        }
        const displayerRoom = displayerRoom1.filter(room => room.nameSong.includes(this.state.searchText)) ;
        return (
             <div > 
                <Navbar  UserName={this.props.UserName} {...this.props} setSearchText={this._setSearchText} />
                {/* Edit final */}
                <h1 className="room-now-battle">Các Phòng Hiện Tại</h1><hr style={{fontWeight:"bolder", borderTop: "1px solid rgba(0,0,0,0.3)"}}/>
               
                <MainContent Rooms={displayerRoom} setRoom={this.props.setRoom} {...this.props} nameSignIn={this.props.nameSignIn} />
           
        </div>
            
//             <div > 
//                 <Navbar  UserName={this.props.UserName} {...this.props} setSearchText={this._setSearchText} />
//                 <h1>Cac Room Hien Co</h1>
               
//                 <MainContent Rooms={displayerRoom} setRoom={this.props.setRoom} {...this.props} nameSignIn={this.props.nameSignIn} />
           
//         </div>
        );
    }
}

export default App;
