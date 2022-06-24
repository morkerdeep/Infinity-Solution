import axios from 'axios'
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class PaperYearMaster extends Component {
    constructor() {
        super()
        this.state = {
            standard_id: 0,
            paper_id: 0,
            file: null,

            school_id: null,

            std: [],
            papers: [],

            all: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/standard-subject/get-all-yearpaper").then((res) => {
            this.setState({ all: res.data })
        })

        axios.get("http://localhost:3001/login/get-session", { withCredentials: true }).then((res) => {
            console.log(res.data)
            this.setState({ school_id: sessionStorage.getItem("school_id") }, () => {
                axios.post("http://localhost:3001/standard-subject/get-sp", { school_id: this.state.school_id }).then((res) => {
                    console.log(res.data)
                    this.setState({ std: res.data[0], papers: res.data[1] })
                })
            })
        })
    }

    handleuplaod = (e) => {
        const data = new FormData()
        data.append("file", this.state.file)

        axios.post("http://localhost:3001/standard-subject/add-paper-img", data).then((res) => {
            console.log(res);
        })
    }

    onSubmit = (e) => {
        console.log(this.state)
        axios.post("http://localhost:3001/standard-subject/add-paper", { standard_id: this.state.standard_id, paper_id: this.state.paper_id }).then((res) => {
            console.log(res);
            this.componentDidMount();
        })
    }

    handleonchange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Paper !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/standard-subject/delete-yearpaper/${id}`).then((res) => {
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
                                    <h3 className="font-weight-bold">Paper Year Master</h3>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <select name='standard_id' className='form-control inpSp' onChange={this.handleonchange}>
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
                                        <select name='paper_id' className='form-control inpSp' onChange={this.handleonchange}>
                                            <option selected value={-1}>Select Paper</option>
                                            {this.state.papers.map((x) => {
                                                return (
                                                    <option value={x.paper_id}>{x.paper_year}</option>
                                                )
                                            })}

                                        </select>
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="file" name='file' onChange={(e) => { this.setState({ file: e.target.files[0] }) }} />
                                    </div>
                                </div>

                                <div className="d-inline text-left mb-3">
                                    <div className="form-group mx-auto">
                                        <button className="btn btn-success" onClick={this.handleuplaod}>Upload</button>&nbsp;&nbsp;
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

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Paper List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Paper List</h3>
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
                                            <th scope="col">Paper Id</th>
                                            <th scope="col">Paper PDF</th>
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
                                                    <td>{x.paper_id}</td>
                                                    <td>{x.year_paper_pdf}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.old_year_paper_id) }}>Delete</button></td>
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
