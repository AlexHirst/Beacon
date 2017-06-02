import React, { Component } from 'react';
import Login from './components/Login';
import Appointments from './components/Appointments';
import { connect } from 'react-redux'

class App extends Component {
  render() {
    let body = <Login user={this.props.user} />
    if ( this.props.user.rfid ) {
      body = <Appointments appointments={this.props.user.appointments} />
    }
    return (
      <div className="App">
        {body}
      </div>
    );
  }
}

export default connect(state => {
  return {
    ui: state.ui,
    user: state.user
  }
})(App)
