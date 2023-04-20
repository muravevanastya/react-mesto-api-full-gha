import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleNameChange(e) {
    setName(e.target.value)
  }
    
  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="add"
      title="Новое место"
      buttonText="Создать"
      noValidate
      >
      <input 
      className="popup__input popup__input_type_name" 
      id="cards-name" 
      type="text" 
      name="name" 
      placeholder="Название" 
      minLength="2" 
      maxLength="30" 
      required
      onChange={handleNameChange}
      value={name ? name : ''}
      />
      <span className="cards-name-error popup__error"></span>
      <input 
      className="popup__input popup__input_type_job" 
      id="cards-link" 
      type="url" 
      name="link" 
      placeholder="Ссылка на картинку" 
      required
      onChange={handleLinkChange}
      value={link ? link : ''}
      />
      <span className="cards-link-error popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
