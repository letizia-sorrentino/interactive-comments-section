import { CommentData } from "../../types/types";
import "./UpdateButton.css";

export interface UpdateButtonProps {
  comment: CommentData;
  handleEdit: (comment: CommentData) => void;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ comment, handleEdit }) => (
  <button
    className="updateButton"
    onClick={() => {
      handleEdit(comment);
    }}
  >
    Update
  </button>
);

export default UpdateButton;
