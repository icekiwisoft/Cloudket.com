import { faFolder, faAdd, faRecycle, faFileLines, faFolderOpen, faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createContext, useEffect, useRef, useState } from "react"
import defaultback from '../../assets/defaultback.jpg'
import { Link, useParams } from "react-router-dom"
import foldericon from '../../assets/folder.png'
import texticon from '../../assets/text.png'
import videoicon from '../../assets/video.png'
import imageicon from '../../assets/image.png'
import wordicon from '../../assets/word.png'

import useAxios, { baseURL } from "../../utils/useAxios"
import Serverheader from "./serverheader"
import { AdminsDialog, JoinRequestsDialog, ManageDialog, MembersDialog, ServerInfoDialog } from "./dialogs"
import Player from "./player/player"





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


const DIALOGS = [ServerInfoDialog, ManageDialog]

export const servercontext = createContext();


export default function ServerRoom(props) {
  const fileshooserref = useRef(1)

  const [dialog, setdialog] = useState(null)
  const { id, folderid } = useParams()
  const [folders, setfolders] = useState([])
  const [folderdetail, setfolderdetail] = useState()
  const [files, setfiles] = useState([])
  const [player, setplayer] = useState(-1)
  const [userserverinfo, setuserserverinfo] = useState({})
  const [serverinfo, setserverinfo] = useState({})
  const [context, setContext] = useState(false);
  const [foldercontext, setfoldercontext] = useState(-1);
  const [filecontext, setfilecontext] = useState(-1);
  const [renameobject, setrenameobject] = useState({})
  const { setsearchfolder } = props


  const [xYPosistion, setXyPosistion] = useState({ x: 0, y: 0 });
  const axios = useAxios()
  const showfoldercontext = (event, folderid) => {
    event.preventDefault();
    setContext(false);
    console.log(folderid);

    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    setXyPosistion(positionChange);
    setfoldercontext(folderid);
  };
  const setrenamedialog = async (name) => {
    let url = (renameobject.file) ?
      `${baseURL}/${id}/files/${renameobject.id}`
      :

      `${baseURL}/${id}/folders/${renameobject.id}`
    axios.patch(url, {
      name: name
    })

    setrenameobject({})
    update()

  }

  const showfilecontext = (event, fileid) => {
    event.preventDefault();
    setContext(false);

    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    setXyPosistion(positionChange);
    setfilecontext(fileid);
    console.log(fileid)
  };

  const showcontext = (event) => {
    event.preventDefault();
    setContext(false);

    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    setXyPosistion(positionChange);
    setContext(true);
  };
  const hideContext = (event) => {
    setContext(false);
    setfoldercontext(-1)
    setfilecontext(-1)
  };

  const [detail, setdetail] = useState(undefined);
  const getdetail = async (f) => {
    const folder = await axios.get(`${baseURL}/${id}/folders/${f}`)

    setdetail(folder.data)

  }

  const updateuserserverinfo = () => {
    axios.get(`${baseURL}/${id}/userinfo`).then(result => {
      setuserserverinfo(result.data)

      console.log(result.data)
    })

  }

  useEffect(() => {
    updateuserserverinfo()
  }
    , [id]
  )

  const update =
    async () => {
      const { data } = await axios.get(`${baseURL}/${id}`)
      setserverinfo(data)
      console.log(`server info :`, data)
      console.log("user server info :", userserverinfo)


      if (userserverinfo.role) {
        const folders = await axios.get(`${baseURL}/${id}/folders${(folderid) ? "?parent=" + folderid : ''}`)
        setfolders(folders.data)
        const files = await axios.get(`${baseURL}/${id}/files${(folderid) ? "?parent=" + folderid : ''}`)
        if (folderid) {
          const folder = await axios.get(`${baseURL}/${id}/folders/${folderid}`)
          setfolderdetail(folder.data)
          console.log(folder.data)
        }


        setfiles(files.data)

      }

      else {
        setfolders([])
        setfiles([])

      }



    }

  useEffect(() => {

    update()
  }, [userserverinfo, folderid])

  const newfolder = async () => {

    console.log(folderid)
    await axios.post(`${baseURL}/${id}/folders/create`, {
      parent: folderid
    })
    update()
  }


  const newfile = async () => {
    let formData = new FormData();
    var file = new Blob(["hello  j'ai des enfant"], { type: "text/plain" });
    formData.append("file", file)
    formData.append("name", "new file")
    formData.append("parent", folderid || -1)


    await axios.post(`${baseURL}/${id}/files/create`,
      formData)

    update()
  }


  const uploadfile = async (e) => {

    let formData = new FormData();
    console.log(e.target.files[0])
    formData.append("file", e.target.files[0])
    formData.append("name", e.target.files[0].name)
    formData.append("parent", folderid || -1)

    await axios.post(`${baseURL}/${id}/files/create`, formData)


    update()
  }


  const uploadfolder = async () => {



  }

  const deleteitem = async () => {


    (foldercontext != -1) ? await axios.delete(`${baseURL}/${id}/folders/${foldercontext}`) : await axios.delete(`${baseURL}/${id}/files/${filecontext}`)
    update()
  }


  const rename = () => {
    console.log(foldercontext || filecontext)
    setrenameobject({ id: (foldercontext !== -1) ? foldercontext : filecontext, file: filecontext !== -1 })

  }


  const cutfolder = async () => {

  }



  const pastefolder = async () => {

  }


  const download = async () => {

    if (filecontext) {
      const file = await axios.get(`${baseURL}/${id}/files/${filecontext}`)
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

  const joinserver = async () => {
    await axios.get(`${baseURL}/${id}/join`)
    updateuserserverinfo()
  }

  const quitserver = async () => {
    await axios.delete(`${baseURL}/${id}/userinfo`)
    updateuserserverinfo()
  }

  console.log(serverinfo)
  const CONTEXTVALUE = {
    serverinfo: serverinfo,
    setdialog: setdialog,
  }

  function getdialog() {
    switch (dialog) {
      case 0:
        return <ServerInfoDialog />
      case 1:
        return <ManageDialog />
      case 10:
        return <MembersDialog />
      case 11:
        return <AdminsDialog />
      case 12:
        return <JoinRequestsDialog />


      default:
        break
    }
  }


  return (
    <servercontext.Provider value={CONTEXTVALUE}>
      <div className="room light" onClick={hideContext}  >
        {!serverinfo.name ?
          (<h3 className="nos">please choose a channel before continue</h3>)
          :
          (<>
            <Serverheader setsearchfolder={setsearchfolder} />
            <div className="roommain" onContextMenu={showcontext}>
              <div className="roomdata"  >
                {
                  folders.map(f => {

                    return (
                      <Link onContextMenu={(e) => { showfoldercontext(e, f.id) }} className="data" to={'/' + id + '/' + f.id}>
                        <img src={foldericon} width={56} alt={f.name} />
                        <span className="name">{f.name}</span>
                      </Link>

                    )
                  })


                }

                {

                  files.map((f, i) => {

                    var icon

                    if (f.type.includes("video") | f.type.includes("image")) {
                      icon = baseURL + f.thumbnail
                    }

                    else if (f.type.includes("word")) {
                      icon = wordicon
                    }
                    else {
                      icon = texticon
                    }
                    return (
                      <a href="#" className="data" onContextMenu={(e) => { showfilecontext(e, f.id) }} onClick={() => { setplayer(i) }}>
                        <img src={icon} width={56} alt={f.name} />
                        <span className="name">{f.name}</span>
                      </a>

                    )
                  })


                }



                {context && (
                  <div
                    style={{ top: xYPosistion.y, left: xYPosistion.x }}
                    className="contextmenu"
                  >
                    <div className="menuElement" onClick={newfolder}>
                      new folder
                    </div>
                    <div className="menuElement" onClick={'() => initMenu("updfolder")'}>
                      upload folder
                    </div>
                    <div className="menuElement" onClick={() => { fileshooserref.current.click() }}>
                      upload file
                    </div>
                    <div className="menuElement" onClick={newfile}>
                      new file
                    </div>
                    <div className="menuElement" onClick={''}>
                      Paste
                    </div>
                  </div>
                )}

                {(foldercontext !== -1 || filecontext !== -1) && (
                  <div
                    style={{ top: xYPosistion.y, left: xYPosistion.x }}
                    className="contextmenu"
                  >
                    <div className="menuElement" onClick={(e) => { deleteitem() }}>
                      delete
                    </div>
                    <div className="menuElement" onClick={''}>
                      cut
                    </div>
                    <div className="menuElement" onClick={rename}>
                      rename
                    </div>
                    <div className="menuElement" onClick={() => getdetail()}>
                      detail
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

              {renameobject.id && (< RenameDialog renameobject={renameobject} setrenameobject={setrenamedialog} serverid={id} />)}
            </div>


            <div className="bottombar">
              {
                !userserverinfo.role ? (
                  <button className="join" onClick={joinserver}>{serverinfo.type === 0 ? " Join Server" : "request to join"}</button>) :
                  (
                    <button className="quit" onClick={quitserver}>quit Server</button>)


              }
            </div>




            {
              (player !== -1) &&
              (files.length > 0 && (
                <Player files={files} file={player} setfile={setplayer} />
              )
              )
            }
          </>
          )}
      </div>
      {
        (
          getdialog()
        )

      }


    </servercontext.Provider>

  )
}