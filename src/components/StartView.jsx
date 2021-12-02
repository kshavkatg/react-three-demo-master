import React, { useEffect } from "react"
import * as RecordRTC from 'recordrtc';

export default function StartView({onStartClick}) {
  
  useEffect(() => {
    const recordButton = document.querySelector('.start_view_heart')

  
    recordButton.addEventListener('click', () => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(async function(stream) {
        let recorder = RecordRTC(stream, {
            type: 'video'
        });
        recorder.startRecording();
    
        const sleep = m => new Promise(r => setTimeout(r, m));
        await sleep(3000);
    
        recorder.stopRecording(function() {
            let blob = recorder.getBlob();
            RecordRTC.invokeSaveAsDialog(blob);
            
        });
      });
    });
    
  }, [])

  return (
    <>
      <div className='start_view'>
        <img className="start_view_heart" src='./images/white_heart.png' alt='logo' />
      </div>
    </>
  )
}