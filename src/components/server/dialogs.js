import { useContext, useEffect, useState } from "react"
import useAxios, { baseURL } from "../../utils/useAxios"
import { servercontext } from "./serverroom"

import './dialogs.scss'
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

                    {
                        members.map((member) => {

                            return (
                                <div>
                                    {member.username}
                                    <button>
                                        remove
                                    </button>
                                </div>
                            )

                        })
                    }

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
export function JoinRequestsDialog() {
    const axios = useAxios()
    const [requests, setrequests] = useState([])
    const { setdialog, serverinfo } = useContext(servercontext)

    const initrequests = async () => {
        const response = await axios.get(`${baseURL}/${serverinfo.id}/requests`)
        setrequests(response.data)
    }

    useEffect(() => {
        initrequests()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (

        <Dialog>
            <div className="dialog" onClick={(e) => { e.stopPropagation() }}>
                <div className="dialog-header">
                    join request
                </div>

                <div className="dialog-content">

                    <div className="requests">

                        {

                            requests.map((r) => {

                                return (
                                    <div className="request">
                                        <button>accept</button>
                                        <button>decline</button>


                                    </div>
                                )

                            })

                        }
                    </div>

                </div>
            </div>
        </Dialog>


    )
}



export function ManageDialog() {
    const axios = useAxios()
    const { setdialog, serverinfo } = useContext(servercontext)
    return (


        <Dialog>
            <div className="dialog" onClick={(e) => { e.stopPropagation() }}>
                <div className="dialog-header">
                    Manage channel
                </div>

                <div className="dialog-content">
                    <div className="part">

                        <div className="form-group">
                            <div className="avatar">
                                <img src={baseURL + serverinfo.icon} alt={serverinfo.name} />
                            </div>
                            <div className="form-input">
                                <label> name</label>
                                <input type="text" placeholder="server name" defaultValue={serverinfo.name} />
                            </div>

                        </div>


                        <div className="form-input">
                            <label>description (optionnal)</label>
                            <input type="text" placeholder="server description" defaultValue={serverinfo.description} />
                        </div>

                    </div>


                    <div className="separator"></div>

                    <div className="part">


                        <div className="form-input">
                            <button onClick={() => setdialog(10)}>member</button>
                        </div>
                        <div className="form-input">
                            <button onClick={() => setdialog(11)}>administrator</button>
                        </div>
                        <div className="form-input">
                            <button onClick={() => setdialog(12)}>request</button>
                        </div>


                    </div>

                </div>
                <div className="dialog-footer">
                    <div>
                        <button className="save">save</button>
                        <button className="cancel">cancel</button>
                    </div>
                </div>

            </div>
        </Dialog>
    )
}


export function ServerInfoDialog() {
    const axios = useAxios()
    const [value, setvalue] = useState("")
    const { serverinfo, setdialog } = useContext(servercontext)


    return (
        <Dialog>

            <div className="dialog" onClick={(e) => { e.stopPropagation() }}>
                <div className="dialog-header">
                    informations
                </div>

                <div className="dialog-content">
                    <div>

                    </div>
                </div>
                <div className="form-input">
                    <input type="text" placeholder="name" onChange={(e) => setvalue(e.target.value)} />
                </div>
                <div className="form-input">

                </div>
            </div>
        </Dialog>


    )
}

