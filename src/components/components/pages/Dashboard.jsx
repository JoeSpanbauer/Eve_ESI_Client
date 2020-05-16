import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Dashboard = ({
  auth,
}) => {
  let result = <div />;

  if (!auth.isAuthenticated) {
    result = <Redirect to="/dashboard" />;
  }

  return result;
};

Dashboard.propTypes = {
  auth: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
