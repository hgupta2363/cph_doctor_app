import React from 'react';
import Avatar from '@mui/material/Avatar';
import './ProfileCard.css';
export default function DoctorProfileCard({
  image,
  name,
  speciality,
  s_time,
  e_time,
  actions,
  id,
  depart_id,
  qualification,
  fromAppointmentDetail,
}) {
  const shortifyName = (name) => {
    let nameStrings = name.split(' ');
    let shortName = '';
    for (let i = 0; i < 3; i++) {
      shortName = shortName + ' ' + nameStrings[i];
    }
    return shortName;
  };

  return (
    <>
      <div
        className='doctor_card_wrapper'
        style={{
          boxShadow: actions ? '0 0 30px #ccc' : '0 0 0px #ccc;',
        }}
      >
        <div
          className='doctor_info_row'
          style={{
            borderBottom:
              actions && actions.length > 0
                ? '1px solid rgb(234, 231, 231)'
                : '',
          }}
        >
          <div style={avatar_wraper}>
            <Avatar
              alt='Remy Sharp'
              src={image}
              sx={{
                width: actions || fromAppointmentDetail ? 80 : 120,
                height: actions || fromAppointmentDetail ? 80 : 120,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <p className='doctor_text_1'>{shortifyName(name)}</p>

            <p className='spec_text_1'>{speciality}</p>
            {s_time && e_time ? (
              <p className='slot_text_1'>{` ${s_time}AM - ${e_time}PM`}</p>
            ) : null}
          </div>
        </div>

        <div
          style={{
            paddingBottom: '5px',
            display: 'flex',
            justifyContent: 'space-around',
            gap: '10px',
          }}
        >
          {actions &&
            actions.map((action, index) => {
              return (
                <button
                  className={index === 0 ? 'book_button' : 'profile1_button'}
                  onClick={() =>
                    action?.callBack({
                      id,
                      name,
                      image,
                      s_time,
                      e_time,
                      depart_id,
                      speciality,
                    })
                  }
                >
                  {action?.text}
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
}
const avatar_wraper = {
  paddingTop: '10px',
};
