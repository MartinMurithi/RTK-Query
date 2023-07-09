import React, { useState } from "react";
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostsMutation,
  usePostPostsMutation,
} from "./api/apiSlice";

function PostList() {
  const [post, setPost] = useState({
    id: 0,
    title: "",
    body: "",
  });

  const {
    isError,
    isLoading,
    isSuccess,
    error,
    data: posts,
  } = useGetPostsQuery();

  const [addPost] = usePostPostsMutation();
  const [updatePost] = useUpdatePostsMutation();
  const [deletePost] = useDeletePostMutation();

  const handleSubmitPost = (e) => {
    e.preventDefault();
    addPost(post);
    setPost({ id: "", title: "", body:""});
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error}</p>;
  } else if (isSuccess) {
    content = posts.map((post) => {
      return (
        <div key={post.id}>
          <p>{post.id}</p>
          <p>{post.title}</p>
          <p>{post.body}</p>
          <button className="btn" onClick={() => updatePost({ id: post.id })}>Edit</button>
          <button className="btn" onClick={() => deletePost({ id: post.id })}>Delete</button>
        </div>
      );
    });
  }

  return (
    <div className="parent">
      <div className="postList">
        <form onSubmit={handleSubmitPost}>
          <label htmlFor="id">Id</label>
          <input
            type="number"
            required
            id="id"
            value={post.id}
            onChange={(e) => setPost({ ...post, id: e.target.value })}
          />

          <label htmlFor="title">Title</label>
          <input
            type="text"
            required
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />

          <label htmlFor="body">Body</label>
          <textarea
            cols={8}
            rows={5}
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          ></textarea>

          <button>Submit</button>
        </form>
        {content}
      </div>
    </div>
  );
}

export default PostList;
