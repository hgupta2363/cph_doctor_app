import React, { useState } from 'react';
import './AppointmentsCard.css';
import Avatar from '@mui/material/Avatar';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useHistory } from 'react-router-dom';
import { markDone } from '../../../data/firebaseApi';
import DuoIcon from '@mui/icons-material/Duo';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ImageSelectorModal from '../../../sharedComponents/ImageSelectorModal';
import CancelReasonModal from './CancelReasonModal';
const AppointMentCard = ({
  appointment,
  onAccept,
  onCancel,
  setShowCancelModal,
  showCancelModal,
}) => {
  const [showImageSelectorModal, setShowImageSelectorModal] = useState(false);

  const [isExpended, setIsexpended] = useState(false);

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
  const omMarkAppointmentDone = async (imageUrl) => {
    await markDone(appointment?.appointment_id, imageUrl);
    setShowImageSelectorModal(false);
  };
  return (
    <>
      <div className='appointment_card_wrapper'>
        <div
          className='appointment_header'
          onClick={() => setIsexpended((prev) => !prev)}
        >
          <p className='name_text'>{`Patient Name: ${appointment?.patient_info?.name}`}</p>
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

        {isExpended ? (
          <>
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

                    padding: '5px 5px 5px 30px',
                    borderRadius: '5px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'flex-end',
                      gap: '40px',
                    }}
                  >
                    <p className='scheduled_heder_text'>Patient Information</p>
                    {appointment?.status === 'ACCEPTED' && (
                      <>
                        <div>
                          <DuoIcon
                            style={{
                              color: '#246bfd',
                              height: '25px',
                              width: '25px',
                            }}
                            onClick={() =>
                              history.push('/videoCall', {
                                meetingId: appointment?.meetingId,
                              })
                            }
                          />
                        </div>
                        <div>
                          <LocalPhoneIcon
                            style={{
                              color: '#246bfd',
                              height: '25px',
                              width: '25px',
                            }}
                            onClick={() => {
                              window.location = 'tel:8118853410';
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '30px',
                      marginTop: '2 0px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <p className='scheduled_date_text'>Name</p>
                      <p className='scheduled_date_text'>Age</p>
                      <p className='scheduled_date_text'>Gender</p>
                      <p className='scheduled_date_text'>Mobile Number</p>
                      <p className='scheduled_date_text'>Health Issue</p>
                      {appointment?.status === 'CANCELLED' && (
                        <p className='scheduled_date_text'>Cancel Reason</p>
                      )}
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
                      {appointment?.status === 'CANCELLED' && (
                        <p className='scheduled_date_text'>
                          {appointment?.cancel_reason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <></>
              </div>
            </div>

            {appointment?.status === 'REQUESTED' && (
              <div
                style={{
                  display: 'flex',
                  gap: '30px',
                  padding: '0px 20px 20px 20px',
                }}
              >
                <div style={{}}>
                  <button
                    className='cancel_button_'
                    onClick={() => setShowCancelModal(true)}
                  >
                    Reject
                  </button>
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
              <div style={{ paddingBottom: '20px' }}>
                <button
                  className='upload_prescribtion'
                  onClick={() => setShowImageSelectorModal(true)}
                >
                  Upload prescribtion
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
      {showImageSelectorModal && (
        <ImageSelectorModal
          onComplete={omMarkAppointmentDone}
          onCompleteCtaText={'Complete Appointment'}
          onClose={() => setShowImageSelectorModal(false)}
        />
      )}
      {showCancelModal && (
        <CancelReasonModal
          onCancel={onCancel}
          id={appointment?.appointment_id}
        />
      )}
    </>
  );
};
export default AppointMentCard;
const imageContainer = {
  height: '50px',
  width: '50px',
  paddingTop: '10px',
};
