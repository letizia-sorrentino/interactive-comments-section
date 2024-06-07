import { useEffect, useState } from "react";
import data from "../data.json";
import { ReplyData, CommentThreadData } from "../types/types";
import Reply from "../components/Reply";
import "../App.css";

const RepliesList = () => {
  // initial data
  const initialData: CommentThreadData = data;

  //destructure initial data
  const { comments } = initialData;

  // Extract all replies into a single array
  const allReplies = comments.flatMap((comment) => comment.replies);

  // state hook to store comments
  const [replies, setReplies] = useState<ReplyData[]>([]);
  const [showReplyForm, setShowReplyForm] = useState<number>();

  useEffect(() => {
    //sending initial data to comments in state
    setReplies(allReplies);
    // console.log(allReplies);
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

  const onReplyCLick = (id: number) => {
    setShowReplyForm(id);
    console.log("replying to", id);
  };

  return (
    <>
      {replies.map((reply: ReplyData) => (
        <Reply
          key={reply.id}
          reply={reply}
          addScore={addScore}
          subtractScore={subtractScore}
          onReply={onReplyCLick}
          showReplyForm={showReplyForm}
        />
      ))}
    </>
  );
};
export default RepliesList;
