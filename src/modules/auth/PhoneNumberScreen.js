import { useState } from 'react';
import { auth, captchaVerifier, signIn } from '../../data/firebaseInit';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { checkIsDoctorAvailable } from '../../data/firebaseApi';
import { useHistory } from 'react-router-dom';
import Loading from '../../sharedComponents/Loading';
import logo from '../../assets/logo.PNG';
import loginImage from '../../assets/loginImage.PNG';
import {
  showErrorMsg,
  msgPosition,
} from '../../contextProvider/toastMessegeProvider';
import './PhoneNumber.css';
const PhoneNumberScreen = () => {
  const history = useHistory();
  console.log('in phone number');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, showError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkError = () => {
    if (!phoneNumber.match('[0-9]{10}')) {
      showError('Please Provide a valid phone number');
    } else {
      showError('');
    }
  };
  const disableContinueButton =
    !phoneNumber ||
    !(phoneNumber.length === 10) ||
    !phoneNumber.match('[0-9]{10}');
  console.log(disableContinueButton);
  const continueWithPhoneNumber = async () => {
    setLoading(true);

    try {
      let doctor = await checkIsDoctorAvailable('+91' + phoneNumber);
      if (doctor) {
        let verify = new captchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
          },
          auth
        );
        await setPersistence(auth, browserLocalPersistence);
        const result = await signIn(auth, '+91' + phoneNumber, verify);
        window.result = result;

        setResult(result);
        setLoading(false);
        history.push({
          pathname: '/otpVerify',

          state: {
            result: JSON.stringify(result),
            phoneNumber: phoneNumber,
            doctor: doctor,
          },
        });
      } else {
        setLoading(false);
        showErrorMsg({
          position: msgPosition.BOTTOM_RIGHT,
          msg: 'You are not a verified doctor',
        });
      }
    } catch (err) {
      console.log(err);

      showErrorMsg({
        position: msgPosition.BOTTOM_RIGHT,
        msg: 'something went wrong',
      });
    }
  };
  return (
    <div>
      <div id='recaptcha-container'></div>
      {loading ? (
        <>
          <Loading loadingText='Sending Otp.....' />
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '35%',
          }}
        >
          {/* <div style={logoImageWrapper}>
            <img src={logo} style={{ width: '100%', height: '100%' }} />
          </div> */}
          <div style={logoImageWrapper}>
            <img
              src={loginImage}
              alt=''
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div style={phoneNUmberWrapper}>
            <p style={enterTextStyle}>Enter Your Mobile Number</p>
            <input
              type='text'
              placeholder='Enter Your Mobile No'
              onChange={(e) => setPhoneNumber(e.target.value)}
              onBlur={() => checkError()}
              className='input_style_'
            />
            {disableContinueButton && showError && (
              <p style={erroTextStyle}>{error}</p>
            )}
            <div id='recaptcha-container'></div>

            <button
              onClick={() => continueWithPhoneNumber()}
              className='phone_screen_button'
              disabled={disableContinueButton}
              style={{ opacity: disableContinueButton ? 0.3 : 1 }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PhoneNumberScreen;
const phoneNUmberWrapper = {
  width: '100%',
  backgroundColor: 'white',
  padding: '10px 10px 10px 10px',
  marginTop: '30px',
};
const enterTextStyle = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#3d4152',
  marginTop: '20px',
};

const erroTextStyle = {
  fontSize: '14px',
  fontWeight: '400',
  color: 'red',
  marginTop: '10px',
};
const logoImageWrapper = {
  padding: '10px 10px 0px 10px',

  width: '250px',
  height: '20%',
};
