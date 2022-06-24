import axios from 'axios'
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class ChapterDetailMaster extends Component {
    constructor(props){
        super(props)
        this.state = {
            std : [],
            chp : [],

            standard_id : 0,
            chpater_id : 0,
            title : "",
            type : "",

            std_selected : false,
            lang : "",

            all : [],
        }
    }

    componentDidMount(){

        axios.get("http://localhost:3001/chapter/get-all-chap-det").then((res) => {
            this.setState({ all: res.data })
        })

        axios.get("http://localhost:3001/login/get-session", {withCredentials : true}).then((res) => {
            console.log(res.data)
            this.setState({school_id : sessionStorage.getItem("school_id")}, () => {
                axios.post("http://localhost:3001/chapter/get-ss", {school_id : this.state.school_id}).then((res) => {
                    console.log(res.data)
                    this.setState({std: res.data})
                })

                axios.post("http://localhost:3001/chapter/get-lang", {school_id : this.state.school_id}).then((res) => {
                    console.log(res.data[0].school_language)
                    this.setState({lang: res.data[0].school_language})
                })
            })
        })
    }

    handleonchange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    dropdown = (e) => {
        let std = e.target.value;
        console.log(std)
        if(std !== -1){
            this.setState({standard_id : std, std_selected : true}, () => {
                console.log(this.state);
                axios.post("http://localhost:3001/chapter/std-wise-chap", {standard : std}).then((res) => {
                    console.log(res.data)
                    this.setState({chp : res.data})
                })
            })
        }
        else{
            this.setState({std_selected : false})
        }
        console.log(this.state)
    }

    onSubmit = (e) => {
        console.log(this.state)
        let t;
        if(this.state.title === "TextBook" || this.state.title === "પુસ્તક"){
            t = 1
        }
        else if(this.state.title === "Video" || this.state.title === "વિડિયો"){
            t = 2
        }
        else{
            t = 3
        }
        axios.post("http://localhost:3001/chapter/add-chap-del", {std : this.state.standard_id, chap : this.state.chpater_id, title : this.state.title, type : t}).then((res) => {
            this.componentDidMount();
        })
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Chapter Detail !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/chapter/delete-chap-det/${id}`).then((res) => {
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
            <div className="container">
                <div className="row mt-0">
                    <div className="spContainer mx-auto">
                        <div className="card px-4 py-5 border-0 shadow">
                            <div className="d-inline text-left mb-3">
                                <h3 className="font-weight-bold">Chapter Detail Master</h3>
                            </div>

                            <div className="d-inline text-center mb-3">
                                <div className="form-group mx-auto">
                                    <select name='standard_id' className='form-control inpSp' onChange={this.dropdown}>
                                        <option selected value={-1}>Select Standard</option>
                                        {this.state.std.map((x) => {
                                            return (
                                                <option value={x.standard_id}>{x.standard}</option>
                                            )
                                        })}

                                    </select>
                                </div>
                            </div>
                            <div className="d-inline text-center mb-3">
                                <div className="form-group mx-auto">
                                    {this.state.std_selected === false ?
                                        <select class='form-control inpSp' name="chpater_id" onChange={this.handleonchange} aria-label="Default select example" disabled>
                                            <option selected>Open this select menu</option>
                                            {this.state.chp.map((x) => {
                                                return (
                                                    <option value={x.chapter_master_id}>{x.chapter_title}</option>
                                                )
                                            })}
                                        </select>
                                        :
                                        <select class='form-control inpSp' name="chpater_id" onChange={this.handleonchange} aria-label="Default select example">
                                            <option selected>Select Chapter</option>
                                            {this.state.chp.map((x) => {
                                                return (
                                                    <option value={x.chapter_master_id}>{x.chapter_title}</option>
                                                )
                                            })}
                                        </select>
                                    }
                                </div>
                            </div>

                            <div className="d-inline text-center mb-3">
                                <div className="form-group mx-auto">
                                    {this.state.lang === "English" ?

                                        <select name='title' className='form-control inpSp' onChange={this.handleonchange}>
                                            <option selected>Select Option</option>
                                            <option value={"TextBook"}>TextBook</option>
                                            <option value={"Video"}>Video</option>
                                            <option value={"MCQ"}>MCQ</option>
                                        </select>
                                        :
                                        this.state.lang === "Gujarati"
                                            ?
                                            <select name='title' className='form-control inpSp' onChange={this.handleonchange}>
                                                <option selected>Select Option</option>
                                                <option value={"પુસ્તક"}>પુસ્તક</option>
                                                <option value={"વિડિયો"}>વિડિયો</option>
                                                <option value={"MCQ"}>MCQ</option>
                                            </select>
                                            :
                                            <select name='title' className='form-control inpSp' onChange={this.handleonchange}>
                                                <option selected>Select Option</option>
                                                <option value={1}>English</option>
                                                <option value={2}>Gujarati</option>
                                                <option value={3}>Hindi</option>
                                            </select>
                                    }
                                </div>
                            </div>

                            <div className="d-inline text-left mb-3">
                                <div className="form-group mx-auto">
                                    <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>&nbsp;&nbsp;
                                    {/* <a className="small text-black-50 pl-2 ml-2 border-left" href="">Forgot Password ?</a> */}
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

            <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Chapter Detail List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Chapter Detail List</h3>
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
                                            <th scope="col">Chapter Detail Master Id</th>
                                            <th scope="col">Chapter Master Id</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">type Chapter</th>
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
                                                    <td>{x.chapterdetails_master_id}</td>
                                                    <td>{x.chapter_master_id}</td>
                                                    <td>{x.title}</td>
                                                    <td>{x.type_chapter}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.chapterdetails_master_id) }}>Delete</button></td>
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
    )
  }
}
