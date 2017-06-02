import React from 'react';
import {Actions, Component, Link, Route} from 'jumpsuit'
import Login from './components/Login';
import Appointments from './components/Appointments';
import Generator from './components/Generator';

export default Component({
  render() {
    return (
      <div>
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

        <Route path="/" component={Login}/>
        <Route path="/appointments" component={Appointments}/>
        <Route path="/generator" component={Generator}/>
      </div>
    );
  }
}, (state) => {
  return state
})
