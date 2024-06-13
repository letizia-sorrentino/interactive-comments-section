import { useState } from "react";
import moment from "moment";
import { CommentData, CommentThreadData, UserData } from "../types/types";
import data from "../data.json";
import CommentBox from "./CommentBox";
import CommentForm from "./CommentForm";
import "../App.css";

// initial data
const initialData: CommentThreadData = data;

const CommentsList = () => {
  // state hook to store comments
  const [user] = useState<UserData>(initialData.currentUser);
  const [comments, setComments] = useState<CommentData[]>(initialData.comments);
  const [showReplyForm, setShowReplyForm] = useState<number>();

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
      createdAt: moment(new Date()).fromNow(),
      score: 0,
      user: user,
      replies: [],
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const onSendClick = (id: number) => {
    console.log("clicked", id);
  };

  return (
    <>
      {/* Map over your comments data and render a Comment component for each comment:  */}
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <CommentBox
              comment={comment}
              addScore={addScore}
              subtractScore={subtractScore}
              onReply={onReplyClick}
              showReplyForm={showReplyForm}
            />
            {comment.replies && comment.replies.length > 0 && (
              <div className="replyContainer">
                {comment.replies.map((reply) => (
                  <CommentBox
                    key={reply.id}
                    comment={reply}
                    addScore={addScore}
                    subtractScore={subtractScore}
                    onReply={onReplyClick}
                    showReplyForm={showReplyForm}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <CommentForm addComment={addComment} onSend={onSendClick} />
    </>
  );
};

export default CommentsList;
