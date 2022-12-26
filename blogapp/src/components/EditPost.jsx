import { getDatabase, ref, update } from "firebase/database";
import React from "react";
import app from "../auth/firebase";

const EditPost = ({ item, setItem }) => {
  console.log(item);

  const firebaseUpdate = () =>{
    try {
      const database = getDatabase(app);
      const updateRef = ref(database, `posts/${item?.id}`)
      update(updateRef, {
        postTitle:item.postTitle,
        postContent:item.postContent,
        imageURL:item.imageURL
      })
      alert('updated post')

      
    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className="modal" id="editpost" tabIndex={-1}>
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
                  value={item.postTitle}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your task..."
                  onChange={(e) =>
                    setItem({ ...item, postTitle: e.target.value })
                  }
                />
              </div>

              <div className="m-2">
                <label for="exampleFormControlTextarea1">post:</label>
                <textarea
                  value={item.postContent}
                  onChange={(e) =>
                    setItem({ ...item, postContent: e.target.value })
                  }
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group">
                <label className="mb-2" htmlFor="exampleInputEmail1">
                  img url :
                </label>
                <input
                  value={item.imageURL}
                  onChange={(e) =>
                    setItem({ ...item, imageURL: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your image url..."
                />
              </div>
              <div className="d-flex flex-column align-items-center">
                <label
                  className="mt-2 mb-2"
                  style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                >
                  Image Preview{" "}
                </label>
                <img
                  src={item.imageURL}
                  alt="imagef"
                  className="img-thumbnail"
                ></img>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={firebaseUpdate}
            >
              Update
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

export default EditPost;
