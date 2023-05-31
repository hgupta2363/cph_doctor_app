import { createContext, useEffect, useState } from 'react';
import { auth } from '../data/firebaseInit';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../sharedComponents/Loading';
import { async } from '@firebase/util';
import { getDoctorDetails } from '../data/firebaseApi';

export const AuthContex = createContext({
  user: null,
});

const AuthContextProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [fetchProfileLoading, setFetchProfileLoading] = useState(false);
  const [docProfileData, setDocProfileData] = useState();
  const clearUserData = () => {
    setDocProfileData({});
  };
  useEffect(() => {
    (async () => {
      if (user) {
        setFetchProfileLoading(true);
        const doctorProfileData = await getDoctorDetails(user?.uid);
        console.log(doctorProfileData);
        setDocProfileData(doctorProfileData);
        setFetchProfileLoading(false);
      }
    })();
  }, [user]);
  console.log(user, loading);
  return (
    <>
      {loading || fetchProfileLoading ? (
        <Loading />
      ) : (
        <AuthContex.Provider
          value={{
            isLoggedIn: user ? true : false,

            docUserId: user?.uid,
            docProfileData: docProfileData,
            clearUserData: clearUserData,
          }}
        >
          {children}
        </AuthContex.Provider>
      )}
    </>
  );
};
export default AuthContextProvider;
