import { useEffect, useState } from "react";
import { CommentData, CommentThreadData } from "../types/types";
import data from "../data.json";
import Comment from "./Comment";
import "../App.css";

// initial data
const initialData: CommentThreadData = data;

const CommentsList = () => {
  // state hook to store comments
  const [comments, setComments] = useState<CommentData[]>(initialData.comments);
  const [showReplyForm, setShowReplyForm] = useState<number>();

  //sending initial data to comments in state
  useEffect(() => {
    setComments(initialData.comments);
    // console.log(initialData.comments);
  }, []);

  // function that takes a comment's id and increases its score.
  const addScore = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, score: comment.score + 1 } : comment
      )
    );
  };

  // function that takes a comment's id and decreases its score
  const subtractScore = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, score: comment.score - 1 } : comment
      )
    );
  };

  // function that takes a comment's id and open the ReplyForm component
  const onReplyClick = (id: number) => {
    setShowReplyForm(id);
    // console.log("replying to", id);
  };

  return (
    <>
      {/* Map over your comments data and render a Comment component for each comment:  */}
      {comments.map((comment: CommentData) => (
        <Comment
          key={comment.id}
          comment={comment}
          addScore={addScore}
          subtractScore={subtractScore}
          onReply={onReplyClick}
          showReplyForm={showReplyForm}
        />
      ))}
    </>
  );
};

export default CommentsList;
