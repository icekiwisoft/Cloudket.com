import React, { useContext, useState } from "react";
import ServerRoom from "../components/server/Room/serverroom";
import ServerNavigation from "../components/sidebar/sidebar";
import AuthContext from "../context/authcontext";
export default function Server() {
    const [searchfolder, setsearchfolder] = useState(false)
    let { theme } = useContext(AuthContext);
    return (
        <div className={"content" + ((theme) ? " light" : '')}>
            <ServerNavigation searchfolder={searchfolder} setsearchfolder={setsearchfolder} />
            <ServerRoom setsearchfolder={setsearchfolder} />
        </div>
    )
}