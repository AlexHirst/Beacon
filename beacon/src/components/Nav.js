import React from 'react';
import {Component, Link} from 'jumpsuit'

export default Component({
  render() {
    return (
      <div className="nav">
        <Link to="/map" className="btn btn-success">
          <span className="glyphicon glyphicon-search" /> QUICK MAP
        </Link>

        <hr/>
      </div>
    );
  }
})