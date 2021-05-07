import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoaderPendulum from '../layout/loaders/LoaderPendulum';
import { getProfiles } from '../../actions/profile';

import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <LoaderPendulum />
      ) : (
        <Fragment>
          <h1>Yaratanlar</h1>
          <h3>Yartanlarla tanış</h3>
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          ) : (
            <h4>herkes tatilde glb .S</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ profile: state.profile });

export default connect(mapStateToProps, { getProfiles })(Profiles);
