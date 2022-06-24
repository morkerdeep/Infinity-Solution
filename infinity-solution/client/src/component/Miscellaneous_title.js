import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

export default class Miscellaneous_title extends Component {
    constructor(){
        super()
        this.state = {
            title : "",
            image : null,
            school_id : "",
            type : 0,

            all : [],
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3001/school/get-all-mis-title").then((res) => {
            this.setState({ all: res.data })
        })
        axios.get("http://localhost:3001/login/get-session", {withCredentials : true}).then((res) => {
            console.log(res.data)
            this.setState({school_id : sessionStorage.getItem("school_id")})
        })
    }

    handleonchange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit = (e) => {
        console.log(this.state)
        
        axios.post("http://localhost:3001/school/add-title", this.state).then((res) => {
            console.log(res);
            this.componentDidMount();
        })
    }

    handleuplaod = (e) => {
        const data = new FormData()
        data.append("file", this.state.image)

        axios.post("http://localhost:3001/school/add-mis-image", data).then((res) => {
            console.log(res);
        })
    }

    deleteRecord(id) {

        swal({
            title: "Are you sure?",
            text: "You want to Delete this Miscellaneous Title !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:3001/school/delete-mis-title/${id}`).then((res) => {
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
                                <h3 className="font-weight-bold">Miscellaneous Title Master</h3>
                            </div>
                            <div className="d-inline text-center mb-3">
                                <div className="form-group mx-auto">
                                    <input className="form-control inpSp" type="text" name='title' placeholder="Title" onChange={this.handleonchange} />
                                </div>
                            </div>


                            <div className="d-inline text-center mb-3">
                                <div className="form-group mx-auto">
                                    <select name='type' className='form-control inpSp' onChange={this.handleonchange}>
                                        <option>Select Type</option>
                                        <option value={1}>News</option>
                                        <option value={2}>Exam Paper</option>
                                        <option value={3}>Tools</option>
                                        <option value={0}>Conor</option>
                                        <option value={0}>Light</option>
                                        <option value={0}>User</option>
                                        <option value={0}>Share</option>
                                        <option value={0}>FAQ</option>
                                    </select>
                                </div>
                            </div>

                            <div className="d-inline text-center mb-3">
                                <div className="form-group mx-auto">
                                    <input className="form-control inpSp" type="file" name='file' onChange={(e) => { this.setState({ image: e.target.files[0] }) }} />

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
            
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Miscellaneous Title List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Miscellaneous Title List</h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Miscellaneous Title</th>
                                            <th scope="col">Miscellaneous Title Image</th>
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
                                                    <td>{x.miscellaneousmaster_title}</td>
                                                    <td>{x.miscellaneousmaster_image}</td>
                                                    <td>{x.school_id}</td>
                                                    <td>{x.type}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.miscellaneousmaster_id) }}>Delete</button></td>
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
