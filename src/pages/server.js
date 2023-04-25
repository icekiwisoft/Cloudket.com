import { useState } from "react";
import ServerNavigation, { Settings } from "../components/server/servernavigation";
import ServerRoom from "../components/server/serverroom";
export default function Server() 
{
    const [settings,setsettings]=useState(false)

    
    return (
        <div  className="content">
            <ServerNavigation setsettings={setsettings}/>
            <ServerRoom/>
            {
                (settings)&&(
                    <Settings/>
                )
            }

        </div>
    )
}