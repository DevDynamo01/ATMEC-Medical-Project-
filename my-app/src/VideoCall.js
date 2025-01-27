import React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const LiveStream = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['medgenai']);
  const id = 'sahil@123';
  console.log('Cook', cookies);
  console.log(cookies?.medgenai?.firstName);
  const user = { firstName: cookies?.medgenai?.firstName };

  const myMeeting = async (element) => {
    const appId = 1542959202;
    const serverSecret = '121e9b216fa6172ff73d2ec44b439a00';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      id,
      Date.now().toString(),
      user.firstName,
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy Link',
          url: 'http://localhost:3000/doctor-chat/',
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showRoomTimer: true,
      onLeaveRoom: () => {
        navigate('/');
      },
      screenSharingConfig: {
        width: 200,
        height: 200,
      },
    });
  };

  return (
    <div className="zoomCall">
      <div ref={myMeeting} className="meetingDiv" />
    </div>
  );
};

export default LiveStream;
