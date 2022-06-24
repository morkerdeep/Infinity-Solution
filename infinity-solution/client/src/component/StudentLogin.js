import React, { Component } from 'react';
import './TeacherLogin.css';
import axios from 'axios';

export default class StudentLogin extends Component {

    constructor(){
        super()
        this.state = {
            uname : "",
            password : "",
            uservaliadtion : false,
        }
    }

    onchange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit = (e) =>{
        console.log(this.state);
        axios.post("http://localhost:3001/login/student-check", this.state).then((res) => {
            console.log(res.data);
        })
    }


  render() {
    return (
      <div>
          <div class="container">
            <div class="row mt-5">
                <div class="spContainer mx-auto">
                <div class="card px-4 py-5 border-0 shadow">
                    <div class="d-inline text-left mb-3">
                    <h3 class="font-weight-bold">Student Login</h3>
                    </div>
                    <div class="d-inline text-center mb-0">
                    <div class="form-group mx-auto">
                        <input class="form-control inpSp" type="text" name='uname' placeholder="Email Id / Mobile No." onChange={this.onchange}/>
                    </div>
                    </div>
                    <div class="d-inline text-center mb-3">
                    <div class="form-group mx-auto">
                        <input class="form-control inpSp" type="password" name='password' placeholder="Password" onChange={this.onchange}/>
                    </div>
                    </div>
                    <div class="d-inline text-left mb-3">
                    <div class="form-group mx-auto">
                        <button class="btn btn-primary" onClick={this.onSubmit}>Login</button>&nbsp;&nbsp;
                        {/* <a class="small text-black-50 pl-2 ml-2 border-left" href="">Forgot Password ?</a> */}
                    </div>
                    </div>
                    <div class="d-inline text-left mb-1">
                   
                    </div>
                    <div class="d-inline text-left">
                    <div class="form-group mx-auto">
                        
                    </div>
                    </div>
                    <div class="d-inline text-left mt-3">
                    {/* <div class="form-group mx-auto mb-0">
                        <a class="text-black font-weight-bold regStr" href="#">Register new account</a>
                    </div> */}
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
