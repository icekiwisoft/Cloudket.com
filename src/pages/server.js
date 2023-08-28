import { useContext, useState } from "react";
import ServerNavigation, { Settings } from "../components/server/sidebar";
import ServerRoom from "../components/server/serverroom";
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