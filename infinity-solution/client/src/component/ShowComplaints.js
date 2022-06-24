import axios from 'axios';
import React, { Component } from 'react'

export default class ShowComplaints extends Component {
    constructor()
    {
        super();
        this.state={
            complaintList:[]
        }
    }

    componentDidMount()
    {
        axios.get("http://localhost:3001/complaint/get-complaint")
            .then((res)=>{
                console.log(res);
                this.setState({
                    complaintList : res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
  render() {
    return (
    <div className="container py-5">
        <h1 style={{textAlign:"center"}}>View Complaints</h1>
  <div className="row">
    <div className="col-lg-8 mx-auto">
      <ul className="list-group shadow my-3">
      {this.state.complaintList.map((e)=>{
                return(
                    <li className="list-group-item">
                    <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                        <div className="media-body order-2 order-lg-1">
                        <h5 className="mt-0 font-weight-bold mb-2">Complaint No. {e.ComplaintID}</h5>
                        <p className="font-italic text-muted mb-0 small">Complaint Name: {e.ComplaintName}</p>
                        <p className="font-italic text-muted mb-0 small">Product Name: {e.ProductName}</p>
                        <div className="d-flex align-items-center justify-content-between mt-1">
                            <h6 className="font-weight-bold my-2">Complaint Date: {e.Date.slice(0,10)}</h6>
                            <ul className="list-inline small">
                            <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                            <li className="list-inline-item m-0"><i className="fa fa-star-o text-gray"></i></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </li>
                )
            })}
      </ul>
    </div>
  </div>
</div>
    )
  }
}
