import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "../scripts/Section.js";
import { formConfig } from "../utils/validFormConfig.js";
import '../pages/index.css';
import {initialCards} from '../utils/initialCards.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

const userInfo = new UserInfo('.profile-edit-form__input-fild-name', '.profile-edit-form__input-fild-about');

const popupEditProfile = new PopupWithForm(".profile-edit-popup", function(evt){
  evt.preventDefault();
  userInfo.setUserInfo(profileEditFieldName.value, profileEditFieldAbout.value)
  profileName.textContent = userInfo.getUserInfo().name;
  profileProf.textContent = userInfo.getUserInfo().about;
  this.close();
});
popupEditProfile.setEventListeners();
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", popupEditProfile.open);


const popupAddPlace = new PopupWithForm(".add-place-popup", function(evt){
  evt.preventDefault();
  const newElementConfig = {};
  newElementConfig.name = inputCardTitle.value;
  newElementConfig.link = inputCardLink.value;
  const card = new Card(newElementConfig, "#template", (cardImg, cardText) => popupWithImage.open(cardImg, cardText)).getCard();
  section.addItem(card);
  this.close();
});
popupAddPlace.setEventListeners();
const addPlaceButton = document.querySelector(".profile__add-button");
addPlaceButton.addEventListener("click", popupAddPlace.open);



const profileName = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__prof");

const profileEditForm = document.querySelector(".profile-edit-form");
const profileEditFieldName = document.querySelector(
  ".profile-edit-form__input-fild-name"
);
const profileEditFieldAbout = document.querySelector(
  ".profile-edit-form__input-fild-about"
);

const validProfileEditForm = new FormValidator( formConfig, profileEditForm);
validProfileEditForm.enableValidation();

const elements = document.querySelector(".elements__list");

const popupWithImage = new PopupWithImage(".imgPopup");
popupWithImage.setEventListeners();

const section = new Section({data: initialCards,
  renderer: (currentItem)=>{
   const card = new Card(currentItem, "#template", (cardImg, cardText) => popupWithImage.open(cardImg, cardText)).getCard();
   elements.prepend(card);
 }
}, ".elements__list");

section.renderer();

const addPlacePopupForm = document.querySelector(".add-place-form");
const inputCardTitle = document.querySelector(
  ".add-place-form__input-fild-text"
);
const inputCardLink = document.querySelector(
  ".add-place-form__input-fild-link"
);

const validAddPlaceForm = new FormValidator(formConfig, addPlacePopupForm);
validAddPlaceForm.enableValidation();
