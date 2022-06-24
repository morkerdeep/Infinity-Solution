import axios from 'axios'
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class QuePaperMaster extends Component {
    constructor() {
        super()
        this.state = {
            date: "",

            all: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/standard-subject/get-all-quepaper").then((res) => {
            this.setState({ all: res.data })
        })
    }

    onchange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        axios.post("http://localhost:3001/standard-subject/add-que-paper", this.state).then((res) => {
            this.componentDidMount();
        })
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Year !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/standard-subject/delete-quepaper/${id}`).then((res) => {
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
                <div class="container">
                    <div class="row mt-5">
                        <div class="spContainer mx-auto">
                            <div class="card px-4 py-5 border-0 shadow">
                                <div class="d-inline text-left mb-3">
                                    <h3 class="font-weight-bold">Questipon Paper Master</h3>
                                </div>
                                <div class="d-inline text-center mb-0">
                                    <div class="form-group mx-auto">
                                        <input class="form-control inpSp" type="text" name='date' placeholder='Paper Year' onChange={this.onchange} />
                                    </div>
                                </div>

                                <div class="d-inline text-left mb-3">
                                    <div class="form-group mx-auto">
                                        <button class="btn btn-primary" onClick={this.onSubmit}>Submit</button>&nbsp;&nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Question Paper List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Question Paper List</h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Paper Year</th>
                                            <th scope="col">Click To Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.state.all)}
                                        {this.state.all.map((x, key) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{key + 1}</th>
                                                    <td>{x.paper_year}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.paper_id) }}>Delete</button></td>
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
