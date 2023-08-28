import React, { createContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player"
import play from '../../../assets/play.png'
import pause from '../../../assets/pause.png'
import { baseURL } from "../../../utils/useAxios";
import VideoPlayer from "./videoplayer";
import ImgPlayer from "./imageplayer";
import HtmlPlayer from "./htmlplayer";
import PdfPlayer from "./pdfplayer";
import './player.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

export const playercontext = createContext()


const Player = (props) => {

    const { setfile, file, files } = props

    const Rplayer = () => {
        const type = files[file].type

        if (type.includes("image"))
            return <ImgPlayer />

        if (type.includes("video"))
            return <VideoPlayer />

        if (type.includes("pdf"))
            return <PdfPlayer />

        if (type.includes("html"))
            return <HtmlPlayer />


    }

    const closeplayer = (e) => {
        setfile(-1)
        e.stopPropagation()
    }


    const nextfile = (e) => {
        file + 1 > files.length - 1 ? setfile(0) : setfile(file + 1)
        e.stopPropagation()

    }




    const previousfile = () => {

        file - 1 < 0 ? setfile(files.length - 1) : setfile(file - 1)
    }
    return (
        <playercontext.Provider value={props}>

            <div className="player-wrapper" style={{ position: "fixed", top: 0, width: "100%", left: 0 }}>
                <div className="navigation" onClick={closeplayer} >
                    <button onClick={previousfile}><FontAwesomeIcon icon={faAngleLeft} size="2x" /></button>
                    <button onClick={nextfile}><FontAwesomeIcon icon={faAngleRight} size="2x" /></button>
                </div>
                <Rplayer />


            </div>



        </playercontext.Provider>

    )
}

export default Player;
