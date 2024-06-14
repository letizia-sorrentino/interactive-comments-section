import { CommentData } from "../types/types";
import IconMinus from "../assets/images/icon-minus.svg";
import IconPlus from "../assets/images/icon-plus.svg";
import ReplyForm from "./ReplyForm";
import "../App.css";

//Define the properties that will be passed as props to the Comment component from the parent component:
export interface CommentProps {
  comment: CommentData;
  currentUser: string;
  addScore: (id: number) => void;
  subtractScore: (id: number) => void;
  onReply: (id: number) => void;
  showReplyForm: number | undefined;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number) => void;
}

const CommentBox: React.FC<CommentProps> = ({
  comment,
  currentUser,
  addScore,
  subtractScore,
  onReply,
  showReplyForm,
}) => {
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
        <button className="replyButton" onClick={() => onReply(comment.id)}>
          Reply
        </button>
      </div>
      <div>
        {" "}
        {showReplyForm === comment.id && (
          <ReplyForm replyingTo={comment.user} />
        )}{" "}
      </div>
    </div>
  );
};

export default CommentBox;
