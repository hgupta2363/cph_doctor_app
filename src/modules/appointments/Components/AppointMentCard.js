import React from 'react';
import './AppointmentsCard.css';
import Avatar from '@mui/material/Avatar';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useHistory } from 'react-router-dom';
import VideoCallComponent from '../../videoCalling/VideoCallComponent';
import DuoIcon from '@mui/icons-material/Duo';
const AppointMentCard = ({ appointment, onAccept }) => {
  const history = useHistory();
  console.log(
    new Date(
      appointment?.slot_info?.date.seconds * 1000 +
        appointment?.slot_info?.date.nanoseconds
    ).getDay()
  );

  const shortifyName = (name) => {
    let nameStrings = name.split(' ');
    let shortName = '';
    for (let i = 0; i < 3; i++) {
      shortName = shortName + ' ' + nameStrings[i];
    }
    return shortName;
  };
  return (
    <div className='appointment_card_wrapper'>
      <div className='appointment_header'>
        <p className='header_text'>
          {' '}
          {appointment?.status === 'REQUESTED'
            ? 'Appointment Request'
            : 'Appointment'}
        </p>
        <div
          style={{
            display: 'flex',

            alignItems: 'flex-end',
            gap: '10px',
          }}
        >
          <AccessTimeFilledIcon
            style={{ color: 'white', height: '20px', width: '20px' }}
          />
          <p className='time_text'>{`${
            appointment?.slot_info?.date ?? ''
          } .   ${appointment?.slot_info?.startTime ?? ''} - ${
            appointment?.slot_info?.endTime ?? ''
          }`}</p>
        </div>
      </div>

      <div className='appointment_info_row'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',

              padding: '5px 5px 20px 20px',
              borderRadius: '5px',
            }}
          >
            <p className='scheduled_heder_text'>Patient Information</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '40px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingLeft: '10px',
                }}
              >
                <p className='scheduled_date_text'>Name</p>
                <p className='scheduled_date_text'>Age</p>
                <p className='scheduled_date_text'>Gender</p>
                <p className='scheduled_date_text'>Mobile Number</p>
                <p className='scheduled_date_text'>Health Issue</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <p className='scheduled_date_text'>{`   ${appointment?.patient_info?.name}`}</p>
                <p className='scheduled_date_text'>{`   ${appointment?.patient_info?.age}`}</p>
                <p className='scheduled_date_text'>{`    ${appointment?.patient_info?.gender}`}</p>
                <p className='scheduled_date_text'>{`    ${appointment?.patient_info?.phoneNo}`}</p>
                <p className='scheduled_date_text'>{`   ${appointment?.patient_info?.healthIssueText}`}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {appointment?.status === 'ACCEPTED' && (
              <DuoIcon
                style={{ color: '#246bfd', height: '30px', width: '30px' }}
                onClick={() => history.push('/videoCall')}
              />
            )}
          </div>
        </div>
      </div>

      {appointment?.status === 'REQUESTED' && (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            padding: '10px 20px 10px 20px',
          }}
        >
          <div style={{ paddingBottom: '5px', margin: '0px' }}>
            <button className='cancel_button_'>Reject</button>
          </div>

          <button
            className='view_details'
            onClick={() => onAccept(appointment?.appointment_id)}
          >
            Accept
          </button>
        </div>
      )}
      {appointment?.status === 'ACCEPTED' && (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            padding: '10px 20px 10px 20px',
          }}
        >
          <button
            className='view_details'
            onClick={() => onAccept(appointment?.appointment_id)}
          >
            view details
          </button>
        </div>
      )}
    </div>
  );
};
export default AppointMentCard;
const imageContainer = {
  height: '50px',
  width: '50px',
  paddingTop: '10px',
};
