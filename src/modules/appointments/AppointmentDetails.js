import React, { useEffect, useState, useContext } from 'react';

import AppHeader from '../../sharedComponents/Appheader';
import DoctorProfileCard from '../../sharedComponents/ProfileCard';
import './AppointmentDetails.css';
import { fetchAppintmentDetails } from '../../data/firebaseApi';
import { AppointmentContext } from '../../contextProvider/appointmentDataProvider';
import { AuthContex } from '../../contextProvider/authContextProvider';
import { bookAppointmentCall } from '../../data/firebaseApi';
import Loading from '../../sharedComponents/Loading';
export default function AppointmentDetails({
  fromBookedAppointment,
  appointmentId,
  onOpdBooked,
}) {
  const [loading, setLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState({});
  const [slotInfo, setSlotInfo] = useState({});
  const [doctorInfo, setDoctorInfo] = useState({});
  const [speciality, setSpeciality] = useState({});
  const [bookingAppointmenLoading, setBookingAppointmenLoading] =
    useState(false);
  console.log(fromBookedAppointment);
  const {
    selectedDepartment,
    selectedDoctor,
    selectedSlot,
    patientDetail,
    resetAppointmentData,
  } = useContext(AppointmentContext);
  const { userData } = useContext(AuthContex);

  console.log(patientDetail, patientInfo);

  const bookAppointment = async () => {
    try {
      setBookingAppointmenLoading(true);
      var uuid = Math.random().toString(36).slice(-6);
      const appointmentData = {
        appointment_id: uuid,
        user_id: userData?.id,
        slot_info: selectedSlot,
        doctor_info: selectedDoctor,
        department_info: selectedDepartment,
        patient_info: patientDetail,
        status: 'REQUESTED',
      };
      console.log(appointmentData);
      await bookAppointmentCall(uuid, appointmentData);
      console.log(uuid, appointmentData);

      setBookingAppointmenLoading(false);
      resetAppointmentData();
      onOpdBooked(uuid);
    } catch (err) {
      setBookingAppointmenLoading(false);
    }
  };
  useEffect(() => {
    if (fromBookedAppointment) {
      let appointmentData;
      (async () => {
        try {
          setLoading(true);
          appointmentData = await fetchAppintmentDetails(appointmentId);
          setPatientInfo(appointmentData?.patient_info);
          setSlotInfo(appointmentData?.slot_info);
          setDoctorInfo(appointmentData?.doctor_info);
          setSpeciality(appointmentData?.department_info);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      })();
    } else {
      console.log('in second');
      setPatientInfo(patientDetail);
      setSlotInfo(selectedSlot);
      setDoctorInfo(selectedDoctor);
      setSpeciality(selectedDepartment);
    }
  }, []);

  return (
    <>
      {bookingAppointmenLoading || loading ? (
        <>
          {bookingAppointmenLoading && (
            <Loading loadingText='Booking Appointment' />
          )}
          {loading && <Loading loadingText='Loading Appointment Data' />}
        </>
      ) : (
        <>
          <div style={{ padding: '20px 20px 0 10px' }}>
            <DoctorProfileCard
              name={doctorInfo?.name ?? ''}
              speciality={speciality?.name ?? ''}
              image={doctorInfo?.imageUrl ?? ''}
              fromAppointmentDetail
            />
          </div>
          <div style={{ padding: '20px 20px 0 10px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',

                padding: '5px 5px 20px 20px',
                borderRadius: '5px',
              }}
            >
              <p className='scheduled_heder_text'>Scheduled Information</p>
              <div style={{ paddingLeft: '10px' }}>
                <p className='scheduled_date_text'>{slotInfo?.date}</p>
                <p className='scheduled_date_text'>
                  {' '}
                  {`${slotInfo?.startTime} : ${slotInfo?.endTime}`}
                </p>
              </div>
            </div>
          </div>
          <div style={{ padding: '20px 20px 0 10px' }}>
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
                  <p className='scheduled_date_text'>{`   ${patientInfo?.name}`}</p>
                  <p className='scheduled_date_text'>{`   ${patientInfo?.age}`}</p>
                  <p className='scheduled_date_text'>{`    ${patientInfo?.gender}`}</p>
                  <p className='scheduled_date_text'>{`    ${patientInfo?.phoneNo}`}</p>
                  <p className='scheduled_date_text'>{`   ${patientInfo?.healthIssueText}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ postion: 'relative', bottom: '0px' }}>
            {fromBookedAppointment ? (
              <button className='book_appointment_button'>
                Cancel Appointment
              </button>
            ) : (
              <button
                className='book_appointment_button'
                onClick={() => bookAppointment()}
              >
                Book Appointment
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
