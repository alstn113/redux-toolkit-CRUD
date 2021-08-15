import React, { useEffect } from "react";
import PostList from "./PostList";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAsync } from "../modules/post";
import Loader from "react-loader-spinner";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, getPostsLoading, getPostsError } = useSelector(({ post }) => ({
    posts: post.posts,
    getPostsLoading: post.getPostsLoading,
    getPostsError: post.getPostsError,
  }));

  useEffect(() => {
    dispatch(getPostsAsync());
  }, [dispatch]);

  if (getPostsLoading === "pending") {
    return (
      <div>
        <Loader type="ThreeDots" color="#cccccc" height={30} />
      </div>
    );
  }
  if (getPostsError) {
    return <div>Error : {getPostsError.message}</div>;
  }

  return posts && <PostList posts={posts} />;
};

export default React.memo(Home);
