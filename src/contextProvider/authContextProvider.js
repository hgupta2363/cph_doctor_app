import { createContext, useEffect, useState } from 'react';
import { auth } from '../data/firebaseInit';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../sharedComponents/Loading';

export const AuthContex = createContext({
  user: null,
});

const AuthContextProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  console.log(user, loading);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AuthContex.Provider
          value={{
            isLoggedIn: user ? true : false,

            docUserId: user?.uid,
          }}
        >
          {children}
        </AuthContex.Provider>
      )}
    </>
  );
};
export default AuthContextProvider;
