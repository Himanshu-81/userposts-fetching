export default function MorePosts({
  comments,
  setShowMoreComments,
  loading,
  error,
}) {
  if (loading) {
    return <p className="loading">Loading...</p>;
  }
  if (error) {
    return (
      <p style={{ color: "red" }} className="error">
        {error}
      </p>
    );
  }

  return (
    <div className="more-comments-container">
      {comments.map((comment, index) => (
        <div className="more-comments" key={index}>
          Comment: {comment.body}
        </div>
      ))}
      <button
        className="close-more-comments"
        onClick={() => setShowMoreComments(false)}
      >
        X
      </button>
    </div>
  );
}
