import React, { useContext } from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack';
import './AppHeader.css';
import { AuthContex } from '../contextProvider/authContextProvider';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export default function AppHeader({ text, onBack }) {
  const { docProfileData } = useContext(AuthContex);
  console.log(docProfileData);
  return (
    <div className='_header'>
      <div className='_person_wrapper'>
        {/* <PersonIcon
          style={{ height: '30px', width: '30px', color: 'white' }}
          onClick={() => onBack()}
        /> */}
        <img src={docProfileData?.img} className='_person_wrapper' />
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}
      >
        <p className='_header_text'>
          {docProfileData?.name}{' '}
          <span>
            <ArrowDropDownIcon
              style={{ height: '30px', width: '30px', color: '#246bfd' }}
            />
          </span>
        </p>
        <p className='_header_text2'>{docProfileData?.speciality}</p>
      </div>
    </div>
  );
}
