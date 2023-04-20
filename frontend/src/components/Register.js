import React from "react";
import { Link } from "react-router-dom";

function Register({onRegister}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({password, email})
  }

  return (
    <form className="register__form" onSubmit={handleSubmit}>
      <h3 className="register__title">Регистрация</h3>
      <input
        className="register__input"
        placeholder="Email"
        name='email'
        type='email'
        id="email"
        minLength='6'
        maxLength='64'
        onChange={handleEmailChange}
        value={email || ""}
        required
      />
      <input
        className="register__input"
        placeholder="Пароль"
        type="password"
        name="password"
        id="password"
        minLength='8'
        onChange={handlePasswordChange}
        value={password || ""}
        required
      />
      <button className="register__button" type="submit">Зарегистрироваться</button>
      <Link to='/sign-in' className="register__link">Уже зарегестрированы? Войти</Link>
    </form>
  )
}

export default Register;