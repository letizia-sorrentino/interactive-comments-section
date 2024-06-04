import { useEffect, useState } from "react";
import data from "../data.json";
import { Reply, Data } from "../types/types";
import IconMinus from "../assets/images/icon-minus.svg";
import IconPlus from "../assets/images/icon-plus.svg";

const Replies = () => {
  // initial data
  const initialData: Data = data;

  const { comments } = initialData;

  // Extract all replies into a single array
  const allReplies = comments.flatMap((comment) => comment.replies);

  // state hook to store comments
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    //sending initial data to comments in state
    setReplies(allReplies);
    console.log(allReplies);
  }, []);

  return (
    <>
      {replies.map((reply: Reply) => (
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
          <span className="replyingTo">@{reply.replyingTo}</span>
          <span className="replyContent"> {reply.content}</span>
          <div className="buttonsContainer">
            <div className="scoreButton">
              <img className="iconPlus" src={IconPlus} alt="iconPlus"></img>
              <div className="replyScore">{reply.score}</div>
              <img className="iconMinus" src={IconMinus} alt="iconMinus"></img>
            </div>
            <button className="replyButton">Reply</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default Replies;
