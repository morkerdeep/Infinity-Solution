import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert';

export default class ChapterWiseTopic extends Component {
    constructor() {
        super()
        this.state = {
            std: [],
            chap_mas: [],
            chap_det_master: [],

            school_id: 0,
            uname: "x",

            standard_id: "",
            chapter_master: "",
            chapter_det_master: "",

            std_selected: false,
            chp_mas_selected: false,

            all: [],
        }
    }
    componentDidMount() {

        axios.get("http://localhost:3001/chapter/get-all-chap-wise-topic").then((res) => {
            this.setState({ all: res.data })
        })

        axios.get("http://localhost:3001/login/get-session", { withCredentials: true }).then((res) => {
            console.log(res.data)
            this.setState({ school_id: sessionStorage.getItem("school_id") }, () => {
                axios.post("http://localhost:3001/chapter/get-ss", { school_id: this.state.school_id }).then((res) => {
                    console.log(res.data)
                    this.setState({ std: res.data })
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
                axios.post("http://localhost:3001/chapter/get-chap-mas", { standard: std }).then((res) => {
                    console.log(res.data)
                    this.setState({ chap_mas: res.data })
                })
            })
        }
        else {
            this.setState({ std_selected: false })
        }
        console.log(this.state)
    }

    dropdown1 = (e) => {
        let chp_mas = e.target.value;
        if (chp_mas !== -1) {
            this.setState({ chapter_master: chp_mas, chp_mas_selected: true }, () => {
                console.log(this.state);
                axios.post("http://localhost:3001/chapter/get-chap-det-mas", { chap_mas: chp_mas }).then((res) => {
                    console.log(res.data)
                    this.setState({ chap_det_master: res.data })
                })
            })
        }
        else {
            this.setState({ chp_mas_selected: false })
        }
        console.log(this.state)
    }

    onSubmit = () => {
        axios.post("http://localhost:3001/chapter/add-chap-wise-topic", { standard_id: this.state.standard_id, chapter_master: this.state.chapter_master, chapter_det_master: this.state.chapter_det_master }).then((res) => {
            this.componentDidMount();
        })
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Chapter Wise Topic !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/chapter/delete-chap-wise-topic/${id}`).then((res) => {
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
                                    <h3 className="font-weight-bold">Chapter Detai Master</h3>
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
                                            <select class='form-control inpSp' name="chapter_master" onChange={this.dropdown1} aria-label="Default select example" disabled>
                                                <option selected>Open this select menu</option>
                                                {this.state.chap_mas.map((x) => {
                                                    return (
                                                        <option value={x.chapter_master_id}>{x.chapter_title}</option>
                                                    )
                                                })}
                                            </select>
                                            :
                                            <select class='form-control inpSp' name="chapter_master" onChange={this.dropdown1} aria-label="Default select example">
                                                <option selected>Select Chapter Title</option>
                                                {this.state.chap_mas.map((x) => {
                                                    return (
                                                        <option value={x.chapter_master_id}>{x.chapter_title}</option>
                                                    )
                                                })}
                                            </select>
                                        }
                                    </div>
                                </div>

                                <div className="d-inline text-center mb-3">
                                    <div className="form-group mx-auto">
                                        {this.state.chp_mas_selected === false ?
                                            <select class='form-control inpSp' name="chapter_det_master" onChange={this.handleonchange} aria-label="Default select example" disabled>
                                                <option selected>Open this select menu</option>
                                                {this.state.chap_det_master.map((x) => {
                                                    return (
                                                        <option value={x.chapterdetails_master_id}>{x.title}</option>
                                                    )
                                                })}
                                            </select>
                                            :
                                            <select class='form-control inpSp' name="chapter_det_master" onChange={this.handleonchange} aria-label="Default select example">
                                                <option selected>Select Option</option>
                                                {this.state.chap_det_master.map((x) => {
                                                    return (
                                                        <option value={x.chapterdetails_master_id}>{x.title}</option>
                                                    )
                                                })}
                                            </select>
                                        }
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

                <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Chapter Wise Topic List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Chapter Wise Topic List</h3>
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
                                            <th scope="col">Chapter Detail Master Id</th>
                                            <th scope="col">Chapter Master Id</th>
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
                                                    <td>{x.chapterdetails_master_id}</td>
                                                    <td>{x.chapter_master_id}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.chapterwish_topic_id) }}>Delete</button></td>
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
