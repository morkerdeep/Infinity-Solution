import axios from 'axios';
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class SwadhyayMaster extends Component {
    constructor() {
        super();
        this.state = {
            swadhyay_que: "",
            swadhyay_ans: "",
            chapter_master_id: 0,
            subject_id: 0,
            standard_id: 0,
            school_id: 0,

            std: [],
            sub: [],
            chapter_master_data: [],

            std_selected: false,
            sub_selected: false,

            all: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/standard-subject/get-all-swadhyay").then((res) => {
            this.setState({ all: res.data })
        })

        axios.get("http://localhost:3001/login/get-session", { withCredentials: true }).then((res) => {
            console.log(res.data)
            this.setState({ school_id: sessionStorage.getItem("school_id") }, () => {
                axios.post("http://localhost:3001/school/get-std-schhol", { school_id: this.state.school_id }).then((res) => {
                    this.setState({ std: res.data[0] })
                })
            })
        })

    }

    handleonchange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }

    dropdown = (e) => {
        let std = e.target.value;
        // console.log(std)
        if (std !== -1) {
            this.setState({ standard_id: std, std_selected: true }, () => {
                console.log(this.state);
                axios.post("http://localhost:3001/standard-subject/get-swadhyay-sub", { standard: std }).then((res) => {
                    console.log(res.data)
                    this.setState({ sub: res.data })
                })
            })
        }
        else {
            this.setState({ std_selected: false })
        }
        console.log(this.state)
    }

    dropdown1 = (e) => {
        let sub = e.target.value;
        // console.log(std)
        if (sub !== -1) {
            this.setState({ subject_id: sub, sub_selected: true }, () => {
                console.log(this.state);
                axios.post("http://localhost:3001/standard-subject/get-swadhyay-chap-mas", { subject_id: sub }).then((res) => {
                    console.log(res.data)
                    this.setState({ chapter_master_data: res.data })
                })
            })
        }
        else {
            this.setState({ sub_selected: false })
        }
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Swadhyay !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/standard-subject/delete-swadhyay/${id}`).then((res) => {
                        this.componentDidMount();
                    })
                } else {
                    swal("Operation has been cancelled!");
                }
            });
    }

    onSubmit = () => {
        console.log(this.state);
        axios.post("http://localhost:3001/standard-subject/add-swadhyay", { swadhyay_que: this.state.swadhyay_que, swadhyay_ans: this.state.swadhyay_ans, subject_id: this.state.subject_id, standard_id: this.state.standard_id, chapter_master_id: this.state.chapter_master_id })
            .then((res) => {
                console.log(res);
                this.componentDidMount();
            })
            .catch((err) => {
                console.log(err);
            })
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
                                        <h3 className="font-weight-bold">Swadhyay Master</h3>
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
                                                <select class='form-control inpSp' name="subject_id" onChange={this.dropdown1} aria-label="Default select example" disabled>
                                                    <option selected>Open this select menu</option>
                                                    {this.state.sub.map((x) => {
                                                        return (
                                                            <option value={x.subject_id}>{x.subject_master}</option>
                                                        )
                                                    })}
                                                </select>
                                                :
                                                <select class='form-control inpSp' name="subject_id" onChange={this.dropdown1} aria-label="Default select example">
                                                    <option selected>Select Subject</option>
                                                    {this.state.sub.map((x) => {
                                                        return (
                                                            <option value={x.subject_id}>{x.subject_master}</option>
                                                        )
                                                    })}
                                                </select>
                                            }
                                        </div>
                                    </div>

                                    <div className="d-inline text-center mb-3">
                                        <div className="form-group mx-auto">
                                            {this.state.sub_selected === false ?
                                                <select class='form-control inpSp' name="chapter_master_id" onChange={this.handleonchange} aria-label="Default select example" disabled>
                                                    <option selected>Open this select menu</option>
                                                    {this.state.chapter_master_data.map((x) => {
                                                        return (
                                                            <option value={x.chapter_master_id}>{x.chapter_title}</option>
                                                        )
                                                    })}
                                                </select>
                                                :
                                                <select class='form-control inpSp' name="chapter_master_id" onChange={this.handleonchange} aria-label="Default select example">
                                                    <option selected>Select Option</option>
                                                    {this.state.chapter_master_data.map((x) => {
                                                        return (
                                                            <option value={x.chapter_master_id}>{x.chapter_title}</option>
                                                        )
                                                    })}
                                                </select>
                                            }
                                        </div>
                                    </div>


                                    <div className="d-inline text-center mb-0">
                                        <div className="form-group mx-auto">
                                            <textarea className="form-control inpSp" row="3" cols="4" name='swadhyay_que' placeholder="Swadhyay Question" onChange={this.handleonchange} />
                                        </div>
                                    </div>

                                    <div className="d-inline text-center mb-0">
                                        <div className="form-group mx-auto">
                                            <textarea className="form-control inpSp" row="3" cols="4" name='swadhyay_ans' placeholder="Swadhyay Answer" onChange={this.handleonchange} />
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

                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Swadhyay List</button>

                    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3 class="modal-title">Swadhyay List</h3>
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
                                                <th scope="col">Subject Id</th>
                                                <th scope="col">Chapter Master Id</th>
                                                <th scope="col">Question</th>
                                                <th scope="col">Answer</th>
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
                                                        <td>{x.chapter_master_id}</td>
                                                        <td>{x.swadhyay_qus}</td>
                                                        <td>{x.swadhyay_ans}</td>
                                                        <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.swadhyay_id) }}>Delete</button></td>
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
            </div>
        )
    }
}