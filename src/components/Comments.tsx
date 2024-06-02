import { useEffect, useState } from "react";
import data from "../data.json";

type Image = {
  png: string;
  webp: string;
};

type User = {
  image: Image;
  username: string;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies?: Comment[];
  replyingTo?: string;
};

type Data = {
  currentUser: User;
  comments: Comment[];
};

// initial data
const initialData: Data = data;

const Comments = () => {
  // state hook to store comments
  // const [user, setUser] = useState(initialData);
  const [comments, setComments] = useState<Comment[]>(initialData.comments);
  useEffect(() => {
    // setUser(initialData);
    setComments(initialData.comments);
    console.log(initialData.comments);
  }, []);

  return (
    <>
      {comments.map((comment: Comment) => (
        <div key={comment.id}>
          <img src={comment.user.image.webp} alt={comment.user.username} />
          <p>{comment.user.username}</p>
          <p>{comment.content}</p>
          <p>{comment.createdAt}</p>
          <p>{comment.score}</p>
        </div>
      ))}
    </>
  );
};

export default Comments;
