// import { useState } from "react";
// import { CommentData, UserData } from "../../types/types";
// import moment from "moment";
// import IconMinus from "../../assets/images/icon-minus.svg";
// import IconPlus from "../../assets/images/icon-plus.svg";
// import IconReply from "../../assets/images/icon-reply.svg";
// import IconDelete from "../../assets/images/icon-delete.svg";
// import IconUpdate from "../../assets/images/icon-edit.svg";
// import ReplyForm from "../ReplyForm/ReplyForm";
// import "./ReplyBox.css";

// //Define the properties that will be passed as props to the Comment component from the parent component:
// export interface CommentProps {
//   comment: CommentData;
//   currentUser: string;
//   addScore: (id: number) => void;
//   subtractScore: (id: number) => void;
//   onDeleteClick: (comment: CommentData) => void;
// }

// const ReplyBox: React.FC<CommentProps> = ({
//   comment,
//   currentUser,
//   addScore,
//   subtractScore,
//   addReply,
//   onDeleteClick: onDelete,
// }) => {
//   const [user] = useState<UserData>();
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [comments, setComments] = useState<CommentData[]>([]);
//   const [commentToUpdate, setCommentToUpdate] = useState<CommentData>();

//   const onReplyCLick = () => {
//     setShowReplyForm((prevShowReplyForm) => !prevShowReplyForm);
//   };

//   const onEditClick = () => {
//     // setCommentToUpdate(comment);
//     setShowEditForm(true);
//     console.log("onEditClick", showEditForm, comment.id);
//   };

//   const handleReply = (comment: string) => {
//     const newReply: CommentData = {
//       id: Number(new Date()) + Math.floor(Math.random() * 1000),
//       content: comment,
//       createdAt: moment(new Date()).fromNow(),
//       score: 0,
//       user: user!,
//       replies: [],
//     };
//     setComments((prevComments) => [...prevComments, newReply]);
//     console.log("reply", comment, newReply.id);
//   };

//   //update comment
//   // const handleEdit = (id: number, updatedComment: string) => {
//   //   const updatedComments = comments.map((comment) =>
//   //     comment.id === id ? { ...comment, content: updatedComment } : comment
//   //   );
//   //   setComments(updatedComments);
//   //   setCommentToUpdate(undefined);
//   //   console.log("updated", id, updatedComment);
//   // };

//   return (
//     <div>
//       <div className="commentContainer" key={comment.id}>
//         <div className="commentHeader">
//           {" "}
//           <img
//             className="avatar"
//             src={comment.user.image.png}
//             alt={comment.user.username}
//           />
//           <p className="userName">{comment.user.username}</p>
//           {comment.user.username === currentUser && (
//             <span className="currentUser">you</span>
//           )}
//           <p className="createdAt">{comment.createdAt}</p>
//         </div>
//         <p className="commentContent">{comment.content}</p>
//         <div className="buttonsContainer">
//           <div className="scoreButton">
//             <img
//               className="iconPlus"
//               src={IconPlus}
//               alt="iconPlus"
//               onClick={() => addScore(comment.id)}
//             ></img>
//             <div className="commentScore">{comment.score}</div>
//             <img
//               className="iconMinus"
//               src={IconMinus}
//               alt="iconMinus"
//               onClick={() => subtractScore(comment.id)}
//             ></img>
//           </div>

//           {comment.user.username !== currentUser ? (
//             <button className="replyButton" onClick={onReplyCLick}>
//               <img className="iconReply" src={IconReply} alt="iconReply" />{" "}
//               Reply
//             </button>
//           ) : (
//             <>
//               <button
//                 className="deleteButton"
//                 onClick={() => onDelete(comment)}
//               >
//                 {" "}
//                 <img className="iconDelete" src={IconDelete} alt="iconDelete" />
//                 Delete
//               </button>
//               <button className="updateButton" onClick={onEditClick}>
//                 {" "}
//                 <img className="iconUpdate" src={IconUpdate} alt="iconUpdate" />
//                 Edit
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//       <div className="formContainer">
//         {showReplyForm && (
//           <div>
//             <ReplyForm replyingTo={comment.user} addReply={handleReply} />
//           </div>
//         )}{" "}
//         {/* {showUpdateForm && <UpdateForm handleEdit={handleEdit(comment.id, comment)} />} */}
//       </div>
//     </div>
//   );
// };

// export default ReplyBox;
