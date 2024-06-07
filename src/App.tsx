import CommentsList from "./components/CommentsList";
import RepliesList from "./components/RepliesList";
import CommentForm from "./components/CommentForm";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <CommentsList />
      <RepliesList />
      <CommentForm />
      <Footer />
    </>
  );
};

export default App;
