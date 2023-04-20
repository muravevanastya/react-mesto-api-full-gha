function ImagePopup(props) {
  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img className="popup__image-open" src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : ''}/>
        <p className="popup__image-title">{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  )
}

export default ImagePopup;