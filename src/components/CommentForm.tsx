import { useEffect, useState } from "react";
import { UserData, CommentThreadData } from "../types/types";
import data from "../data.json";
import NewComment from "./NewComment";
import "../App.css";

const initialData: CommentThreadData = data;

type CommentFormProps = {
  onCommentSubmit: (comment: string) => void;
};

const CommentForm = ({ onCommentSubmit }: CommentFormProps) => {
  // state hook to store comments
  const [user, setUser] = useState<UserData>(initialData.currentUser);
  const [newComment, setNewComment] = useState<string>("");
  const [commentSubmitted, setCommentSubmitted] = useState<boolean>(false);
  // const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    //sending initial data to comments in state
    setUser(initialData.currentUser);
  }, []);

  const handleAddComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onCommentSubmit(newComment);
    setCommentSubmitted(true);

    // const createdAt = new Date().toLocaleTimeString();
    // setTimestamp(createdAt);

    console.log("new comment:", newComment);
  };

  return (
    <>
      {commentSubmitted && (
        <NewComment
          user={user}
          content={newComment}
          // timestamp={}
          // id={id}
          // score={score}
        />
      )}

      <form onSubmit={handleSubmit} className="addCommentForm">
        <textarea
          className="commentInput"
          placeholder="Add a comment..."
          onChange={handleAddComment}
        ></textarea>
        <div className="commentHeader">
          <img className="avatar" src={user.image.png} alt={user.username} />
        </div>
        <button className="addCommentButton" type="submit">
          SEND
        </button>
      </form>
    </>
  );
};
export default CommentForm;
