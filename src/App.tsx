import CommentsList from "./components/CommentsList";
import RepliesList from "./components/RepliesList";
import CommentForm from "./components/CommentForm";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  const handleCommentSubmit = (newComment: string) => {
    localStorage.setItem("new comment:", newComment);
    console.log("new comment:", newComment);
  };

  return (
    <>
      <CommentsList />
      <RepliesList />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
      <Footer />
    </>
  );
};

export default App;
