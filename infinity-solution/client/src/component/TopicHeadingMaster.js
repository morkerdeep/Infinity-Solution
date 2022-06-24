import axios from 'axios';
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class TopicHeadingMaster extends Component {
  constructor(){
    super();
    this.state={
      topic_heading_master_title: "",
      school_id: 1,
      standard_id: 0,

      std: [],
      lang: "",
      standard_11_12 : [],

      std_selected : false,

      all : [],
    }
  }

  handleonchange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  componentDidMount(){

    axios.get("http://localhost:3001/standard-subject/get-all-topic-heading").then((res) => {
            this.setState({ all: res.data })
        })

    axios.get("http://localhost:3001/login/get-session", {withCredentials : true}).then((res) => {
        console.log(res.data)
        this.setState({school_id : sessionStorage.getItem("school_id")}, () => {
            axios.post("http://localhost:3001/standard-subject/get-sl", {school_id : this.state.school_id}).then((res) => {
            console.log(res.data)
            this.setState({std: res.data[0], lang : res.data[1][0].school_language})
            })
        })
    })
  }

  onSubmit = () => {
    console.log(this.state);
    axios.post("http://localhost:3001/standard-subject/add-topic-heading",{topic_heading_master_title:this.state.topic_heading_master_title,school_id:this.state.school_id,standard_id:this.state.standard_id})
      .then((res)=>{
        console.log(res);
        this.componentDidMount();
      })
      .catch((err)=>{
        console.log(err);
      })
  }

    dropdown = (e) => {
        let std = e.target.value;
        if(std !== -1){
            this.setState({standard_id : std, std_selected : true}, () => {
                axios.post("http://localhost:3001/standard-subject/get-stds", {standard : std, school : this.state.school_id}).then((res) => {
                    console.log(res.data[0].standard)
                    this.setState({standard_11_12 : res.data[0].standard})
                })
            })
        }
        else{
            this.setState({std_selected : false})
        }
        console.log(this.state)
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Topic Heading !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/standard-subject/delete-topic-heading/${id}`).then((res) => {
                        this.componentDidMount();
                    })
                } else {
                    swal("Operation has been cancelled!");
                }
            });
    }

  render() {
    return (
        <div>
            <div>
                <div className="container">
                    <div className="row mt-0">
                        <div className="spContainer mx-auto">
                            <div className="card px-4 py-5 border-0 shadow">
                                <div className="d-inline text-left mb-3">
                                    <h3 className="font-weight-bold">Topic Heading Master</h3>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <select name='standard_id' className='form-control inpSp' onChange={this.dropdown}>
                                            <option selected>Select The Standard</option>
                                            {this.state.std.map((e) => {
                                                return (
                                                    <option key={e.standard_id} value={e.standard_id}>{e.standard}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        {this.state.std_selected === false ?
                                            <select class='form-control inpSp' name="topic_heading_master_title" onChange={this.handleonchange} aria-label="Default select example" disabled>
                                                <option selected>Open this select menu</option>
                                            </select>
                                            :
                                            this.state.lang === "English"
                                                ?
                                                this.state.standard_11_12 === "11" || this.state.standard_11_12 === "12"
                                                    ?
                                                    <select class='form-control inpSp' name="topic_heading_master_title" onChange={this.handleonchange} aria-label="Default select example">
                                                        <option selected>Topic Heading Master Title</option>
                                                        <option value="Science">Science</option>
                                                        <option value="Commerce">Commerce</option>
                                                        <option value="Arts">Arts</option>
                                                    </select>
                                                    :
                                                    <select class='form-control inpSp' name="topic_heading_master_title" onChange={this.handleonchange} aria-label="Default select example">
                                                        <option selected>Topic Heading Master Title</option>
                                                        <option value="sem 1">sem 1</option>
                                                        <option value="sem 2">sem 2</option>
                                                    </select>
                                                :
                                                this.state.lang === "Gujarati"
                                                    ?
                                                    this.state.standard_11_12 === "૧૧" || this.state.standard_11_12 === "૧૨"
                                                        ?
                                                        <select class='form-control inpSp' name="topic_heading_master_title" onChange={this.handleonchange} aria-label="Default select example">
                                                            <option selected>Topic Heading Master Title</option>
                                                            <option value="સાયન્સ">સાયન્સ</option>
                                                            <option value="કોમર્સ">કોમર્સ</option>
                                                            <option value="આર્ટ્સ">આર્ટ્સ</option>
                                                        </select>
                                                        :
                                                        <select class='form-control inpSp' name="topic_heading_master_title" onChange={this.handleonchange} aria-label="Default select example">
                                                            <option selected>Topic Heading Master Title</option>
                                                            <option value="સત્ર 1">સત્ર 1</option>
                                                            <option value="સત્ર 2">સત્ર 2</option>
                                                        </select>
                                                    :
                                                    this.state.standard_11_12 === "११" || this.state.standard_11_12 === "१२"
                                                        ?
                                                        <select class='form-control inpSp' name="topic_heading_master_title" onChange={this.handleonchange} aria-label="Default select example">
                                                            <option selected>Topic Heading Master Title</option>
                                                            <option value="साइंस">साइंस</option>
                                                            <option value="कॉमर्स">कॉमर्स</option>
                                                            <option value="आर्ट्स">आर्ट्स</option>
                                                        </select>
                                                        :
                                                        <select class='form-control inpSp' name="topic_heading_master_title" onChange={this.handleonchange} aria-label="Default select example">
                                                            <option selected>Topic Heading Master Title</option>
                                                            <option value="सेमेस्टर 1">सेमेस्टर 1</option>
                                                            <option value="सेमेस्टर 2">सेमेस्टर 2</option>
                                                        </select>
                                        }
                                    </div>
                                </div>

                                <div className="d-inline text-left mb-3">
                                    <div className="form-group mx-auto">
                                        <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>&nbsp;&nbsp;
                                    </div>
                                </div>
                                <div className="d-inline text-left mb-1">

                                </div>
                                <div className="d-inline text-left">
                                    <div className="form-group mx-auto">

                                    </div>
                                </div>
                                <div className="d-inline text-left mt-3">
                                    {/* <div className="form-group mx-auto mb-0">
                            <a className="text-black font-weight-bold regStr" href="#">Register new account</a>
                        </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Topic Heading List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Topic Heading List</h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Standard Id</th>
                                            <th scope="col">School ID</th>
                                            <th scope="col">Topic Heading Id</th>
                                            <th scope="col">Topic Heading Title</th>
                                            <th scope="col">Click To Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.state.all)}
                                        {this.state.all.map((x, key) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{key + 1}</th>
                                                    <td>{x.standard_id}</td>
                                                    <td>{x.school_id}</td>
                                                    <td>{x.topic_heading_master_id}</td>
                                                    <td>{x.topic_heading_master_title}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.topic_heading_master_id) }}>Delete</button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>        

            </div>
        </div>
    )
  }
}