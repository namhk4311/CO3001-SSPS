import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import './Login.css';

interface LoginProps {
  // onLogin: () => void;
}

const Login = () => {
  const [value, setValue] = React.useState({
      email: '',
      password: '',
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

    const [errors, setErrors] = React.useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e: React.ChangeEvent<any>) => {
      e.preventDefault();
      // setErrors(Validation(value));
      if (errors.email === "" && errors.password === "") {
        axios.post('http://localhost:8081/login', value) 
        .then(res => {
          console.log(res.data.Login);
          if (res.data.Login) {
            localStorage.setItem("token", res.data.token);
            navigate('/');
          }
          else {
            alert('Invalid email/password');
            console.log("No record existed");
          } 
        })
        .catch(res => console.log(res));
      }
      console.log(errors);
    }
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Chào mừng bạn đến với SSPS</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Tài khoản</label>
            <input 
                type="email" 
                id="username" 
                placeholder="Hãy nhập email"
                onChange={e => setValue({...value, email: e.target.value})}
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Hãy nhập mật khẩu" 
              onChange={e => setValue({...value, password: e.target.value})}
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
      <div className="image-container">
        <img src="image/login.png" alt="Background" />
      </div>
      <img src="image/bk.png" alt="Small Decorative" className="small-image"/>
    </div>
  );
};

export default Login;

