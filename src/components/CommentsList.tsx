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
  const [commentToDelete, setCommentToDelete] = useState<CommentData>();

  const getData = () => {
    try {
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

  // Functions to handle click events (e.g., to edit or reply to a comment)
  const onReplyClick = (id: number) => {
    setShowReplyForm(id);
    // console.log("clicked", id);
  };

  const onUpdateClick = (id: number) => {
    // console.log("clicked", id);
  };

  const onDeleteClick = (comment: CommentData) => {
    setShowModal(true);
    setCommentToDelete(
      comment
      // comments.find((comment) => comment.id === id)
    );
    console.log("onDelete clicked", comment.id, user.username);
    console.log(typeof comment.id);
  };

  const addComment = (comment: string) => {
    const newComment: CommentData = {
      id: Number(new Date()) + Math.floor(Math.random() * 1000),
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

  const handleDelete = (id: number, currentUser: string) => {
    const isTopLevelComment = comments.some((comment) => comment.id === id);
    //Deletes the comment if it’s a top-level comment and the user matches
    if (user.username === currentUser && isTopLevelComment) {
      setComments(comments.filter((comment) => comment.id !== id));
      //Deletes a reply if the id is a reply’s ID
    } else {
      setComments(
        comments.map((comment) => ({
          ...comment,
          replies: comment.replies?.filter((reply) => reply.id !== id),
        }))
      );
    }
    setShowModal(false);
    console.log("deleted", id, currentUser);
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
          </div>
        ))}
      </div>
      <div>
        {" "}
        {showModal && commentToDelete && (
          <Modal
            comment={commentToDelete}
            onCancel={onCancelClick}
            onModalDelete={handleDelete}
          />
        )}
      </div>

      <CommentForm addComment={addComment} />
    </>
  );
};

export default CommentsList;
