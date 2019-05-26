
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import video from '../video/login.mp4'
import '../CSS/style.css'
import axios from 'axios';
import Register from './Register';
axios.defaults.withCredentials = true;
class App extends Component {
    _onChangeUserName=(e)=>{
        this.setState({
            username:e.target.value
        })
        console.log(this.state);
        this.props.setNameSigin(e.target.value)
    }
   
    _onChangePassWord=(e)=>{
        this.setState({
            password:e.target.value
        })
        console.log(this.state);
    }
    _onSubmit=(e)=>{
        e.preventDefault()
        console.log("bbbbb");
        axios.post('http://localhost:1998/api/auth/login',this.state)
        .then(res=>{
           
            // console.log("aaaaaaaaa");
            this.props.setName(res.data.userFound);
            this.props.history.push('Mainpage');
        })
        .catch(err=>{
            alert('Dang Nhap khong thanh cong')
            
        });
    }

    
    // Luong 
    // _onSubmitRegister=(e)=>{
        
    // }

    
    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="wrap-video">
                    <video id="background-video" loop autoPlay muted>
                        <source src={video} type="video/mp4" />
                        <source src={video} type="video/ogg" />
                    </video>
                </div>

                {/* <div className="backgroundimg">
                <img src="https://s3.envato.com/files/166459326/register-login-add-on.png" className="img-login"> */}

                <div className="bg_img col-lg-12">
                    <form  className="form-input">
                        <h3 className="header-login">Log In</h3>
                        <div className="form-group">

                           <input type="text" className="form-control" onChange={this._onChangeUserName}  placeholder='Your username ...'></input><br></br>
                        </div>
                        <div className="form-group">
                        <input type="password" className="form-control" onChange={this._onChangePassWord} placeholder='Your password ...'></input><br></br>
                        </div>
                        <div className="form-check">

                        </div>
                        <div>
                            
                            <button className="button1 btn btn-primary" id='login'  onClick={this._onSubmit}> Login </button>
                           
                               <Link to={'/register'}>
                                <button className="button1 btn btn-success" id='register'> Register </button>
                               </Link>
                     
                            <br />
                            
                            <br />
                            <br />

                            <div>

                            </div>
                        </div>

                    </form>

                </div>


            </div>
        </div>
        );
    }
}

export default App;


