import React, { createContext, useCallback, useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useAxios, { baseURL } from "../../../utils/useAxios"
import ServerManager from "../ManageServer"
import Player from "../player/player"
import { getitemicon } from "../utils"
import Serverheader from "./ServerHeader/ServerHeader"
import './serverroom.scss'


function RenameDialog(props) {
  const axios = useAxios()
  const { serverid, renameobject, setrenameobject, setrenamedialog } = props
  const [value, setvalue] = useState("")
  console.log("file :" + renameobject.id)
  const handleclose = () => {
    setrenameobject({})
  }
  return (
    <div className="dialog-wrapper" onClick={handleclose}>
      <div className="dialog" onClick={(e) => { e.stopPropagation() }}>

        <div className="form-input">
          <input type="text" placeholder="name" onChange={(e) => setvalue(e.target.value)} />
        </div>
        <div className="form-input">
          <button onClick={() => setrenameobject(value)}> rename</button>

        </div>
      </div>
    </div>
  )
}



export const servercontext = createContext<any>(null);


export default function ServerRoom(props): React.ReactElement {
  const { setsearchitem } = props

  const fileshooserref = useRef<HTMLInputElement>(null)

  const { id, folderid } = useParams()

  const [manager, setmanager] = useState(false)
  const [items, setitems] = useState<ServerItem[]>([])
  const [itemdetail, setitemdetail] = useState()
  const [player, setplayer] = useState<number | null>(null)
  const [userserverinfo, setuserserverinfo] = useState({})
  const [serverinfo, setserverinfo] = useState<Server | null>(null)
  const [itemcontext, setitemcontext] = useState<ServerItem | null>(null);
  const [renameobject, setrenameobject] = useState<ServerItem | null>(null)
  const [xYPosistion, setXyPosistion] = useState({ x: 0, y: 0 });
  const axios = useAxios()


  const setrenamedialog = async (name) => {
    let url = (renameobject!.file) ?
      `${baseURL}/${id}/files/${renameobject?.id}`
      :

      `${baseURL}/${id}/folders/${renameobject?.id}`
    axios.patch(url, {
      name: name
    })

    setrenameobject(null)
    update()

  }
  //show itemcontext menu
  const showitemcontext = (event, item) => {
    event.preventDefault();
    setitemcontext(null);

    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    setXyPosistion(positionChange);
    setitemcontext(item);
  };
  const hideContext = (event) => {
    setitemcontext(null);
  };

  //get authenticated user information for selected server
  const updateuserserverinfo = useCallback(() => {

    if (id)
      axios.get(`${baseURL}/${id}/userinfo`).then(result => {
        setuserserverinfo(result.data)

      })

  }, [])

  const update = async () => {


    const { data } = await axios.get(`${baseURL}/${id}`)
    setserverinfo(data)
    if (userserverinfo) {
      const items = await axios.get(`${baseURL}/${id}/items${(folderid) ? "?parent=" + folderid : ''}`)
      setitems(items.data)

    }

  }

  useEffect(() => {
    if (id)
      update()
  }, [userserverinfo, folderid])


  useEffect(() => {
    updateuserserverinfo()
  }
    , [id]
  )

  //create a new folder 
  const newfolder = async () => {

    console.log(folderid)
    const response = await axios.post(`${baseURL}/${id}/folders/create`, {
      parent: folderid
    })
    if (response.status === 201)
      setitems([...items, response.data])
  }
  //create a new file 
  const newfile = async () => {
    let formData = new FormData();
    let file = new Blob(["hello  j'ai des enfant"], { type: "text/plain" });
    formData.append("file", file)
    formData.append("name", "new file")
    formData.append("parent", (folderid || -1).toString())

    const response = await axios.post(`${baseURL}/${id}/files/create`, formData)
    if (response.status === 201)
      setitems([...items, response.data])

  }

  //upload file to  server
  const uploadfile = async (e) => {
    let formData = new FormData();
    console.log(e.target.files[0])
    formData.append("file", e.target.files[0])
    formData.append("name", e.target.files[0].name)
    formData.append("parent", (folderid || -1).toString())

    const response = await axios.post(`${baseURL}/${id}/files/create`, formData)
    if (response.status === 201)
      setitems([...items, response.data])

  }
  //upload a folder to server
  const uploadfolder = async () => { }

  //delete server item ()file
  const deleteitem = async () => {
    let response

    if (itemcontext!.type === "file")
      response = await axios.delete(`${baseURL}/${id}/files/${itemcontext!.id}`)
    else
      response = await axios.delete(`${baseURL}/${id}/folders/${itemcontext!.id}`)


    setitems(items.filter(i => i != itemcontext))
  }

  const rename = () => {
    setrenameobject(itemcontext)
  }


  //cut a folder
  const cutfolder = async () => { }


  //paste a folder
  const pastefolder = async () => {

  }


  const download = async () => {

    if (itemcontext) {
      const file = await axios.get(`${baseURL}/${id}/files/${itemcontext}`)
      console.log(file.data)
      const response = await axios(
        {
          url: `${baseURL}` + file.data.file, //your url
          method: 'GET',
          responseType: 'blob', // important
        }
      )
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', file.data.name); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  }

  //join a  current server
  const joinserver = async () => {
    await axios.get(`${baseURL}/${id}/join`)
    updateuserserverinfo()
  }

  //quit a server
  const quitserver = async () => {
    await axios.delete(`${baseURL}/${id}/userinfo`)

  }
  const CONTEXTVALUE = {
    serverinfo: serverinfo,
    setmanager: setmanager,
  }


  console.log(items)
  return (
    <servercontext.Provider value={CONTEXTVALUE}>
      <div className="room light" onClick={hideContext}  >
        {!serverinfo ?
          (<h3 className="nos">please choose a channel before continue</h3>)
          :
          (<>
            <Serverheader setsearchfolder={setsearchitem} />
            <div className="roommain" onContextMenu={(e) => 0}>
              <div className="roomdata"  >
                {
                  items.map((item, i) => {
                    const icon = getitemicon(item)

                    return (
                      <Link data-item-id={i} onContextMenu={(e) => showitemcontext(e, item)} key={i} className="data" to={'/' + id + '/' + item.id} >
                        <img src={icon} width={56} alt={item.name} />
                        <span className="name">{item.name}</span>
                      </Link>
                    )
                  })
                }

                {itemcontext && (
                  <div
                    style={{ top: xYPosistion.y, left: xYPosistion.x }}
                    className="contextmenu"
                  >
                    <div className="menuElement" onClick={newfolder}>
                      new folder
                    </div>
                    <div className="menuElement" >
                      upload folder
                    </div>
                    <div className="menuElement" onClick={() => { fileshooserref.current!.click() }}>
                      upload file
                    </div>
                    <div className="menuElement" onClick={newfile}>
                      new file
                    </div>
                    <div className="menuElement" >
                      Paste
                    </div>
                  </div>
                )}

                {itemcontext && (
                  <div
                    style={{ top: xYPosistion.y, left: xYPosistion.x }}
                    className="contextmenu"
                  >
                    <div className="menuElement" onClick={(e) => { deleteitem() }}>
                      delete
                    </div>
                    <div className="menuElement" >
                      cut
                    </div>
                    <div className="menuElement" onClick={rename}>
                      rename
                    </div>

                    <div className="menuElement" onClick={() => download()}>
                      download
                    </div>
                  </div>
                )}

                <div>
                  <input type="file" style={{ display: "none" }} onChange={uploadfile} ref={fileshooserref} />
                </div>
              </div>
              {renameobject && (< RenameDialog renameobject={renameobject} setrenameobject={setrenamedialog} serverid={id} />)}
            </div>
            <div className="bottombar">
              {
                !userserverinfo ? (
                  <button className="join" onClick={joinserver}>{serverinfo!.type === 0 ? " Join Server" : "request to join"}</button>) :
                  (
                    <button className="quit" onClick={quitserver}>quit Server</button>)
              }
            </div>
            {
              (player !== null) &&
              (items.length > 0 && (
                <Player files={items} file={player} setfile={setplayer} />
              )
              )
            }
          </>
          )}
      </div>
      {
        manager && <ServerManager />

      }
    </servercontext.Provider>

  )
}