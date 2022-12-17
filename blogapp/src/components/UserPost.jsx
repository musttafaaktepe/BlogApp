import React from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Typography from "@mui/material/Typography";
import { indigo } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import { Navigate } from "react-router-dom";

const UserPost = () => {
  const { posts } = useSelector((state) => state.postsSlice);
  const { loginInformation } = useSelector((state) => state.loginInfos);
  const {
    userInfo: { uid },
  } = useSelector((state) => state.loginInfos);
  console.log(posts);
  console.log(uid);

  const postDetails = () => {
    if (loginInformation) {
      Navigate("/postDetails");
    } else {
      alert("Log in for see post details!");
    }
  };

  return (
    
    <div>
      {posts.map((item) => {

        return <div>{item.uid === uid &&
          <p>{`${item.id}, ${item.author}`}</p>

          


          






          
          
        }</div>;
      })}
    </div>
  );
};

export default UserPost;
