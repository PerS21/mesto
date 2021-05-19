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

function openPopup(popup){
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", escClosePopup);
  popup.addEventListener('mousedown', clickClosePopup);
}

function closePopup(){
  const popup = document.querySelector('.popup_is-opened');
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener("mousedown", clickClosePopup);
  document.removeEventListener("keydown", escClosePopup);
}

function escClosePopup(evt){
  if (evt.key === 'Escape') { 
    closePopup()
  } 
}

function clickClosePopup(evt){
  if ((evt.target === evt.currentTarget)||evt.target.classList.contains('popup__close-button')) {
    closePopup()
  }
}

const updateInputValue = (inputElement, value) => {
  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input'));
};

function openProfileEditPopup() {
  updateInputValue(profileEditFieldName, profileName.textContent);
  updateInputValue(profileEditFieldAbout, profileProf.textContent);
  openPopup(profileEditPopup);
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  if (profileEditFieldName.value !== '') {
    profileName.textContent = profileEditFieldName.value;
  }
  if (profileEditFieldAbout.value !== '') {
    profileProf.textContent = profileEditFieldAbout.value;
  }
  closePopup();
};

function deleteCard(e) {
  e.target.closest('.element').remove();
}

function openImgPopup(e) {
  imgPopupImg.src = e.target.src;
  const elementText = e.target.closest('.element').querySelector('.element__text').textContent;
  imgPopupText.textContent = elementText;
  imgPopupImg.alt = `картинка места - ${elementText}`;
  openPopup(imgPopup);
}

editButton.addEventListener('click', openProfileEditPopup);

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);

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

const addPlacePopupForm = document.querySelector('.add-place-form');
const inputCardTitle = document.querySelector('.add-place-form__input-fild-text');
const inputCardLink = document.querySelector('.add-place-form__input-fild-link');
const addPlacePopupButtonSave = document.querySelector('.add-place-form__button-save');

function openAddPlacePopup() {
  updateInputValue(inputCardTitle, '');
  updateInputValue(inputCardLink, '');
  openPopup(addPlacePopup);
}

function addPlacePopupFormSubmitHandler(evt) {
  evt.preventDefault();
  const newElementConfig = {};
  newElementConfig.name = inputCardTitle.value;
  newElementConfig.link = inputCardLink.value;
  elements.prepend(createCard(newElementConfig));
  closePopup();
};

addPlaceButton.addEventListener('click', openAddPlacePopup);
addPlacePopupForm.addEventListener('submit', addPlacePopupFormSubmitHandler);