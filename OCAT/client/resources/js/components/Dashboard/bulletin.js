import React from 'react';
import { NavLink } from 'react-router-dom';

export class DashboardBulletin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { } = this.state;

    return (
      <div className="container mt-3">
      <div className="justify-content-md-center">
        <div className="col-12 col-md-8">
          <div className="row">
            <h1 >OCAT Dashboard</h1>
          </div>
          <div className="row">
            <div className="col-auto">
              <NavLink to="/assessment/new">New</NavLink>
            </div>
            <div className="col-auto">
              <NavLink to="/assessment/list">List</NavLink>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
);
}
}