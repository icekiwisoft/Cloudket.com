import { faFolder, faAdd, faRecycle, faFileLines, faFolderOpen, faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import defaultback from '../../assets/defaultback.jpg'
import { Link, useParams } from "react-router-dom"
import dayjs from "dayjs"
import foldericon from '../../assets/folder.png'
import texticon from '../../assets/text.png'
import videoicon from '../../assets/video.png'
import imageicon from '../../assets/image.png'
import wordicon from '../../assets/word.png'

import Player from "./videoplayer"
import useAxios from "../../utils/useAxios"



function Serverheader({ setsearchfolder }) {
  const [crttime, setcrttime] = useState("")

  window.setInterval(() => {
    var today = new Date(),

      curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    setcrttime(curTime);
  }, 1000)
  return (
    <div className="serverheader">
      <span style={{ color: "white" }}>
        {crttime}
      </span>

      <div className="tools">
        <button><FontAwesomeIcon size="2x" icon={faSearch} onClick={() => setsearchfolder(true)} /></button>
        <button><FontAwesomeIcon size="2x" icon={faEllipsisVertical} /></button>
      </div>
    </div>
  )
}


function RenameDialog(props) {
  const [crttime, setcrttime] = useState("")


  return (
    <div className="dialog-wrapper">
      <div className="dialog">

      </div>
    </div>
  )
}



function CreateServerDialog(props) {
  const [crttime, setcrttime] = useState("")


  return (
    <div className="dialog-wrapper">
      <div className="dialog">

      </div>
    </div>
  )
}
export default function ServerRoom(props) {
  const fileshooserref = useRef(1)
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
    const folder = await axios.get(`http://localhost:8000/${id}/folders/${f}`)

    setdetail(folder.data)

  }

  const updateuserserverinfo = () => {
    axios.get(`http://localhost:8000/${id}/userinfo`).then(result => {
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
      const { data } = await axios.get(`http://localhost:8000/${id}`)
      setserverinfo(data)
      const folders = await axios.get(`http://localhost:8000/${id}/folders${(folderid) ? "?parent=" + folderid : ''}`)
      setfolders(folders.data)
      const files = await axios.get(`http://localhost:8000/${id}/files${(folderid) ? "?parent=" + folderid : ''}`)
      if (folderid) {
        const folder = await axios.get(`http://localhost:8000/${id}/folders/${folderid}`)
        setfolderdetail(folder.data)
        console.log(folder.data)
      }

      setfiles(files.data)


    }

  useEffect(() => {

    update()
  }, [id, folderid])

  const newfolder = async () => {

    console.log(folderid)
    await axios.post(`http://127.0.0.1:8000/${id}/folders/create`, {
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


    await axios.post(`http://127.0.0.1:8000/${id}/files/create`,
      formData)

    update()
  }


  const uploadfile = async (e) => {

    let formData = new FormData();
    console.log(e.target.files[0])
    formData.append("file", e.target.files[0])
    formData.append("name", e.target.files[0].name)
    formData.append("parent", folderid || -1)

    await axios.post(`http://127.0.0.1:8000/${id}/files/create`, formData)


    update()
  }


  const uploadfolder = async () => {



  }

  const deleteitem = async () => {


    (foldercontext != -1) ? await axios.delete(`http://127.0.0.1:8000/${id}/folders/${foldercontext}`) : await axios.delete(`http://127.0.0.1:8000/${id}/files/${filecontext}`)
    update()
  }


  const renamefolder = async () => {

  }


  const cutfolder = async () => {

  }

  const pastefolder = async () => {

  }


  const download = async (downloadurl, name) => {

    console.log(downloadurl)
    const response = await axios(
      {
        url: downloadurl, //your url
        method: 'GET',
        responseType: 'blob', // important
      }
    )

    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', name); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  const joinserver = async () => {
    await axios.get(`http://localhost:8000/${id}/join`)
    updateuserserverinfo()
  }

  const quitserver = async () => {
    await axios.delete(`http://localhost:8000/${id}/userinfo`)
    updateuserserverinfo()
  }

  console.log(serverinfo.icon)
  return (
    <div className="room light" onClick={hideContext}  >
      <Serverheader setsearchfolder={setsearchfolder} />
      <div className="roommain" >
        <div className="xxx" onContextMenu={showcontext}>
          <div className="roomdata"  >
            {
              folders.map(f => {

                return (
                  <Link onContextMenu={(e) => { showfoldercontext(e, f.id) }} className="data" to={'/' + id + '/' + f.id}>
                    <img src={foldericon} width={64} alt={f.name} />
                    <span className="name">{f.name}</span>
                  </Link>

                )
              })


            }

            {

              files.map((f, i) => {

                var icon

                if (f.type.includes("video")) {
                  icon = videoicon
                }
                else if (f.type.includes("image")) {
                  icon = imageicon
                }
                else if (f.type.includes("word")) {
                  icon = wordicon
                }
                else {
                  icon = texticon
                }
                return (
                  <a href="#" className="data" onContextMenu={(e) => { showfilecontext(e, f.id) }} onClick={() => { setplayer(i) }}>
                    <img src={icon} width={64} alt={f.name} />
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
                <div className="menuElement" onClick={''}>
                  rename
                </div>
                <div className="menuElement" onClick={() => getdetail(foldercontext)}>
                  detail
                </div>
              </div>
            )}

            <div>

              <input type="file" style={{ display: "none" }} onChange={uploadfile} ref={fileshooserref} />


            </div>

          </div>

          <div className="bottombar">
            {
              !userserverinfo.role ? (
                <button className="join" onClick={joinserver}>Join Server</button>) :
                (
                  <button className="quit" onClick={quitserver}>quit Server</button>)


            }
          </div>
        </div>

        <div className="details">
          {
            folderdetail ?
              (
                <>


                  <img src={foldericon} alt="folder" />

                  <div className="informations">
                    <span>name : <i>{folderdetail.name}</i></span>
                    <span> creation date: <i>{dayjs(folderdetail.creationdate).format('YYYY-MM-DD')}</i></span>
                    <span>author : <i>{folderdetail.author.username}</i></span>
                    <span></span>
                  </div>
                </>

              )

              :
              (
                <>


                  <img src={"http://127.0.0.1:8000" + serverinfo.icon} alt="folder" />

                  <div className="informations">
                    <span>name : <i>{serverinfo.name}</i></span>
                    <span> creation date: <i>{dayjs(serverinfo.creationdate).format('YYYY-MM-DD')}</i></span>
                    <span></span>
                  </div>
                </>

              )
          }

        </div>
      </div>




      {
        (player !== -1) &&
        (files.length > 0 && (
          <Player files={files} file={player} setfile={setplayer} />
        )
        )
      }
    </div>
  )
}