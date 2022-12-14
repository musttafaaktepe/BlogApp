/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useSelector } from "react-redux";

import app from "../auth/firebase";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const NewPost = () => {
  const {
    userInfo: { displayName , uid},
  } = useSelector((state) => state.loginInfos);

  const [date, setDate] = useState("");
  const [imgSrcError, setImgSrcError] = useState(false)
  const [postInfos, setPostInfos] = useState({
    postTitle: "",
    postContent: "",
    imageURL: "",
    author: displayName,
  });

  const [titleError, setTitleError] = useState(true);
  const [contentError, setContentError] = useState(true);

  const updateErrors = () => {
    if (postInfos.postTitle.toString().length < 3) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (postInfos.postContent.toString().length < 10) {
      setContentError(true);
    } else {
      setContentError(false);
    }

    setDate(new Date().toString());
  };

  const handleImgUrl = (e) => {
    setPostInfos({...postInfos, imageURL:e.target.value})
    setImgSrcError(false)
  }
  
  const imgOnError = (e) => {
    e.target.src = "https://jobsalert.pk/wp-content/themes/jobs/images/default-blog-thumb.png"
    setImgSrcError(true)
  }

  const sendPost = () => {
    if (postInfos.postTitle.toString().length < 3) {
      alert("min 3 characters");
    }

    if (postInfos.postContent.toString().length < 10) {
      alert("min 10 chars for content");
    }
    if (!titleError && !contentError) {
      console.log("posted", postInfos);
      const database = getDatabase(app);
      const refPost = push(ref(database, "/posts"));
      const userRef = ref(database, `users/${uid}`)
      try {
        onValue (refPost, (snapshot)=> {
          const data = snapshot;
          console.log(data)
        })
      } catch (error) {
        console.log(error.message)
      }
      set(refPost, {
        numberOfComments:0,
        numberOfLike:0,
        uid,
        ...postInfos,
        date:date,
        imageURL: imgSrcError ? "https://jobsalert.pk/wp-content/themes/jobs/images/default-blog-thumb.png" : postInfos.imageURL
      });
      setPostInfos({
        postTitle: "",
        postContent: "",
        imageURL: "",
        author:displayName
      });
      alert("posted!");
    } else {
      console.log("not posted");
    }
  };

  return (
    <div className="modal" id="newpost" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">new post</h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div className="modal-body">
            <form>
              <div className="form-group">
                <label className="mb-2" htmlFor="exampleInputEmail1">
                  post title :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={postInfos.postTitle}
                  aria-describedby="emailHelp"
                  placeholder="Enter your task..."
                  onChange={(e) =>
                    setPostInfos({ ...postInfos, postTitle: e.target.value })
                  }
                />
              </div>

              <div className="m-2">
                <label for="exampleFormControlTextarea1">post:</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  value={postInfos.postContent}
                  rows="3"
                  onChange={(e) =>
                    setPostInfos({ ...postInfos, postContent: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="form-group">
                <label className="mb-2" htmlFor="exampleInputEmail1">
                  img url :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={postInfos.imageURL}
                  aria-describedby="emailHelp"
                  placeholder="Enter your image url..."
                  onChange={handleImgUrl}/>
                
              </div>
              <div className="d-flex flex-column align-items-center">
                <label
                  className="mt-2 mb-2"
                  style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                >
                  Image Preview{" "}
                </label>
                <img
                  src={postInfos.imageURL}
                  className="img-thumbnail"
                  onError={imgOnError}
                ></img>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onMouseOver={updateErrors}
              onClick={sendPost}
            >
              Send
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
