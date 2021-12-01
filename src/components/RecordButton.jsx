import React from "react"

export default function RecordButton() {
    return (
        <>
            <div id="recorder" className="recorder-container">
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