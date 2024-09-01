import IconUpdate from "../../../assets/images/icon-edit.svg";
import { CommentData } from "../../../types/types";
import "./EditButton.css";

interface EditButtonProps {
  comment: CommentData;
  onEditClick: (comment: CommentData) => void;
}

const EditButton: React.FC<EditButtonProps> = ({ comment, onEditClick }) => (
  <button
    className="editButton"
    onClick={() => {
      onEditClick(comment);
    }}
  >
    <img className="iconUpdate" src={IconUpdate} alt="iconUpdate" />
    Edit
  </button>
);

export default EditButton;
