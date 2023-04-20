import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef('')

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  } 

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])

  return (
    <PopupWithForm 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      noValidate
      >
      <input 
      className="popup__input popup__input_type_avatar" 
      id="popup-avatar" 
      type="url" 
      name="userAvatar" 
      placeholder="Ссылка на картинку" 
      required
      ref={avatarRef}
      />
      <span className="popup__error popup-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;

