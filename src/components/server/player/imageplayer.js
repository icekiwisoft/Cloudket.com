import { useContext } from "react"
import { playercontext } from "./player"
import { baseURL } from "../../../utils/useAxios"

export default function ImgPlayer() {
    const { file, setfile, files } = useContext(playercontext)

    return (
        <img src={baseURL + files[file].file} />

    )
}