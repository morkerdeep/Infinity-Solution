import React, { Component } from 'react'
import './Add_complaint.css';
import axios from 'axios';
import Select from 'react-select';

export default class add_complaint extends Component {
    constructor(){
        super()
        this.state = {
            c_id: 0,
            prod_name: "",
            complaint_name: "",
            customer_name: "",
            customer_data: [],
            product_data: [],
        };
    }

    componentDidMount(){
        axios.get("http://localhost:3001/complaint/get_cinfo").then((res) => {
            this.setState({customer_data: res.data}, () => {console.log(this.state.customer_data)})
        });

        axios.get("http://localhost:3001/complaint/get_pinfo").then((res1) => {
            this.setState({product_data: res1.data})
        });

    }

    handleSubmit = (e) => {
        axios.post("http://localhost:3001/complaint/add_complaint", {pname : this.state.prod_name, complaint: this.state.complaint_name, cname: this.state.customer_name}).then((res) => {
            console.log(res);
        });
    }

  render() {
    return (
    //   <div className='container'>
    //       <div className='heading'>
    //         Add Your Complaints
    //       </div>

    //       <div className='body'>
    //         Complain Name: <input type={'text'} name='p_name' onChange={(e) => {this.setState({complaint_name: e.target.value})}}/> <br/><br/>
    //         Product Name: 
                    // <select defaultValue={this.state.product_data[0]} name={"prod"} onChange={(e) => {this.state.prod_name = e.target.value}}>
                    //     {this.state.product_data.map((x) => {
                    //         return (<option key={x.ProductName} value={x.ProductName}> {x.ProductName} </option>)
                    //     })}
                    // </select>
    //                     <br/><br/>
    //         Date Name: <input type={'date'} name='c_date' onChange={(e) => {this.setState({date: e.target.value})}}/><br/><br/>
    //         Customer Name: 
            // <select defaultValue={this.state.customer_data[0]} name={"prod"} onChange={(e) => {this.state.customer_name = e.target.value}}>
            //             {this.state.customer_data.map((x) => {
            //                 return (<option key={x.CustomerName} value={x.CustomerName}> {x.CustomerName} </option>)
            //             })}
                        
            //         </select><br/><br/>
    //         <button onClick={this.handleSubmit}>Submit</button>
    //       </div>
    //   </div>
    <div className="container">
        <div className=" text-center mt-5 ">
            <h1>Complaint Form</h1>
        </div>
        <div className="row ">
            <div className="col-lg-7 mx-auto">
            <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
            <div className = "container">
                <form id="contact-form" onSubmit={this.handleSubmit} role="form">
                <div className="controls">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                    <label for="form_need">Product Name </label>
                                    <select className="form-control" name={"prod"} onChange={(e) => {this.state.prod_name = e.target.value}}>
                                    <option value="" selected disabled>--Please Select Your Product--</option>
                                        {this.state.product_data.map((x) => {
                                            return (<option key={x.ProductName} value={x.ProductName}> {x.ProductName} </option>)
                                        })}
                                    </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                    <label for="form_need">Customer Name </label>
                                    <select className="form-control" name={"prod"} onChange={(e) => {this.state.customer_name = e.target.value}}>
                                        <option value="" selected disabled>--Please Select Your Customer--</option>
                                        {this.state.customer_data.map((x) => {
                                            return (<option key={x.CustomerName} value={x.CustomerName}> {x.CustomerName} </option>)
                                        })}
                                    </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label for="form_name">Compliant </label>
                                <input id="form_name" type="text" name="complaint" className="form-control" onChange={(e) => {this.setState({complaint_name: e.target.value})}} required="required"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <input type="submit" className="btn btn-success btn-send  pt-2 btn-block my-4" value="Submit The Compliant" style={{width:"100%"}} />
                        </div>
                    </div>
                </div>
                </form>
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    )
  }
}
