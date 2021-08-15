import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSampleAsync } from "../modules/sample";

const Sample = () => {
  const dispatch = useDispatch();
  const { sample, getSampleLoading, getSampleError } = useSelector(({ sample }) => ({
    sample: sample.sample,
    getSampleLoading: sample.getSampleLoading,
    getSampleError: sample.getSampleError,
  }));

  useEffect(() => {
    dispatch(getSampleAsync());
  }, [dispatch]);

  return (
    <>
      <h1>Sample</h1>
      <br />
      {getSampleError ? (
        <h2>Error : {getSampleError}</h2>
      ) : getSampleLoading === "pending" ? (
        <h2>Loading...</h2>
      ) : (
        sample?.map((post) => (
          <div key={post?._id}>
            <br />
            <h2>{post?.title}</h2>
            <h3>{post?.body}</h3>
            <h3>{post?.author}</h3>
            <br />
            <hr />
          </div>
        ))
      )}
    </>
  );
};

export default Sample;
