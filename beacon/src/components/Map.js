import React from 'react';
import {Component} from 'jumpsuit'
import Nav from './Nav';
import map from '../img/UHW-map.jpg';

export default Component({
  render() {
    return (
      <div>
        <Nav />
        <img src={map} alt="Map" />
      </div>
    );
  }
})
