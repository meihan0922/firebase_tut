import React from "react";
import "./signin.scss";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  const handleChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        console.log(e.target.id);
    }
  };
  return (
    <div className="sign signin">
      <form action="" onSubmit={handleSubmit}>
        <h5>Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="">
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
