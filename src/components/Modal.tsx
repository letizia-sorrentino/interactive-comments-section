import { CommentData } from "../types/types";

export interface ModalProps {
  comment: CommentData;
  onCancel: () => void;
  onModalDelete: (id: string, currentUser: string) => void;
}

const Modal: React.FC<ModalProps> = ({ comment, onCancel, onModalDelete }) => {
  return (
    <div className="modal">
      <div className="modalContainer" key={comment.id}>
        <h2>Delete Comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modalButtonsContainer">
          <button className="modalCancelButton" onClick={() => onCancel()}>
            NO, CANCEL
          </button>
          <button
            className="modalDeleteButton"
            onClick={() => onModalDelete(comment.id, comment.user.username)}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
