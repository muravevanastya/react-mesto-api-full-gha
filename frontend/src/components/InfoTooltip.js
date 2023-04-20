import React from "react";
import success from '../images/success.png';
import fail from '../images/fail.png';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
      <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      <img className="popup__auth-img" src={props.signupSuccess ? success : fail}></img>
      <h2 className="popup__title popup__auth-title">{props.tooltip}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
