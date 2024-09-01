import { useEffect, useState } from "react";
import moment from "moment";
import { CommentData, CommentThreadData, UserData } from "../../types/types";
import data from "../../data.json";
import CommentBox from "../Comment/CommentBox/CommentBox";
import Modal from "../Modal/Modal";
import CommentForm from "../Forms/CommentForm/CommentForm";

// initial data
const initialData: CommentThreadData = data;

const CommentsList = () => {
  // state hook to store comments
  const [user] = useState<UserData>(initialData.currentUser);
  const [comments, setComments] = useState<CommentData[]>(initialData.comments);
  const [editComment, setEditComment] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<CommentData>();

  const getData = () => {
    try {
      setComments(initialData.comments);
      // console.log(comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []); //run only once

  const onDeleteClick = (comment: CommentData) => {
    setShowModal(true);
    setCommentToDelete(comment);
    console.log("onDeleteClick", comment.id, user.username);
  };

  const onCancelClick = () => {
    setShowModal(false);
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

  const handleReply = (comment: string) => {
    const newReply: CommentData = {
      id: Number(new Date()) + Math.floor(Math.random() * 1000),
      content: comment,
      createdAt: moment(new Date()).fromNow(),
      score: 0,
      user: user!,
      replies: [],
    };
    // setComments((prevComments) => [...prevComments, newReply]);
    setComments((prevComments) =>
      prevComments.map((comment) => {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      })
    );
    console.log("reply", comment, newReply.id);
  };
  // Function to handle editing a comment
  const handleEdit = (comment: CommentData) => {
    // const commentToUpdate = comments.find((comment) => comment.id === id);
    setEditComment(comment.content);
    console.log("editComment", editComment);
  };

  //Modal event handlers
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
              onDeleteClick={onDeleteClick}
              addReply={handleReply}
              handleEdit={handleEdit}
            />
            {/* Map over the replies array of each comment and render a Comment component for each reply: */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="replyContainer">
                {comment.replies.map((reply) => (
                  <CommentBox
                    key={reply.id}
                    comment={reply}
                    currentUser={user.username}
                    addReply={handleReply}
                    onDeleteClick={onDeleteClick}
                    handleEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
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
