const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');

const profileEditPopup = document.querySelector('.profile-edit-popup');
const profileEditForm = document.querySelector('.profile-edit-form');
const profileEditFieldName = document.querySelector('.profile-edit-form__input-fild-name');
const profileEditFieldAbout = document.querySelector('.profile-edit-form__input-fild-about');
const profileEditButtonSave = document.querySelector('.profile-edit-form__button-save');
const profileEditCloseIcon = document.querySelector('.profile-edit-form__close-button');

function PopupDisplayToggle(popup) {
  popup.classList.toggle('display');
}

function openProfileEditPopup() {
  profileEditFieldName.value = profileName.textContent;
  profileEditFieldAbout.value = profileProf.textContent;
  PopupDisplayToggle(profileEditPopup)
}

function closeProfileEditPopup() {
  PopupDisplayToggle(profileEditPopup)
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  if (profileEditFieldName.value !== '') {
    profileName.textContent = profileEditFieldName.value;
  }
  if (profileEditFieldAbout.value !== '') {
    profileProf.textContent = profileEditFieldAbout.value;
  }
  PopupDisplayToggle(profileEditPopup)
};

function deleteCard(e) {
  e.target.closest('.element').remove();
}

function openImgPopup(e) {
  imgPopupImg.src = e.target.src;
  const elementText = e.target.closest('.element').querySelector('.element__text').textContent;
  imgPopupText.textContent = elementText;
  imgPopupImg.alt = `картинка места - ${elementText}`;
  PopupDisplayToggle(imgPopup);
}

function likeToggle() {
  elementHeart.classList.toggle('element__heart_active');
}

editButton.addEventListener('click', openProfileEditPopup);

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
profileEditCloseIcon.addEventListener('click', closeProfileEditPopup);


const template = document.querySelector('#template');
const elements = document.querySelector('.elements__list');

const imgPopup = document.querySelector('.imgPopup');
const imgPopupImg = imgPopup.querySelector('.imgPopup__img');
const imgPopupText = imgPopup.querySelector('.imgPopup__text');

function createCard(cardData) {

  const newElement = template.content.querySelector('.element').cloneNode(true);
  const elementText = newElement.querySelector('.element__text');
  const elementImg = newElement.querySelector('.element__img');
  elementImg.src = cardData.link;
  elementText.textContent = cardData.name;
  elementImg.alt = `картинка места - ${cardData.name}`;

  const elementRemoveButton = newElement.querySelector('.element__trash');

  elementRemoveButton.addEventListener('click', deleteCard);

  elementImg.addEventListener('click', openImgPopup);

  const elementHeart = newElement.querySelector('.element__heart');

  elementHeart.addEventListener('click', likeToggle)

  return newElement
}

initialCards.forEach(function (currentItem) {
  elements.append(createCard (currentItem));
});


const eddPlaceButton = document.querySelector('.profile__add-button');

const addPlacePopup = document.querySelector('.add-place-popup');
const addPlaceCloseIcon = document.querySelector('.add-place-form__close-button');

const addPlacePopupForm = document.querySelector('.add-place-form');
const inputCardTitle = document.querySelector('.add-place-form__input-fild-text');
const inputCardLink = document.querySelector('.add-place-form__input-fild-link');
const addPlacePopupButtonSave = document.querySelector('.add-place-form__button-save');


function closeAddPlacePopup() {
  PopupDisplayToggle(addPlacePopup)
}

function openAddPlacePopup() {
  inputCardTitle.value = '';
  inputCardLink.value = '';
  PopupDisplayToggle(addPlacePopup)
}

function addPlacePopupFormSubmitHandler(evt) {
  evt.preventDefault();
  const newElementConfig = {};
  newElementConfig.name = inputCardTitle.value;
  newElementConfig.link = inputCardLink.value;

  elements.prepend(createCard (newElementConfig));

  PopupDisplayToggle(addPlacePopup)
};

eddPlaceButton.addEventListener('click', openAddPlacePopup);
addPlaceCloseIcon.addEventListener('click', closeAddPlacePopup);
addPlacePopupForm.addEventListener('submit', addPlacePopupFormSubmitHandler);

const closeImgPopupButton = document.querySelector('.imgPopup__close-button');

function closeImgPopup() {
  PopupDisplayToggle(imgPopup);
}

closeImgPopupButton.addEventListener('click', closeImgPopup);