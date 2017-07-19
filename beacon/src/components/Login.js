import React from 'react';
import {Actions, Component, Goto} from 'jumpsuit'
import Nav from './Nav';

export default Component({
  handleSubmit(e) {
    e.preventDefault()
    Actions.user.login({
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      birthdate: this.refs.birthdate.value,
    })
  },
  componentWillReceiveProps(newProps) {
    if(newProps.user.rfid) {
      Goto({
        path: '/appointments'
      })
    } else if (newProps.user.receivedRFID) {
      Actions.fetchUserByRFID(newProps.user.receivedRFID)
    }
  },
  render() {
    return (
      <div>
        <Nav />
        <form onSubmit={this.handleSubmit}>
          <div className="error">{ this.props.user.error }</div>
          <div className="form-group">
            <label className="control-label col-sm-2"><font size="4">NHS Number:</font>
            </label>
            <div className="col-sm-10">
              <input type="text"
                className="form-control"
                placeholder="000-000-0000"
                ref="firstname"
                name="firstname"
                defaultValue={this.props.user.firstname}
                />
                <br />
            </div>
          </div>
        <div>
         </div>
          <div className="form-group">
            <label className="control-label col-sm-2"><font size="4">Surname:</font>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Your surname"
                ref="lastname"
                name="lastname"
                defaultValue={this.props.user.lastname}
              />
              <br />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2"><font size="4">SMS code:</font>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="000000"
                ref="birthdate"
                name="birthdate"
                defaultValue={this.props.user.birthdate}
              />
              <br />
              <br />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">LOG IN</button>
              <br />
              <br />
            </div>
          </div>
        </form>
      </div>
    );
  }
}, (state) => {
  return {user: state.user}
})
