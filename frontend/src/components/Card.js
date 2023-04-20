import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && "element__like_active"}` 
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  return (
    <div className="elements-template">
      <div className="element">
        {isOwn && <button className="element__delete" onClick={handleDeleteClick} />} 
        <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick}/>
        <div className="element__description">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-zone">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
            <span className="element__like-counter">{props.card.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;