import { useEffect, useState } from "react";
import { Comment, Data } from "../types/types";
import IconMinus from "../assets/images/icon-minus.svg";
import IconPlus from "../assets/images/icon-plus.svg";
import data from "../data.json";

// initial data
const initialData: Data = data;

const Comments = () => {
  // state hook to store comments
  const [comments, setComments] = useState<Comment[]>(initialData.comments);

  useEffect(() => {
    //sending initial data to comments in state
    setComments(initialData.comments);
    console.log(initialData.comments);
  }, []);

  const addScore = (id: number) => {
    console.log(id);
  };

  const subtractScore = (id: number) => {
    console.log(id);
  };

  return (
    <>
      {comments.map((comment: Comment) => (
        <div className="commentContainer" key={comment.id}>
          <div className="commentHeader">
            {" "}
            <img
              className="avatar"
              src={comment.user.image.png}
              alt={comment.user.username}
            />
            <p className="userName">{comment.user.username}</p>
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
            <button className="replyButton">Reply</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comments;
