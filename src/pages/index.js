import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  formConfig
} from "../utils/validFormConfig.js";
import '../pages/index.css';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupСonfirm from '../components/PopupСonfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const section = new Section(".elements__list", (item)=>{return createNewCard(item)});


const profileEditForm = document.querySelector(".profile-edit-form");
const addPlacePopupForm = document.querySelector(".add-place-form");
const formEditProfileAvatar = document.querySelector(".profile-img-edit-popup");
const formDeleteCard = document.querySelector(".delete-card-form");

const buttonProfileEditFormSave = profileEditForm.querySelector('.form__button-save')
const buttonAddPlacePopupFormSave = addPlacePopupForm.querySelector('.form__button-save')
const buttonFormEditProfileAvatarSave = formEditProfileAvatar.querySelector('.form__button-save');
const buttonFormDeleteCardSave = formDeleteCard.querySelector('.form__button-save');

const inputprofileEditFormName = profileEditForm.querySelector('.profile-edit-form__input-fild-name');
const inputprofileEditFormAbout = profileEditForm.querySelector('.profile-edit-form__input-fild-about');

const validAddPlaceForm = new FormValidator(formConfig, addPlacePopupForm);
const validProfileEditForm = new FormValidator(formConfig, profileEditForm);
const validFormEditProfileAvatar = new FormValidator(formConfig, formEditProfileAvatar);

validAddPlaceForm.enableValidation();
validProfileEditForm.enableValidation();
validFormEditProfileAvatar.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__prof', '.profile__avatar-img');

const popupEditProfile = new PopupWithForm(".profile-edit-popup", function (inputValues) {
  const buttonText = buttonProfileEditFormSave.textContent;
  buttonProfileEditFormSave.textContent = 'Сохранение...'
  api.patchUserInfo(inputValues.fild_name, inputValues.fild_about)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      popupEditProfile.close();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      buttonProfileEditFormSave.textContent = buttonText;
    })
});
popupEditProfile.setEventListeners();
const editButton = document.querySelector(".profile__edit-button");

editButton.addEventListener("click", () => {
  const newUserInfo = userInfo.getUserInfo()
  inputprofileEditFormName.value = newUserInfo.name;
  inputprofileEditFormAbout.value = newUserInfo.about;
  popupEditProfile.open();
  validProfileEditForm.checkFormValidity();
});

function createNewCard(data) {
  const card = new Card(data, "#template", userInfo, api,
    popupWithImage,
    (cardId,cardElement)=>{return openPopupDeleteCard(cardId,cardElement)},
  ).getCard();
  return card
}



const popupAddPlace = new PopupWithForm(".add-place-popup", function (inputValues) {
  const buttonText = buttonAddPlacePopupFormSave.textContent;
  buttonAddPlacePopupFormSave.textContent = 'Сохранение...'
  api.addCard(inputValues.fild_place, inputValues.fild_img)
    .then(res => {
      section.addItem(res);
      popupAddPlace.close();
      validAddPlaceForm.checkFormValidity();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      buttonAddPlacePopupFormSave.textContent = buttonText;
    })
});
popupAddPlace.setEventListeners();
const addPlaceButton = document.querySelector(".profile__add-button");
addPlaceButton.addEventListener("click", () => {
  validAddPlaceForm.checkFormValidity();
  popupAddPlace.open();
});

const popupWithImage = new PopupWithImage(".imgPopup");
popupWithImage.setEventListeners();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-25', 'da22e24c-dd01-4958-b7cb-8f4974dde69d');

api.getUser()
  .then(user => {
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
    userInfo.setUserId(user._id);
    api.getCards()
      .then(cards => {
        cards.reverse()
        cards.forEach(item => {
          section.addItem(item);
        })
      })
      .catch(error => {
        console.log(error)
      })
  })
  .catch(error => {
    console.log(error)
  })

const buttonEditProfileAvatar = document.querySelector('.profile__avatar');
const popupEditProfileAvatar = new PopupWithForm(".profile-img-edit-popup", function (inputValues) {
  const buttonText = buttonFormEditProfileAvatarSave.textContent;
  buttonFormEditProfileAvatarSave.textContent = 'Сохранение...'
  api.patchUserImg(inputValues.fild_img)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
      popupEditProfileAvatar.close();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      buttonFormEditProfileAvatarSave.textContent = buttonText;
    })
});

function openPopupEditProfileAvatar() {
  validFormEditProfileAvatar.checkFormValidity();
  popupEditProfileAvatar.open();
}

popupEditProfileAvatar.setEventListeners();

buttonEditProfileAvatar.addEventListener('click', openPopupEditProfileAvatar);

const popupDeleteCard = new PopupСonfirm(".cardDelete-popup")

popupDeleteCard.setEventListeners();

function openPopupDeleteCard(cardId, cardElement) {
  popupDeleteCard.setConfirmHandler(() => {
    const button = formDeleteCard.querySelector('.form__button-save');
    const buttonText = button.textContent;
    button.textContent = 'Удаление...'
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        popupDeleteCard.close();
      })
      .catch(err => console.log(err) )
      .finally(()=>{
        button.textContent = buttonText;
      })
    });
  popupDeleteCard.open();
}