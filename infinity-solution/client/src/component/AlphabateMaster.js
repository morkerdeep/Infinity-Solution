import axios from 'axios'
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class AlphabateMaster extends Component {
    constructor() {
        super()
        this.state = {
            texte: "",
            textg: "",
            texth: "",
            image: "",
            type: "",

            all: [],
            table_type: "",
        }
    }

    onUpload = (e) => {
        const data = new FormData()
        data.append("file", this.state.image)
        axios.post("http://localhost:3001/balvibhag/add-alpha-img", data).then((res) => {
            console.log(res);
        })
    }

    onSubmit = (e) => {
        axios.post("http://localhost:3001/balvibhag/add-alpha", this.state).then((res) => {
            console.log(res);
        })
    }

    handleonchange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Alphabate !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post("http://localhost:3001/balvibhag/delete-alpha", { type: this.state.table_type, id: id }).then((res) => {
                        this.handleShow1();
                    })
                } else {
                    swal("Operation has been cancelled!");
                }
            });
    }

    handleShow = (e) => {
        this.setState({ table_type: e.target.value }, () => {
            axios.post("http://localhost:3001/balvibhag/get-all-alpha", { type: this.state.table_type }).then((res) => {
                this.setState({ all: res.data })
            })
        })

    }

    handleShow1 = () => {
        axios.post("http://localhost:3001/balvibhag/get-all-alpha", { type: this.state.table_type }).then((res) => {
            this.setState({ all: res.data })
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row mt-0">
                        <div className="spContainer mx-auto">
                            <div className="card px-4 py-5 border-0 shadow">
                                <div className="d-inline text-left mb-3">
                                    <h3 className="font-weight-bold">Add Alphabates</h3>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <select name='type' className='form-control inpSp' onChange={this.handleonchange}>
                                            <option selected>Select Type</option>
                                            <option value={1}>English</option>
                                            <option value={2}>Gujarati</option>
                                            <option value={3}>Hindi</option>

                                        </select>
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="file" name='image' onChange={(e) => { this.setState({ image: e.target.files[0] }) }} />

                                    </div>
                                </div>

                                <div className="d-inline text-left mb-3">
                                    <div className="form-group mx-auto">
                                        <button className="btn btn-success" onClick={this.onUpload}>Upload</button>&nbsp;&nbsp;
                                        {/* <a className="small text-black-50 pl-2 ml-2 border-left" href="">Forgot Password ?</a> */}
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-0">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="text" name='texte' placeholder="Enlish Text" onChange={this.handleonchange} />
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-0">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="text" name='textg' placeholder="Gujarati Text" onChange={this.handleonchange} />
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-0">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="text" name='texth' placeholder="Hindi Text" onChange={this.handleonchange} />
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

                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Alphabate List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Alphabate List</h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <select name='table_type' className='form-control inpSp' onChange={this.handleShow}>
                                            <option selected>Select Type</option>
                                            <option value={1}>English</option>
                                            <option value={2}>Gujarati</option>
                                            <option value={3}>Hindi</option>

                                        </select>
                                    </div>
                                </div> <br/>

                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Text - 1</th>
                                            <th scope="col">Text - 3</th>
                                            <th scope="col">Text - 2</th>
                                            <th scope="col">Click To Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.state.all)}
                                        {this.state.all.map((x, key) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{key + 1}</th>
                                                    <td>{x.image}</td>
                                                    <td>{x.textOne}</td>
                                                    <td>{x.textTwo}</td>
                                                    <td>{x.textThree}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.id) }}>Delete</button></td>
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
