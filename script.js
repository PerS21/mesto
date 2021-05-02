const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');

const profileEditPopup = document.querySelector('.profile-edit-popup');
const profileEditForm = document.querySelector('.profile-edit-form');
const profileEditFieldName = document.querySelector('.profile-edit-form__input_fild_name');
const profileEditFieldAbout = document.querySelector('.profile-edit-form__input_fild_about');
const profileEditButtonSave = document.querySelector('.profile-edit-form__button-save');
const profileEditCloseIcon = document.querySelector('.profile-edit-form__close-button');


function PopupDisplayToggle(popup) {
  popup.classList.toggle('display');
}

function OpenProfileEditPopup() {
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

editButton.addEventListener('click', OpenProfileEditPopup);

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
profileEditCloseIcon.addEventListener('click', closeProfileEditPopup);


const template = document.querySelector('#template');
const elements = document.querySelector('.elements__list');

const imgPopup = document.querySelector('.popup_content-img');
const imgPopupImg = imgPopup.querySelector('.imgPopup__img');
const imgPopupText = imgPopup.querySelector('.imgPopup__text');

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];




function newElement(ElemenConfig) {

  function handleRemoveTodo(e) {
    e.target.closest('.element').remove();
  }

  function openImgPopup(e) {
    imgPopupImg.src = e.target.src;
    const elementText = e.target.closest('.element').querySelector('.element__text').textContent;
    imgPopupText.textContent = elementText;
    imgPopupImg.alt = `картинка места - ${elementText}`;
    PopupDisplayToggle(imgPopup);
  }

  const newElement = template.content.querySelector('.element').cloneNode(true);
  const elementText = newElement.querySelector('.element__text');
  const elementImg = newElement.querySelector('.element__img');
  elementImg.src = ElemenConfig.link;
  elementText.textContent = ElemenConfig.name;
  elementImg.alt = `картинка места - ${ElemenConfig.name}`;

  const elementRemoveButton = newElement.querySelector('.element__trash');

  elementRemoveButton.addEventListener('click', handleRemoveTodo);

  elementImg.addEventListener('click', openImgPopup);

  const elementHeart = newElement.querySelector('.element__heart');

  function heartToggle() {
    elementHeart.classList.toggle('element__heart_active');
  }

  elementHeart.addEventListener('click', heartToggle)

  return newElement
}

initialCards.forEach(function (currentItem) {
  elements.append(newElement(currentItem));
});


const eddPlaceButton = document.querySelector('.profile__add-button');

const addPlacePopup = document.querySelector('.add-place-popup');
const addPlaceCloseIcon = document.querySelector('.add-place-form__close-button');

const addPlacePopupPopup = document.querySelector('.profile-edit-popup');
const addPlacePopupForm = document.querySelector('.add-place-form');
const addPlacePopupFieldText = document.querySelector('.add-place-form__input_fild_text');
const addPlacePopupFieldLink = document.querySelector('.add-place-form__input_fild_link');
const addPlacePopupButtonSave = document.querySelector('.add-place-form__button-save');
const addPlacePopupCloseIcon = document.querySelector('.add-place-form__close-button');


function closeAddPlacePopup() {
  PopupDisplayToggle(addPlacePopup)
}

function OpenAddPlacePopup() {
  addPlacePopupFieldText.value = '';
  addPlacePopupFieldLink.value = '';
  PopupDisplayToggle(addPlacePopup)
}

function addPlacePopupFormSubmitHandler(evt) {
  evt.preventDefault();
  const newElementConfig = {};
  newElementConfig.name = addPlacePopupFieldText.value;
  newElementConfig.link = addPlacePopupFieldLink.value;

  elements.prepend(newElement(newElementConfig));

  PopupDisplayToggle(addPlacePopup)
};

eddPlaceButton.addEventListener('click', OpenAddPlacePopup);
addPlaceCloseIcon.addEventListener('click', closeAddPlacePopup);
addPlacePopupForm.addEventListener('submit', addPlacePopupFormSubmitHandler);

const closeImgPopupButton = document.querySelector('.imgPopup__close-button');

function closeImgPopup() {
  PopupDisplayToggle(imgPopup);
}

closeImgPopupButton.addEventListener('click', closeImgPopup);