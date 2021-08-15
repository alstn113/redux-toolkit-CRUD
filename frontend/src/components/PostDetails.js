import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostAsync, deletePostAsync } from "../modules/post";
import Loader from "react-loader-spinner";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { post, getPostLoading, getPostError, deletePostLoading } = useSelector(({ post }) => ({
    post: post.post,
    getPostLoading: post.getPostLoading,
    getPostError: post.getPostError,
    deletePostLoading: post.deletePostLoading,
  }));

  const handleDelete = () => {
    dispatch(deletePostAsync(id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        history.push("/");
      }
    });
  };

  useEffect(() => {
    dispatch(getPostAsync(id));
  }, [dispatch, id]);

  if (getPostLoading === "pending") {
    return (
      <div>
        <Loader type="ThreeDots" color="#cccccc" height={30} />
      </div>
    );
  }

  if (getPostError) {
    return <div>Error : {getPostError.message}</div>;
  }

  return (
    <div className="post-details">
      {post && (
        <article>
          <h2>{post.title}</h2>
          <p>Written by {post.author}</p>
          <div>{post.body}</div>
          <button onClick={handleDelete}>{deletePostLoading === "pending" ? "Loaindg..." : "Delete Post"}</button>
        </article>
      )}
    </div>
  );
};

export default React.memo(PostDetails);
