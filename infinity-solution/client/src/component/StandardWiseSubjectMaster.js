import axios from 'axios'
import React, { Component } from 'react'
import swal from 'sweetalert';


export default class StandardWiseSubjectMaster extends Component {
    constructor() {
        super()
        this.state = {
            subject: "",
            standard: "",
            stdList: [],
            subList: [],
            uname: null,
            school_id: null,
            all : [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/standard-subject/get-all-sws").then((res) => {
            this.setState({ all: res.data })
        })

        axios.get("http://localhost:3001/login/get-session", { withCredentials: true }).then((res) => {
            console.log(res.data)
            this.setState({ school_id: sessionStorage.getItem("school_id") }, () => {
                axios.post("http://localhost:3001/standard-subject/get-ss", { school_id: this.state.school_id }).then((res) => {
                    // console.log(res.data)
                    this.setState({ stdList: res.data[0], subList: res.data[1] })
                })
            })
        })
    }

    handleonchange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        axios.post("http://localhost:3001/standard-subject/add-swsm", this.state).then((res) => {
            console.log(res.data)
            this.componentDidMount();
        })
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Data !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/standard-subject/delete-sws/${id}`).then((res) => {
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
                                    <h3 className="font-weight-bold">Standard Wise Subject Master</h3>
                                </div>


                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <select name='standard' className='form-control inpSp' onChange={this.handleonchange}>
                                            <option>Select Standard</option>

                                            {this.state.stdList.map((x) => {
                                                return (
                                                    <option value={x.standard_id}>{x.standard}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <select name='subject' className='form-control inpSp' onChange={this.handleonchange}>
                                            <option>Select Subject</option>
                                            {/* <option value={"1"}>English</option>
                                <option value={"2"}>Gujarati</option>
                                <option value={"3"}>Hindi</option> */}
                                            {this.state.subList.map((x) => {
                                                return (
                                                    <option value={x.subject_id}>{x.subject_master}</option>
                                                )
                                            })}
                                        </select>
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

                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Standard Wise Subject List</h3>
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
                                            <th scope="col">Suject ID</th>
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
                                                    <td>{x.subject_id}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.standard_wise_id) }}>Delete</button></td>
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
