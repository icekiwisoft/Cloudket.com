import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player"
import play from '../../assets/play.png'
import pause from '../../assets/pause.png'
const Player = (props) => {

  const [playing, setPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const { files, file, setfile } = props
  useEffect(() => {
    window.setInterval(function () {
      setCurrentTime(videoRef.current?.currentTime);

    }, 1000);
  }, [])


  const closeplayer = () => {
    setfile(-1)
  }

  const videoHandler = (control) => {
    if (control === "play") {
      videoRef.current.play();
      setVideoTime(videoRef.current.duration);
      setPlaying(true);
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const fastForward = () => {
    ;
    let y = videoRef.current.currentTime + 20.0

    videoRef.current.currentTime = y
  };

  const revert = () => {
    videoRef.current.currentTime -= 5;
  };

  const handlevideoplayer = (e) => {
    e.stopPropagation()
  }

  return (

    <div className="videoplayer-wrapper" onClick={closeplayer} style={{ position: "fixed", top: 0, width: "100%", left: 0 }}>

      <div className="videoplayer" onClick={handlevideoplayer}>

        <video
          ref={videoRef}
          className="video"
          src={"http://localhost:8000" + files[file].file}
        ></video>





      </div>


      <div className="controlsContainer" onClick={handlevideoplayer}>

        <div className="controls">
          <img className="controlsIcon" onClick={revert}
            alt="" src="/backward-5.svg" />
          {playing ? (
            <img
              onClick={() => videoHandler("pause")}
              className="controlsIcon--small"
              alt=""
              src={pause}
            />
          ) : (
            <img
              onClick={() => videoHandler("play")}
              className="controlsIcon--small"
              alt=""

              src={play}
            />
          )}
          <img className="controlsIcon" onClick={fastForward} alt="" src="/forward-5.svg" />
        </div>

        <div className="timecontrols">
          <p className="controlsTime">
            {Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}

          </p>
          <div className="time_progressbarContainer">
            <div style={{ width: (videoRef.current?.currentTime / videoTime) * 100 + "%" }} className="time_progressBar"></div>
          </div>
          <p className="controlsTime">
            {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}

          </p>
        </div>

      </div>
    </div>


  )
}

export default Player;
