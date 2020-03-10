import React, {Component} from 'react';

export default class SignIn extends Component {
  componentDidMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: "299319725687-0588ko5dcuivlgdpqjfm5sanp7ngbg28.apps.googleusercontent.com"
      }).then(() => {
        window.gapi.signin2.render('signIn', {
          'scope': 'profile email',
          'longtitle': false,
          'theme': 'dark',
          'onsuccess': this.props.login,
          'onfailure': this.onFailure
        })
      })
    })
  }

  render() {
    return (
      <div className="navbar-nav">
        <div id="signIn" className="nav-item nav-link"></div>
        <a href="#" className="nav-item text-light d-flex align-items-center nav-link" onClick={this.props.logout}><span className="align-middle">Sign out</span></a>
      </div>
    );
  }
}

