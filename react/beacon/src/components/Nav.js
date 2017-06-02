import React from 'react';
import {Component, Link} from 'jumpsuit'

export default Component({
  render() {
    return (
      <div className="nav">
        <Link to="/" className="btn btn-info">
          <span className="glyphicon glyphicon-home"> HOME</span>
        </Link>
        <Link to="/appointments" className="btn btn-info">
          <span className="glyphicon glyphicon-home"> APPTMNTS</span>
        </Link>
        <Link to="/generator" className="btn btn-success">
          <span className="glyphicon glyphicon-search"> GENERATOR</span>
        </Link>
        <Link to="/map" className="btn btn-success">
          <span className="glyphicon glyphicon-search"> QUICK MAP</span>
        </Link>

        <hr/>
      </div>
    );
  }
})
