import axios from 'axios'
import React, { Component } from 'react'
import swal from 'sweetalert';

export default class TopicMaster extends Component {
  constructor() {
    super()
    this.state = {
      standard_id: 0,
      lang: "",
      topic_heading_master_id: "",
      topic: "",
      file: null,
      type: "",
      school_id: null,

      std: [],
      topic_heading_master_data: [],

      std_selected: false,

      all: [],
    }
  }

  componentDidMount() {

    axios.get("http://localhost:3001/standard-subject/get-all-topic").then((res) => {
      this.setState({ all: res.data })
    })

    axios.get("http://localhost:3001/login/get-session", { withCredentials: true }).then((res) => {
      console.log(res.data)
      this.setState({ school_id: sessionStorage.getItem("school_id") }, () => {
        axios.post("http://localhost:3001/standard-subject/get-sl", { school_id: this.state.school_id }).then((res) => {
          console.log(res.data)
          this.setState({ std: res.data[0], lang: res.data[1][0].school_language })
        })
      })
    })
  }

  handleonchange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  dropdown = (e) => {
    let std = e.target.value;
    if (std !== -1) {
      this.setState({ standard_id: std, std_selected: true }, () => {
        axios.post("http://localhost:3001/standard-subject/get-topic-heading-mas", { standard: std, school: this.state.school_id }).then((res) => {
          console.log(res.data)
          this.setState({ topic_heading_master_data: res.data })
        })
      })
    }
    else {
      this.setState({ std_selected: false })
    }
    console.log(this.state)
  }

  handleuplaod = (e) => {
    const data = new FormData()
    data.append("file", this.state.file)

    axios.post("http://localhost:3001/standard-subject/add-topic-mas-img", data).then((res) => {
      console.log(res);
    })
  }

  onSubmit = () => {
    axios.post("http://localhost:3001/standard-subject/add-topic-mas", { standard_id: this.state.standard_id, topic_heading_master_id: this.state.topic_heading_master_id, topic: this.state.topic, school_id: this.state.school_id }).then((res) => {
      this.componentDidMount();
    })
  }

  deleteRecord(id) {

    swal({
      title: "Are you sure?",
      text: "You want to Delete this Topic !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:3001/standard-subject/delete-topic/${id}`).then((res) => {
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
                  <h3 className="font-weight-bold">Topic Master</h3>
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
                      <select class='form-control inpSp' name="topic_heading_master_id" onChange={this.handleonchange} aria-label="Default select example" disabled>
                        <option selected>Open this select menu</option>
                        {this.state.topic_heading_master_data.map((x) => {
                          return (
                            <option value={x.topic_heading_master_id}>{x.topic_heading_master_title}</option>
                          )
                        })}
                      </select>
                      :
                      <select class='form-control inpSp' name="topic_heading_master_id" onChange={this.handleonchange} aria-label="Default select example">
                        <option selected>Select Option</option>
                        {this.state.topic_heading_master_data.map((x) => {
                          return (
                            <option value={x.topic_heading_master_id}>{x.topic_heading_master_title}</option>
                          )
                        })}
                      </select>
                    }
                  </div>
                </div>

                <div className="d-inline text-center mb-3">
                  <div className="form-group mx-auto">
                    {this.state.lang === "English"
                      ?
                      <select class='form-control inpSp' name="topic" onChange={this.handleonchange} aria-label="Default select example">
                        <option selected>Select Option</option>
                        <option value={"Textbooks"}>Textbooks</option>
                        <option value={"Children's Department"}>Children's Department</option>
                        <option value={"MCQs"}>MCQs</option>
                        <option value={"Essay"}>Essay</option>
                        <option value={"Blueprint"}>Blueprint</option>
                      </select>
                      :
                      <select class='form-control inpSp' name="topic" onChange={this.handleonchange} aria-label="Default select example">
                        <option selected>Select Option</option>
                        <option value={"પાઠ્ય-પુસ્તકો"}>પાઠ્ય-પુસ્તકો</option>
                        <option value={"બાળ વિભાગ"}>બાળ વિભાગ</option>
                        <option value={"MCQs"}>MCQs</option>
                        <option value={"નિબંધ"}>નિબંધ</option>
                        <option value={"બ્લુપ્રિન્ટ"}>બ્લુપ્રિન્ટ</option>
                      </select>
                    }
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

              </div>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-warning" data-toggle="modal" data-target=".bd-example-modal-lg">See Topic List</button>

                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title">Topic List</h3>
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
                                            <th scope="col">School Id ID</th>
                                            <th scope="col">Topic Heading Master Id</th>
                                            <th scope="col">Topic Name</th>
                                            <th scope="col">Topic Image</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Click To Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.all.map((x, key) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{key + 1}</th>
                                                    <td>{x.standard_id}</td>
                                                    <td>{x.school_id}</td>
                                                    <td>{x.topic_heading_master_id}</td>
                                                    <td>{x.topic_name}</td>
                                                    <td>{x.topic_image}</td>
                                                    <td>{x.type}</td>
                                                    <td><button type="button" class="btn btn-warning" onClick={() => { this.deleteRecord(x.topic_id) }}>Delete</button></td>
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
