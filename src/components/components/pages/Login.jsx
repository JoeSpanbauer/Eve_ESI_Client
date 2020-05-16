import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AUTHORIZE, AUTHENTICATE } from '../../../actions/actionTypes';

const Login = ({
  auth,
  dispatch,
}) => {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    if (!code) {
      dispatch({ type: AUTHORIZE, payload: {} });
    } else if (!auth.isAuthenticated) {
      dispatch({ type: AUTHENTICATE, payload: { code } });
    }
  }, []);

  let result = (
    <div>
      On moment while we redirect you...
    </div>
  );

  if (auth.isAuthenticated) {
    result = <Redirect to="/dashboard" />;
  }

  return result;
};

Login.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: { ...state.auth },
});

export default connect(mapStateToProps)(Login);
