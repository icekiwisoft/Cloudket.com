import { baseURL } from "../../utils/useAxios";
import foldericon from '../../assets/folder.png'
import texticon from '../../assets/text.png'
import wordicon from '../../assets/word.png'

export function getitemicon(item: ServerItem) {
    let icon = foldericon


    if (item.type === "file") {
        if (item.filetype.includes("video") || item.filetype.includes("image")) {
            icon = baseURL + item.thumbnail
        }

        else if (item.filetype.includes("word")) {
            icon = wordicon
        }
        else {
            icon = texticon
        }
    }

    return icon
}

export function ServerAvatar({ server }) {
    var charcode = server.name.toLowerCase().charCodeAt(0)
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
        <div className="avatar">
            {
                server.icon ?
                    (<img src={baseURL + server.icon} alt="o" />) :


                    (<div className="avatar-img default" style={{ backgroundColor: color }}>
                        {server.name[0]}
                    </div>)



            }                  </div>
    )
}



export function UserAvatar({ user }) {
    var charcode = user.username.toLowerCase().charCodeAt(0)
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
        <div className="avatar">
            {
                user.photo ?
                    (<img src={baseURL + user.photo} alt="o" />) :


                    (<div className="avatar-img default" style={{ backgroundColor: color }}>
                        {user.username[0]}
                    </div>)






            }                  </div>
    )
}