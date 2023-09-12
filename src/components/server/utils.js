import { baseURL } from "../../utils/useAxios";

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