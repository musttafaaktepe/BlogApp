/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";

import app from "../auth/firebase";
import { getDatabase, ref, set, push } from "firebase/database";

const NewPost = () => {
  const [postInfos, setPostInfos] = useState({
    postTitle: "",
    postContent: "",
    imageURL: "",
  });

  const [ titleError, setTitleError ] = useState(true)
  const [ contentError, setContentError ] = useState(true)

  const sendPost = () => {
    if (postInfos.postTitle.toString().length < 3) {
      alert("min 3 ch");
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (postInfos.postContent.toString().length < 10) {
      alert("min 10 ch");
      setContentError(true);
    } else {
      setContentError(false);
    }
  };

  if (!titleError && !contentError) {
    console.log("posted", postInfos);
  } else {
    console.log("not posted");
  }

  console.log(postInfos);

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
                  class="form-control"
                  id="exampleFormControlTextarea1"
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
                  aria-describedby="emailHelp"
                  placeholder="Enter your image url..."
                  onChange={(e) =>
                    setPostInfos({ ...postInfos, imageURL: e.target.value })
                  }
                />
              </div>
              <div className="d-flex flex-column align-items-center">
              <label className="mt-2 mb-2" style={{fontSize:"1.1rem",fontWeight:"bold"}}>Image Preview </label>
              <img src={postInfos.imageURL} class="img-thumbnail" onError={(e) => e.target.src = "https://jobsalert.pk/wp-content/themes/jobs/images/default-blog-thumb.png"}></img>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
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
