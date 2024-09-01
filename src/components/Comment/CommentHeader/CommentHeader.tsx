import { UserData } from "../../types/types";
import "./CommentHeader.css";

export interface CommentHeaderProps {
  user: UserData;
  currentUser: string;
  createdAt: string;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({
  user,
  currentUser,
  createdAt,
}) => (
  <div className="commentHeader">
    <img className="avatar" src={user.image.png} alt={user.username} />
    <p className="userName">{user.username}</p>
    {user.username === currentUser && <span className="currentUser">you</span>}
    <p className="createdAt">{createdAt}</p>
  </div>
);

export default CommentHeader;
