import { useEffect, useState } from "react";
import { UserData, CommentThreadData } from "../../types/types";
import data from "../../data.json";

const initialData: CommentThreadData = data;

interface ReplyFormProps {
  replyingTo: UserData | null;
  addReply: (newReply: string) => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({
  replyingTo,
  addReply,
}: ReplyFormProps) => {
  // state hook to store comments
  const [user, setUser] = useState<UserData>(initialData.currentUser);
  const [newReply, setNewReply] = useState<string>("");

  useEffect(() => {
    //sending initial data to comments in state
    setUser(initialData.currentUser);
  }, []);

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addReply(newReply);
    setNewReply("");
    console.log("new reply:", newReply);
  };

  return (
    <form onSubmit={handleReplySubmit} className="addReplyForm">
      <textarea
        className="replyInput"
        placeholder={getPlaceholderText()}
        onChange={handleReplyChange}
      ></textarea>
      <div className="replyHeader">
        <img className="avatar" src={user.image.png} alt={user.username} />
        <button className="addReplyButton">REPLY</button>
      </div>
    </form>
  );
};
export default ReplyForm;
