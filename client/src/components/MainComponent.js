import { Component } from 'react';

import Menu from './MenuComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders, postFeedback } from '../redux/actionCreators';
import { actions } from 'react-redux-form';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetReduxForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders())},
  postFeedback: (values) => {dispatch(postFeedback(values))}
})

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  DishWithId = ({ match }) => {
    return (
      <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.id, 10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.id, 10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment} />

    )
  }

  render() {
    return (
      <>
        <Header></Header>
        <div className="container">
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route path="/home">
                  <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} 
                    leaderLoading = {this.props.leaders.isLoading}
                    leaderErrMess= {this.props.leaders.errMess}/>
                </Route>
                <Route path="/menu/:id">
                  {this.DishWithId}
                </Route>
                <Route exact path="/menu">
                  <Menu dishes={this.props.dishes} />
                </Route>
                <Route exact path="/contactus">
                  <Contact resetFeedbackForm={this.props.resetReduxForm} postFeedback = {this.props.postFeedback} />
                </Route>
                <Route path="/aboutus">
                  <About leaders={this.props.leaders.leaders} />
                </Route>
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
