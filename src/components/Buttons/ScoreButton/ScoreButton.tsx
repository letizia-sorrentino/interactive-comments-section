import { CommentData } from "../../../types/types";
import IconMinus from "../../../assets/images/icon-minus.svg";
import IconPlus from "../../../assets/images/icon-plus.svg";
import "./ScoreButton.css";

export interface ScoreButtonProps {
  comment: CommentData;
  addScore: (id: number) => void;
  subtractScore: (id: number) => void;
}

const ScoreButton: React.FC<ScoreButtonProps> = ({
  comment,
  addScore,
  subtractScore,
}) => {
  return (
    <div className="scoreButton">
      <img
        className="iconPlus"
        src={IconPlus}
        alt="iconPlus"
        onClick={() => addScore(comment.id)}
      ></img>
      <div className="commentScore">{comment.score}</div>
      <img
        className="iconMinus"
        src={IconMinus}
        alt="iconMinus"
        onClick={() => subtractScore(comment.id)}
      ></img>
    </div>
  );
};
export default ScoreButton;
