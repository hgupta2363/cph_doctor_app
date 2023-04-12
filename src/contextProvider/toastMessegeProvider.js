import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

export const msgPosition = {
  TOP_RIGHT: toast.POSITION.TOP_RIGHT,
  TOP_LEFT: toast.POSITION.TOP_LEFT,
  BOTTOM_RIGHT: toast.POSITION.BOTTOM_RIGHT,
  BOTTOM_LEFT: toast.POSITION.BOTTOM_LEFT,
  BOTTOM_CENTER: toast.POSITION.BOTTOM_CENTER,
};

export const showSuccessMsg = ({ position, msg }) => {
  toast.success(msg, { position });
};
export const showErrorMsg = ({ position, msg }) => {
  console.log(typeof msg, 'in error');
  toast.error(msg, { position: toast.POSITION.BOTTOM_CENTER });
};
export const showWarningMsg = ({ position, msg }) => {
  toast.warning(msg, { position });
};
const showInfoMsg = ({ position, msg }) => {
  toast.info(msg, { position });
};

const ToastMessegeProvider = ({ children }) => (
  <>
    <ToastContainer
      hideProgressBar
      autoClose={5000}
      draggable
      style={{ position: 'fixed', bottom: '20px' }}
    />
    {children}
  </>
);
export default ToastMessegeProvider;
