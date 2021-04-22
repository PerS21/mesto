const editButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const closeIcon = document.querySelector('.form__close-button');

const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');

const fieldName = document.querySelector('.form__input_fild_name');
const fieldProfessionalism = document.querySelector('.form__input_fild_about');
const buttonSave = document.querySelector('.form__button-save');
const form = document.querySelector('.form')

function PopupDisplayToggle() {
    popup.classList.toggle('display');
}

function OpenPopup() {
    fieldName.value = profileName.innerHTML;
    fieldProfessionalism.value = profileProf.innerHTML;
    PopupDisplayToggle()
}

function ClosePopup(evt) {
    evt.preventDefault();
    PopupDisplayToggle()
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    if (fieldName.value !== '') {
        profileName.textContent = fieldName.value;
    }
    if (fieldProfessionalism.value !== '') {
        profileProf.textContent = fieldProfessionalism.value;
    }
    PopupDisplayToggle()
};

form.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', OpenPopup);
closeIcon.addEventListener('click', ClosePopup);