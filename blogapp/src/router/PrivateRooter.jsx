import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRooter = () => {
    const {loginInformation} = useSelector((state) =>state.loginInfos)
  return (
    <>
    
    {loginInformation ? <Outlet/> : <Navigate to="/"/> }
    </>
  )
}

export default PrivateRooter