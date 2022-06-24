import axios from 'axios';
import React, { Component } from 'react'
import './TeacherLogin.css';
import { Navigate, Route } from "react-router-dom";
// import { Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";
import { Routes } from "react-router-dom"
import MCQMaster from './MCQMaster';
import Home from './Home';
import StandardWiseSubjectMaster from './StandardWiseSubjectMaster';

export default class TeacherLogin extends Component {
    constructor(){
        super()
        this.state = {
            uname : "",
            password : "",
            school : -1,
            schools : [],
            uservaliadtion : false,
        }
    }

    componentDidMount(){
        sessionStorage.clear();
            sessionStorage.removeItem("school_id")
    }

    handleonchange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit = (e) =>{
        console.log(this.state);
        axios.post("http://localhost:3001/login/teacher-check", this.state, {withCredentials : true}).then((res) => {
            console.log(res.data);
            if(res.data[0] === true)
            {
                this.setState({uservaliadtion : true, school : res.data[1]}, () => {
                    sessionStorage.setItem("school_id", this.state.school)
                })
                
            }
        })
    }

  render() {
    return (
        <div>
            {this.state.uservaliadtion === true ? <Navigate to={{ pathname: "/home"}} replace={true} /> : <Navigate to={{ pathname: "/"}} replace={true} />}
            
            <div className="container">
                <div className="row mt-5">
                    <div className="spContainer mx-auto">
                    <div className="card px-4 py-5 border-0 shadow">
                        <div className="d-inline text-left mb-3">
                        <h3 className="font-weight-bold">Teacher Login</h3>
                        </div>
                        <div className="d-inline text-center mb-0">
                        <div className="form-group mx-auto">
                            <input className="form-control inpSp" type="text" name='uname' placeholder="Email Id / Mobile No." onChange={this.handleonchange}/>
                        </div>
                        </div>
                        <div className="d-inline text-center mb-3">
                        <div className="form-group mx-auto">
                            <input className="form-control inpSp" type="password" name='password' placeholder="Password" onChange={this.handleonchange}/>
                        </div>
                        </div>

                        {/* <div className="d-inline text-center mb-3">
                        <div className="form-group mx-auto">
                            <select name='school' className='form-control inpSp' onChange={this.handleonchange}>
                                <option selected>Select School</option>
                                {this.state.schools.map((x) => {
                                    return(
                                        <option value={x.school_id}>{x.school_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        </div> */}

                        <div className="d-inline text-left mb-3">
                        <div className="form-group mx-auto">
                            <button className="btn btn-primary" onClick={this.onSubmit}>Login</button>&nbsp;&nbsp;
                            {/* <a className="small text-black-50 pl-2 ml-2 border-left" href="">Forgot Password ?</a> */}
                        </div>
                        </div>
                        <div className="d-inline text-left mb-1">
                    
                        </div>
                        <div className="d-inline text-left">
                        <div className="form-group mx-auto">
                            
                        </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
  }
}
