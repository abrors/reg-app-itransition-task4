import Card from "../components/UI/Card";
import axios from "../plugins/axios";
import { useRef } from "react";
import { Link } from "react-router-dom";

function Login() {
  const inputUsername = useRef();
  const inputPassword = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredUsername = inputUsername.current.value;
    const enteredPassword = inputPassword.current.value;
    if (enteredUsername.trim().length === 0) {
      alert("Please enter username.");
      return false;
    }
    if (enteredPassword.trim().length === 0 || enteredPassword.length < 4) {
      alert("Password should not be empty or less than 4 characters.");
      return false;
    }
    const loginData = {
      username: enteredUsername,
      password: enteredPassword,
    };
    try {
      const res = await axios.post("/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Please check your username and password");
      return false;
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <p>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
        <div className="mb-3">
          <label htmlFor="email" className="label">
            E-mail
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="your-email@gmail.com"
            ref={inputUsername}
            required
          />
        </div>
        <div class="mb-3">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            placeholder="password123"
            type="password"
            required
            ref={inputPassword}
          />
        </div>
        <div>
          <button
            className="btn btn-success"
            type="submit"
            to="/"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </Card>
  );
}
export default Login;
