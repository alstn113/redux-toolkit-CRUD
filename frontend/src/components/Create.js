import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync } from "../modules/post";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const history = useHistory();
  const dispatch = useDispatch();

  const { createPostLoading } = useSelector(({ post }) => ({
    createPostLoading: post.createPostLoading,
    createPostError: post.createPostError,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body, author };
    dispatch(createPostAsync(post)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        history.push("/");
      }
    });
  };
  return (
    <div className="create">
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Post title:</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Post body:</label>
        <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <label>Post author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button> {createPostLoading === "pending" ? "Loading..." : "Add Post"}</button>
      </form>
    </div>
  );
};

export default Create;
