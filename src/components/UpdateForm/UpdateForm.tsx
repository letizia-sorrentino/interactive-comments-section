import React, { useState } from "react";
import { CommentData } from "../../types/types";

export interface UpdateFormProps {
  comment: CommentData;
  handleEdit: (comment: CommentData) => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ comment, handleEdit }) => {
  // const [commentToUpdate, setCommentToUpdate] = useState<CommentData>();
  const [updatedComment, setUpdatedComment] = useState<string>("");


  const handleUpdateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedComment(e.target.value);
    console.log(updatedComment);
  };

  const handleUpdateSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleEdit({ ...comment, content: updatedComment });
  };
  return (
    <>
      {" "}
      <form className="updateCommentForm">
        <textarea
          className="updateInput"
          placeholder={comment.content}
          onChange={handleUpdateChange}
        ></textarea>

        <button className="updateButton" onClick={handleUpdateSubmit}>
          Update
        </button>
      </form>
    </>
  );
};
export default UpdateForm;
