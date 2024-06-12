import { useState } from "react";
import { UserData, CommentThreadData } from "../types/types";
import data from "../data.json";
import "../App.css";

const initialData: CommentThreadData = data;

export interface CommentFormProps {
  addComment: (comment: string) => void;
  onSend: (id: number) => void;
  showCommentForm: boolean;
}

const CommentForm = ({ addComment }: CommentFormProps) => {
  // state hook to store comments
  const [user] = useState<UserData>(initialData.currentUser);
  const [newComment, setNewComment] = useState<string>("");
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  // function that takes the input value and sets it to newComment
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  // function that takes the form event and adds a new comment
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment(newComment);
    setShowCommentForm(true);
    console.log("new comment:", newComment, showCommentForm);
  };

  return (
    <form onSubmit={handleSubmit} className="addCommentForm">
      <textarea
        className="commentInput"
        placeholder="Add a comment..."
        value={newComment}
        onChange={handleInputChange}
      ></textarea>
      <div className="commentHeader">
        <img className="avatar" src={user.image.png} alt={user.username} />
      </div>
      <button className="addCommentButton" type="submit">
        SEND
      </button>
    </form>
  );
};
export default CommentForm;
