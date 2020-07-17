import React, { Component } from 'react';
import axios from 'axios';

class Newcontact extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitImage = this.onSubmitImage.bind(this);
    
        this.state = {
            username: '',
            phonenumber: '',
            email: '',
            image: ''
        }

        this.state = {
            fields: {},
            errors: {}
        }

    }

    fileValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //File
        if(!fields["image"]){
            formIsValid = false;
            errors["image"] = "Cannot be empty";
         }


        if(typeof fields["image"] !== "undefined"){
            if(!fields["image"].match(/(.png|.jpg|.jpeg)$/i)){
                formIsValid = false;
                errors["image"] = "'.jpeg','.jpg','png' formats are only allowed.";
            }        
        } 
   
       this.setState({errors: errors});
       return formIsValid;
    }

    imageChange(field, e) {         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }


    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
   
        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }
   
        if(typeof fields["name"] !== "undefined"){
           if(!fields["name"].match(/^[a-zA-Z]+ [a-zA-Z]+$/)){
              formIsValid = false;
              errors["name"] = "Enter Firstname and Lastname";
           }        
        }
   
        //Phone Number
       if(!fields["phone"]){
         formIsValid = false;
         errors["phone"] = "Cannot be empty";
       }
   
      if(typeof fields["phone"] !== "undefined"){
         if(!fields["phone"].match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)){
            formIsValid = false;
            errors["phone"] = "Enter Valid Phonenumber";
         }        
      }
      
        //Email
        if(!fields["emails"]){
           formIsValid = false;
           errors["emails"] = "Cannot be empty";
        }

      if(typeof fields["emails"] !== "undefined"){
        if(!fields["emails"].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            formIsValid = false;
            errors["emails"] = "Enter Valid Email";
         }        
      }   
   
       this.setState({errors: errors});
       return formIsValid;
   }

   handleChange(field, e) {         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
    }

    onUpload(e) {  
        this.setState({
            image: URL.createObjectURL(e.target.files[0])
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
    
    onSubmitImage(e){
        e.preventDefault();
        
        if(this.fileValidation()) {
            alert("Image submitted");
        }
        else{
            alert("Error while Uploading");
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.handleValidation()) {

            const newcontact = {
                username: this.state.username,
                phonenumber: this.state.phonenumber,
                email: this.state.email
            }
        
            console.log(newcontact);
        
            axios.post('http://localhost:8000/new/create/', newcontact)
              .then(res => console.log(res.data));
    
            alert("Form submitted");
        
            window.location = '/';
        }
        else {
                return alert("Form has errors.");
        }
        
    }

    render() {
        return (
            <div className = "container">
                <div class="row">
                    <div class="col-4" >
                        <div>
                            <form onSubmit={this.onSubmitImage}>
                                <div className="form-group">
                                    <input type="file" 
                                        ref = "image"
                                        required
                                        onInput={this.imageChange.bind(this, "image")}
                                        onChange={this.onUpload}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["image"]}</span>
                                </div>
                                <img src={this.state.image} style= {{ width: '171px', height: '180px'}}/> 
                                <div className="form-group" style= {{position: 'fixed', left: '14%', bottom: 170, transform: 'translateX(-10%)'}}>
                                    <input type="submit" value="Upload" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                        <div style={{ fontFamily: "Georgia", fontSize:18, position: 'fixed', left: '14%', bottom: 140, transform: 'translateX(-10%)' }}>
                            Hello, {this.state.username}
                        </div>
                    </div>
                    <div class="col-8">
                        <h3>Create New Contact Details</h3>
                            <form onSubmit={this.onSubmit }>
                                <div className="form-group"> 
                                    <label>Username: </label>
                                    <input  type="text"
                                        required
                                        ref="name"
                                        className="form-control"
                                        placeholder = "eg: Laxmi Kumar"
                                        value={this.state.username}
                                        onInput={this.handleChange.bind(this, "name")} 
                                        onChange={this.onChangeUsername}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                </div>
                                <div className="form-group"> 
                                    <label>PhoneNumber: </label>
                                    <input  type="text"
                                        required
                                        ref="phone"
                                        className="form-control"
                                        placeholder = "eg: 9876543210"
                                        value={this.state.phonenumber}
                                        onInput={this.handleChange.bind(this, "phone")} 
                                        onChange={this.onChangePhoneNumber}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["phone"]}</span>
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input type="text" 
                                        required
                                        ref="emails"
                                        className="form-control"
                                        placeholder = "eg: abc123_@domain.domainsuffix"
                                        onInput={this.handleChange.bind(this, "emails")} 
                                        onChange={this.onChangeEmail}
                                    />
                                    <span style={{color: "red"}}>{this.state.errors["emails"]}</span>
                                </div>
                                <div className="form-group" style={{ position: 'absolute', right: '20%', bottom: -70, transform: 'translateX(-40%)'}}>
                                    <input type="submit" value="Save" className="btn btn-primary" />
                                </div>

                            </form>
                    </div> 
                </div>
            </div>
                
        )
      }
}

export default Newcontact;