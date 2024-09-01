import React, { useState } from "react";
import { CommentThreadData, CommentData, UserData } from "../../../types/types";
import data from "../../../data.json";
import ScoreButton from "../../Buttons/ScoreButton/ScoreButton";
import ReplyButton from "../../Buttons/ReplyButton/ReplyButton";
import DeleteButton from "../../Buttons/DeleteButton/DeleteButton";
import EditButton from "../../Buttons/EditButton/EditButton";
import UpdateButton from "../../Buttons/UpdateButton/UpdateButton";
import "./UpdateForm.css";

const initialData: CommentThreadData = data;

export interface UpdateFormProps {
  currentUser: string;
  comment: CommentData;
  addScore: (id: number) => void;
  subtractScore: (id: number) => void;
  onReplyClick: () => void;
  onEditClick: (comment: CommentData) => void;
  handleEdit: (comment: CommentData) => void;
  onDeleteClick: (comment: CommentData) => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  currentUser,
  comment,
  addScore,
  subtractScore,
  onReplyClick,
  onEditClick: onEdit,
  handleEdit,
  onDeleteClick: onDelete,
}) => {
  const [user] = useState<UserData>(initialData.currentUser);

  const [updatedComment, setUpdatedComment] = useState<string>("");
  const [commentToUpdate, setCommentToUpdate] = useState<CommentData>();

  const handleUpdateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedComment(e.target.value);
    console.log(updatedComment);
  };

  const handleUpdateSubmit = () => {
    // handleEdit({ ...comment, content: updatedComment });
    const newComment = { ...comment, content: updatedComment };
    handleEdit(newComment);
  };

  return (
    <>
      <form className="updateCommentForm">
        <div className="updateCommentHeader">
          <div className="userNameInfoContainer">
            <img className="avatar" src={user.image.png} alt={user.username} />
            <p className="userName">{comment.user.username}</p>
            {comment.user.username === currentUser && (
              <span className="currentUser">you</span>
            )}
            <p className="createdAt">{comment.createdAt}</p>
          </div>
        </div>

        <textarea
          className="updateInput"
          placeholder={comment.content}
          onChange={handleUpdateChange}
        ></textarea>

        <UpdateButton comment={comment} handleEdit={handleUpdateSubmit} />

        <div className="updateButtonsContainer">
          <ScoreButton
            comment={comment}
            subtractScore={subtractScore}
            addScore={addScore}
          />
          <div>
            {comment.user.username !== currentUser ? (
              <ReplyButton onReplyClick={onReplyClick} />
            ) : (
              <>
                <DeleteButton comment={comment} onDeleteClick={onDelete} />
                <EditButton
                  comment={comment}
                  onEditClick={(comment) => {
                    console.log("Edit button clicked", comment);
                    onEdit(comment);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
export default UpdateForm;
