import { Component } from 'react';
import { Card,Row,Col, CardImg,ModalHeader,Label, CardImgOverlay,List, CardBody, CardText, CardTitle, Breadcrumb,BreadcrumbItem, Button, Modal, ModalBody } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './lodingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components';
const minLength = (len)=>(val)=> !(val) || (val.length >= len);
const maxLength = (len)=>(val)=> !(val) || (val.length <= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        })
    }
    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
    }
    render(){
        return(
            <>
                <Button outline onClick={this.toggleModal}> <span className="fa fa-edit fa-lg"></span>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="Rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" className="form-control" id="Rating" name="Rating" placeholder="Rating" >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Control.select>
                                    
                                </Col>
                            </Row>
                            <div className="my-2"></div>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" className="form-control" id="author" name="author" placeholder="author" validators={{ minLength: minLength(3), maxLength: maxLength(15) }}></Control.text>
                                    <Errors className="text-danger" model=".author" show="touched" messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be less than 15 characters'
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" className="form-control" id="comment" name="comment" placeholder="comment" rows={6}></Control.textarea>
                                </Col>
                            </Row>
                            <div className="my-3"></div>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">Send feedback</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal> 
            </>
        )
    }
}
class DishDetail extends Component{

    constructor(props) {
        super(props);
    }
    renderComments(comments) {
        // if (comments != null) {
            
        // }
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <List type="unstyled">
                    <Stagger in>
                    {
                        comments.map(c => {
                        return (
                            <Fade in> 
                                <li>
                                    <p>{c.comment}</p>
                                    <p> --{c.author}, {Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'numeric'}).format(new Date(c.date))}</p>
                                </li>
                            </Fade>
                        );
                        })
                    }
                    </Stagger>
                </List>
            </div>
        )
    }
    renderDish(dish) {
        if (dish != null) {
            return (
                <>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <FadeTransform in transformProps={{
                                        exitTransform: 'scale(0.5) translateY(-50%)'
                                    }}>
                            <Card>
                                <CardImg width="100%" src={baseUrl +dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </FadeTransform>
                    </div>
                        {this.renderComments(this.props.comments)}
                        <CommentForm dishId={dish.id} postComment={this.props.postComment}/>
                </div>
                </>

            );
        } else {
            return (
                <div>

                </div>
            );
        }
    }
    render() {
        if(this.props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(this.props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4> {this.props.errMess}</h4>
                    </div>
                </div>
            )
        }
        return (
            <div className="row">
                {this.renderDish(this.props.dish)}
            </div>
        );
    }
}

export default DishDetail;