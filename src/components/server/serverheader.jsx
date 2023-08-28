import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { itemvariants, variants } from "./sidebar"
import { motion, useCycle } from "framer-motion"
import { useContext, useRef, useState } from "react"
import { faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons"
import { servercontext } from "./serverroom"




function ChannelMenu() {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = { height: 100 }
    const { setdialog } = useContext(servercontext)

    return (
        <> <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            <motion.div className="background" />
            <button onClick={toggleOpen}><FontAwesomeIcon size="2x" icon={faEllipsisVertical} /></button>

            <motion.ul variants={variants}>

                <motion.li
                    variants={itemvariants}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="icon-placeholder" />
                    <div className="text-placeholder" onClick={() => setdialog(0)} >view channel info</div>
                </motion.li>
                <motion.li
                    variants={itemvariants}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="icon-placeholder" />
                    <div className="text-placeholder" onClick={() => {
                        setdialog(1)
                        toggleOpen()
                    }}>manage channel</div>
                </motion.li>

            </motion.ul>

        </motion.nav>


        </>

    );
}



export default function Serverheader({ setsearchfolder }) {

    return (
        <div className="serverheader">
            ff
            <div className="tools">

                <button><FontAwesomeIcon size="2x" icon={faSearch} onClick={() => setsearchfolder(true)} /></button>
                <ChannelMenu />
            </div>
        </div>
    )
}
