//Не объявляю все переменнные сразу для разделения по блокам - элементы лежат рядом с функциями которые их используют
//Сделано для того что бы потом было легче разнести по отдельный файликам, в будущем хочется так сделать что бы не было одног огромного файла

const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');

const profileEditPopup = document.querySelector('.profile-edit-popup');
const profileEditForm = document.querySelector('.profile-edit-form');
const profileEditFieldName = document.querySelector('.profile-edit-form__input-fild-name');
const profileEditFieldAbout = document.querySelector('.profile-edit-form__input-fild-about');
const profileEditButtonSave = document.querySelector('.profile-edit-form__button-save');
const profileEditCloseIcon = document.querySelector('.profile-edit-form__close-button');

function togglePopup(popup) {
  popup.classList.toggle('display');
};

const updateInputValue = (inputElement, value) => {
  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input'));
};

function addEscCloseProfileListener(evt){
  if (evt.key === 'Escape') {
    closeProfileEditPopup()
  }
};

function addOverlayCloseProfileListener(evt){
  if (evt.target === evt.currentTarget) {
    closeProfileEditPopup()
  }
};

function openProfileEditPopup() {
  updateInputValue(profileEditFieldName, profileName.textContent);
  updateInputValue(profileEditFieldAbout, profileProf.textContent);
  togglePopup(profileEditPopup);
  document.addEventListener("keydown", addEscCloseProfileListener);
  profileEditPopup.addEventListener('mousedown', addOverlayCloseProfileListener);
}

function closeProfileEditPopup() {
  togglePopup(profileEditPopup);
  document.removeEventListener("keydown", addEscCloseProfileListener);
  profileEditPopup.removeEventListener("keydown", addOverlayCloseProfileListener);
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  if (profileEditFieldName.value !== '') {
    profileName.textContent = profileEditFieldName.value;
  }
  if (profileEditFieldAbout.value !== '') {
    profileProf.textContent = profileEditFieldAbout.value;
  }
  togglePopup(profileEditPopup)
};

function deleteCard(e) {
  e.target.closest('.element').remove();
}


const closeImgPopupButton = document.querySelector('.imgPopup__close-button');

function addEscCloseImgListener(evt){
  if (evt.key === 'Escape') {
    closeImgPopup()
  }
};

function addOverlayCloseImgListener(evt){
  if (evt.target === evt.currentTarget) {
    closeImgPopup()
  }
};

function closeImgPopup() {
  togglePopup(imgPopup);
  document.removeEventListener("keydown", addEscCloseImgListener)
  addPlacePopup.removeEventListener("keydown", addOverlayCloseImgListener);
}

function openImgPopup(e) {
  imgPopupImg.src = e.target.src;
  const elementText = e.target.closest('.element').querySelector('.element__text').textContent;
  imgPopupText.textContent = elementText;
  imgPopupImg.alt = `картинка места - ${elementText}`;
  togglePopup(imgPopup);
  document.addEventListener("keydown", addEscCloseImgListener);
  imgPopup.addEventListener('mousedown', addOverlayCloseImgListener);
}

editButton.addEventListener('click', openProfileEditPopup);

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
profileEditCloseIcon.addEventListener('click', closeProfileEditPopup);


const template = document.querySelector('#template');
const elements = document.querySelector('.elements__list');

const imgPopup = document.querySelector('.imgPopup');
const imgPopupImg = imgPopup.querySelector('.imgPopup__img');
const imgPopupText = imgPopup.querySelector('.imgPopup__text');

function likeToggle(e) {
  e.target.classList.toggle('element__heart_active');
}

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
  elements.append(createCard(currentItem));
});


const addPlaceButton = document.querySelector('.profile__add-button');

const addPlacePopup = document.querySelector('.add-place-popup');
const addPlaceCloseIcon = document.querySelector('.add-place-form__close-button');

const addPlacePopupForm = document.querySelector('.add-place-form');
const inputCardTitle = document.querySelector('.add-place-form__input-fild-text');
const inputCardLink = document.querySelector('.add-place-form__input-fild-link');
const addPlacePopupButtonSave = document.querySelector('.add-place-form__button-save');

function addEscClosePlaceListener(evt){
  if (evt.key === 'Escape') {
    closeAddPlacePopup()
  }
};

function addOverlayClosePlaceListener(evt){
  if (evt.target === evt.currentTarget) {
    closeAddPlacePopup()
  }
};

function closeAddPlacePopup() {
  togglePopup(addPlacePopup);
  document.removeEventListener("keydown", addEscClosePlaceListener);
  addPlacePopup.removeEventListener("keydown", addOverlayClosePlaceListener);
}

function openAddPlacePopup() {
  updateInputValue(inputCardTitle, '');
  updateInputValue(inputCardLink, '');
  togglePopup(addPlacePopup)
  document.addEventListener("keydown", addEscClosePlaceListener);
  addPlacePopup.addEventListener('mousedown', addOverlayClosePlaceListener)
}

function addPlacePopupFormSubmitHandler(evt) {
  evt.preventDefault();
  const newElementConfig = {};
  newElementConfig.name = inputCardTitle.value;
  newElementConfig.link = inputCardLink.value;

  elements.prepend(createCard(newElementConfig));

  togglePopup(addPlacePopup)
};

addPlaceButton.addEventListener('click', openAddPlacePopup);
addPlaceCloseIcon.addEventListener('click', closeAddPlacePopup);
addPlacePopupForm.addEventListener('submit', addPlacePopupFormSubmitHandler);

closeImgPopupButton.addEventListener('click', closeImgPopup);