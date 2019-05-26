import React, { Component } from 'react';

import {
  Container, Label, Badge, CardTitle,
  Button, Input, Form, FormGroup,
  Nav
} from 'reactstrap';
import axios from 'axios'
axios.defaults.withCredentials = true;
class Register extends Component {

  componentDidMount() {

  }
  state = {
    user: {
      nameDisplay: '',
      username: '',
      password: '',
      sex: '',
      dateOfBirth: '1998'
    }

  }

  handleChange = (e) => {
    var preUser = this.state.user;
    console.log("id: " + e.target.id)
    if (e.target.id == "0") preUser.nameDisplay = e.target.value
    if (e.target.id == "1"){
      this.props.setNameSigin(e.target.value);
      preUser.username = e.target.value;
    } 
    if (e.target.id == "2") preUser.password = e.target.value
    if (e.target.id == "3") preUser.sex = e.target.value
    if (e.target.id == "4") preUser.dateOfBirth = e.target.value;

    this.setState({ user: preUser })


  }

  handleRegister = (e) => {

    console.log(this.state.user);
    axios.post('http://localhost:1998/api/user', this.state.user,)
      .then(res=>{
       console.log(res);
        this.props.setName(res.data.newuserCreated);
        this.props.history.push('/Mainpage');
      } )
      .catch(err => err)
    // .then(console.log("successssssssssssssssssss"));
  }


  render() {

    return (

      <div className=''>
        <div className='bg-img'></div>
        <FormGroup className="text-center ml-10 form-register ">
          <CardTitle className='header-register'>REGISTER</CardTitle>

          <Form className='form'>


            <Nav className='mt-2'>
              <Label className='col-3' >Display Name:</Label>
              <Input onChange={this.handleChange} className="input-bg col-6" type="text" id="0"  required />
            </Nav>

            <Nav className='mt-2'>
              <Label className='col-3' >Username:</Label>
              <Input onChange={this.handleChange} className="input-bg col-6" type="text" id="1"  required />
            </Nav>

            <Nav className='mt-2'>
              <Label className='col-3' >Password:</Label>
              <Input onChange={this.handleChange} className="input-bg col-6" type="password" id="2" required />
            </Nav>

           

            {/* ADD CODE to confirm password */}

            <Nav className='mt-2'>
              <Label className='col-3'for="exampleSelect" >Sex:</Label>
              <Input onChange={this.handleChange} className="input-bg col-6" type="select" id="3" name="select-sex" required>

                <option></option>
                <option>Male</option>
                <option>Female</option>
                <option>LGBT</option>

              </Input>
            </Nav>

            <Nav className='mt-2'>
              <Label className='col-3'>Age: </Label>
              <Input onChange={this.handleChange} className="input-bg col-6" type="select" id="4" name="select-year" required>
              <option></option>
                <option>1990</option>
                <option>1991</option>
                <option>1992</option>
                <option>1993</option>
                <option>1994</option>
                <option>1995</option>
                <option>1996</option>
                <option>1997</option>
                <option>1998</option>
                <option>1999</option>
                <option>2000</option>
                <option>2001</option>
                <option>2002</option>
              </Input>
            </Nav>

            
          </Form>
          <Button className='mt-3 button-register' onClick={this.handleRegister} >REGISTER </Button>
        </FormGroup>

        

            
      </div>
    );
  }
}

export default Register;
