import { useEffect, useState } from "react";
import { UserData, CommentThreadData } from "../types/types";
import data from "../data.json";
import "../App.css";

const initialData: CommentThreadData = data;

interface ReplyFormProps {
  replyingTo: UserData | null;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ replyingTo }) => {
  // state hook to store comments
  const [user, setUser] = useState<UserData>(initialData.currentUser);
  const [newReply, setNewReply] = useState<string>("");

  useEffect(() => {
    //sending initial data to comments in state
    setUser(initialData.currentUser);
    // console.log(initialData.currentUser);
  }, []);

  const handleAddReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReply(e.target.value);
    console.log(newReply);
  };

  const getPlaceholderText = () => {
    if (replyingTo) {
      return `@${replyingTo.username} `;
    } else {
      return "Add a reply...";
    }
  };

  return (
    <div className="addReplyContainer">
      <textarea
        className="replyInput"
        placeholder={getPlaceholderText()}
        onChange={handleAddReply}
      ></textarea>
      <div className="replyHeader">
        <img className="avatar" src={user.image.png} alt={user.username} />
        <button className="addReplyButton">REPLY</button>
      </div>
    </div>
  );
};
export default ReplyForm;
