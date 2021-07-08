class FormValidator {
  constructor(conf, form) {
    this._conf = conf;
    this._form = form;

    this._inputSelector = conf.inputSelector;
    this._submitButtonSelector = conf.submitButtonSelector;
    this._inputErrorClass = conf.inputErrorClass;
    this._errorClass = conf.errorClass;
    this._inactiveButtonClass = conf.inactiveButtonClass;

    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _hideInputError = (inputElement) => {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  };

  _showInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  _hazInvalidInput = () => {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _toggleButtonState = () => {
    if (this._hazInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners = () => {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        evt.preventDefault();
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
      this._toggleButtonState();
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  checkFormValidity = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };
}

export default FormValidator;
