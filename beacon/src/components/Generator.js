import React from 'react';
import {Actions, Component} from 'jumpsuit'
import Nav from './Nav';

export default Component({
  componentWillReceiveProps(newProps) {
    if(newProps.generator.generate) {
      Actions.generateUserData(newProps.generator.lastId)
    } else if (newProps.generator.lastId !== this.props.lastId){
      Actions.fetchUserByRFID(newProps.generator.lastId)
    }
  },
  render() {
    console.log(this.props)
    const list = this.props.generator.messages.map((m, i) => {
      return(<li key={i}>{m}</li>)
    })
    return (
        <ul className="generator">
          <Nav />
          { list }
        </ul>
    );
  }
}, (state) => {
  return {
    generator: state.generator
  }
})
