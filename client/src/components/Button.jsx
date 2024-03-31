import "../styles/button.css"

export const Button = ({ id, text }) => {
  return <button className={id}>{text}</button>;
};
