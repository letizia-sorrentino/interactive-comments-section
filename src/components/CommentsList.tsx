import { useEffect, useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
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
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const getData = () => {
    try {
      //fixed the data to have unique id
      initialData.comments.forEach((comment) => {
        comment.id = uuidv4(); // Assign a unique ID
        comment.replies.forEach((reply) => {
          reply.id = uuidv4(); // Assign a unique ID
        });
      });

      setComments(initialData.comments);
      console.log(comments);
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
    setCommentToDelete(id);
    console.log("clicked", id, showModal, user.username);
  };

  const addComment = (comment: string) => {
    const newComment: CommentData = {
      id: uuidv4(),
      content: comment,
      createdAt: moment(new Date()).fromNow(),
      score: 0,
      user: user,
      replies: [],
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  //Modal event handlers
  const onCancelClick = () => {
    setShowModal(false);
  };

  const onModalDeleteClick = (id: number, currentUser: string) => {
    if (user.username === currentUser) {
      setComments(comments.filter((comment) => comment.id !== id));
    } else {
      alert("You can only delete your own comments!");
    }
    setShowModal(false);
    console.log("deleted", commentToDelete, id, currentUser);
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
                {comment.replies.map((comment) => (
                  <CommentBox
                    key={comment.id}
                    comment={comment}
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

      <CommentForm addComment={addComment} />
    </>
  );
};

export default CommentsList;
