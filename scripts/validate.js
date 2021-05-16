const hideInputError = (inputElement, formElement, conf) => {
    const { inputErrorClass, errorClass } = conf;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

const showInputError = (inputElement, formElement, conf) => {
    const { inputErrorClass, errorClass } = conf;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
}

const checkInputValidity = (inputElement, formElement, conf) => {
    if (inputElement.validity.valid) {
        hideInputError(inputElement, formElement, conf);
    } else {
        showInputError(inputElement, formElement, conf);
    }
}

const hazInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (buttonElement, inputList, conf) => {
    const { inactiveButtonClass } = conf;
    if (hazInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false; 
        buttonElement.classList.remove(inactiveButtonClass);
    }
}


function setEventListeners(formElement, conf ) {
    const { inputSelector, submitButtonSelector } = conf;
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (evt) => {
            evt.preventDefault();
            checkInputValidity(inputElement, formElement, conf);
            toggleButtonState(buttonElement, inputList, conf);
        })
        toggleButtonState(buttonElement, inputList, conf);
    })
};

const enableValidation = ( conf) => {
    const { formSelector } = conf;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, conf);
    })
};


enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'button_disable',
    inputErrorClass: 'form__input_error',
    errorClass: 'form__input-error_active',
  });