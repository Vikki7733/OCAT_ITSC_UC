import React from 'react';
import { NavLink } from 'react-router-dom';
import { LoginService } from '../shared/services/login.service';

export class DashboardBulletin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSupervisor: false,
      isLoggedIn:false
    };
  }
  
  componentDidMount() {
    const user = LoginService.getCurrentUser();

    if (user) {
      this.setState({
        isSupervisor:user.isSupervisor,
        isLoggedIn:user.isLoggedIn
      });
    }
  }

  logout(){
    LoginService.logout();
  }

  render() {

    return (
            <div className="container mt-3">
              <div className="justify-content-md-center">
                <div className="col-12 col-md-8">
                  <div className="row">
                    <h1 >OCAT Dashboard</h1>
                  </div>
                  <div className="row">

                  {this.state.isLoggedIn?
                    <div className="col-auto">
                      <NavLink to="/assessment/new">New</NavLink>
                    </div>
                  :''}

                    {!this.state.isLoggedIn?
                      <div className="col-auto">
                        <NavLink to="/login/">Login</NavLink>
                      </div> 
                    :''}

                    {this.state.isSupervisor?                  
                      <div className="col-auto">
                        <NavLink to="/assessment/list">List</NavLink>
                      </div>
                    :''}
                    
                    {this.state.isLoggedIn?
                      <div className="col-auto">
                        <button style={{color:'gray', backgroundColor:'white', borderWidth:'0px'}} onClick={this.logout}>Logout</button>
                      </div> 
                    :''}

                  </div>
                </div>
              </div>
              <hr />
            </div>
      );
  }
}