import {connect} from 'react-redux';
import SignInComponent from '../components/SignIn';
import {userActions} from '../actions/user';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (googleUser) => {
      dispatch(userActions.login(googleUser));
    },
    logout: () => {
      dispatch(userActions.logout());
    }
  }
}

const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInComponent)

export default SignIn;