class FormValidator {
  constructor(conf, form) {
    this._conf = conf;
    this._form = form;
  }

  _hideInputError = (inputElement, formElement, conf) => {
    const { inputErrorClass, errorClass } = conf;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };

  _showInputError = (inputElement, formElement, conf) => {
    const { inputErrorClass, errorClass } = conf;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  };

  _checkInputValidity = (inputElement, formElement, conf) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, formElement, conf);
    } else {
      this._showInputError(inputElement, formElement, conf);
    }
  };

  _hazInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _toggleButtonState = (buttonElement, inputList, conf) => {
    const { inactiveButtonClass } = conf;
    if (this._hazInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    }
  };

  _setEventListeners = (formElement, conf) => {
    const { inputSelector, submitButtonSelector } = conf;
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        evt.preventDefault();
        this._checkInputValidity(inputElement, formElement, conf);
        this._toggleButtonState(buttonElement, inputList, conf);
      });
      this._toggleButtonState(buttonElement, inputList, conf);
    });
  };

  enableValidation = (form, conf) => {
    this._setEventListeners(form, conf);
  };

  checkFormValidity = (form, conf) => {
    const { inputSelector, submitButtonSelector } = conf;
    const buttonElement = form.querySelector(submitButtonSelector);
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement, form, conf);
      this._toggleButtonState(buttonElement, inputList, conf);
    });
  };
}

export default FormValidator;
