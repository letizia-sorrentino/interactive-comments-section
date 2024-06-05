import { useEffect, useState } from "react";
import { User, Data } from "../types/types";
import data from "../data.json";
import "../App.css";

const initialData: Data = data;

const AddReply = () => {
  // state hook to store comments
  const [user, setUser] = useState<User>(initialData.currentUser);
  const [newReply, setNewReply] = useState<string>("");

  useEffect(() => {
    //sending initial data to comments in state
    setUser(initialData.currentUser);
    console.log(initialData.currentUser);
  }, []);

  const handleAddReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReply(e.target.value);
    console.log(newReply);
  };

  return (
    <div className="addReplyContainer">
      <textarea
        className="replyInput"
        placeholder="Add a reply..."
        onChange={handleAddReply}
      ></textarea>
      <div className="replyHeader">
        <img className="avatar" src={user.image.png} alt={user.username} />
        <button className="addReplyButton">REPLY</button>
      </div>
    </div>
  );
};
export default AddReply;
