import IconDelete from "../../../assets/images/icon-delete.svg";
import { CommentData } from "../../../types/types";
import "./DeleteButton.css";

interface DeleteButtonProps {
  comment: CommentData;
  onDeleteClick: (comment: CommentData) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  comment,
  onDeleteClick: onDelete,
}) => (
  <button className="deleteButton" onClick={() => onDelete(comment)}>
    {" "}
    <img className="iconDelete" src={IconDelete} alt="iconDelete" />
    Delete
  </button>
);

export default DeleteButton;
