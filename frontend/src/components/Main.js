import React from 'react';
import pencil from '../images/Vector(2).svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, handleCardLike, handleCardDelete, cards}) {
  const currentUser = React.useContext(CurrentUserContext)
    return (
      <main className="content">
        <div className="profile">
          <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="Жак-Ив Кусто" className="profile__ellipse"/>
            <button className="profile__ellipse-pencil" type="button"></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button type="button" className="profile__info-edit-button" onClick={onEditProfile}>
              <img src={pencil} alt="Карандаш" className="profile__pencil"/>
            </button>
            <p className="profile__info-text">{currentUser.about}</p>
          </div>
          <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
        </div>
        <section className="elements">
          {
            cards.map((card) => {
              return (
                <Card
                  card={card}
                  key={card._id}
                  onCardClick={onCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              )
            })
          }
        </section>
        </main>
    ) 
}

export default Main;
