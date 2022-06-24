import axios from 'axios';
import React, { Component } from 'react'
import './SubjectMaster.css';
import swal from 'sweetalert';

export default class SubjectMaster extends Component {
  constructor() {
    super()
    this.state = {
      subject: "",
      school_id: -1,

      all: [],
    }
  }

  componentDidMount() {
    axios.get("http://localhost:3001/standard-subject/get-all-subject").then((res) => {
      this.setState({ all: res.data })
    })

    axios.get("http://localhost:3001/login/get-session", { withCredentials: true }).then((res) => {
      console.log(res.data)
      this.setState({ school_id: sessionStorage.getItem("school_id") })
    })
  }

  handleSubmit = (e) => {
    axios.post("http://localhost:3001/standard-subject/add-sub", this.state).then((res) => {
      console.log(res);
      this.componentDidMount();
    })
  }

  handlechange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  deleteRecord(id) {

    swal({
      title: "Are you sure?",
      text: "You want to Delete this Subject !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:3001/standard-subject/delete-subject/${id}`).then((res) => {
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
                  <h3 className="font-weight-bold">Subject Master</h3>
                </div>

                <div className="d-inline text-center mb-3">
                  <div className="d-inline text-left mb-3">
                    <div className="form-group mx-auto">
                      <input className="form-control inpSp" type="text" name='subject' placeholder="Subject" onChange={this.handlechange} />
                    </div>
                  </div>
                </div>

                <div className="d-inline text-center mb-3">
                  <div className="d-inline text-left mb-3">
                    <div className="form-group mx-auto">
                      <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>&nbsp;&nbsp;
                    </div>
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
                <h3 class="modal-title">Subject List</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Subject Id</th>
                      <th scope="col">Subject</th>
                      <th scope="col">School Id</th>
                      <th scope="col">Click To Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(this.state.all)}
                    {this.state.all.map((x, key) => {
                      return (
                        <tr>
                          <th scope="row">{key + 1}</th>
                          <td>{x.subject_id}</td>
                          <td>{x.subject_master}</td>
                          <td>{x.school_id}</td>
                          <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.subject_id) }}>Delete</button></td>
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
