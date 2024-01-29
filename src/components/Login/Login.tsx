import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/userSlice";
import { UserData } from "../../redux/user";
import style from "./login.module.css";
const Login = ({ onLogin }) => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = UserData.find(
      (user) => user.login === login && user.password === password
    );

    if (user) {
      dispatch(loginUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      console.log("вы авторизовались ");
      onLogin(true);
    } else {
    }
  };

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Введите ваш логин</label>
            <input type="text" value={login} onChange={handleLoginChange} />
          </div>
          <div>
            <label>Введите ваш пароль</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className={style.auth_user} type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
