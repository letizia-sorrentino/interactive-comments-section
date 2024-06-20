import { useEffect, useState } from "react";
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

  const getData = () => {
    try {
      //fixed the data to have unique id
      initialData.comments.forEach((comment, index) => {
        comment.id = Math.floor(index + Math.random());
        comment.replies.forEach((reply, index) => {
          reply.id = Math.floor(index + Math.random());
        });
      });

      setComments(initialData.comments);
      // console.log(comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []); //run only once

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
    // console.log("clicked", id);
  };

  const onUpdateClick = (id: number) => {
    // console.log("clicked", id);
  };

  const onDeleteClick = (id: number) => {
    setShowModal(true);
    // console.log("clicked", id, showModal);
  };

  const addComment = (comment: string) => {
    const maxId = Math.max(...comments.map((c) => c.id));

    const newComment: CommentData = {
      // id: Date.now() + Math.random(),
      id: Math.floor(maxId + 1),
      content: comment,
      createdAt: moment(new Date()).fromNow(),
      score: 0,
      user: user,
      replies: [],
    };
    setComments((prevComments) => [...prevComments, newComment]);
    // console.log("new comment:", newComment.id);
  };

  const onSendClick = (id: number) => {
    // console.log("clicked", id);
  };

  //Modal event handlers
  const onCancelClick = () => {
    setShowModal(false);
  };

  const onModalDeleteClick = (id: number, currentUser: string) => {
    const commentsToDelete = [...comments];
    const indexOf = commentsToDelete.findIndex((comment) => {
      return comment.id === id && comment.user.username === currentUser;
    });
    if (indexOf !== -1) {
      commentsToDelete.splice(indexOf, 1);
      setComments(commentsToDelete);
      console.log("deleted", id, currentUser);
    }
    setShowModal(false);
  };

  return (
    <>
      {/* Map over your comments data and render a Comment component for each comment:  */}
      <div>
        {comments.map((comment) => (
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
                {comment.replies.map((reply) => (
                  // console.log(reply.id),
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
                ))}
              </div>
            )}

            {showModal === true && (
              <Modal
                comment={comment}
                onCancel={onCancelClick}
                onModalDelete={onModalDeleteClick}
              />
            )}
          </div>
        ))}
      </div>

      <CommentForm addComment={addComment} onSend={onSendClick} />
    </>
  );
};

export default CommentsList;
