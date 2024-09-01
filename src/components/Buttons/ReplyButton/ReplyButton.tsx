import IconReply from "../../../assets/images/icon-reply.svg";
import "./ReplyButton.css";

export interface ReplyButtonProps {
  onReplyClick: () => void;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ onReplyClick }) => (
  <button className="replyButton" onClick={onReplyClick}>
    <img src={IconReply} alt="Reply" />
    Reply
  </button>
);

export default ReplyButton;
