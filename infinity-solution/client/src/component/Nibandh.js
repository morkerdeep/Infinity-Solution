import axios from 'axios';
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class Nibandh extends Component {
    constructor() {
        super();
        this.state = {
            nibandh_title_data: [],

            nibandh_title_id: 0,
            nibandh: "",

            school_id: 0,

            all: [],
        }
    }

    componentDidMount() {

        axios.get("http://localhost:3001/school/get-all-nibandh").then((res) => {
            this.setState({ all: res.data })
        })

        axios.get("http://localhost:3001/login/get-session", { withCredentials: true }).then((res) => {
            console.log(res.data)
            this.setState({ school_id: sessionStorage.getItem("school_id") }, () => {
                axios.post("http://localhost:3001/school/get-nibandh-title", { school_id: this.state.school_id })
                    .then((res) => {
                        console.log(res.data);
                        this.setState({
                            nibandh_title_data: res.data
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
        })

    }

    handleonchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = () => {
        console.log(this.state);
        axios.post("http://localhost:3001/school/add-nibandh", { nibandh_title_id: this.state.nibandh_title_id, nibandh: this.state.nibandh })
            .then((res) => {
                console.log(res);
                this.componentDidMount();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Nibandh !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/school/delete-nibandh/${id}`).then((res) => {
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
                                        <h3 className="font-weight-bold">Nibandh Master</h3>
                                    </div>

                                    <div className="d-inline text-center mb-3">
                                        <div className="form-group mx-auto">
                                            <select name='nibandh_title_id' className='form-control inpSp' onChange={this.handleonchange}>
                                                <option selected>Select Nibandh Title</option>
                                                {this.state.nibandh_title_data.map((e) => {
                                                    return (
                                                        <option key={e.nibandh_title_id} value={e.nibandh_title_id}>{e.Title}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="d-inline text-center mb-3">
                                        <div className="form-group">
                                            <textarea className="form-control inpSp" rows="3" cols="4" name='nibandh' placeholder="Write Nibandh Here" onChange={this.handleonchange} />
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
                </div>

                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Nibandh List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Nibandh List</h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nibandh Title Id</th>
                                            <th scope="col">Nibandh</th>
                                            <th scope="col">Click To Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.state.all)}
                                        {this.state.all.map((x, key) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{key + 1}</th>
                                                    <td>{x.nibandh_title_id}</td>
                                                    <td>{x.Nibandh}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.nibandh_id) }}>Delete</button></td>
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