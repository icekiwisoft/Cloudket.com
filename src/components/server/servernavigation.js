import { faAdd, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { motion, useCycle } from "framer-motion"

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
  
const Path = props => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      {...props}
    />
  );
  
  export const MenuToggle = ({ toggle }) => (
    <button onClick={toggle}>
      <svg width="23" height="23"  viewBox="0 0 23 23">
        <Path
        stroke="rgba(255, 255, 255, 0.69)"
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" }
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          stroke="rgba(255, 255, 255, 0.69)"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
        stroke="rgba(255, 255, 255, 0.69)"
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" }
          }}
        />
      </svg>
    </button>
  );
  

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };
  
  const itemvariants = {
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
  export const Navigation = () => (
    <motion.ul variants={variants}>
    
         <motion.li
           variants={itemvariants}
           whileTap={{ scale: 0.95 }}
         >
           <div className="icon-placeholder"  />
           <div className="text-placeholder"  >settings</div>
         </motion.li>
         <motion.li
           variants={itemvariants}
           whileTap={{ scale: 0.95 }}
         >
           <div className="icon-placeholder"  />
           <div className="text-placeholder"  >new server</div>
         </motion.li>
         
    </motion.ul>
  );
  
  const itemIds = [0, 1, 2, 3, 4];
function UserMenu()
{
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = {height:100}
    return (
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
        >
          <motion.div className="background" variants={sidebar} />
          < MenuToggle toggle={() => toggleOpen()}/>
          <Navigation/>

        </motion.nav>
      );
}





function createsettingoption(name,color)
{
    return {name,color}
}

const options=[
createsettingoption("profil"),
createsettingoption("appearance"),
createsettingoption("server profil"),
]

function SettingsNavigation(props)
{

    const {option,setoption}=props

return(
    <div>

        {
            options.map(o=>
                {
                    return(<button>{o.name}</button>)
                })
        }
       
    </div>
)
}

function SettingsView(props)
{

    return(
<div>
    <h1></h1>

</div>
    )
}



export function Settings()
{

    const [option,setoption]=useState(options[0])

return(
<div className="settings">
    <SettingsNavigation option={option}  setoption={setoption}/>
    <SettingsView option={option}/>
</div>)
}


export default function ServerNavigation(props)
{
    const[servers,setservers]=useState([])
    const{setsettings}=props


    const update= async()=>
    {
        const servers= await axios.get("http://localhost:8000")
    
        console.log(servers.data)
       setservers(servers.data)

    }

   

    useEffect(()=>{
        update()
    },[])
    return (
        <div className="sidebar">
            <header>
            <UserMenu/>
            <form>
                <input type="search" placeholder="Search..." />
            </form>
            </header>

            <div className="serverlist">
                {
                    servers.map((s)=>
                    {
                        return(
                        <NavLink to={`/${s.id}`} className="item">
                            <img src="https://fr.wikipedia.org/static/images/icons/wikipedia.png"/>
                            <div className="info">
                                <h3>{s.name}</h3>
                                <span>{s.shortdesc}</span>
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