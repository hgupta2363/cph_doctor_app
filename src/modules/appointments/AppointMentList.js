import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBack from '@mui/icons-material/ArrowBack';
import './AppointmentsList.css';
import AppointMentCard from './Components/AppointMentCard';
import {
  fetchAppointmentsByDocUserId,
  markAccepted,
} from '../../data/firebaseApi';
import { onSnapshot } from 'firebase/firestore';
import { AuthContex } from '../../contextProvider/authContextProvider';
import Loading from '../../sharedComponents/Loading';

const AppointmentStatuses = [
  {
    label: 'Requested',
    value: 'REQUESTED',
  },
  {
    label: 'Accepeted',
    value: 'ACCEPTED',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED',
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const AppointMentList = ({ appointMentStatus, appointmentsList, onAccept }) => {
  const filteredAppointments = appointmentsList?.filter(
    (val) => val.status === appointMentStatus
  );
  console.log(filteredAppointments);

  return (
    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      {filteredAppointments.map((appointment) => {
        return (
          <AppointMentCard appointment={appointment} onAccept={onAccept} />
        );
      })}
    </div>
  );
};
const AppointmentListContainer = () => {
  const [slectedIndex, setSlectedIndex] = React.useState(0);
  const [appointmentsList, setAppointMentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { docUserId } = useContext(AuthContex);

  const history = useHistory();

  console.log(appointmentsList);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        console.log(docUserId);
        await fetchAppointmentsByDocUserId(docUserId, setAppointMentList);

        setLoading(false);
      } catch (err) {}
    })();
  }, []);
  const handleChange = (event, newValue) => {
    setSlectedIndex(newValue);
  };
  const onAccept = async (appointmentId) => {
    try {
      setLoading(true);
      await markAccepted(appointmentId);
      setLoading(false);
      setSlectedIndex(1);
    } catch (err) {}
  };
  return (
    <div style={{}}>
      <div>
        <div className='my_appointment_header'>
          <ArrowBack
            style={{ height: '20px', width: '20px' }}
            onClick={() => history.push('/')}
          />
          <p className='header_text'>My Appointments</p>
        </div>
        <>
          {loading ? (
            <Loading loadingText={'loading Appointments'} />
          ) : (
            <Box sx={{ width: '100%', paddingTop: '20px' }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  color: '#246bfd',
                  fontSize: '12px',
                }}
              >
                <Tabs
                  variant='scrollable'
                  orientation={'horizontal'}
                  value={slectedIndex}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                  textColor='inherit'
                  indicator={{ color: '#246bfd' }}
                >
                  {AppointmentStatuses.map((status) => {
                    return (
                      <Tab
                        sx={{
                          fontSize: '14px',
                          fontWeight: '600',
                        }}
                        label={status.label}
                      />
                    );
                  })}
                </Tabs>
              </Box>
              <AppointMentList
                appointmentsList={appointmentsList}
                appointMentStatus={AppointmentStatuses[slectedIndex].value}
                onAccept={onAccept}
              />
            </Box>
          )}
        </>
      </div>
    </div>
  );
};
export default AppointmentListContainer;
