import { useState } from "react";
import { CommentData } from "../../types/types";
import IconMinus from "../../assets/images/icon-minus.svg";
import IconPlus from "../../assets/images/icon-plus.svg";
import IconReply from "../../assets/images/icon-reply.svg";
import IconDelete from "../../assets/images/icon-delete.svg";
import IconUpdate from "../../assets/images/icon-edit.svg";
import ReplyForm from "../ReplyForm/ReplyForm";
import "./CommentBox.css";
import UpdateForm from "../UpdateForm/UpdateForm";

//Define the properties that will be passed as props to the Comment component from the parent component:
export interface CommentProps {
  comment: CommentData;
  currentUser: string;
  addScore: (id: number) => void;
  subtractScore: (id: number) => void;
  addReply: (reply: string) => void;
  handleEdit: (comment: CommentData) => void;
  onDeleteClick: (comment: CommentData) => void;
}

const CommentBox: React.FC<CommentProps> = ({
  comment,
  currentUser,
  addScore,
  subtractScore,
  addReply,
  handleEdit,
  onDeleteClick: onDelete,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [commentToUpdate, setCommentToUpdate] = useState<CommentData>();

  const onReplyClick = () => {
    setShowReplyForm(true);
  };

  const onEditClick =
    (comment: CommentData) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setCommentToUpdate(commentToUpdate);
      setShowEditForm(true);
      console.log("onEditClick", showEditForm, comment.id, comment.content);
    };

  return (
    <div>
      <div className="commentContainer" key={comment.id}>
        <div className="commentHeader">
          {" "}
          <img
            className="avatar"
            src={comment.user.image.png}
            alt={comment.user.username}
          />
          <p className="userName">{comment.user.username}</p>
          {comment.user.username === currentUser && (
            <span className="currentUser">you</span>
          )}
          <p className="createdAt">{comment.createdAt}</p>
        </div>
        <p className="commentContent">{comment.content}</p>
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

          {comment.user.username !== currentUser ? (
            <button className="replyButton" onClick={onReplyClick}>
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
                <img className="iconDelete" src={IconDelete} alt="iconDelete" />
                Delete
              </button>
              <button className="editButton" onClick={onEditClick(comment)}>
                {" "}
                <img className="iconUpdate" src={IconUpdate} alt="iconUpdate" />
                Edit
              </button>
            </>
          )}
        </div>
      </div>
      <div className="formContainer">
        {showReplyForm && (
          <div>
            <ReplyForm replyingTo={comment.user} addReply={addReply} />
          </div>
        )}
        {showEditForm && (
          <div>
            <UpdateForm
              handleEdit={handleEdit}
              comment={comment}
              currentUser={currentUser}
              addScore={addScore}
              subtractScore={subtractScore}
              addReply={addReply}
              onDeleteClick={onDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
