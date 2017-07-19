import React from 'react';
import {Actions, Component} from 'jumpsuit'
import Appointment from './Appointment'
import Nav from './Nav'
import {debounce} from 'underscore'

export default Component({
  componentDidMount() {
    Actions.fetchAppointments(this.props.user.rfid)

    this.debouncedScroll = debounce(this.onScroll, 200)

    window.addEventListener('scroll', this.debouncedScroll)
    this.onScroll()
  },
  componentWillReceiveProps(newProps) {
    console.log(newProps.user, this.props.user)
    if (newProps.user.receivedRFID && newProps.user.receivedRFID !== this.props.user.receivedRFID) {
      Actions.fetchUserByRFID(newProps.user.receivedRFID)
      Actions.fetchAppointments(newProps.user.receivedRFID)
      this.onScroll()
    }
  },
  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedScroll)
  },
  onScroll() {
    Actions.resetUserTimeout()
  },
  render() {
    const list = this.props.user.appointments.map((a, i) => {
      return(<Appointment key={i} a={a} />)
    })
    return (
        <div className="appointments" onScroll={this.onScroll}>
          <Nav />
          { list }
        </div>
    );
  }
}, (state) => {
  return {user: state.user}
})
