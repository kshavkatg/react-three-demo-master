import React, { useEffect } from "react"

export default function RecordButton() {

  useEffect(() => {
    const video = document.getElementById( 'greenscreenvideo' );
		const startVideoButton = document.querySelector('.start_video')
		const recordButton = document.querySelector('#recorder')

  async function setupStream () {
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
  
      audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });
  
      setupVideoFeedback();
    } catch (err) {
      console.error(err)
    }
  }

  async function startRecording () {
    await setupStream();
  
    if (stream && audio) {
      mixedStream = new MediaStream([...stream.getTracks(), ...audio.getTracks()]);
      recorder = new MediaRecorder(mixedStream);
      recorder.ondataavailable = handleDataAvailable;
      recorder.onstop = handleStop;
      recorder.start(1000);
    
      // startButton.disabled = true;
      // stopButton.disabled = false;
    
      console.log('Recording started');
    } else {
      console.warn('No stream available.');
    }
  }

  function stopRecording () {
    recorder.stop();
  
    // startButton.disabled = false;
    // stopButton.disabled = true;
  }
  
  function handleDataAvailable (e) {
    chunks.push(e.data);
  }

  function handleStop (e) {
    const blob = new Blob(chunks, { 'type' : 'video/mp4' });
    chunks = [];
  
    downloadButton.href = URL.createObjectURL(blob);
    downloadButton.download = 'video.mp4';
    downloadButton.disabled = false;
  
    recordedVideo.src = URL.createObjectURL(blob);
    recordedVideo.load();
    recordedVideo.onloadeddata = function() {
      const rc = document.querySelector(".recorded-video-wrap");
      rc.classList.remove("hidden");
      rc.scrollIntoView({ behavior: "smooth", block: "start" });
  
      recordedVideo.play();
    }
  
    stream.getTracks().forEach((track) => track.stop());
    audio.getTracks().forEach((track) => track.stop());
  
    console.log('Recording stopped');
  }
  recordButton.addEventListener('click', startRecording);


}, [])

    return (
        <>
            <div id="recorder" className="recorder-container fade-container">
                <svg viewBox="0 0 38 38" className="progress-container">
                  <circle className="progress-track" r="16" cx="19" cy="19"></circle>
                  <circle id="progressBar" className="progress-bar" r="16" cx="19" cy="19"></circle>
                  <circle className="loading-circle" r="16" cx="19" cy="19"></circle>
                </svg>

                <button id="recorder-button" className="style-reset">
                  Record
                </button>
              </div>

            <div id="flashElement" className="flash-element"></div>
        </>
    )
}