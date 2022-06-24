import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Home.css';
import { Navigate, Route, Routes } from "react-router-dom";
import MCQMaster from './MCQMaster';
import Navbar from './Navbar';
import Digits from './Digits';
import StandardMaster from './StandardMaster';
import StandardWiseSubjectMaster from './StandardWiseSubjectMaster';
import SubjectMaster from './SubjectMaster';
import SchoolMaster from './SchoolMaster';
import AlphabateMaster from './AlphabateMaster';
import Other from './Other';
import axios from 'axios';
import ChapterDetailMaster from './ChapterDetailMaster';
import ChapterWiseTopic from './ChapterWiseTopic';
import ChapterMaster from './ChapterMaster';
import Miscellaneous_title from './Miscellaneous_title';
import NibandhTitle from './NibandhTitle';
import Nibandh from './Nibandh';
import NotificationMaster from './NotificationMaster';
import SwadhyayMaster from './SwadhyayMaster';
import QuePaperMaster from './QuePaperMaster';
import PaperYearMaster from './PaperYearMaster';
import TimeTableMaster from './TimeTableMaster';
import TopicMaster from './TopicMaster';
import TopicHeadingMaster from './TopicHeadingMaster';
import BookMaster from './BookMaster';
import VideoMaster from './VideoMaster';
import MCQQuestion from './MCQQuestion';

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
          uname : null,
          school_id : null,
        }
    }

    componentDidMount(){
      axios.get("http://localhost:3001/login/get-session", {withCredentials : true}).then((res) => {
        console.log(res.data)
        this.setState({uname : res.data.username, school_id : res.data.school_id})
      })
    }

  render() {
    return (
      <div>
          <div>
          <Navbar/>
          <Routes>
            <Route path="/home/mcq" element={<MCQMaster />} />
            <Route path="/home/mcqque" element={<MCQQuestion />} />

            <Route path="/home/add-standard" element={<StandardMaster />} />
            <Route path="/home/add-standard-wise-subject" element={<StandardWiseSubjectMaster />} />
            <Route path="/home/add-subject" element={<SubjectMaster />} />
            <Route path="/home/add-swadhyay" element={<SwadhyayMaster />} />
            <Route path="/home/add-que-paper" element={<QuePaperMaster />} />
            <Route path="/home/add-paper-year" element={<PaperYearMaster />} />
            <Route path="/home/add-timetable" element={<TimeTableMaster />} />
            <Route path="/home/add-topic-master" element={<TopicMaster />} />
            <Route path="/home/add-topic-head-master" element={<TopicHeadingMaster />} />

            <Route path="/home/add-school" element={<SchoolMaster />} />
            <Route path="/home/add-miscellaneous-title" element={<Miscellaneous_title />} />
            <Route path="/home/add-nibandh-titles" element={<NibandhTitle />} />
            <Route path="/home/add-nibandh" element={<Nibandh />} />
            <Route path="/home/add-book" element={<BookMaster />} />
            <Route path="/home/add-Video" element={<VideoMaster />} />
            
            <Route path="/home/add-digits" element={<Digits />} />
            <Route path="/home/add-alphabate" element={<AlphabateMaster />} />
            <Route path="/home/add-other" element={<Other />} />

            <Route path="/home/chap-det" element={<ChapterDetailMaster/>} />
            <Route path="/home/chap-wise-topic" element={<ChapterWiseTopic />} />
            <Route path="/home/chapter" element={<ChapterMaster />} />

            <Route path="/home/notification" element={<NotificationMaster />} />
          </Routes>
          </div>
      </div>
    )
  }
}
