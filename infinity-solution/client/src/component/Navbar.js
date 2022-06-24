import React, { Component } from 'react'
import './Navbar.css'
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Navbar extends Component {
    handleLogout = (e) => {
        axios.post("http://localhost:3001/login/logout").then((res) => {
            sessionStorage.clear();
            sessionStorage.removeItem("school_id")
        })
    }
  render() {
    return (
      <div>
          <div>
          </div>
          <nav class="navbar navbar-expand-md px-5 navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                <a class="navbar-brand pb-2" >School</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="/home">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        MCQ
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        
                        <Link   
                            to="/home/mcq"
                        > <li><a class="dropdown-item">MCQ Master</a></li>
                        </Link>

                        <Link   
                            to="/home/mcqque"
                        > <li><a class="dropdown-item">MCQ Question Master</a></li>
                        </Link>
                        </ul>
                    </li>


                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Standard & Subject
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        
                        <Link   
                            to="/home/add-standard"
                        > <li><a class="dropdown-item">Add Standard</a></li>
                        </Link>

                        <Link   
                            to="/home/add-subject"
                        > <li><a class="dropdown-item">Add Subjcet</a></li>
                        </Link>

                        <Link   
                            to="/home/add-standard-wise-subject"
                        > <li><a class="dropdown-item">Add standard wise subject</a></li>
                        </Link>

                        <Link   
                            to="/home/add-swadhyay"
                        > <li><a class="dropdown-item">Add Swadhyay</a></li>
                        </Link>

                        <Link   
                            to="/home/add-que-paper"
                        > <li><a class="dropdown-item">Add Question Paper</a></li>
                        </Link>

                        <Link   
                            to="/home/add-paper-year"
                        > <li><a class="dropdown-item">Add Paper Year</a></li>
                        </Link>

                        <Link   
                            to="/home/add-timetable"
                        > <li><a class="dropdown-item">Add TimeTable</a></li>
                        </Link>

                        <Link   
                            to="/home/add-topic-master"
                        > <li><a class="dropdown-item">Add Topic Master</a></li>
                        </Link>

                        <Link   
                            to="/home/add-topic-head-master"
                        > <li><a class="dropdown-item">Add Topic Heading Master</a></li>
                        </Link>

                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Bal Vibhag
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link   
                            to="/home/add-digits"
                        > <li><a class="dropdown-item">Add Digits</a></li>
                        </Link>

                        <Link   
                            to="/home/add-alphabate"
                        > <li><a class="dropdown-item">Add Aplphabates</a></li>
                        </Link>

                        <Link   
                            to="/home/add-other"
                        > <li><a class="dropdown-item">Other</a></li>
                        </Link>

                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        School
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link   
                            to="/home/add-school"
                        > <li><a class="dropdown-item">Add School</a></li>
                        </Link>
                        <Link   
                            to="/home/add-miscellaneous-title"
                        > <li><a class="dropdown-item">Add Miscellaneous Title</a></li>
                        </Link>
                        <Link   
                            to="/home/add-nibandh-titles"
                        > <li><a class="dropdown-item">Add Nibandh Title</a></li>
                        </Link>
                        <Link   
                            to="/home/add-nibandh"
                        > <li><a class="dropdown-item">Add Nibandh</a></li>
                        </Link>

                        <Link   
                            to="/home/add-book"
                        > <li><a class="dropdown-item">Add Book</a></li>
                        </Link>

                        <Link   
                            to="/home/add-video"
                        > <li><a class="dropdown-item">Add Video</a></li>
                        </Link>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Chapter
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        
                        <Link   
                            to="/home/chap-det"
                        > <li><a class="dropdown-item">Chapter Detail Master</a></li>
                        </Link>

                        <Link   
                            to="/home/chapter"
                        > <li><a class="dropdown-item">Add Chpater Master</a></li>
                        </Link>

                        <Link   
                            to="/home/chap-wise-topic"
                        > <li><a class="dropdown-item">ChapterWishTopicMaster</a></li>
                        </Link>

                        </ul>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Notification
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        

                        <Link   
                            to="/home/notification"
                        > <li><a class="dropdown-item">Add Notification</a></li>
                        </Link>

                        </ul>
                    </li>
                    </ul>

                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <Link   
                            to="/"
                        > <li> <button class="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={this.handleLogout}>Logout</button> </li>
                        </Link>
                    </ul>	
                </div>
            </nav>            
      </div>
    )
  }
}