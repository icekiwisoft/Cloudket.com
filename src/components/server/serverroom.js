import { faFolder, faAdd, faRecycle, faFileLines, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import defaultback from '../../assets/defaultback.jpg'
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import foldericon from '../../assets/folder.png'
import texticon from '../../assets/text.png'
import videoicon from '../../assets/video.png'
import imageicon from '../../assets/image.png'
import wordicon from '../../assets/word.png'

import Player from "./videoplayer"



function Serverheader() {
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

      <form>
        <input type="search" placeholder="Search..." />
      </form>
    </div>
  )
}
export default function ServerRoom() {
  const fileshooserref = useRef(1)
  const { id, folderid } = useParams()
  const [folders, setfolders] = useState([])
  const [files, setfiles] = useState([])
  const [player, setplayer] = useState(0)

  const [serverinfo, setserverinfo] = useState({})
  const [context, setContext] = useState(false);
  const [foldercontext, setfoldercontext] = useState(-1);

  const [xYPosistion, setXyPosistion] = useState({ x: 0, y: 0 });

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
  };

  const [chosen, setChosen] = useState();
  const initMenu = (chosen) => {
    setChosen(chosen);
  };


  const update = (!folderid) ?
    async () => {
      const { data } = await axios.get(`http://localhost:8000/${id}`)
      console.log(data)
      setserverinfo(data)
      console.log(serverinfo)
      const folders = await axios.get(`http://localhost:8000/${id}/folders/${data.mainfolder}`)
      const files = await axios.get(`http://localhost:8000/${id}/folders/${data.mainfolder}/files`)

      setfiles(files.data)
      setfolders(folders.data)
    }
    :
    async () => {
      const folders = await axios.get(`http://localhost:8000/${id}/folders/${folderid}`)
      setfolders(folders.data)
      const files = await axios.get(`http://localhost:8000/${id}/folders/${folderid}/files`)
      setfiles(files.data)
    }

  useEffect(() => {
    update()
  }, [id, folderid])

  const newfolder = async () => {

    await axios.post(`http://127.0.0.1:8000/${id}/folders/create`, {
      parent: folderid || serverinfo.mainfolder
    })
    update()
  }


  const newfile = async () => {
    let formData = new FormData();
    var file = new Blob(["hello  j'ai des enfant"], { type: "text/plain" });
    formData.append("file", file)
    formData.append("name", "new file")
    formData.append("folder", folderid || serverinfo.mainfolder)


    await axios.post(`http://127.0.0.1:8000/${id}/files/create`,
      formData)

    update()
  }


  console.log(files)
  const uploadfile = async (e) => {
    console.log("ok")

    let formData = new FormData();

    formData.append("file", e.target.files[0])
    formData.append("name", "video")
    formData.append("folder", folderid || serverinfo.mainfolder)

    await axios({
      url: `http://127.0.0.1:8000/${id}/files/create`,
      method: "POST",
      Headers: {
        authorization: "token"
      },
      data: formData


    })


    update()
  }


  const uploadfolder = async () => {



  }

  const deletefolder = async (folder) => {

    await axios.delete(`http://127.0.0.1:8000/${id}/folders/${folder}`)
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


  return (
    <div className="room" onClick={hideContext} style={{ backgroundImage: `url(${defaultback})` }}  >
      <Serverheader />
      <div className="roomdata" onContextMenu={showcontext} >
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
          files.map(f => {

            var icon

            if (f.type.includes("video")) {
              icon = videoicon
            }
            else if (f.type.includes("image")) {
              icon = imageicon
            }
            else if (f.type.includes("word")) {
              icon = imageicon
            }
            else {
              icon = texticon
            }
            return (
              <a href="#" className="data" onClick={() => { download("http://localhost:8000" + f.file, f.name) }}>
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
            <div className="menuElement" onClick={() => initMenu("updfolder")}>
              upload folder
            </div>
            <div className="menuElement" onClick={() => { fileshooserref.current.click() }}>
              upload file
            </div>
            <div className="menuElement" onClick={newfile}>
              new file
            </div>
            <div className="menuElement" onClick={() => initMenu("Paste")}>
              Paste
            </div>
          </div>
        )}

        {foldercontext != -1 && (
          <div
            style={{ top: xYPosistion.y, left: xYPosistion.x }}
            className="contextmenu"
          >
            <div className="menuElement" onClick={(e) => { deletefolder(foldercontext); console.log(foldercontext) }}>
              delete
            </div>
            <div className="menuElement" onClick={() => initMenu("updfolder")}>
              cut
            </div>
            <div className="menuElement" onClick={() => initMenu("updfile")}>
              rename
            </div>
            <div className="menuElement" onClick={() => initMenu("Paste")}>
              detail
            </div>
          </div>
        )}

        <div>

          <input type="file" style={{ display: "none" }} onChange={uploadfile} ref={fileshooserref} />


        </div>

      </div>


      {
        (player != -1) && (
          <Player files={files} file={player} setfile={setplayer} />
        )
      }
    </div>
  )
}