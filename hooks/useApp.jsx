import { useContext } from "react"
import AppContext from "../context/AppProvider"
const useApp = () => {
  return useContext(AppContext)
}

export default useApp