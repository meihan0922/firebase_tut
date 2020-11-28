import React from "react";
import "./signin.scss";

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, firstName, lastName);
  };
  const handleChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "firstname":
        setFirstName(e.target.value);
        break;
      case "lastname":
        setLastName(e.target.value);
        break;
      default:
        console.log(e.target.id);
    }
  };
  return (
    <div className="sign signup">
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
        <div className="input-field">
          <label htmlFor="lastname">Last name</label>
          <input type="text" id="lastname" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="firstname">First name</label>
          <input type="text" id="firstname" onChange={handleChange} />
        </div>
        <div className="">
          <button>SignUp</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
