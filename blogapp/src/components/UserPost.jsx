import React from "react";
import { useSelector } from "react-redux";

const UserPost = () => {
  const { posts } = useSelector((state) => state.postsSlice
);
  const { userInfo:{uid} } = useSelector((state) => state.loginInfos);
  console.log(posts);
  console.log(uid);
  return <div>
    {posts.map((item) => {
return(<>{item.uid === uid &&<p>{`${item.id}, ${item.author}`}</p>}</>)})}
  </div>;
};

export default UserPost;
