import { useEffect, useState } from "react";
import data from "../data.json";
import { ReplyData, CommentThreadData } from "../types/types";
import Reply from "../components/Reply";
import "../App.css";

const RepliesList = () => {
  // initial data
  const initialData: CommentThreadData = data;

  const { comments } = initialData;

  // Extract all replies into a single array
  const allReplies = comments.flatMap((comment) => comment.replies);

  // state hook to store comments
  const [replies, setReplies] = useState<ReplyData[]>([]);
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);

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
    setShowReplyForm(!showReplyForm);
  };

  return (
    <>
      {replies.map((reply: ReplyData) => (
        <Reply
          key={reply.id}
          reply={reply}
          addScore={addScore}
          subtractScore={subtractScore}
          onReply={onReply}
          showReplyForm={showReplyForm}
        />
      ))}
    </>
  );
};
export default RepliesList;
