import React, { Component } from 'react';
import UserState from '../state/user'
import { connect } from 'react-redux'
import { Goto } from 'jumpsuit'
import { Actions } from 'jumpstate'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {user: props.user};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    UserState.login(this.state.user);
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      user: {
        [target.name]: target.value
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('Login will receive', nextProps)
    if(nextProps.user.rfid) {
      Actions.fetchAppointments(nextProps.user.id)
      Goto({
        path: '/appointments'
      }, true)
    } else {
      this.state = nextProps;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="error">{ this.props.user.error }</div>
        <div className="form-group">
          <label className="control-label col-sm-2">First name:
          </label>
          <div className="col-sm-10">
            <input type="text"
              className="form-control"
              placeholder="Your first name"
              name="firstname"
              value={this.state.user.firstname}
              onChange={this.handleInputChange}
              />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Surname:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Your
              surname"
              name="lastname"
              value={this.state.user.lastname}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Date of birth:</label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              placeholder="DD-MM-YYYY"
              name="birthdate"
              value={this.state.user.birthdate}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">LOG IN</button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(state => {
  return {
    user: state.user
  }
})(Login)
