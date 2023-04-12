import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PhoneNumberScreen from '../modules/auth/PhoneNumberScreen';
import OtpScreen from '../modules/auth/OtpScreen';
import PrivateRoutes from './PrivateRoutes';
import AppointmentListContainer from '../modules/appointments/AppointMentList';
import VideoCallComponent from '../modules/videoCalling/VideoCallComponent';
const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoutes path='/' component={AppointmentListContainer} exact />
        <Route path='/login' component={PhoneNumberScreen} />
        <Route path='/otpVerify' component={OtpScreen} exact />
        <PrivateRoutes path='/videoCall' component={VideoCallComponent} exact />
      </Switch>
    </Router>
  );
};
export default Routes;
