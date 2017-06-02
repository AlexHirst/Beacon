import React, { Component } from 'react';
import { connect } from 'react-redux'

class Generator extends Component {
  render() {
    const list = this.props.generator.messages.map((a, i) => {
      return(<div className="col-sm-4">
      </div>)
    })
    return (
        <div className="generator">
          { list }
        </div>
    );
  }
}

export default connect(state => {
  return {
    generator: state.generator
  }
})(Generator)
