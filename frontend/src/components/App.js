import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({})

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [signupSuccess, setSignupSuccess] = React.useState(false)
  const [isSignupPopupOpen, setSignupPopupOpen] = React.useState(false)

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.getInitialCards()
        .then((cards) => {
          setCards([...cards.reverse()])
        })
        .catch((err) => console.log(err))
    }
  }, [isLoggedIn])

    React.useEffect(() => {
      checkToken();
  }, []);

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res.user);
            setIsLoggedIn(true);
            setEmail(res.email);
            navigate('/', { replace: true })
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
}

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleAvatarProfileClick() {
    setEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
    setSignupPopupOpen(false)
  }

  function handleCardClick(card) {
    setImagePopupOpen(true)
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err))
  }

  const handleCardDelete = (card) => {
      api.deleteCard(card._id)
        .then(() => {
          setCards((state) => 
            state.filter((item) => item._id !== card._id)
          )
          closeAllPopups();
        })
        .catch(error => {
          console.log(error);
        });
  }

  function handleUpdateUser(userData) {
    api.setUserInfoApi(userData.name, userData.about)
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          name: data.user.name,
          about: data.user.about,
        });
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleUpdateAvatar(userData) {
    api.changeUserAvatar(userData)
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          avatar: data.user.avatar,
        })
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(cardData) {
    api.addUserCard(cardData)
      .then(() => {
        return api.getInitialCards();
      })
      .then((cards) => {
        setCards(cards.reverse());
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleRegister({password, email}) {
    auth.register({password, email})
      .then((res) => {
          console.log(res);
          setSignupSuccess(true);
          setSignupPopupOpen(true)
          navigate('/signin', {replace: true})
      })
      .catch((err) => {
        console.log(err);
        setSignupSuccess(false)
      })
      .finally (() => setSignupPopupOpen(true))
  }

  function handleAuth(password, email) {
    auth.authorize(password, email)
      .then(() => {
        api.getUserInfo()
        .then((res) => {
          setCurrentUser(res.user);
          setIsLoggedIn(true);
          setEmail(res.email);
          navigate('/', { replace: true })
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
        setSignupPopupOpen(true);
        setSignupSuccess(false);
    })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onClick={handleSignOut}
        />
        <Routes>
          <Route path='/' 
            element={
            <ProtectedRouteElement
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleAvatarProfileClick}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            cards={cards}
            isLoggedIn={isLoggedIn} 
            />
            }/>
          <Route path='/signup'
            element={<Register
            onRegister={handleRegister}
            />
          }
          />
          <Route path='/signin'
            element={<Login
            onAuth={handleAuth}/>}
          />
        </Routes>
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
        />
        <ImagePopup
          name="image"
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <InfoTooltip
        isOpen={isSignupPopupOpen}
        onClose={closeAllPopups}
        signupSuccess={signupSuccess}
        name='auth'
        tooltip={signupSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
