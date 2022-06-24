import axios from 'axios';
import React, { Component } from 'react'
import swal from 'sweetalert';


export default class NibandhTitle extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            language_id: 0,
            standard_id: 0,
            school_id: 0,

            std: [],

            all: [],
        }
    }

    componentDidMount() {

        axios.get("http://localhost:3001/school/get-all-nibandh-title").then((res) => {
            this.setState({ all: res.data })
        })

        axios.get("http://localhost:3001/login/get-session", { withCredentials: true }).then((res) => {
            console.log(res.data)
            this.setState({ school_id: sessionStorage.getItem("school_id") }, () => {
                axios.post("http://localhost:3001/school/get-std-schhol", { school_id: this.state.school_id }).then((res) => {
                    console.log(res.data[1][0].language_id)
                    this.setState({ std: res.data[0], language_id: res.data[1][0].language_id })
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
        axios.post("http://localhost:3001/school/add-nibandh-title", { title: this.state.title, language_id: this.state.language_id, school_id: this.state.school_id, standard_id: this.state.standard_id })
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
            text: "You want to Delete this Nibandh Title !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/school/delete-nibandh-title/${id}`).then((res) => {
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
                                    <h3 className="font-weight-bold">Nibandh Title Master</h3>
                                </div>
                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="text" name='title' placeholder="Title" onChange={this.handleonchange} />
                                    </div>
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

                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Niband Title List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Nibandh Title List</h3>
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
                                            <th scope="col">School Id</th>
                                            <th scope="col">Language Id</th>
                                            <th scope="col">Nibandh Title Id</th>
                                            <th scope="col">Nibandh Title</th>
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
                                                    <td>{x.language_id}</td>
                                                    <td>{x.nibandh_title_id}</td>
                                                    <td>{x.Title}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.nibandh_title_id) }}>Delete</button></td>
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