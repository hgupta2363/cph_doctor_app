import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppointmentDetails from '../AppointmentDetails';
import AppHeader from '../../../sharedComponents/Appheader';
export default function AppointmentDetailContainer() {
  const location = useLocation();
  const history = useHistory();
  return (
    <>
      <AppHeader
        text='My Appointment'
        onBack={() => history.push('/appointments')}
      />
      <AppointmentDetails
        fromBookedAppointment={true}
        appointmentId={location?.state?.appointmentId}
      />
    </>
  );
}
