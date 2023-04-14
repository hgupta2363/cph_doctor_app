import { async } from '@firebase/util';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  onSnapshot,
  getFirestore,
  limit,
  orderBy,
  startAfter,
  endAt,
  setDoc,
  doc,
  limitToLast,
  updateDoc,
} from 'firebase/firestore';

import { app } from './firebaseInit';
const db = getFirestore(app);

export const fetchSpecialities = async () => {
  try {
    const departmentRef = collection(db, 'CPH Departments');
    const que = query(departmentRef, orderBy('depart_id'));

    const querySnapshot = await getDocs(que);

    const departments = querySnapshot.docs.map((doc) => doc.data());

    return departments;
  } catch (error) {
    console.log(error);
  }
};
export const addUserFirestore = async (userData, uid) => {
  console.log(uid);

  await setDoc(doc(db, 'cphUser', uid), {
    id: uid,
    ...userData,
  });
};
export const addUserTokenInFirestore = async (
  fcmDeviceToken,
  uid,
  isNewUser
) => {
  console.log(fcmDeviceToken, uid, 'fcmDeviceToken');
  if (isNewUser)
    await setDoc(doc(db, 'cphUser', uid), {
      deviceToken: fcmDeviceToken,
      id: uid,
    });
  else {
    await updateDoc(doc(db, 'cphUser', uid), {});
  }
};
export const bookAppointmentCall = async (uuid, appointmentData) => {
  console.log(uuid, appointmentData);
  await setDoc(doc(db, 'cphAppointments', uuid), {
    ...appointmentData,
  });
};

export const fetchUserData = async (uid) => {
  const docRef = doc(db, 'cphUser', uid);
  const userSnap = await getDoc(docRef);
  return userSnap.data();
};
export const fetchAppintmentDetails = async (appmntId) => {
  console.log(appmntId);
  const docRef = doc(db, 'cphAppointments', appmntId);
  const appmntSnap = await getDoc(docRef);

  const appointmentDatails = appmntSnap.data();
  console.log(appointmentDatails);
  return appointmentDatails;
};
export const fetchAppointmentsByDocUserId = async (
  doc_user_id,
  setAppointMentList
) => {
  try {
    const appointmentRef = collection(db, 'cphAppointments');

    const que = query(
      appointmentRef,
      where('doc_user_id', '==', doc_user_id),
      orderBy('appointment_id')
    );

    onSnapshot(que, (querySnapshot) => {
      let appointments = [];
      querySnapshot.forEach((doc) => {
        appointments.push(doc.data());
        console.log(appointments);
        setAppointMentList(appointments);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
export const markAccepted = async (id, meetingId) => {
  await updateDoc(doc(db, 'cphAppointments', id), {
    status: 'ACCEPTED',
    meetingId: meetingId,
  });
};
export const checkIsDoctorAvailable = async (mobileNo) => {
  console.log(mobileNo);
  try {
    const doctorRef = collection(db, 'cphDoctor');
    const que = query(
      doctorRef,
      where('mobileNo', '==', mobileNo),
      orderBy('depart_id')
    );
    const querySnapshot = await getDocs(que);
    console.log(querySnapshot);
    const doctor = querySnapshot.docs.map((doc) => doc.data());
    return (doctor && Array.isArray(doctor) && doctor.length) > 0
      ? doctor[0]
      : null;
  } catch (err) {
    console.log(err);
  }
};
export const markDoctorVerified = async (doc_id, doc_user_id) => {
  await updateDoc(doc(db, 'cphDoctor', doc_id), {
    doc_user_id,
    isVerified: true,
  });
};
