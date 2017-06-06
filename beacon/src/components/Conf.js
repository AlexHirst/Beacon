import React from 'react';
import {Actions, Component, Goto} from 'jumpsuit'
import Nav from './Nav';

export default Component({
  handleSubmit(e) {
    e.preventDefault()
    Actions.updatePiIp({
      ip: this.refs.ip.value,
    })
  },
  render() {
    return (
      <div>
        <Nav />
        <form onSubmit={this.handleSubmit}>
          <div className="error">{ this.props.user.error }</div>
          <div className="form-group">
            <label className="control-label col-sm-2">PI IP:
            </label>
            <div className="col-sm-10">
              <input type="text"
                className="form-control"
                placeholder="ip"
                ref="ip"
                name="ip"
                defaultValue="192.168.7.190"
                />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">UPDATE</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}, (state) => {
  return {user: state.user}
})
