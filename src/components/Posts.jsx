import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import MorePosts from "./MorePosts";
import FilterUser from "./FilterUser";

export default function Posts() {
  const [postId, setPostId] = useState([]);
  const [comments, setComments] = useState([]);
  const [showMoreComments, setShowMoreComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery(["post"], async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    return response.data;
  });

  const fetchData = (id) => {
    if (postData) {
      const newPostIds = [];

      // It will work as a filter checks the input when user provide any value it will filter
      if (id) {
        if (id > 100 || id <= 0) {
          alert("Please Enter a Number between 0 to 100");
          return;
        }
        const desiredPostId = Number(id);
        const filteredData = postData.filter(
          (item) => item.postId === desiredPostId
        );
        newPostIds.push(filteredData[0]);
      } else {
        for (let i = 0; i < postData.length; i += 5) {
          newPostIds.push(postData[i]);
        }
      }
      setPostId(newPostIds);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postData]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1 style={{ color: "red" }}>Error! Something went wrong</h1>;
  }

  const fetchMorePosts = async (id) => {
    setLoading(true);
    setShowMoreComments(true);

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`
      );
      setComments(response.data);
    } catch (error) {
      setError("Error! Something went werong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FilterUser fetchData={fetchData} />
      <div className="post-container">
        <div className="post-left">
          {postId.map((post) => (
            <div key={post.id} className="post">
              <h3 className="post-id">Post id: {post.postId}</h3>
              <h3 className="post-name">
                Name: <small>{post.name}</small>
              </h3>
              <p className="post-email">
                <strong>Email:</strong> <small>{post.email}</small>
              </p>
              <p className="post-comment">
                <strong>Comment:</strong> {post.body}
              </p>
              <p className="post-btn">
                <button onClick={() => fetchMorePosts(post.postId)}>
                  Click here
                </button>
                To view all the comments made by this User
              </p>
            </div>
          ))}
        </div>
        {showMoreComments && (
          <MorePosts
            comments={comments}
            setShowMoreComments={setShowMoreComments}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </>
  );
}
