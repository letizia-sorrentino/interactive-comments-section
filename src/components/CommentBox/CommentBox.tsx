import { useState } from "react";
import { CommentData } from "../../types/types";
import IconMinus from "../../assets/images/icon-minus.svg";
import IconPlus from "../../assets/images/icon-plus.svg";
import IconReply from "../../assets/images/icon-reply.svg";
import IconDelete from "../../assets/images/icon-delete.svg";
import IconUpdate from "../../assets/images/icon-edit.svg";
import ReplyForm from "../ReplyForm/ReplyForm";
import "./CommentBox.css";

//Define the properties that will be passed as props to the Comment component from the parent component:
export interface CommentProps {
  comment: CommentData;
  currentUser: string;
  addScore: (id: number) => void;
  subtractScore: (id: number) => void;
  onReplyClick: (comment: CommentData) => void;
  onDeleteClick: (comment: CommentData) => void;
  onUpdateClick: (comment: CommentData) => void;
}

const CommentBox: React.FC<CommentProps> = ({
  comment,
  currentUser,
  addScore,
  subtractScore,
  // onReplyClick,
  onDeleteClick: onDelete,
  // onUpdateclick,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const onReplyClick = () => {
    setShowReplyForm((prevShowReplyForm) => !prevShowReplyForm);
  };

  // const handleReply = (comment: string, parentId: number) => {
  //   const newReply: CommentData = {
  //     id: Number(new Date()) + Math.floor(Math.random() * 1000),
  //     content: comment,
  //     createdAt: moment(new Date()).fromNow(),
  //     score: 0,
  //     user: user,
  //     replies: [],
  //   };
  //   setComments((prevComments) =>
  //     prevComments.map((comment) =>
  //       comment.id === parentId
  //         ? { ...comment, replies: [...comment.replies, newReply] }
  //         : comment
  //     )
  //   );
  // };

  return (
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
            <img className="iconReply" src={IconReply} alt="iconReply" /> Reply
          </button>
        ) : (
          <>
            <button className="deleteButton" onClick={() => onDelete(comment)}>
              {" "}
              <img className="iconDelete" src={IconDelete} alt="iconDelete" />
              Delete
            </button>
            <button className="updateButton" onClick={() => onUpdate(comment)}>
              {" "}
              <img className="iconUpdate" src={IconUpdate} alt="iconUpdate" />
              Edit
            </button>
          </>
        )}
      </div>
      {showReplyForm && (
        <div>
          <ReplyForm replyingTo={comment.user} addReply={() => {}} />
        </div>
      )}
    </div>
  );
};

export default CommentBox;
