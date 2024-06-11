import { UserData } from "../types/types";
// import IconMinus from "../assets/images/icon-minus.svg";
// import IconPlus from "../assets/images/icon-plus.svg";
import "../App.css";

//Define the properties that will be passed as props to the Comment component from the parent component:
export interface NewCommentProps {
  user: UserData;
  content: string;
  // timestamp: string;
  //   id: number;
  //   score: number;
  //   addScore: (id: number) => void;
  //   subtractScore: (id: number) => void;
  //   onDelete: (id: number) => void;
  //   onUpdate: (id: number) => void;
}

const NewComment: React.FC<NewCommentProps> = ({
  user,
  content,
  // timestamp,
  //   id,
  //   score,
  //   addScore,
  //   subtractScore,
  //   onDelete,
  //   onUpdate,
}) => {
  return (
    <div className="commentContainer">
      <div className="commentHeader">
        <img className="avatar" src={user.image.png} alt={user.username} />
        <span className="username">{user.username}</span>
        {/* <span className="createdAt">{timestamp}</span> */}
      </div>
      <p className="commentContent">{content}</p>
      <div className="buttonsContainer">
        {/* <div className="scoreButton">
          <img
            className="iconPlus"
            src={IconPlus}
            alt="iconPlus"
            onClick={() => addScore(newComment.id)}
          ></img>
          <div className="commentScore">{0}</div>
          <img
            className="iconMinus"
            src={IconMinus}
            alt="iconMinus"
            onClick={() => subtractScore(newComment.id)}
          ></img>
        </div> */}
        {/* <button onClick={() => onDelete(newComment.id)}>delete</button>
        <button onClick={() => onUpdate(newComment.id)}>edit</button> */}
      </div>
    </div>
  );
};

export default NewComment;
