import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
//import { CreateStore } from 'jumpsuit'
import { Actions, CreateJumpstateMiddleware } from 'jumpstate'
import { Render, Router, IndexRoute, Route } from 'jumpsuit'
import UserState from './state/user'
import GeneratorState from './state/generator'
//import {
//  BrowserRouter as Router,
//  Route,
//  Link
//} from 'react-router-dom'


import Login from './components/Login';
import Appointments from './components/Appointments';
import Generator from './components/Generator';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/custom.css';
import './utils/firebase'
import './utils/ws'
import './state/effects'

const states = {
  user: UserState,
  generator: GeneratorState

}

const store = createStore(
  combineReducers(states),
  applyMiddleware(
    CreateJumpstateMiddleware()
  )
)

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>
          <Link to="/" className="btn btn-info">
            <span className="glyphicon glyphicon-home"></span> HOME
          </Link>
          <Link to="/appointments" className="btn btn-info" onClick={() => {Actions.fetchAppointments(store.getState().user.id)}}>
            <span className="glyphicon glyphicon-home"></span> APPTMNTS
          </Link>
          <Link to="/generator" className="btn btn-success">
            <span className="glyphicon glyphicon-search"></span> GENERATOR
          </Link>
          <Link to="/map" className="btn btn-success">
            <span className="glyphicon glyphicon-search"></span> QUICK MAP
          </Link>

          <hr/>

          <Route exact path="/" component={Login}/>
          <Route path="/appointments" render={(state)=> {
            console.log(state)
            return <Appointments />
          }}/>
          <Route path="/generator" render={()=> {
            return <Generator />
          }}/>
        </div>
      </Router>
    </Provider>,
    document.getElementById('root')
    );
registerServiceWorker();
