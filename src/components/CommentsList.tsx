import { useState } from "react";
import { CommentData, CommentThreadData, UserData } from "../types/types";
import data from "../data.json";
import CommentBox from "./CommentBox";
import RepliesList from "./RepliesList";
import CommentForm from "./CommentForm";
import NewCommentBox from "./NewCommentBox";
import "../App.css";

// initial data
const initialData: CommentThreadData = data;

const CommentsList = () => {
  // state hook to store comments
  const [user] = useState<UserData>(initialData.currentUser);
  const [comments, setComments] = useState<CommentData[]>(initialData.comments);
  const [showReplyForm, setShowReplyForm] = useState<number>();
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

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

  const addComment = (comment: string) => {
    const newComment: CommentData = {
      id: Date.now() + Math.random(),
      content: comment,
      createdAt: new Date().toISOString(),
      score: 0,
      user: user,
      replies: [],
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const onSendClick = (id: number) => {
    setShowCommentForm(true);
    console.log("clicked", id);
  };

  return (
    <>
      {/* Map over your comments data and render a Comment component for each comment:  */}
      {comments.map((comment: CommentData) => (
        <CommentBox
          key={comment.id}
          comment={comment}
          addScore={addScore}
          subtractScore={subtractScore}
          onReply={onReplyClick}
          showReplyForm={showReplyForm}
        />
      ))}
      <RepliesList />

      {showCommentForm === true && (
        <NewCommentBox
          content={""}
          user={user}
          id={0}
          createdAt={""}
          score={0}
          addScore={() => {}}
          subtractScore={() => {}}
          onDelete={() => {}}
          onUpdate={() => {}}
        />
      )}

      <CommentForm
        addComment={addComment}
        showCommentForm={false}
        onSend={onSendClick}
      />
    </>
  );
};

export default CommentsList;
