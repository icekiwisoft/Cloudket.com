import { useContext, useEffect, useState } from "react"
import { servercontext } from "./serverroom"
import useAxios, { baseURL } from "../../utils/useAxios"
import { ServerAvatar, UserAvatar } from "./utils"
import "./manageserver.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
function ServerMembers() {

    const axios = useAxios()
    const [members, setmembers] = useState([])

    const { serverinfo } = useContext(servercontext)

    const initmembers = async () => {
        const response = await axios.get(`${baseURL}/${serverinfo.id}/members`)
        setmembers(response.data)
    }


    const addmember = async () => {
        const response = await axios.patch(`${baseURL}/${serverinfo.id}`, {

        })
    }


    const removemember = async () => {
        const response = await axios.patch(`${baseURL}/${serverinfo.id}`, {

        })
    }
    useEffect(() => {
        initmembers()
    }, [])


    return (
        <div className="members">
            {
                members.map((member) => {

                    return (
                        <div>
                            <UserAvatar user={member} />
                            <span>{member.username}</span>

                            <button>
                                remove
                            </button>
                        </div>
                    )

                })
            }
        </div>
    )
}

function ServerRequests() {

    const axios = useAxios()
    const [requests, setrequests] = useState([])
    const { serverinfo } = useContext(servercontext)

    const initrequests = async () => {
        const response = await axios.get(`${baseURL}/${serverinfo.id}/requests`)
        setrequests(response.data)
    }


    const deleterequest = async () => {
        const response = await axios.patch(`${baseURL}/${serverinfo.id}`, {

        })
    }

    const removerequest = async () => {
        const response = await axios.patch(`${baseURL}/${serverinfo.id}`, {

        })
    }


    useEffect(() => {
        initrequests()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (

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
    )
}
function ServerInfo() {

    const { serverinfo } = useContext(servercontext)
    const axios = useAxios()
    const [name, setname] = useState(serverinfo.name)
    const [description, setdescription] = useState(serverinfo.description)


    const update = async () => {
        const response = await axios.patch(`${baseURL}/${serverinfo.id}/`, {
            name: name,
            description: description
        })
    }

    const handlenamechange = (e) => {
        setname(e.target.value)
    }

    const handledescriptionchange = (e) => {
        setdescription(e.target.value)
    }
    return (
        <>

            <div className="serverinfosettings">
                <div className="form-group">
                    <ServerAvatar server={serverinfo} />
                    <div className="form-input">
                        <label> name</label>
                        <input type="text" placeholder="server name" name="name" onChange={handlenamechange} defaultValue={serverinfo.name} />
                    </div>

                </div>


                <div className="form-input">
                    <label>description (optionnal)</label>
                    <input type="text" placeholder="server description" onChange={handledescriptionchange} defaultValue={serverinfo.description} />
                </div>



                <div className="separator"></div>



                <div className="form-input">
                    <button >member</button>
                </div>
                <div className="form-input">
                    <button>administrator</button>
                </div>
                <div className="form-input">
                    <button >request</button>
                </div>
            </div>



            <div className="save">
                <span>do you want to save your modification</span>
                <div>
                    <button onClick={update}>save</button>
                </div>
            </div>
        </>


    )
}

function ManageServerSideBar({ setoption, option, serverinfo }) {
    return (
        <aside>

            <div className="menu">
                <span>{serverinfo.name}</span>
                <ul>
                    <li>
                        <button onClick={() => setoption(0)} className={option === 0 ? "active" : ""}>info</button>
                    </li>
                    <li>
                        <button onClick={() => setoption(1)} className={option === 1 ? "active" : ""}>members</button>
                    </li>
                    <li>
                        <button onClick={() => setoption(2)} className={option === 2 ? "active" : ""}>requests</button>
                    </li>
                    <li>
                        <button onClick={() => setoption(3)} className={option === 3 ? "active" : ""}>administrator</button>
                    </li>
                </ul>
            </div>

        </aside>
    )

}
export default function ServerManager() {
    const { serverinfo, setmanager } = useContext(servercontext)
    const [option, setoption] = useState(0)

    const getsettings = () => {
        switch (option) {
            case 0:
                return <ServerInfo />
            case 1:
                return <ServerMembers />
            case 2:
                return <ServerRequests />
            default:
                break;
        }
    }
    return (
        <div className="servermanager">

            <ManageServerSideBar serverinfo={serverinfo} setoption={setoption} option={option} />
            <div className="currentmanager">
                {getsettings()}
            </div>
            <button className="closebutton" onClick={() => setmanager(false)}>

                <FontAwesomeIcon icon={faClose} size="2x" />
            </button>
        </div>
    )
}