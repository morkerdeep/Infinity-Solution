import React, { Component } from 'react'
import "./MCQMaster.css";
import axios from "axios";
import swal from 'sweetalert';

export default class MCQMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            standard_id: 0,
            subject_id: 0,
            chapter_master_id: 0,
            mcq_master_id: "",
            mcq_question_one: "",
            mcq_question_two: "",
            mcq_question_three: "",
            mcq_question_four: "",
            mcq_question_answer: "",

            subject_ids: [],
            standard_ids: [],
            chapter_master_ids: [],
            school_id: "",
            lang: "",
            std_slected: false,

            all: [],
        }
    }


    componentDidMount() {

        axios.get("http://localhost:3001/mcq/get-all-mcq").then((res) => {
            this.setState({ all: res.data })
        })

        axios.get("http://localhost:3001/login/get-session", { withCredentials: true }).then((res) => {
            console.log(res.data)
            this.setState({ school_id: sessionStorage.getItem("school_id") }, () => {
                axios.post("http://localhost:3001/mcq/get_info", { school_id: this.state.school_id }).then((res) => {
                    this.setState({ standard_ids: res.data })
                });
            })
        })


    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post("http://localhost:3001/mcq/add_data_mcq_master", this.state).then((res) => {
            console.log(res)
            this.componentDidMount();
        });
    }

    dropdown = (e) => {
        let std = e.target.value;
        console.log(std)
        if (std !== -1) {
            this.setState({ standard_id: std, std_slected: true }, () => {
                console.log(this.state);
                axios.post("http://localhost:3001/mcq/std-wise-subject", { standard: std }).then((res) => {
                    console.log(res.data)
                    this.setState({ subject_ids: res.data })
                })
            })
        }
        else {
            this.setState({ std_slected: false })
        }
        console.log(this.state)

    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this MCQ !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/mcq/delete-mcq/${id}`).then((res) => {
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
                <div className="container-fluid px-1 py-5 mx-auto">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <h3>MCQ Master</h3>
                            <div className="card">
                                <form className="form-card" onSubmit={this.handleSubmit}>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex my-2">
                                            <label className="form-control-label px-3 my-2">Standard: <span className="text-danger"> *</span></label>
                                            <select class="form-select" name="standard_id" onChange={this.dropdown} aria-label="Default select example">
                                                <option selected value={-1}>Open this select menu</option>
                                                {this.state.standard_ids.map((x) => {
                                                    return (
                                                        <option value={x.standard_id}>{x.standard}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex my-2">
                                            <label className="form-control-label px-3 my-2">Subject Name: <span className="text-danger"> *</span></label>
                                            {this.state.std_slected === false ?
                                                <select class="form-select" name="subject_id" onChange={this.handleChange} aria-label="Default select example" disabled>
                                                    <option selected>Open this select menu</option>
                                                    
                                                    {this.state.subject_ids.map((x) => {
                                                        return (
                                                            <option value={x.subject_id}>{x.subject_master}</option>
                                                        )
                                                    })}
                                                </select>
                                                :
                                                <select class="form-select" name="subject_id" onChange={this.handleChange} aria-label="Default select example">
                                                    <option selected>Open this select menu</option>
                                                    {this.state.subject_ids.map((x) => {
                                                        return (
                                                            <option value={x.subject_id}>{x.subject_master}</option>
                                                        )
                                                    })}
                                                </select>
                                            }
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        
                                        <div className="form-group col-sm-6 flex-column d-flex my-2">
                                            <label className="form-control-label px-3 my-2">MCQ Question: <span className="text-danger"> *</span></label>
                                            <input type="text" name="mcq_master_id" onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex my-2">
                                            <label className="form-control-label px-3 my-2">MCQ Option - 1<span className="text-danger"> *</span></label>
                                            <input type="text" name="mcq_question_one" onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex my-2">
                                            <label className="form-control-label px-3 my-2">MCQ Option - 2<span className="text-danger"> *</span></label>
                                            <input type="text" name="mcq_question_two" onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex my-2">
                                            <label className="form-control-label px-3 my-2">MCQ Option - 3<span className="text-danger"> *</span></label>
                                            <input type="text" name="mcq_question_three" onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex my-2">
                                            <label className="form-control-label px-3 my-2">MCQ Option - 4<span className="text-danger"> *</span></label>
                                            <input type="text" name="mcq_question_four" onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex my-2">
                                            <label className="form-control-label px-3 my-2">MCQ Answer<span className="text-danger"> *</span></label>
                                            <input type="text" name="mcq_question_answer" onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn-block btn-primary text-center">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See MCQ List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content" style={{"width" : "fit-content"}}>
                            <div class="modal-header">
                                <h3 class="modal-title">MCQ List</h3>
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
                                            <th scope="col">Question</th>
                                            <th scope="col">Option - 1</th>
                                            <th scope="col">Option - 2</th>
                                            <th scope="col">Option - 3</th>
                                            <th scope="col">Option - 4</th>
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
                                                    <td>{x.mcq_question}</td>
                                                    <td>{x.mcq_question_one}</td>
                                                    <td>{x.mcq_question_two}</td>
                                                    <td>{x.mcq_question_three}</td>
                                                    <td>{x.mcq_question_four}</td>
                                                    <td>{x.mcq_answer}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.mcq_master_id) }}>Delete</button></td>
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