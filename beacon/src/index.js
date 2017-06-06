import React from 'react';
import { Render, Router, Route } from 'jumpsuit'
import UserState from './state/user'
import GeneratorState from './state/generator'

import Login from './components/Login';
import Appointments from './components/Appointments';
import Generator from './components/Generator';
import Conf from './components/Conf';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/custom.css';
import './utils/firebase'
import './utils/ws'
import './state/effects'

const state = {
  user: UserState,
  generator: GeneratorState
}

Render(state,(
  <Router>
    <Route path="/" component={Login}/>
    <Route path="/appointments" component={Appointments}/>
    <Route path="/generator" component={Generator}/>
    <Route path="/conf" component={Conf}/>
  </Router>
));
