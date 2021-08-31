import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Input, Col, Row, FormFeedback } from 'reactstrap';
import { Control, Form, Errors, actions} from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/i.test(val);

class Contact extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
    }
    // handleInputChange(event){
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //     this.setState({
    //         [name]: value,
    //     });
    // }
    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
        this.props.resetFeedbackForm();
        alert(this.props.postFeedback(values));
        // event.preventDefault();
    }

    // validate(firstname, lastname, telnum, email){
    //     const errors = {
    //         firstname: '',
    //         lastname: '',
    //         telnum: '',
    //         email: ''
    //     }
    //     if(this.state.touched.firstname && firstname.length < 3){
    //         errors.firstname = "First Name should be >= 3 characters";
    //     }else if(this.state.touched.firstname && firstname.length >10){
    //         errors.firstname = "First Name should be <= 10 charactersx"
    //     } 

    //     if(this.state.touched.lastname && lastname.length < 3){
    //         errors.lastname = "Last Name should be >= 3 characters";
    //     }else if(this.state.touched.lastname && lastname.length >10){
    //         errors.lastname = "Last Name should be <= 10 charactersx"
    //     } 
    //     const reg = /^\d+$/;
    //     if(this.state.touched.telnum && !reg.test(telnum)){
    //         errors.telnum = "Tel. number should contain only numbers."
    //     }
    //     if(this.state.touched.email && email.split('').filter(x=>x === '@').length !== 1){
    //         errors.email = "Email should contiain a @";
    //     }
    //     return errors;
    // }
    render() {
        // const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                        <div className="row row-content">
                            <div className="col-12">
                                <h3>Send us your feedback</h3>
                            </div>
                            <div className="col-12 col-md-9">
                                <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="firstname" md={2}>First name</Label>
                                        <Col md={10}>
                                            <Control.text model=".firstname" className="form-control" id="firstname" name="firstname" placeholder="First Name" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}></Control.text>
                                            <Errors className="text-danger" model=".firstname" show="touched" messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be less than 15 characters'
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="lastname" md={2}>Last name</Label>
                                        <Col md={10}>
                                            <Control.text model=".lastname" className="form-control" id="lastname" name="lastname" placeholder="Last Name" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}></Control.text>
                                            <Errors className="text-danger" model=".firstname" show="touched" messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be less than 15 characters'
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                        <Col md={10}>
                                            <Control.text model=".telnum" className="form-control" id="telnum" name="telnum" placeholder="Tel. number" validators={{required, minLength: minLength(3), maxLength: maxLength(15), isNumber}}></Control.text>
                                            <Errors className="text-danger" model=".firstname" show="touched" messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 numbers',
                                                maxLength: 'Must be less than 15 numbers',
                                                isNumber: 'Must be a number',
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="email" md={2}>Email</Label>
                                        <Col md={10}>
                                            <Control.text model=".email" id="email" name="email" placeholder="Email" validators={{required, validEmail}} ></Control.text>
                                            <Errors className="text-danger" model=".firstname" show="touched" messages={{
                                                required: 'Required',
                                                validEmail: 'Invalid Email Address',
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={{ size: 6, offset: 2 }}>
                                            <div className="form-check">
                                                <Label check>
                                                    <Control.checkbox model=".agree" className="form-check-input" id="agree" name="agree" ></Control.checkbox>
                                                    {' '}<strong>May we contact you?</strong>
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md={{ size: 3, offset: 1 }}>
                                            <Control.select model=".contactType" name="contactType" >
                                                <option>Tel.</option>
                                                <option>Email</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="message" md={2}>First name</Label>
                                        <Col md={10}>
                                            <Control.textarea model=".message" className="form-control" id="message" name="message" rows="12" placeholder="Message" ></Control.textarea>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={{ size: 10, offset: 2 }}>
                                            <Button type="submit" color="primary">Send feedback</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;