import { CommentData } from "../../types/types";

interface CommentContentProps {
  comment: CommentData;
}

const CommentContent: React.FC<CommentContentProps> = ({ comment }) => (
  <p className="commentContent">{comment.content}</p>
);

export default CommentContent;
