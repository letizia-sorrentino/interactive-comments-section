const Modal = () => {
  return (
    <div className="modal">
      <div className="modalContainer">
        <h2>Delete Comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modalButtonsContainer">
          <button className="modalCancelButton">NO, CANCEL</button>
          <button className="modalDeleteButton">YES, DELETE</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
