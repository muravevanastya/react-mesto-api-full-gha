import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const updateUserData = React.useCallback(() => {
    console.log(currentUser.name)
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  React.useEffect(() => {
    updateUserData();
  }, [currentUser, updateUserData]);

  // React.useEffect(() => {
  //   console.log(currentUser.name)
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser, props.isOpen]); 

  // React.useEffect(() => {
  //   if (currentUser && currentUser.name && currentUser.about) {
  //     setName(currentUser.name);
  //     setDescription(currentUser.about);
  //   }
  // }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  } 

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      noValidate
      >
      <input 
      className="popup__input popup__input_type_name" 
      id="profile-name" 
      type="text" 
      name="name" 
      placeholder="Имя" 
      minLength="2" 
      maxLength="40" 
      required
      value={name || ''}
      onChange={handleNameChange}
      />
      <span className="profile-name-error popup__error"></span>
      <input 
      className="popup__input popup__input_type_job" 
      id="profile-job" 
      type="text" 
      name="description" 
      placeholder="Вид деятельности" 
      minLength="2"
      maxLength="200" 
      required
      value={description || ''}
      onChange={handleDescriptionChange}
      />
      <span className="profile-job-error popup__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup