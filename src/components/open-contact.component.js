import React, { Component } from 'react';
import axios from 'axios';

class Opencontact extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
          phonenumber: '',
          email: ''
        }

        this.state = {
            disabled: true
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:8000/existing/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username: response.data.username,
              phonenumber: response.data.phonenumber,
              email: response.data.email
            })   
          })
          .catch(function (error) {
            console.log(error);
        })
    
    }
    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    
    onChangePhoneNumber(e) {
        this.setState({
            phonenumber: e.target.value
        })
    }
    
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault();
    
        const existing = {
            username: this.state.username,
            phonenumber: this.state.phonenumber,
            email: this.state.email
        }
    
        console.log(existing);
    
        axios.post('http://localhost:8000/existing/update/' + this.props.match.params.id, existing)
          .then(res => console.log(res.data));
    
        window.location = '/';
    }

    render() {
        return (

            <div className = "container">
                <div class="row">
                    <div class="col-4" style={{ fontFamily: "Georgia", fontSize:18}}>
                        Hello, {this.state.username}
                    </div>
                    <div class="col-8">
                        <h3>Open Contact Details</h3>
                            <form >
                                <div className="form-group"> 
                                    <label>Username: </label>
                                    <input  type="text"
                                        required
                                        className="form-control"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                    />
                                </div>
                                <div className="form-group"> 
                                    <label>PhoneNumber: </label>
                                    <input  type="text"
                                        required
                                        className="form-control"
                                        value={this.state.phonenumber}
                                        onChange={this.onChangePhoneNumber}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input type="text" 
                                        required
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                    />
                                </div>
                            </form>
                    </div>
                            <form onSubmit={this.onSubmit }>
                                <div className="form-group" style={{ position: 'absolute', right: '20%', bottom: 60, transform: 'translateX(-50%)'}}>
                                    <input type="submit" value="Save" disabled= {this.state.disabled} className="btn btn-primary" />
                                </div>
                            </form>
                   
                </div>
            </div>

        )
    }
    
}


export default Opencontact;