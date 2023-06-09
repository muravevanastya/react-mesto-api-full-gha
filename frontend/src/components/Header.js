import React from 'react';
import headerLogo from '../images/Vector.svg';
import { Routes, Route, Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header({email, onClick}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <header className="header">
      <img src={headerLogo} alt="Место: Россия" className="header__logo"/>
      <Routes>
        <Route
          path='/'
          element={
            <div className='header__container'>
              <p className='header__email'>{currentUser.email}</p>
              <Link to='/signin' className='header__signout' onClick={onClick}>Выйти</Link>
            </div>
          }
        />
        <Route
          path='/signup'
          element={
            <Link to='/signin' className='header__link'>Войти</Link>
          }
        />
        <Route
          path='/signin'
          element={
            <Link to='/signup' className='header__link'>Регистрация</Link>
          }
        />
      </Routes>
    </header>
  )
}

export default Header;