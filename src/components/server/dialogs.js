import { useContext, useEffect, useState } from "react"
import useAxios, { baseURL } from "../../utils/useAxios"
import { servercontext } from "./serverroom"

import './dialogs.scss'
import { ServerAvatar } from "./utils"
function Dialog({ children }) {
    const { setdialog } = useContext(servercontext)
    return (
        <div className="dialog-wrapper" onClick={() => setdialog(null)}>
            {children}
        </div>

    )
}

export function MembersDialog() {
    const axios = useAxios()
    const [members, setmembers] = useState([])

    const { setdialog, serverinfo } = useContext(servercontext)

    const initmembers = async () => {
        const response = await axios.get(`${baseURL}/${serverinfo.id}/members`)
        setmembers(response.data)
    }

    useEffect(() => {
        initmembers()
    }, [])
    return (
        <Dialog>

            <div className="dialog" onClick={(e) => { e.stopPropagation() }}>
                <div className="dialog-header">
                    Members
                </div>

                <div className="dialog-content">



                </div>
            </div>
        </Dialog>

    )
}



export function AdminsDialog() {
    const axios = useAxios()
    const { setdialog, serverinfo } = useContext(servercontext)


    return (
        <Dialog>



            <div className="dialog" onClick={(e) => { e.stopPropagation() }}>

                <div className="dialog-header">
                    administrator
                </div>
                <div className="dialog-content">

                </div>
                <div className="form-input">
                    <input type="text" placeholder="name" />
                </div>
                <div className="form-input">

                </div>
            </div>
        </Dialog>

    )
}



