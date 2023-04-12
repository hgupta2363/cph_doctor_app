import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContex } from '../contextProvider/authContextProvider';
const PrivateRoutes = ({ component: Component, ...rest }) => {
  console.log('in private route');
  const { isLoggedIn } = useContext(AuthContex);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};
export default PrivateRoutes;
