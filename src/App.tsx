import CommentsList from "./components/CommentsList";
import RepliesList from "./components/RepliesList";
import NewComment from "./components/CommentForm";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <CommentsList />
      <RepliesList />
      <NewComment />
      <Footer />
    </>
  );
};

export default App;
