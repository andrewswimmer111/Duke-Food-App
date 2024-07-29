import { FormEvent, useState } from "react";
import { ChangeEvent } from "react";
import axios from "axios";

interface Props {
  setPage: (page: number) => void;
  setUser: (user: string) => void;
}


function LoginForm( {setPage, setUser}: Props ) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [message, setMessage] = useState("");

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

  const checkInputsFilled = () => {
    return validUsername && validPassword;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!checkInputsFilled()) return; // No submission if invalid inputs

    const formData = {username, password};

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/login`;
      const response = await axios.post(apiUrl, formData);

      if (response.status === 200) {
        setUser(username); // Remembers user
        setPage(2); // Sets page to 2
      }

    }
    catch (error: any) {
      if (error.response && error.response.status === 404) {
        setMessage("Incorrect username. Make sure you signed up.")
      }
      else if (error.response && error.response.status === 401) {
        setMessage("Incorrect password. Try again.")
      }
      else {
        setMessage("Sorry, server is down right now.")
      }
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="LoginFormBox">
        <h3>Login</h3>
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
            <div className="form-text"> If you don't have an account, sign up!</div>
          </div>
          <div className="mb-3">
            <label className="form-label"> Password </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-3"
            disabled={!checkInputsFilled()}
          >
            {" "}
            Submit{" "}
          </button>
          <div className="form-text" style={{color: "darkred"}}> {message} </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
