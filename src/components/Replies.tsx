import { useEffect, useState } from "react";
import data from "../data.json";
import { Reply, Data } from "../types/types";
import IconMinus from "../assets/images/icon-minus.svg";
import IconPlus from "../assets/images/icon-plus.svg";
import AddReply from "./AddReply";
import "../App.css";

const Replies = () => {
  // initial data
  const initialData: Data = data;

  const { comments } = initialData;

  // Extract all replies into a single array
  const allReplies = comments.flatMap((comment) => comment.replies);

  // state hook to store comments
  const [replies, setReplies] = useState<Reply[]>([]);
  const [showAddReply, setShowAddReply] = useState<boolean>(false);

  useEffect(() => {
    //sending initial data to comments in state
    setReplies(allReplies);
    console.log(allReplies);
  }, []);

  const addScore = (id: number) => {
    setReplies((prevReplies) =>
      prevReplies.map((reply) =>
        reply.id === id ? { ...reply, score: reply.score + 1 } : reply
      )
    );
  };

  const subtractScore = (id: number) => {
    setReplies((prevReplies) =>
      prevReplies.map((reply) =>
        reply.id === id ? { ...reply, score: reply.score - 1 } : reply
      )
    );
  };

  const onReply = (id: number) => {
    console.log("replying to", id);
    setShowAddReply(!showAddReply);
  };

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
          <div> {showAddReply && <AddReply />} </div>
        </div>
      ))}{" "}
    </>
  );
};
export default Replies;
