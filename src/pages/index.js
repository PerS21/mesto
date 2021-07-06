import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import {
  formConfig
} from "../utils/validFormConfig.js";
import '../pages/index.css';
// import {initialCards} from '../utils/initialCards.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupСonfirm from '../scripts/PopupСonfirm.js';
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js';

const section = new Section(".elements__list");

const profileEditForm = document.querySelector(".profile-edit-form");
const addPlacePopupForm = document.querySelector(".add-place-form");
const formEditProfileAvatar = document.querySelector(".profile-img-edit-popup");
const formDeleteCard = document.querySelector(".delete-card-form");



const validAddPlaceForm = new FormValidator(formConfig, addPlacePopupForm);
validAddPlaceForm.enableValidation();
const validProfileEditForm = new FormValidator(formConfig, profileEditForm);
validProfileEditForm.enableValidation();
const validFormEditProfileAvatar = new FormValidator(formConfig, formEditProfileAvatar);
validFormEditProfileAvatar.enableValidation();



const userInfo = new UserInfo('.profile__name', '.profile__prof', '.profile__avatar-img');

const popupEditProfile = new PopupWithForm(".profile-edit-popup", function (inputValues) {
  const button = profileEditForm.querySelector('.form__button-save')
  const buttonText = button.textContent;
  button.textContent = 'Сохранение...'
  api.patchUserInfo(inputValues.fild_name, inputValues.fild_about)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      popupEditProfile.close();
    })
    .finally(()=>{
      button.textContent = buttonText;
    })
});
popupEditProfile.setEventListeners();
const editButton = document.querySelector(".profile__edit-button");

editButton.addEventListener("click", () => {
  const newUserInfo = userInfo.getUserInfo()
  profileEditForm.querySelector('.profile-edit-form__input-fild-name').value = newUserInfo.name;
  profileEditForm.querySelector('.profile-edit-form__input-fild-about').value = newUserInfo.about;
  popupEditProfile.open();
  validProfileEditForm.checkFormValidity();
});

function createNewCard(data) {
  const card = new Card(data, "#template", userInfo, api,
    popupWithImage,
    openPopupDeleteCard,
    popupDeleteCard
  ).getCard();
  return card
}

const popupAddPlace = new PopupWithForm(".add-place-popup", function (inputValues) {
  const button = addPlacePopupForm.querySelector('.form__button-save')
  const buttonText = button.textContent;
  button.textContent = 'Сохранение...'
  api.addCard(inputValues.fild_place, inputValues.fild_img)
    .then(res => {
      section.addItem(createNewCard(res));
      popupAddPlace.close();
      validAddPlaceForm.checkFormValidity();
    })
    .finally(()=>{
      button.textContent = buttonText;
    })
});
popupAddPlace.setEventListeners();
const addPlaceButton = document.querySelector(".profile__add-button");
addPlaceButton.addEventListener("click", () => {
  validAddPlaceForm.checkFormValidity();
  popupAddPlace.open();
});

const elements = document.querySelector(".elements__list");

const popupWithImage = new PopupWithImage(".imgPopup");
popupWithImage.setEventListeners();

const api = new Api();

api.getUser().then(user => {
  userInfo.setUserInfo(user.name, user.about);
  userInfo.setUserAvatar(user.avatar);
  userInfo.setUserId(user._id);
  api.getCards().then(cards => {
    cards.reverse()
    cards.forEach(item => {
      section.addItem(createNewCard(item));
    })
  })
})

const buttonEditProfileAvatar = document.querySelector('.profile__avatar');
const popupEditProfileAvatar = new PopupWithForm(".profile-img-edit-popup", function (inputValues) {
  const button = formEditProfileAvatar.querySelector('.form__button-save');
  const buttonText = button.textContent;
  button.textContent = 'Сохранение...'
  api.patchUserImg(inputValues.fild_img)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
      popupEditProfileAvatar.close();
      formEditProfileAvatar.querySelector('.form__button-save').textContent = buttonText;
    })
    .finally(()=>{
      button.textContent = 'Сохраненить'
    })
});

function openPopupEditProfileAvatar() {
  validFormEditProfileAvatar.checkFormValidity();
  popupEditProfileAvatar.open();
}

popupEditProfileAvatar.setEventListeners();

buttonEditProfileAvatar.addEventListener('click', openPopupEditProfileAvatar);

const popupDeleteCard = new PopupСonfirm(".cardDelete-popup", function (cardId, cardElement) {
  const button = formDeleteCard.querySelector('.form__button-save');
  const buttonText = button.textContent;
  button.textContent = 'Удаление...'
  api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      popupDeleteCard.close();
    })
    .finally(()=>{
      button.textContent = buttonText;
    })
})

popupDeleteCard.setEventListeners();
// popupDeleteCard.addEventListener('submit', popupDeleteCard.setConfirmHandler)
// formDeleteCard.addEventListener('submit', console.log(evt))
// popupDeleteCard.setConfirmHandler(cardId, cardElement);

function openPopupDeleteCard(cardId, cardElement) {
  // formDeleteCard.addEventListener('submit', popupDeleteCard.setConfirmHandler(cardId, cardElement))
  popupDeleteCard.setConfirmHandler(cardId, cardElement);
  popupDeleteCard.open();
}