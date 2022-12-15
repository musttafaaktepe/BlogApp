import { getDatabase } from "firebase/database";
import { onValue } from "firebase/database";
import { ref } from "firebase/database";
import app from "../auth/firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../redux/features/postSlice";
import { useEffect, useState } from "react";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Post = () => {
  const [expanded, setExpanded] = React.useState(false);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch();
  const [postsArr, setPostsArr] = useState([]);
  const { posts } = useSelector((state) => state.postsSlice);
  console.log(posts);
  console.log(postsArr);

  useEffect(() => {
    const database = getDatabase(app);
    const postsRef = ref(database, "/posts");
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const postsArray = [];

      for (let id in data) {
        postsArray.push({ id, ...data[id] });
      }
      dispatch(getPosts({ posts: postsArray }));
    });
  }, []);
  return (
    <div
      className="d-flex justify-content-center flex-wrap m-2 mt-5"
      style={{ gap: "1.5rem" }}
    >
      {posts?.map((item) => {
        const { date } = item;
        const dateFormat = date.split(" ");

        return (
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {item?.author[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={item?.author}
              subheader={dateFormat.slice(0,5).join(" ")}
            />
            <CardMedia
              component="img"
              height="194"
              image="/static/images/cards/paella.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This ...
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Title:</Typography>

                <Typography paragraph>...</Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </div>
  );
};

export default Post;
