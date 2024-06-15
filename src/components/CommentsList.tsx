import { useState } from "react";
import moment from "moment";
import { CommentData, CommentThreadData, UserData } from "../types/types";
import data from "../data.json";
import CommentBox from "./CommentBox";
import Modal from "./Modal";
import CommentForm from "./CommentForm";

// initial data
const initialData: CommentThreadData = data;

const CommentsList = () => {
  // state hook to store comments
  const [user] = useState<UserData>(initialData.currentUser);
  const [comments, setComments] = useState<CommentData[]>(initialData.comments);
  const [showReplyForm, setShowReplyForm] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);

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

  //Comment event handlers
  const onReplyClick = (id: number) => {
    setShowReplyForm(id);
  };

  const onUpdateClick = (id: number) => {
    console.log("clicked", id);
  };

  const onDeleteClick = (id: number) => {
    setShowModal(true);
    console.log("clicked", id, showModal);
  };

  //Modal event handlers
  const onCancelClick = () => {
    setShowModal(false);
  };

  const onModalDeleteClick = (id: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
    setShowModal(false);
    console.log("clicked", id);
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
        {comments.map(
          (comment) => (
            console.log(comment.id),
            (
              <div key={comment.id}>
                <CommentBox
                  comment={comment}
                  currentUser={user.username}
                  addScore={addScore}
                  subtractScore={subtractScore}
                  onReply={onReplyClick}
                  onUpdate={onUpdateClick}
                  onDelete={onDeleteClick}
                  showReplyForm={showReplyForm}
                />

                {/* Map over the replies array of each comment and render a Comment component for each reply: */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="replyContainer">
                    {comment.replies.map(
                      (reply) => (
                        console.log(reply.id),
                        (
                          <CommentBox
                            key={reply.id}
                            comment={reply}
                            currentUser={user.username}
                            addScore={addScore}
                            subtractScore={subtractScore}
                            onReply={onReplyClick}
                            onUpdate={onUpdateClick}
                            onDelete={onDeleteClick}
                            showReplyForm={showReplyForm}
                          />
                        )
                      )
                    )}
                  </div>
                )}

                {showModal === true && (
                  <Modal
                    comment={comment}
                    onCancel={onCancelClick}
                    onDelete={onModalDeleteClick}
                  />
                )}
              </div>
            )
          )
        )}
      </div>

      <CommentForm addComment={addComment} onSend={onSendClick} />
    </>
  );
};

export default CommentsList;
