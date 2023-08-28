import { faAdd, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import foldericon from '../../assets/folder.png'
import texticon from '../../assets/text.png'
import videoicon from '../../assets/video.png'
import imageicon from '../../assets/image.png'
import wordicon from '../../assets/word.png'
import nothing from '../../assets/nothing.png'

import { useContext, useEffect, useRef, useState } from "react"
import { Link, NavLink, useNavigate, useParams } from "react-router-dom"
import { motion, useCycle } from "framer-motion"
import useAxios, { baseURL } from "../../utils/useAxios"
import AuthContext from "../../context/authcontext"

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }) => (
  <button onClick={toggle}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        stroke={"strokecolor"}
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        stroke={"strokecolor"}
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        stroke={"strokecolor"}
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);


export const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const itemvariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    },
    display: "flex"
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    },
    transitionEnd: {
      display: "none"
    }
  }
};

function CreateServerDialog({ setaddserver }) {
  const axios = useAxios()
  const [name, setname] = useState("")

  const handleclose = (e) => {
    e.stopPropagation()
    setaddserver(false)
  }
  const createserver = async () => {

    axios.post("${baseURL}/", {
      name: name
    })

    setaddserver(false)
  }
  return (
    <div className="dialog-wrapper" onClick={handleclose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>

        <div className="form-input">
          <input type="text" placeholder="name" onChange={(e) => setname(e.target.value)} />

        </div>

        <div className="form-input">
          <button onClick={createserver}> add server</button>

        </div>
      </div>
    </div>
  )
}


function UserMenu() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = { height: 100 }
  const navigate = useNavigate()
  let { changetheme, theme } = useContext(AuthContext);
  const [addserver, setaddserver] = useState(false)
  return (
    <> <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className="background" variants={sidebar} />
      < MenuToggle toggle={() => toggleOpen()} />
      <motion.ul variants={variants}>

        <motion.li
          variants={itemvariants}
          whileTap={{ scale: 0.95 }}
        >
          <div className="icon-placeholder" />
          <div className="text-placeholder"  >settings</div>
        </motion.li>
        <motion.li
          variants={itemvariants}
          whileTap={{ scale: 0.95 }}
        >
          <div className="icon-placeholder" />
          <div className="text-placeholder" onClick={() => { setaddserver(true); toggleOpen() }}>new server</div>
        </motion.li>

        <motion.li
          variants={itemvariants}
          whileTap={{ scale: 0.95 }}
          onClick={changetheme}
        >
          <div className="icon-placeholder" />
          <div className="text-placeholder"  >switch to {(theme) ? "dark theme" : "light theme"}</div>
        </motion.li>

        <motion.li
          onClick={() => { navigate("/logout") }}
          variants={itemvariants}
          whileTap={{ scale: 0.95 }}
        >
          <div className="icon-placeholder" />
          <div className="text-placeholder"    >log out</div>
        </motion.li>

      </motion.ul>

    </motion.nav>
      {(addserver) && <CreateServerDialog setaddserver={setaddserver} />}

    </>

  );
}

function FolderNavigation(props) {
  const [folderlist, setfolderlist] = useState([])
  const [filelist, setfilelist] = useState([])
  const [searchvalue, setsearchvalue] = useState("")
  const [serverinfo, setserverinfo] = useState({})
  const { id } = useParams()
  const axios = useAxios()
  const { setsearchfolder } = props


  const onsearchvalue = e => {

    let val = e.target.value
    let par = new Object()

    if (val.search(":") != -1) {
      let entry = val.split(" ")
      for (let e of entry) {
        let i = e.split(":")
        if (i.length == 2)
          par[i[0]] = i[1]
      }

    }
    else {
      par["name"] = val
    }

    console.log(par)
    setsearchvalue(e.target.value)
    axios.get(`${baseURL}/${id}/folders`, {
      params: par
    }).then(result => {
      setfolderlist(result.data)
    })

    axios.get(`${baseURL}/${id}/files`, {
      params: par
    }).then(result => {
      setfilelist(result.data)
    })

  }



  const update =
    async () => {
      const { data } = await axios.get(`${baseURL}/${id}`)
      setserverinfo(data)

    }

  useEffect(() => {
    update()
  }, [])
  return (
    <div className="searchfolder">
      <header>
        <form>
          <input type="text" placeholder="Search..." onChange={onsearchvalue} />
        </form>
      </header>

      <div className="serverinsearch">
        <div className="item f">
          <img src={`${baseURL} + ${serverinfo.icon}`} />
          <div className="info">
            <h3>{serverinfo.name}</h3>
            <span>{serverinfo.shortdesc}</span>
          </div>
          <button onClick={() => setsearchfolder(false)}>
            <svg width="23" height="23" viewBox="0 0 23 23">
              <Path
                stroke={"strokecolor"}
                d="M 3 16.5 L 17 2.5"

              />

              <Path
                stroke={"strokecolor"}

                d="M 3 2.5 L 17 16.346"
              />
            </svg>
          </button>
          <div>
          </div>
        </div>
      </div>
      <div className="label">
        <h2>Found</h2>
      </div>
      <div className="folderlist">

        {
          folderlist.map((f) => {

            return (
              <NavLink to={`/${id}/${f.id}`} className="item f">
                <img src={foldericon} />
                <div className="info">
                  <h3>{f.name}</h3>
                  <span>{f.author.username}</span>
                </div>
                <div>
                </div>
              </NavLink>
            )
          })
        }


        {
          filelist.map((f) => {



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
              <NavLink to={`/${id}/${f.id}`} className="item f">
                <img src={icon} />
                <div className="info">
                  <h3>{f.name}</h3>
                  <span>{f.author.username}</span>
                </div>
                <div>
                </div>
              </NavLink>
            )
          })
        }

      </div>
    </div>
  )
}

export default function ServerNavigation(props) {
  const axios = useAxios()
  const [servers, setservers] = useState([])
  const [searchvalue, setsearchvalue] = useState("")
  const [searchserver, setsearchserver] = useState([])
  const { searchfolder, setsearchfolder } = props
  console.log(searchfolder)
  const update = async () => {
    const servers = await axios.get(`${baseURL}/accounts/current/servers`)

    setservers(servers.data)

  }



  const onsearchvalue = e => {
    setsearchvalue(e.target.value)
    axios.get(`${baseURL}?name=${e.target.value}`).then(result => {
      setsearchserver(result.data)
    })

  }



  useEffect(() => {
    update()
  }, [searchvalue])
  return (
    <div className="sidebar">
      <header>
        <UserMenu />
        <form>
          <input type="text" placeholder="Search..." onChange={onsearchvalue} />
        </form>
      </header>

      <div className="serverlist">
        {searchvalue === "" ?
          (
            servers.length > 0 ?
              servers.map((s) => {
                var charcode = s.name.toLowerCase().charCodeAt(0)
                var color;

                if (charcode <= 102)
                  color = "#219642"
                else if (charcode <= 116)
                  color = "#0063c0"
                else if (charcode <= 120)
                  color = "green"
                else
                  color = "#F85528"
                console.log(`charcode ${charcode}`)

                return (
                  <NavLink to={`/${s.id}`} className="item">
                    <div className="avatar">
                      {
                        s.icon ?
                          (<img src={baseURL + s.icon} alt="o" />) :


                          (<div className="avatar-img default" style={{ backgroundColor: color }}>
                            {s.name[0]}
                          </div>)



                      }                  </div>

                    <div className="info">
                      <h3>{s.name}</h3>
                      <span>{s.shortdesc}</span>
                    </div>
                    <div>
                    </div>
                  </NavLink>
                )


              }) :
              (
                <div className="informations" style={{ margin: "auto" }}>
                  <div className="noservers">
                    <img src={nothing} />
                    <span>bro there is nothing there</span>
                  </div>

                </div>
              )


          ) :
          (
            searchserver.map((s) => {
              return (
                <NavLink to={`/${s.id}`} className="item">
                  <div className="avatar">
                    {
                      s.icon ?
                        (<img src={baseURL + s.icon} alt="o" />) :
                        (<div className="default">
                          {s.name[0]}
                        </div>)

                    }

                  </div>
                  <div className="info">
                    <h3>{s.name}</h3>
                    <span>{s.shortdesc}</span>
                  </div>
                  <div>
                  </div>
                </NavLink>
              )
            })
          )
        }


      </div>
      {searchfolder}
      {

        (searchfolder) &&
        (
          <FolderNavigation setsearchfolder={setsearchfolder} />
        )
      }
    </div>
  )
}