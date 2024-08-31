import React, { useState } from "react";
import { CommentThreadData, CommentData, UserData } from "../../types/types";
import data from "../../data.json";
import IconMinus from "../../assets/images/icon-minus.svg";
import IconPlus from "../../assets/images/icon-plus.svg";
import IconReply from "../../assets/images/icon-reply.svg";
import IconDelete from "../../assets/images/icon-delete.svg";
import IconUpdate from "../../assets/images/icon-edit.svg";
import "./UpdateForm.css";

const initialData: CommentThreadData = data;

export interface UpdateFormProps {
  currentUser: string;
  comment: CommentData;
  addScore: (id: number) => void;
  subtractScore: (id: number) => void;
  addReply: (reply: string) => void;
  handleEdit: (comment: CommentData) => void;
  onDeleteClick: (comment: CommentData) => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  currentUser,
  comment,
  addScore,
  subtractScore,
  // addReply,
  handleEdit,
  onDeleteClick: onDelete,
}) => {
  // const [commentToUpdate, setCommentToUpdate] = useState<CommentData>();
  const [user] = useState<UserData>(initialData.currentUser);

  const [updatedComment, setUpdatedComment] = useState<string>("");

  const handleUpdateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedComment(e.target.value);
    console.log(updatedComment);
  };

  const handleUpdateSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleEdit({ ...comment, content: updatedComment });
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
          <div>
            {comment.user.username !== currentUser ? (
              <button className="replyButton" onClick={() => {}}>
                <img className="iconReply" src={IconReply} alt="iconReply" />{" "}
                Reply
              </button>
            ) : (
              <>
                <button
                  className="deleteButton"
                  onClick={() => onDelete(comment)}
                >
                  {" "}
                  <img
                    className="iconDelete"
                    src={IconDelete}
                    alt="iconDelete"
                  />
                  Delete
                </button>
                <button className="editButton" onClick={() => {}}>
                  {" "}
                  <img
                    className="iconUpdate"
                    src={IconUpdate}
                    alt="iconUpdate"
                  />
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
        <textarea
          className="updateInput"
          placeholder={comment.content}
          onChange={handleUpdateChange}
        ></textarea>
        <div className="buttonsContainer">
          <div className="scoreButton">
            <img
              className="iconPlus"
              src={IconPlus}
              alt="iconPlus"
              onClick={() => addScore(comment.id)}
            ></img>
            <div className="commentScore">{comment.score}</div>
            <img
              className="iconMinus"
              src={IconMinus}
              alt="iconMinus"
              onClick={() => subtractScore(comment.id)}
            ></img>
          </div>
          <button className="updateButton" onClick={handleUpdateSubmit}>
            Update
          </button>
        </div>
      </form>
    </>
  );
};
export default UpdateForm;
