import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoaderRhombus from '../layout/loaders/LoaderRhombus';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import { Button } from 'react-bootstrap';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <LoaderRhombus />
  ) : (
    <Fragment>
      <h1 className="mt-2">Merhaba {user && user.name}</h1>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Button variant="danger" onClick={() => deleteAccount()}>
            Hesabı Sil
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <p>Buralar pek tenha</p>
          <Link to="/create-profile">Profil oluşturmaya ne dersin?</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
