import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import { formConfig } from "../utils/validFormConfig.js";
import '../pages/index.css';
import {initialCards} from '../utils/initialCards.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

const profileName = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__prof");

const profileEditForm = document.querySelector(".profile-edit-form");
const addPlacePopupForm = document.querySelector(".add-place-form");

const validAddPlaceForm = new FormValidator(formConfig, addPlacePopupForm);
validAddPlaceForm.enableValidation();
const validProfileEditForm = new FormValidator( formConfig, profileEditForm);
validProfileEditForm.enableValidation();



const userInfo = new UserInfo('.profile__name', '.profile__prof');

const popupEditProfile = new PopupWithForm(".profile-edit-popup", function(inputValues){
  profileName.textContent = inputValues.fild_name;
  profileProf.textContent = inputValues.fild_about;
  userInfo.setUserInfo(profileName.textContent, inputValues.fild_about);
  popupEditProfile.close();
});
userInfo.setUserInfo(popupEditProfile.textContent, profileProf.textContent);
popupEditProfile.setEventListeners();
const editButton = document.querySelector(".profile__edit-button");

editButton.addEventListener("click", ()=>{
  profileEditForm.querySelector('.profile-edit-form__input-fild-name').value = userInfo.getUserInfo().name;
  profileEditForm.querySelector('.profile-edit-form__input-fild-about').value = userInfo.getUserInfo().about;
  popupEditProfile.open();
  validProfileEditForm.checkFormValidity();
});

function newCard(data){
  const card = new Card(data, "#template", (cardImg, cardText) => popupWithImage.open(cardImg, cardText)).getCard();
  return card
}

const popupAddPlace = new PopupWithForm(".add-place-popup", function(inputValues){
  const newElementConfig = {};
  newElementConfig.name = inputValues.fild_place;
  newElementConfig.link = inputValues.fild_img;
  section.addItem(newCard(newElementConfig));
  popupAddPlace.close();
  validAddPlaceForm.enableValidation();
});
popupAddPlace.setEventListeners();
const addPlaceButton = document.querySelector(".profile__add-button");
addPlaceButton.addEventListener("click", ()=>{
  validAddPlaceForm.checkFormValidity();
  popupAddPlace.open();
});

const elements = document.querySelector(".elements__list");

const popupWithImage = new PopupWithImage(".imgPopup");
popupWithImage.setEventListeners();

const section = new Section({data: initialCards,
  renderer: (currentItem)=>{
   elements.prepend(newCard(currentItem));
 }
}, ".elements__list");

section.renderer();