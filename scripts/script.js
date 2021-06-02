import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "../utils/utils.js";
import { formConfig } from "../utils/validFormConfig.js";

const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__prof");

const profileEditPopup = document.querySelector(".profile-edit-popup");
const profileEditForm = document.querySelector(".profile-edit-form");
const profileEditFieldName = document.querySelector(
  ".profile-edit-form__input-fild-name"
);
const profileEditFieldAbout = document.querySelector(
  ".profile-edit-form__input-fild-about"
);

const validProfileEditForm = new FormValidator( formConfig, profileEditForm);
validProfileEditForm.enableValidation();

function openProfileEditPopup() {
  profileEditFieldName.value = profileName.textContent;
  profileEditFieldAbout.value = profileProf.textContent;
  validProfileEditForm.checkFormValidity(profileEditForm, formConfig);
  openPopup(profileEditPopup);
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  if (profileEditFieldName.value !== "") {
    profileName.textContent = profileEditFieldName.value;
  }
  if (profileEditFieldAbout.value !== "") {
    profileProf.textContent = profileEditFieldAbout.value;
  }
  closePopup();
}

editButton.addEventListener("click", openProfileEditPopup);

profileEditForm.addEventListener("submit", profileEditFormSubmitHandler);

const elements = document.querySelector(".elements__list");

const imgPopup = document.querySelector(".imgPopup");
const imgPopupImg = imgPopup.querySelector(".imgPopup__img");
const imgPopupText = imgPopup.querySelector(".imgPopup__text");

initialCards.forEach(function (currentItem) {
  const card = new Card(currentItem, "#template").getCard();
  elements.append(card);
});

const addPlaceButton = document.querySelector(".profile__add-button");

const addPlacePopup = document.querySelector(".add-place-popup");

const addPlacePopupForm = document.querySelector(".add-place-form");
const inputCardTitle = document.querySelector(
  ".add-place-form__input-fild-text"
);
const inputCardLink = document.querySelector(
  ".add-place-form__input-fild-link"
);
const addPlacePopupButtonSave = document.querySelector(
  ".add-place-form__button-save"
);

const validAddPlaceForm = new FormValidator(formConfig, addPlacePopupForm);
validAddPlaceForm.enableValidation();

function openAddPlacePopup() {
  addPlacePopupForm.reset()
  validAddPlaceForm.checkFormValidity(addPlacePopupForm, formConfig);
  openPopup(addPlacePopup);
}

function addPlacePopupFormSubmitHandler(evt) {
  evt.preventDefault();
  const newElementConfig = {};
  newElementConfig.name = inputCardTitle.value;
  newElementConfig.link = inputCardLink.value;
  const card = new Card(newElementConfig, "#template").getCard();
  elements.prepend(card);
  closePopup();
}

addPlaceButton.addEventListener("click", openAddPlacePopup);
addPlacePopupForm.addEventListener("submit", addPlacePopupFormSubmitHandler);
