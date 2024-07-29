import { useState, useEffect, FormEvent } from "react";
import { ChangeEvent } from "react";
import axios from "axios";
import { AxiosError } from "axios";


function SignupForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState("");

  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [vaildConfirmed, setValidConfirmed] = useState(false);

  const [processDone, setProcessDone] = useState(false);

  useEffect(() => {
    setValidConfirmed(confirmed === password);
  }, [confirmed, password]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
    setValidUsername(value.length >= 5);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    setValidPassword(value.trim() !== "");
  };

  const handleConfirmendChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmed(value);
  };

  const checkInputsFilled = () => {
    return validUsername && validPassword && vaildConfirmed;
  };

  const [message, setMessage] = useState("");

  // Submit form data
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!checkInputsFilled()) return; // No submission if invalid inputs

    const formData = { username, password };

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/sign-up`;
      await axios.post(apiUrl, formData);
      setMessage("User created sucessfully. Return to login.");
      setProcessDone(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          setMessage(
            "Username is already taken. Please choose a different one."
          );
        } else {
          setMessage("The server is down right now.");
        }
      } else {
        setMessage("Unknown error.");
      }
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="LoginFormBox">
        <h3>Sign up</h3>
        <div className="line" />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"> Username </label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <div className="form-text"> At least 5 characters</div>
          </div>
          <div>
            <label className="form-label"> Password </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-text mb-3"> This is hashed automatically, so I never see your input!</div>
          <div className="mb-3">
            <label className="form-label"> Confirm password </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={confirmed}
              onChange={handleConfirmendChange}
            />
            <div
              className="form-text"
              style={{ color: vaildConfirmed ? "transparent" : "DarkRed" }}
            >
              Passwords must match
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!checkInputsFilled() || processDone}
            >
              {" "}
              Submit{" "}
            </button>
            <div style={{ color: "#FFC107", marginLeft: "50px", textAlign: "center"}}>{message}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignupForm;
