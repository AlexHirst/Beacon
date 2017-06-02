import React, { Component } from 'react';
import { connect } from 'react-redux'

class Appointments extends Component {
  render() {
    const list = this.props.appointments.map((a, i) => {
      const img = `/img/UHW-map-${ a.appointmentlocation }.jpg`
      return(<div key={i} className="row">
        <div className="col-sm-4">
          <h4>Your appointment today is with</h4>
          <p>
            { a.appointmentname }
          </p>
          <br />
          <h4>The appointment is at</h4>
          <p>
            { a.appointmentime }
          </p>
          <br />
          <h4>Please follow the map to</h4>
          <p>
            { a.appointmentlocation }
          </p>
          <br />
        </div>
        <div className="col-sm-8">
          <img alt="position" src={img} className="img-rounded" width="700" height="267" />
        </div>
        <hr />
      </div>)
    })
    return (
        <div className="appointments">
          { list }
        </div>
    );
  }
}

export default connect(state => {
  return {
    appointments: state.user.appointments
  }
})(Appointments)
