const editButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const closeIcon = document.querySelector('.form__close-icon');

const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__prof');

const fieldName = document.querySelector('.form__field-name');
const fieldProfessionalism = document.querySelector('.form__field-professionalism');
const buttonSave = document.querySelector('.form__button-save');




function DisplayToggle() {
    fieldName.placeholder = profileName.innerHTML;
    // fieldProfessionalism.value = profileProf.innerHTML;
    popup.classList.toggle('display');
}

editButton.addEventListener('click', DisplayToggle);
closeIcon.addEventListener('click', DisplayToggle);

popup.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
        DisplayToggle();
    }
});

buttonSave.addEventListener('click', function () {
    if (fieldName.value !== '') {
        profileName.innerHTML = fieldName.value;
    }
    if (fieldProfessionalism.value !== '') {
        profileProf.innerHTML = fieldProfessionalism.value;
    }
    DisplayToggle();
});