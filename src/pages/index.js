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
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js';

const section = new Section(".elements__list");

const profileEditForm = document.querySelector(".profile-edit-form");
const addPlacePopupForm = document.querySelector(".add-place-form");
const formEditProfileAvatar = document.querySelector(".profile-img-edit-popup");


const validAddPlaceForm = new FormValidator(formConfig, addPlacePopupForm);
validAddPlaceForm.enableValidation();
const validProfileEditForm = new FormValidator(formConfig, profileEditForm);
validProfileEditForm.enableValidation();
const validFormEditProfileAvatar = new FormValidator(formConfig, formEditProfileAvatar);
validFormEditProfileAvatar.enableValidation();



const userInfo = new UserInfo('.profile__name', '.profile__prof', '.profile__avatar-img');

const popupEditProfile = new PopupWithForm(".profile-edit-popup", function (inputValues) {
  userInfo.setUserInfo(inputValues.fild_name, inputValues.fild_about);
  popupEditProfile.close();
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
  const card = new Card(data, "#template", (cardImg, cardText) => popupWithImage.open(cardImg, cardText)).getCard();
  return card
}

const popupAddPlace = new PopupWithForm(".add-place-popup", function (inputValues) {
  const newElementConfig = {};
  newElementConfig.name = inputValues.fild_place;
  newElementConfig.link = inputValues.fild_img;
  section.addItem(createNewCard(newElementConfig));
  popupAddPlace.close();
  validAddPlaceForm.checkFormValidity();
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
// api.addCard();
// api.deleteCard();
// api.patchUserImg();
// api.patchUserInfo();

api.getUser().then(user => {
  userInfo.setUserInfo(user.name, user.about);
  userInfo.setUserAvatar(user.avatar);
  api.getCards().then(cards => {
    cards.forEach(item => {
      section.addItem(createNewCard(item));
    })
  })
})

const buttonEditProfileAvatar = document.querySelector('.profile__avatar');
const popupEditProfileAvatar = new PopupWithForm(".profile-img-edit-popup", function (inputValues) {
  userInfo.setUserAvatar(inputValues.fild_img);
  popupEditProfileAvatar.close();
});

function openPopupEditProfileAvatar() {
  validFormEditProfileAvatar.checkFormValidity();
  popupEditProfileAvatar.open();
}

popupEditProfileAvatar.setEventListeners();

buttonEditProfileAvatar.addEventListener('click', openPopupEditProfileAvatar);