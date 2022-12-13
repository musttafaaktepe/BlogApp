
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import "./Home.scss";

const Home = () => {
  const {loginInformation } = useSelector((state)=> state.loginInfos) 

  return (
    <> 
    {loginInformation && 
    <div 
      className="d-flex flex-row add-post-div justify-content-end align-items-center  m-5 "
      style={{gap: "1rem" }} >      
       
        
        <AddCircleIcon
          className="add-button"
          style={{ fontSize: "3rem", color: "purple", cursor: "pointer" }}
        />
      

      <span
        
        className="new-post-text"
        style={{ fontSize: "2rem", color:"purple" }}
      >
        New Post
      </span>
    </div>}
    </>
  );
};

export default Home;
