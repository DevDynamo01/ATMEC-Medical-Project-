import React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const LiveStream = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['userinfo']);
  const id = 'sahil@123';
  console.log('Cook', cookies);
  console.log(cookies?.userinfo?.email?.user);
  const user = { firstName: cookies?.userinfo?.email?.user };

  const myMeeting = async (element) => {
    const appId = 987170939;
    const serverSecret = 'a59abaa2072f4f34c6f086a13485d3d4';
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
