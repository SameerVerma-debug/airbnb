import "../styles/button.css"

export const Button = ({ id, text }) => {
  return <button className="primary" id={id}>{text}</button>;
};
