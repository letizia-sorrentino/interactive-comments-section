import { useEffect, useState } from "react";
import { User, Data } from "../types/types";
import data from "../data.json";
import "../App.css";

const initialData: Data = data;

const AddComment = () => {
  // state hook to store comments
  const [user, setUser] = useState<User>(initialData.currentUser);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    //sending initial data to comments in state
    setUser(initialData.currentUser);
    console.log(initialData.currentUser);
  }, []);

  const handleAddComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
    console.log(newComment);
  };

  return (
    <div>
      <div className="addCommentContainer">
        <textarea
          className="commentInput"
          placeholder="Add a comment..."
          onChange={handleAddComment}
        ></textarea>

        <div className="commentHeader">
          <img className="avatar" src={user.image.png} alt={user.username} />
        </div>

        <button className="addCommentButton">SEND</button>
      </div>
    </div>
  );
};
export default AddComment;
