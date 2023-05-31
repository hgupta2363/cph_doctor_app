import React, { useContext } from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack';
import './AppHeader.css';
import { AuthContex } from '../contextProvider/authContextProvider';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { SpaSharp } from '@mui/icons-material';
import { getAuth, signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
const shortifyName = (name) => {
  if (!name) {
    return '';
  }
  let nameStrings = name?.split(' ');
  let shortName = '';
  for (let i = 0; i < 3; i++) {
    shortName = shortName + ' ' + nameStrings[i];
  }
  return shortName;
};
const auth = getAuth();
export default function AppHeader({ text, onBack }) {
  const { docProfileData, clearUserData } = useContext(AuthContex);
  console.log(docProfileData);
  const history = useHistory();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      clearUserData();

      history.push('/login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='_header'>
        <div className='_person_wrapper'>
          {/* <PersonIcon
          style={{ height: '30px', width: '30px', color: 'white' }}
          onClick={() => onBack()}
        /> */}
          <img src={docProfileData?.img} className='_person_wrapper' />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <p className='_header_text'>
            {shortifyName(docProfileData?.name)}
            <span>
              <ArrowDropDownIcon
                style={{ height: '30px', width: '30px', color: '#246bfd' }}
              />
            </span>
          </p>
          <p className='_header_text2'>{docProfileData?.speciality}</p>
        </div>
      </div>
      <div className='logout' onClick={handleLogOut}>
        <p className='logout_text'>
          <span>
            <LogoutIcon style={{ width: '15px', height: '15px' }} />
          </span>
          logout
        </p>
      </div>
    </div>
  );
}
