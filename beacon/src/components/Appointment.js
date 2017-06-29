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
        <h3 className="text-center">Scroll to see next appointment</h3>
        <h3> </h3>
        <h3> </h3>
          <div className="col-sm-4">
            <h4>Who is your appointment with:</h4>
            <p>
              { this.props.a.appointmentname }
            </p>
            <br />
            <h4>What time is your appointment:</h4>
            <p>
              { this.props.a.appointmentime }
            </p>
            <br />
            <h4>Where is your appointment</h4>
            <p>
              { this.props.a.appointmentlocation }
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
