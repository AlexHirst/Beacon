import React from 'react';
import {Component, Link} from 'jumpsuit'

export default Component({
  render() {
    return (
      <div className="nav">
        <Link to="/" className="btn-lg btn-success">
          <span className="glyphicon glyphicon-home" />
        </Link>&nbsp;&nbsp;
        <Link to="/map" className="btn-lg btn-success">
          <span className="glyphicon glyphicon-search" /> QUICK MAP
        </Link>
        <hr/>
      </div>
    );
  }
})
