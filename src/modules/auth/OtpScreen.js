import OTPInput from 'react-otp-input';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './OtpScreen.css';
import Loading from '../../sharedComponents/Loading';
import { useHistory } from 'react-router-dom';
import { auth, captchaVerifier, signIn } from '../../data/firebaseInit';
import { setPersistence, inMemoryPersistence } from 'firebase/auth';
import otpImage from '../../assets/otp.PNG';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  showErrorMsg,
  msgPosition,
} from '../../contextProvider/toastMessegeProvider';
import { useContext } from 'react';
import { AuthContex } from '../../contextProvider/authContextProvider';

import AppHeader from '../../sharedComponents/Appheader';
const OtpScreen = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [startTimer, setStartTimer] = useState(false);
  const [counter, setCounter] = useState(60);
  const [resendClicked, setResendClicked] = useState(false);
  const { setUserId } = useContext(AuthContex);
  const timerRef = useRef(null);
  if (counter === 0 && startTimer) {
    clearInterval(timerRef.current);
    setStartTimer(false);
  }

  useEffect(() => {
    if (startTimer) {
      console.log('test');
      timerRef.current = setInterval(
        () => setCounter((prev) => prev - 1),
        1000
      );
    }
  }, [startTimer]);
  const onVerify = () => {
    setLoading(true);
    window.result
      .confirm(otp)
      .then((result) => {
        setLoading(false);
        console.log('verify result', result);
        let isNewUser = result?._tokenResponse?.isNewUser;
        // addDeviceToken(result.user.uid, isNewUser);
        if (isNewUser) {
          console.log(isNewUser);
          history.push('/userInfoForm', {
            userId: result.user.uid,
            backScreen: '/login',
          });
          setLoading(false);
        } else {
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        showErrorMsg({ position: msgPosition.BOTTOM_RIGHT, msg: err });
      });
  };
  const resendOtp = async () => {
    if (!resendClicked) {
      try {
        setResendClicked(true);
        let verify = new captchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
          },
          auth
        );
        await setPersistence(auth, inMemoryPersistence);
        const result = await signIn(
          auth,
          '+91' + location.state.phoneNumber,
          verify
        );
        window.result = result;
        setStartTimer(true);
      } catch (err) {
        console.log(err);
        showErrorMsg({
          position: msgPosition.BOTTOM_CENTER,
          msg: 'something went wrong',
        });
      }
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div id='recaptcha-container'></div>
          <AppHeader
            text={'Otp Verification'}
            onBack={() => history.push('/login')}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '35%',
            }}
          >
            {/* <div style={logoImageWrapper}>
              <img
                src='https://cphospital.in/wp-content/uploads/2023/02/Picture1-removebg-preview.png'
                style={{ width: '100%', height: '100%', margin: 'auto auto' }}
              />
            </div> */}
            <div style={logoImageWrapper}>
              <img
                src={otpImage}
                style={{ width: '100%', height: '100%', margin: 'auto auto' }}
              />
            </div>
            <div className='verifyDiv'>
              <p className='p2'>{` An OTP has been sent to ${location.state.phoneNumber}`}</p>
              <div className='otpElements'>
                <div className='otp'>
                  <OTPInput
                    onChange={(otp) => setOtp(otp)}
                    inputStyle='inputStyle'
                    numInputs={6}
                    separator={<span></span>}
                    value={otp}
                  />
                </div>

                <p className='p3'>Didn't receive the code?</p>
                {!startTimer ? (
                  <p className='resend' onClick={() => resendOtp()}>
                    Resend
                  </p>
                ) : (
                  <div style={{ display: 'flex', alignItem: 'center' }}>
                    <p
                      style={{
                        fontWeight: '400',
                        fontSize: '14px',
                        color: '#246bfd',
                        textAlign: 'center',
                      }}
                    >{`Resend Otp in ${counter} seconds`}</p>
                  </div>
                )}
              </div>
              {otp && otp.length === 6 && (
                <button
                  type='submit'
                  className='verify_button'
                  onClick={() => onVerify()}
                >
                  Verify
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OtpScreen;
const logoImageWrapper = {
  padding: '10px 10px 0px 10px',
  width: '250px',

  height: '20%',
};
