import { useContext, useState } from "react";
import ServerNavigation, { Settings } from "../components/server/servernavigation";
import ServerRoom from "../components/server/serverroom";
import AuthContext from "../context/authcontext";
export default function Server() {
    const [settings, setsettings] = useState(false)
    const [searchfolder, setsearchfolder] = useState(false)
    let { theme } = useContext(AuthContext);
    return (
        <div className={"content" + ((theme) ? " light" : '')}>
            <ServerNavigation searchfolder={searchfolder} setsearchfolder={setsearchfolder} setsettings={setsettings} />
            <ServerRoom setsearchfolder={setsearchfolder} />
            {
                (settings) && (
                    <Settings />
                )
            }

        </div>
    )
}