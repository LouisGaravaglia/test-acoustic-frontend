import React, {useState} from "react";
import Backend from "../Backend";


const Login: React.FC = () => {
  const INITIAL_VALUE = {
      username: "",
      password: "",
  };
  const [formData, setFormData] = useState(INITIAL_VALUE);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {name, value} = e.target as HTMLTextAreaElement;
    setFormData(data => ({
      ...data,
      [name]:value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = formData;
    try {
      const response = await Backend.loginUser(data);
      console.log("the response", response);
    } catch (e) {
      console.log("hit error", e);
    };
  };


////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
<div className="Home-Upper-Box">
  <div className="filler"></div>
  <h1 className="Login-Header">Welcome back</h1>
  <div className="Login-Container"></div>
    <form className="Login-Form" onSubmit={handleSubmit}>
      <div className="Login-Box">
        <input 
          type="text"
          id="LoginVal"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="Login-Form-Input"
          placeholder="username"
        />
      </div>
      <div className="Login-Box">
        <input 
          type="password"
          id="LoginVal"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="Login-Form-Input"
          placeholder="password"
        />
      </div>
    </form>
      </div>

      <div className="Home-Lower-Box">
        <button className="login-main-button">LOGIN</button>
        <button className="login-transition-element">LOGIN</button>
      </div>
    </>
  );
};

export default Login;

