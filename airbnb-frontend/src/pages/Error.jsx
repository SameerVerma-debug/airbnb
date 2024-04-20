import { Link } from "react-router-dom"

export const Error = () => {
  return (
    <div className="error-page">
      <div>
      <h1>This URL does not exist</h1>
      <Link to="/">Click here to go back</Link>
      </div>
    </div>
  )
}