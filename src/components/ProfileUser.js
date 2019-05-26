
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
axios.defaults.withCredentials = true;
class App extends Component {
    state={
        
    }
    componentDidMount(){
        if(this.props.nameSignIn){
            axios.get(`http://localhost:1998/api/user/name/${this.props.nameSignIn}`)
            .then(res=>{
                this.setState({
                    User:res.data.UserFound
                })
            })
        }
    }
    render() {
        console.log(this.props)
        return (
              <div className="container-fluid bg-secondary" style={{ height: "670px" }}>
                <h1 className="text-center text-danger"><strong>Your Profile</strong></h1><br></br>
                <div className="text-white">
                    <h2> Username: {this.state.User ? this.state.User.nameDisplay : "User"} </h2>
                    <h2> Năm Sinh: {this.state.User ? this.state.User.dateOfBirth : "Năm Sinh"} </h2>
                    <h2> Số Trận Thắng : {this.state.User ? (this.state.User.allPoint / 5) : "0"} (Trận) </h2>
                    <h2> Tổng Điểm Thưởng: {this.state.User ? this.state.User.allPoint : "0"} (Điểm) </h2>
                    <h2> Giới Tính: {this.state.User ? this.state.User.sex : "Không Xác Định"}</h2>
                </div>
                <a href="/Mainpage">
                    <button type="button" className="Vote-MainPage btn btn-success">Trang Chủ</button>
                </a>
            </div>
//             <div className="container-fluid bg-secondary" style={{ height: "670px" }}>
//                 <h1 className="text-center text-danger"><strong>Your Profile</strong></h1><br></br>
//                 <div className="text-white">
//                     <h2> Ten: {this.state.User ? this.state.User.nameDisplay : "player"} </h2>
//                     <h2> Nam Sinh: {this.state.User ? this.state.User.dateOfBirth : "Nam Sinh"} </h2>
//                     <h2> Wins : {this.state.User ? (this.state.User.allPoint / 5) : "0"} tran </h2>
//                     <h2> All Point: {this.state.User ? this.state.User.allPoint : "0"} diem </h2>
//                     <h2> Sex: {this.state.User ? this.state.User.sex : ":))"}</h2>
//                 </div>
//                 <a href="/Mainpage">
//                     <button type="button" className="Vote-MainPage btn btn-success">Mainpage</button>
//                 </a>
//             </div>
        );
    }
}

export default App;




