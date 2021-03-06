import SessionForm from "./session_form";
import { connect } from 'react-redux';
import { login, clearError } from '../actions/session_actions';

const mapStateToProps = state => {
  return {
    errors: state.errors.session,
    currentUser: state.entities.users[state.session.currentUserId],
    formType: 'login'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => dispatch(login(user)),
    clearError: () => dispatch(clearError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
