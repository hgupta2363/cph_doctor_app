import React, { useEffect, useState } from 'react';
import { Constants, MeetingProvider } from '@videosdk.live/react-sdk';
import { LeaveScreen } from './components/screens/LeaveScreen';
import { JoiningScreen } from './components/screens/JoiningScreen';
import { MeetingContainer } from './meeting/MeetingContainer';
import { MeetingAppProvider } from './MeetingAppContextDef';
import { useLocation } from 'react-router-dom';
const VideoCallComponent = () => {
  const [token, setToken] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(true);
  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });
  const [selectWebcamDeviceId, setSelectWebcamDeviceId] = useState(
    selectedWebcam.id
  );
  const [meetingMode, setMeetingMode] = useState(Constants.modes.CONFERENCE);
  const [selectMicDeviceId, setSelectMicDeviceId] = useState(selectedMic.id);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);
  const location = useLocation();
  const isMobile = window.matchMedia(
    'only screen and (max-width: 768px)'
  ).matches;
  console.log(isMeetingLeft);
  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return 'Are you sure you want to exit?';
      };
    }
  }, [isMobile]);

  return (
    <>
      {isMeetingLeft ? (
        <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
      ) : (
        <MeetingAppProvider
          selectedMic={selectedMic}
          selectedWebcam={selectedWebcam}
          initialMicOn={micOn}
          initialWebcamOn={webcamOn}
        >
          <MeetingProvider
            config={{
              meetingId: location.state?.meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : 'TestUser',
              mode: meetingMode,
              multiStream: true,
            }}
            token={
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5ZmYzYjhkYi00MjZhLTQwZGUtYjgyYS03MDc5ZTMyMjNiMzIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4MTM4NDA1OSwiZXhwIjoxNzEyOTIwMDU5fQ.Mbq38YYZe3YerwX9NAEhs5U1KYMiRHXRa6fWE1CYdsw'
            }
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <MeetingContainer
              onMeetingLeave={() => {
                setToken('');
                setMeetingId('');
                setParticipantName('');
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
              selectedMic={selectedMic}
              selectedWebcam={selectedWebcam}
              selectWebcamDeviceId={selectWebcamDeviceId}
              setSelectWebcamDeviceId={setSelectWebcamDeviceId}
              selectMicDeviceId={selectMicDeviceId}
              setSelectMicDeviceId={setSelectMicDeviceId}
              micEnabled={micOn}
              webcamEnabled={webcamOn}
            />
          </MeetingProvider>
        </MeetingAppProvider>
      )}
    </>
  );
};

export default VideoCallComponent;
