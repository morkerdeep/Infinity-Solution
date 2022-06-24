import axios from 'axios';
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class SchoolMaster extends Component {
    constructor() {
        super()
        this.state = {
            school: "",
            address: "",
            contact: "",
            language: "",
            selectedfile: null,

            all: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/school/get-all-school").then((res) => {
            this.setState({ all: res.data })
        })
    }

    handleonchange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        axios.post("http://localhost:3001/school/add-school", this.state).then((res) => {
            console.log(res);
            this.componentDidMount();
        })
    }

    handleuplaod = (e) => {
        const data = new FormData()
        data.append("file", this.state.selectedfile)

        axios.post("http://localhost:3001/school/add-image", data).then((res) => {
            console.log(res);
        })
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this School !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/school/delete-school/${id}`).then((res) => {
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
                                    <h3 className="font-weight-bold">School Master</h3>
                                </div>
                                <div className="d-inline text-center mb-0">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="text" name='school' placeholder="School Name" onChange={this.handleonchange} />
                                    </div>
                                </div>
                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="text" name='address' placeholder="Address" onChange={this.handleonchange} />
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="number" name='contact' placeholder="Contact No." onChange={this.handleonchange} />
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        {/* <input className="form-control inpSp" type="text" name='language' placeholder="Language" onChange={this.handleonchange}/> */}
                                        <select name='language' className='form-control inpSp' onChange={this.handleonchange}>
                                            <option>Select Language</option>
                                            <option value={"English"}>English</option>
                                            <option value={"Gujarati"}>Gujarati</option>
                                            <option value={"Hindi"}>Hindi</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="file" name='selectedfile' onChange={(e) => { this.setState({ selectedfile: e.target.files[0] }) }} />

                                    </div>
                                </div>

                                <div className="d-inline text-left mb-3">
                                    <div className="form-group mx-auto">
                                        <button className="btn btn-success" onClick={this.handleuplaod}>Upload</button>&nbsp;&nbsp;
                                        {/* <a className="small text-black-50 pl-2 ml-2 border-left" href="">Forgot Password ?</a> */}
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
                        
                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See School List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">School List</h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">School Id</th>
                                            <th scope="col">School Name</th>
                                            <th scope="col">School Address</th>
                                            <th scope="col">School Contact</th>
                                            <th scope="col">School Image</th>
                                            <th scope="col">School Language</th>
                                            <th scope="col">Click To Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.state.all)}
                                        {this.state.all.map((x, key) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{key + 1}</th>
                                                    <td>{x.school_id}</td>
                                                    <td>{x.school_name}</td>
                                                    <td>{x.school_address}</td>
                                                    <td>{x.school_contact}</td>
                                                    <td>{x.school_image}</td>
                                                    <td>{x.school_language}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.school_id) }}>Delete</button></td>
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
