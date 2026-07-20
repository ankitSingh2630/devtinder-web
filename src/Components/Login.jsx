import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="brand login-brand">
          <span className="brand-mark">&lt;/&gt;</span>DevTinder
        </div>
        <div className="login-intro">
          <h1>
            Find your next
            <br />
            <strong>dev partner.</strong>
          </h1>
          <p>
            Connect with engineers who share your stack, vision, and ambition.
          </p>
        </div>
        <section className="glass-card auth-card">
          <h2>{isLogin ? "Sign in to your account" : "Create your account"}</h2>
          {!isLogin && (
            <div className="field-grid">
              <div className="field">
                <label>First name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Last name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={emailId}
              placeholder="you@example.com"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button
            className="primary-button"
            style={{ width: "100%" }}
            onClick={isLogin ? handleLogin : handleSignUp}
          >
            {isLogin ? "Sign In" : "Create account"}
          </button>
          <p className="auth-switch">
            {isLogin ? "New to DevTinder?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </p>
        </section>
      </div>
    </div>
  );
};
export default Login;
