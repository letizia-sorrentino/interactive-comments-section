import Comment from "./components/Comments";
import Replies from "./components/Replies";
import AddComment from "./components/AddComment";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <Comment />
      <Replies />
      <AddComment />
      <Footer />
    </>
  );
};

export default App;
