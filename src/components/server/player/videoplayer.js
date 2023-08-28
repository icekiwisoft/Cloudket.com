import { useContext, useEffect, useRef, useState } from "react";
import { playercontext } from "./player";
import play from '../../../assets/play.png'
import pause from '../../../assets/pause.png'
import { baseURL } from "../../../utils/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faPause, faPlay, faVolcano, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { motion, useCycle } from "framer-motion"

// function TimeControl({ videoRef, videoTime }) {


//     return (

//     )
// }

export default function VideoPlayer() {
    const [currentTime, setCurrentTime] = useState(0);

    const { file, setfile, files } = useContext(playercontext)
    const [playing, setPlaying] = useState(false);
    const [videoTime, setVideoTime] = useState(0);
    const [mouse, setmouse] = useState(0)
    const [changing, setischanging] = useState(false);
    const [muted, setmuted] = useCycle(false, true)
    const [fullscreen, setfullscreen] = useCycle(false, true)

    const videoRef = useRef(null);
    const videoplayerRef = useRef(null);

    const sliderRef = useRef(1);


    useEffect(
        () => {
            videoRef.current.muted = muted
        },
        [muted]
    )

    useEffect(() => {

        videoRef.current.play()
    }, [file])



    useEffect(() => {

        const interval = window.setInterval(function () {
            setCurrentTime(videoRef.current?.currentTime);

        }, 1000);

        document.addEventListener("mouseup", (e) => {
            setischanging(false)

        })


        document.addEventListener("mousemove", (e) => {
            setmouse(e.clientX)
        })

        return () => clearInterval(interval);



    }, [])


    useEffect(() => {

        if (playing)
            videoRef.current?.play();
        else
            videoRef.current?.pause();

    }, [playing])



    const videoHandler = (control) => {
        if (control === "play") {
            setPlaying(true);
        } else if (control === "pause") {
            setPlaying(false);
        }
    };

    const fastForward = () => {

        const newtime = videoRef.current.currentTime + 20.0

        videoRef.current.currentTime = newtime
    };

    const revert = () => {
        videoRef.current.currentTime -= 5;
    };

    const fullscreenvideoplayer = () => {
        videoplayerRef.current.requestFullscreen()
    }


    const handlevideoplayer = (e) => {
        e.stopPropagation()
    }

    const setposition = () => {

        const element = sliderRef.current;

        // Get the bounding rectangle of the element.
        const rect = element.getBoundingClientRect();

        // Calculate the mouse position relative to the element.
        const relativeX = mouse - rect.left;

        videoRef.current.currentTime = (relativeX / sliderRef.current.offsetWidth) * videoTime
        setCurrentTime(videoRef.current?.currentTime);
    }

    const mousedown = (e) => {

        setposition(e)
        setischanging(true)
    }


    useEffect(() => {
        if (changing)
            setposition()
    })


    const checkloaded = () => {
        if (videoRef.current.readyState >= 3) {
            setVideoTime(videoRef.current.duration);

        }
    }





    return (
        <div className="videoplayer" ref={videoplayerRef} onClick={handlevideoplayer}>

            <video
                ref={videoRef}
                className="video"
                controls={false}
                onLoadedData={checkloaded}
            >

                <source src={`${baseURL}/filestream?type=video&file=${files[file].id} `} type={files[file].type}></source>
            </video>

            <div className="controlsContainer" onClick={handlevideoplayer}>

                <div className="controls">


                    {playing ? (
                        <FontAwesomeIcon
                            onClick={() => videoHandler("pause")}
                            icon={faPause}
                        />
                    ) : (
                        <FontAwesomeIcon
                            onClick={() => videoHandler("play")}
                            icon={faPlay}

                        />
                    )}

                    <FontAwesomeIcon icon={faExpand} onClick={fullscreenvideoplayer} />
                    <FontAwesomeIcon icon={faVolumeHigh} onClick={setmuted} />

                </div>

                <div className="timecontrols" >

                    <p className="controlsTime">
                        {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}

                    </p>
                    <div className="time_progressbarContainer"
                        ref={sliderRef}

                        onMouseDown={mousedown}
                    >

                        <div style={{ width: (videoRef.current?.currentTime / videoTime) * 100 + "%" }} className="time_progressBar"></div>
                    </div>

                    <p className="controlsTime">
                        {Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}

                    </p>

                </div>


            </div>
        </div>




    )
}