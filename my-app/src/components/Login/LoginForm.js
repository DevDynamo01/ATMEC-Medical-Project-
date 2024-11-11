import React, { useState } from 'react';
import './LoginForm.css'; // Assume your CSS is in this file
import loginImage from '../../assets/login-form-image.jpg';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [cookies, setCookie] = useCookies(['userinfo']);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response=await axios.post(${API_URL}/login,{"user":user,"password":password});
      const user_payload = { _id: { password }, email: { user }, role: { role } };
      // cookie will expire in 3 days
      const expires = new Date();
      expires.setDate(expires.getDate() + 3);
      setCookie('userinfo', user_payload, { path: '/', expires: expires });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper fadeInDown">
      {console.log(cookies.user)}
      <div id="formContent">
        {/* Tabs Titles */}
        <div className="flex gap-2 justify-center">
          <h2 className="active">Sign In</h2>
          <h2 className="inactive underlineHover">Sign Up</h2>
        </div>
        {/* Icon */}
        <div className="flex justify-center">
          <img className="logo_img" src={loginImage} id="icon" alt="User Icon" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="user"
            className="fadeIn second"
            name="user"
            placeholder="login"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="role"
            id="role"
            className="fadeIn fourth"
            name="role"
            placeholder="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>

        {/* Remind Password */}
        <div id="formFooter">
          <a className="underlineHover" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
