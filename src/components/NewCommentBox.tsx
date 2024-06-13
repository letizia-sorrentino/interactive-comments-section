// import { UserData } from "../types/types";
// import IconMinus from "../assets/images/icon-minus.svg";
// import IconPlus from "../assets/images/icon-plus.svg";
// import "../App.css";

// export interface NewCommentProps {
//   id: number;
//   content: string;
//   createdAt: string;
//   score: number;
//   user: UserData;
//   addScore: (id: number) => void;
//   subtractScore: (id: number) => void;
//   onDelete: (id: number) => void;
//   onUpdate: (id: number) => void;
// }

// const NewCommentBox: React.FC<NewCommentProps> = ({
//   id,
//   content,
//   createdAt,
//   score,
//   user,
//   addScore,
//   subtractScore,
//   onDelete,
//   onUpdate,
// }) => {
//   return (
//     <div className="newCommentContainer" key={id}>
//       <div className="commentHeader">
//         <img className="avatar" src={user.image.png} alt={user.username} />
//         <span className="username">{user.username}</span>
//         <span className="createdAt">{createdAt}</span>
//       </div>
//       <p className="commentContent">{content}</p>
//       <div className="buttonsContainer">
//         <div className="scoreButton">
//           <img
//             className="iconPlus"
//             src={IconPlus}
//             alt="iconPlus"
//             onClick={() => addScore(id)}
//           ></img>
//           <div className="commentScore">{score}</div>
//           <img
//             className="iconMinus"
//             src={IconMinus}
//             alt="iconMinus"
//             onClick={() => subtractScore(id)}
//           ></img>
//         </div>
//         <button onClick={() => onDelete(id)}>delete</button>
//         <button onClick={() => onUpdate(id)}>edit</button>
//       </div>
//     </div>
//   );
// };

// export default NewCommentBox;
