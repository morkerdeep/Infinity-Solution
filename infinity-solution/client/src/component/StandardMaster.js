import axios from 'axios';
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class StandardMaster extends Component {
    constructor() {
        super();
        this.state = {
            standard: 0,
            faculty: "",
            schoolList: [],
            school_id: 0,
            lang: "",
            schl_selected: false,

            all: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/standard-subject/get-all-standard").then((res) => {
            this.setState({ all: res.data })
        })


        axios.get("http://localhost:3001/standard-subject/get-school")
            .then((res) => {
                this.setState({
                    schoolList: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleonchange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        console.log(this.state)
        var type;
        if (this.state.faculty === "Primary" || this.state.faculty === "પ્રાથમિક") {
            type = 1;
        } else if (this.state.faculty === "Pre Primary" || this.state.faculty === "ઉચ્ચતર પ્રાથમિક") {
            type = 2;
        } else if (this.state.faculty === "Secondary" || this.state.faculty === "માધ્યમિક") {
            type = 3;
        } else if (this.state.faculty === "Higher Secondary" || this.state.faculty === "ઉચ્ચતર માધ્યમિક") {
            type = 4;
        }
        e.preventDefault();
        console.log(this.state);
        axios.post("http://localhost:3001/standard-subject/add-standard", { standard: this.state.standard, faculty: this.state.faculty, school_id: this.state.school_id, type: type })
            .then((res) => {
                console.log(res);
                this.componentDidMount();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    dropdown = (e) => {
        let school = e.target.value;
        if (school !== -1) {
            this.setState({ school_id: school, schl_selected: true }, () => {
                console.log(this.state);
                axios.post("http://localhost:3001/school/get-lang", { school_id: school }).then((res) => {
                    console.log(res.data)
                    this.setState({ lang: res.data[0].school_language })
                })
            })
        }
        else {
            this.setState({ std_selected: false })
        }
        console.log(this.state)
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Standard !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:3001/standard-subject/delete-standard/${id}`).then((res) => {
                    this.componentDidMount();
                })
            }else {
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
                                    <h3 className="font-weight-bold">Standard Master</h3>
                                </div>
                                <div className="d-inline text-center mb-0">

                                </div>

                                <div className="d-inline text-left mb-3">
                                    <div className="form-group mx-auto">
                                        <input className="form-control inpSp" type="text" name='standard' placeholder="Standard" onChange={this.handleonchange} />
                                    </div>
                                </div>

                                <div className="d-inline text-left mb-3">
                                    <select className="form-control inpSp" name="school_id" onChange={this.dropdown}>
                                        <option value="" selected disabled>Select Your School</option>
                                        {this.state.schoolList.map((x) => {
                                            return (
                                                <option value={x.school_id}>{x.school_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="d-inline text-left mb-3">
                                    {this.state.schl_selected === false ?
                                        <select className="form-control inpSp" name="faculty" onChange={(e) => { this.setState({ faculty: e.target.value }) }} disabled>
                                            <option value="" selected disabled>Select Your Faculty</option>
                                            <option value="Primary">Primary</option>
                                            <option value="Pre Primary">Pre Primary</option>
                                            <option value="Secondary">Secondary</option>
                                            <option value="Higher Secondary">Higher Secondary</option>

                                        </select>

                                        :
                                        this.state.lang === "English" ?

                                            <select className="form-control inpSp" name="faculty" onChange={(e) => { this.setState({ faculty: e.target.value }) }}>
                                                <option value="" selected disabled>Select Your Faculty</option>
                                                <option value="Primary">Primary</option>
                                                <option value="Pre Primary">Pre Primary</option>
                                                <option value="Secondary">Secondary</option>
                                                <option value="Higher Secondary">Higher Secondary</option>

                                            </select>
                                            :
                                            this.state.lang === "Gujarati" ?
                                                <select className="form-control inpSp" name="faculty" onChange={(e) => { this.setState({ faculty: e.target.value }) }}>
                                                    <option value="" selected disabled>Select Your Faculty</option>
                                                    <option value="પ્રાથમિક">પ્રાથમિક</option>
                                                    <option value="ઉચ્ચતર પ્રાથમિક">ઉચ્ચતર પ્રાથમિક</option>
                                                    <option value="માધ્યમિક">માધ્યમિક</option>
                                                    <option value="ઉચ્ચતર માધ્યમિક">ઉચ્ચતર માધ્યમિક</option>
                                                </select>
                                                :
                                                <select className="form-control inpSp" name="faculty" onChange={(e) => { this.setState({ faculty: e.target.value }) }}>
                                                    <option value="" selected disabled>Select Your Faculty</option>
                                                    <option value="પ્રાથમિક">प्राथमिक</option>
                                                    <option value="ઉચ્ચતર પ્રાથમિક">उच्च प्राथमिक</option>
                                                    <option value="માધ્યમિક">माध्यमिक</option>
                                                    <option value="ઉચ્ચતર માધ્યમિક">उच्च माध्यमिक</option>
                                                </select>
                                    }
                                </div>

                                <div className="d-inline text-left mb-3">
                                    <div className="form-group mx-auto">
                                        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>&nbsp;&nbsp;
                                        {/* <a className="small text-black-50 pl-2 ml-2 border-left" href="">Forgot Password ?</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Standard List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Standard List</h3>
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
                                            <th scope="col">Standard</th>
                                            <th scope="col">Faculty</th>
                                            <th scope="col">School Id</th>
                                            <th scope="col">Type</th>
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
                                                    <td>{x.standard}</td>
                                                    <td>{x.faculty}</td>
                                                    <td>{x.school_id}</td>
                                                    <td>{x.type}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.standard_id) }}>Delete</button></td>
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
