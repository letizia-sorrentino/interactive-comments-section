import { ReplyData } from "../types/types";
import IconMinus from "../assets/images/icon-minus.svg";
import IconPlus from "../assets/images/icon-plus.svg";
import ReplyForm from "./ReplyForm";
import "../App.css";

interface ReplyProps {
  reply: ReplyData;
  addScore: (id: number) => void;
  subtractScore: (id: number) => void;
  onReply: (id: number) => void;
  showReplyForm: boolean;
}

const Reply: React.FC<ReplyProps> = ({
  reply,
  addScore,
  subtractScore,
  onReply,
  showReplyForm,
}) => {
  return (
    <div className="replyContainer" key={reply.id}>
      <div className="replyHeader">
        {" "}
        <img
          className="avatar"
          src={reply.user.image.png}
          alt={reply.user.username}
        />
        <p className="userName">{reply.user.username}</p>
        <p className="createdAt">{reply.createdAt}</p>
      </div>
      <div className="replyMessage">
        <span className="replyingTo">@{reply.replyingTo}</span>
        <span className="replyContent"> {reply.content}</span>
      </div>
      <div className="buttonsContainer">
        <div className="scoreButton">
          <img
            className="iconPlus"
            src={IconPlus}
            alt="iconPlus"
            onClick={() => addScore(reply.id)}
          ></img>
          <div className="replyScore">{reply.score}</div>
          <img
            className="iconMinus"
            src={IconMinus}
            alt="iconMinus"
            onClick={() => subtractScore(reply.id)}
          ></img>
        </div>
        <button className="replyButton" onClick={() => onReply(reply.id)}>
          Reply
        </button>
      </div>{" "}
      <div> {showReplyForm && <ReplyForm />} </div>
    </div>
  );
};
export default Reply;
