import React from "react";
import { useSelector } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const UserPost = () => {
  
  const navigate= useNavigate()
  
  const { posts } = useSelector((state) => state.postsSlice);
  const { loginInformation } = useSelector((state) => state.loginInfos);

  
  const {
    userInfo: { uid },
  } = useSelector((state) => state.loginInfos);
  console.log(posts);
  console.log(uid);

  const postDetails = () => {
    if (loginInformation) {
      navigate("/postDetails");
    } else {
      alert("Log in for see post details!");
    }
  };

  return (
    
    <div>
      {posts.map((item) => {

        return <div>{item.uid === uid &&
          <>
          <h3>{`${item.author}'s Posts: `}</h3>

          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={item.imageURL} />
          <Card.Body>
            <Card.Title>{item.postTitle}</Card.Title>
            <Card.Text>
             {item.postContent}
            </Card.Text>
            <Button variant="primary"  
            // onClick={postDetails}
             >Details</Button>
          </Card.Body>
        </Card>

</>
        }</div>;
      })}
    </div>
  );
};

export default UserPost;
