import React from 'react';
import {Actions, Component} from 'jumpsuit'
import Nav from './Nav';

export default Component({
  componentDidMount() {
    Actions.fetchAppointments(this.props.user.rfid)
  },
  render() {
    const list = this.props.user.appointments.map((a, i) => {
      const img = `${process.env.PUBLIC_URL}/img/UHW-map-${ a.appointmentlocation.toLowerCase() }.jpg`
      return(
        <div key={i} className="row">
        <h3 className="text-center">Scroll to see next appointment</h3>
        <h3> </h3>
        <h3> </h3>
          <div className="col-sm-4">
            <h4>Who is your appointment with:</h4>
            <p>
              { a.appointmentname }
            </p>
            <br />
            <h4>What time is your appointment:</h4>
            <p>
              { a.appointmentime }
            </p>
            <br />
            <h4>Where is your appointment</h4>
            <p>
              { a.appointmentlocation }
            </p>
            <br />
          </div>
          <div className="col-sm-8">
            <img alt="position" src={img} className="img-rounded" width="500" height="400" />
          </div>
          <hr />
        </div>)
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
