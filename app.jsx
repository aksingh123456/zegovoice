import React, { useEffect, useRef } from 'react'
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
function App() {
  const userID = "user" + Math.floor(Math.random() * 1000);
  const zpref=useRef(null) 
const userName = "react_" + userID;
const appID = 121374178;
const serverSecret = "92542ecaef7e14f7971fc8cc4915fe23";
const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,null, userID, userName);
useEffect(()=>{
  const zp = ZegoUIKitPrebuilt.create(TOKEN);
  zpref.current=zp;
zp.addPlugins({ ZIM })
},[TOKEN])
function invite(callType) {
   const targetUser = {
        userID:prompt("enter callee's USERID"),
        userName:prompt("enter callee's userNAME")
    };
   zpref.current.sendCallInvitation({
    callees: [targetUser],
    callType,
    timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
   }).then((res) => {
    console.warn(res);
   })
   .catch((err) => {
   console.warn(err);
   });
}
  return (
    <div className='w-full h-screen bg-gradient-to-b from-[#1a2229] to-black flex items-center justify-center'>
      <div className="w-[500px] h-[400px] bg-[#0d1014] border-2 border-[#313030]  flex flex-col items-center gap-[20px] justify-center">
        <h2 className='text-[white] text-[20px]'>UserNAme: <span className="text-blue-500"> {userName}</span></h2>
        <h2 className='text-[white] text-[20px]'>UserId: <span className="text-blue-500">{userID}</span></h2>
        <button className='w-[200px] h-[50px] rounded-2xl bg-white text-black text-20px cursor-pointer' onClick={()=>{invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}}> VOICE CALL</button>
        <button className='w-[200px] h-[50px] rounded-2xl bg-white text-black text-20px cursor-pointer' onClick={()=>{invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}}> VEDIO CALL</button></div> </div>
      
  )
}

export default App
