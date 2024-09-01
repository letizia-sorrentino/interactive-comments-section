import { useState } from "react";
import { CommentData, CommentThreadData } from "../../../types/types";
import data from "../../../data.json";
import ReplyForm from "../../Forms/ReplyForm/ReplyForm";
import UpdateForm from "../../Forms/UpdateForm/UpdateForm";
import ScoreButton from "../../Buttons/ScoreButton/ScoreButton";
import ReplyButton from "../../Buttons/ReplyButton/ReplyButton";
import DeleteButton from "../../Buttons/DeleteButton/DeleteButton";
import EditButton from "../../Buttons/EditButton/EditButton";
import CommentHeader from "../../Comment/CommentHeader/CommentHeader";
import CommentContent from "../CommentContent/CommentContent";
import "./CommentBox.css";

//Define the properties that will be passed as props to the Comment component from the parent component:
export interface CommentProps {
  comment: CommentData;
  currentUser: string;
  addReply: (reply: string) => void;
  handleEdit: (comment: CommentData) => void;
  onDeleteClick: (comment: CommentData) => void;
}

// initial data
const initialData: CommentThreadData = data;

const CommentBox: React.FC<CommentProps> = ({
  comment,
  currentUser,
  addReply,
  handleEdit,
  onDeleteClick: onDelete,
}) => {
  const [comments, setComments] = useState<CommentData[]>(initialData.comments);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [commentToUpdate, setCommentToUpdate] = useState<CommentData>();

  /**
   * A function that takes a comment's id and increases its score.
   * @param id which is a number
   * The result is the score increases from the user clicking on it.
   */
  const addScore = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, score: comment.score + 1 } : comment
      )
    );
    // console.log(comments);
  };

  /**
   * A function that takes a comment's id and decreases its score
   * @param id which is a number
   * The result is the score decreased from the user clicking on it.
   */
  const subtractScore = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, score: comment.score - 1 } : comment
      )
    );
    // console.log(comments);
  };

  const onReply = () => {
    setShowReplyForm(!showReplyForm);
  };

  const onEdit = (comment: CommentData) => () => {
    setCommentToUpdate(comment);
    setShowEditForm(!showEditForm);
    console.log("Edit button clicked", comment);
  };

  return (
    <div>
      <div className="commentContainer" key={comment.id}>
        <CommentHeader
          user={comment.user}
          createdAt={comment.createdAt}
          currentUser={currentUser}
        />
        <CommentContent comment={comment} />
        <div className="buttonsContainer">
          <ScoreButton
            comment={comment}
            subtractScore={subtractScore}
            addScore={addScore}
          />

          {comment.user.username !== currentUser ? (
            <ReplyButton onReplyClick={onReply} />
          ) : (
            <>
              <DeleteButton comment={comment} onDeleteClick={onDelete} />
              <EditButton comment={comment} onEditClick={onEdit(comment)} />
            </>
          )}
        </div>
      </div>
      <div className="formContainer">
        {showReplyForm && (
          <div>
            <ReplyForm replyingTo={comment.user} addReply={addReply} />
          </div>
        )}
        {showEditForm && (
          <div>
            <UpdateForm
              comment={comment}
              currentUser={currentUser}
              addScore={addScore}
              subtractScore={subtractScore}
              onReplyClick={onReply}
              onEditClick={onEdit}
              handleEdit={handleEdit}
              onDeleteClick={onDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
