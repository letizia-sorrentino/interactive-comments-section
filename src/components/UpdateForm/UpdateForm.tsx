import React, { useState } from "react";
import { CommentData } from "../types/types";

export interface UpdateFormProps {
  comment: CommentData;
  id: number;
  handleEdit: (id: number, comment: string) => void;
  updatedComment: string;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ id, handleEdit }) => {
  const [updatedComment, setUpdatedComment] = useState<string>("");

  const handleUpdateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedComment(e.target.value);
    console.log(updatedComment);
  };

  return (
    <>
      {" "}
      <form
        //onSubmit={handleReplySubmit}
        className="updateCommentForm"
      >
        <textarea
          className="updateInput"
          // placeholder={comment}
          onChange={handleUpdateChange}
        ></textarea>

        <button
          className="updateButton"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleEdit(id, comment)
          }
        >
          Update
        </button>
      </form>
    </>
  );
};
export default UpdateForm;
