import axios from 'axios';
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class NotificationMaster extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            date: "",

            all: [],
        }
    }

    handleonchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        axios.get("http://localhost:3001/school/get-all-noti").then((res) => {
            this.setState({ all: res.data })
        })
    }

    onSubmit = () => {
        console.log(this.state);
        axios.post("http://localhost:3001/school/add-notification", this.state)
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
            text: "You want to Delete this Notification !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/school/delete-noti/${id}`).then((res) => {
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
                                    <h3 className="font-weight-bold">Notification Master</h3>
                                </div>
                                <div className="d-inline text-center mb-0">
                                    <div className="form-group mx-auto">
                                        <textarea className="form-control inpSp" row="3" cols="4" name='name' placeholder="Name Of the Notification" onChange={this.handleonchange} />
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="date" name='date' placeholder="Select Date When to notify" onChange={this.handleonchange} />
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
                                
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Notification List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Notification List</h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Notification</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Click To Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.state.all)}
                                        {this.state.all.map((x, key) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{key + 1}</th>
                                                    <td>{x.name}</td>
                                                    <td>{x.date}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.notification_id) }}>Delete</button></td>
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