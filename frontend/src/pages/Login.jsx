import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
        //this takes values of each field and assign them accordingly to the fields
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault()
  };

  //   return (
  //     <div>Register</div>
  //   )
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Sign in</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="form-control"
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="form-control"
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Sign In</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
