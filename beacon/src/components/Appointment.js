import React from 'react';
import {Actions, Component} from 'jumpsuit'

export default Component({
  handleSelection(e) {
    e.preventDefault()
    Actions.lightArrow({
      appointment: this.props.a,
    })
  },
  render() {
      const img = `${process.env.PUBLIC_URL}/img/UHW-map-${ this.props.a.appointmentlocation.toLowerCase() }.jpg`
      return(
        <div className="row" onClick={this.handleSelection}>
          <h3><kbd>{this.props.a.appointmentuser}</kbd></h3>
          <br />
          <h3>Please scroll to see today's appointment(s)</h3>
          <div className="col-sm-4">
            <h3><u>Appointment Time:</u></h3>
            <p>
              { this.props.a.appointmentime }
            </p>
            <br />
            <h3><u>Appointment Location:</u></h3>
            <p>
              { this.props.a.appointmentlocation }
            </p>
            <br />
            <h3><u>Your appointment is with:</u></h3>
            <p>
              { this.props.a.appointmentname }
            </p>
            <br />
          </div>
          <div className="col-sm-8">
            <img alt="position" src={img} className="img-rounded" width="500" height="400" />
          </div>
          <hr />
        </div>)
  }
})
