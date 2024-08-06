import "./Button.scss";

interface IButton {
  onClick: () => void;
  label: string;
}

const Button: React.FC<IButton> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="button" data-testid="button">
      {label}
    </button>
  );
};

// const Button: React.FC<IButton> = (props) => {
//   const { label } = props;
//   return <button>{label}</button>;
// };

// const Button: React.FC<IButton> = (props) => {
//     return <button>{props.label}</button>;
//   };

export default Button;
