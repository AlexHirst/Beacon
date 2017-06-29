import React from 'react';
import {Actions, Component} from 'jumpsuit'
import Appointment from './Appointment';
import Nav from './Nav';

export default Component({
  componentDidMount() {
    Actions.fetchAppointments(this.props.user.rfid)
  },
  render() {
    const list = this.props.user.appointments.map((a, i) => {
      return(<Appointment key={i} a={a} />)
    })
    return (
        <div className="appointments">
          <Nav />
          { list }
        </div>
    );
  }
}, (state) => {
  return {user: state.user}
})
