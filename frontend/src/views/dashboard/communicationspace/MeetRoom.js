import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const MeetRoom = () => {
  const {roomID}=useParams();
  console.log("🚀 ~ file: RoomPage.js:8 ~ RoomPage ~ roomID:", roomID)
  const myMeeting = async (element) => {
      // generate Kit Token
       const appID = 194953 ;
       const serverSecret = "bfd8f6416be9391ed215f1c9690a89b2";
       const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString() ," /add user name/");
       const zp = ZegoUIKitPrebuilt.create(kitToken);
       zp.joinRoom({
          container: element,
       scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      })
  }

  
  return (
   <>
   
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '70vw', height: '80vh' }}
    ></div>
   </>
  )
}

export default MeetRoom