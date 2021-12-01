import React from "react"

export default function RecordButton() {
    return (
        <>
            <div id="recorder" classList="recorder-container fade-container ">
                <svg viewBox="0 0 38 38" classList="progress-container">
                  <circle classList="progress-track" r="16" cx="19" cy="19"></circle>
                  <circle id="progressBar" classList="progress-bar" r="16" cx="19" cy="19"></circle>
                  <circle classList="loading-circle" r="16" cx="19" cy="19"></circle>
                </svg>

                <button id="recorder-button" classList="style-reset">
                  Record
                </button>
              </div>

            <div id="flashElement" classList="flash-element"></div>
        </>
    )
}